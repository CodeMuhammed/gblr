
import {debounceTime, take} from 'rxjs/operators';
import { Component, Input, ViewChild } from "@angular/core";
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Language, Segment, Translation } from '../../models/translator';
import { TranslatorService, UserPromptsService } from '../../services';
import { Subject } from "rxjs";

import { MatDialog } from '@angular/material';
import { NewLanguagePromptComponent } from '../../entry-components';

import * as shortId from 'shortid';

@Component({
    selector: "app-translator",
    templateUrl: "./translator.component.html",
    styleUrls: ["./translator.component.css"]
})
export class TranslatorComponent {
    public languages: Language[] = [];
    public selectedLanguage: Language = new Language();
    public baseLanguage: Language = new Language();
    private searchHandler$ = new Subject<string>();

    public canExtend: boolean;
    public canView: boolean = true;
    public searchActive: boolean = false;

    constructor(
        public dialog: MatDialog,
        private userPromptsService: UserPromptsService,
        private translatorService: TranslatorService,
        private media: ObservableMedia
    ) { }

    async ngOnInit() {
        this.media.subscribe((change: MediaChange) => {
            let media = change ? change.mqAlias : '';
            this.canView = media == 'md' || media == 'lg';
        });

        this.canExtend  = true; // @TODO @Input to pass in the option

        // we get all languages from the database
        this.languages = await this.translatorService.getLanguages().take(1).toPromise();

        // we set the default base language
        this.baseLanguage = this.languages.find((language) => language.symbol == 'en');

        // we set the default selected language
        this.selectedLanguage = this.languages.find((language) => language.symbol == 'nl');

        // remove all segments from other languages that are not in base language
        this.languages.forEach((language: Language) => {
            let validSegments: Segment[] = []
            if (language.symbol != 'en') {
                language.segments.forEach((segment: Segment) => {
                    if (this.isSegmentValid(segment.title)) {
                        validSegments.push(segment);
                    }
                });

                language.segments = validSegments;
            }
        });

        // handle searching the translation files
        this.searchHandler$.debounceTime(1000).subscribe((searchText) => this.search(searchText));
    }

    isSegmentValid(segmentTitle: string) {
        let selectedSegment: Segment = this.baseLanguage.segments.find((segment: Segment) => {
            return segment.title == segmentTitle;
        });

        return !!selectedSegment;
    }

    selectLanguage(language: any) {
        this.selectedLanguage = language;
    }

    getSelectedLanguageTranslation(segmentTitle, keyword) {
        let selectedSegment: Segment = this.selectedLanguage.segments.find((segment: Segment) => {
            return segment.title == segmentTitle;
        });

        let translation: Translation = selectedSegment.translations.find((translation: Translation) => {
            return translation.keyword == keyword;
        });

        return translation ? translation.value : keyword;
    }

    updateKeywordValue(value: string, segmentTitle: string, keyword: string, language: Language) {
        let selectedSegment: Segment = language.segments.find((segment: Segment) => {
            return segment.title == segmentTitle;
        });

        let translation: Translation = selectedSegment.translations.find((translation: Translation) => {
            return translation.keyword == keyword;
        });

        translation ? translation.value = value : '';
    }

    addKeyWord(segmentTitle: string) {
        this.languages.forEach((language: Language) => {
            let selectedSegment: Segment = language.segments.find((segment: Segment) => {
                return segment.title == segmentTitle;
            });

            selectedSegment.translations.unshift(new Translation());
        });
    }

    async removeKeyWord(segmentTitle: any, index) {
        await this.userPromptsService.showDialogue(
            'Are you sure!',
            'You want to delete this keyword?',
            (confirm) => {
                if (confirm) {
                    this.languages.forEach((language: Language) => {
                        let selectedSegment: Segment = language.segments.find((segment: Segment) => {
                            return segment.title == segmentTitle;
                        });

                        selectedSegment.translations.splice(index, 1);
                    });
                }
            }
        );
    }

    addLanguage() {
        this.showDialogue((language: Language) => {
            if(language) {
                language.segments = JSON.parse(JSON.stringify(this.baseLanguage.segments));
                this.languages.push(language);
                this.translatorService.updateLanguage(JSON.parse(JSON.stringify(language)));
            }
        });
    }

    addSegment() {
        let segmentTitle = shortId.generate();

        this.languages.forEach((language: Language) => {
            let newSegment: Segment = new Segment();
            newSegment.title = segmentTitle;

            language.segments.unshift(newSegment);
        });

        this.toggleSegment(segmentTitle);
        this.saveChanges();
    }

    async deleteSegment(index, number) {
        await this.userPromptsService.showDialogue(
            'Are you sure!',
            'You want to delete this keyword?',
            (confirm) => {
                if (confirm) {
                    this.languages.forEach((language: Language) => {
                        language.segments.splice(index, 1);
                    });

                    this.saveChanges();
                }
            }
        );
    }

    updateSegmentTitle(newTitle: string, index: number) {
        this.languages.forEach((language: Language) => {
            language.segments[index].title = newTitle;
        });
    }

    updateSegmentKeyword(newKeyword: string, index: number, segmentTitle: string) {
        this.languages.forEach((language: Language) => {
            let selectedSegment: Segment = language.segments.find((segment: Segment) => {
                return segment.title == segmentTitle;
            });

            selectedSegment.translations[index].keyword = newKeyword
        });
    }

    segmentDataValid(editedSegment: Segment) {
        let result: boolean = true;
        let regex = /^[a-z0-9A-Z_\-]+$/; // only alows alphanumeric with no spaces

        if (this.canExtend) {
            result = regex.test(editedSegment.title);
            editedSegment.translations.forEach((translation) => {
                if (!regex.test(translation.keyword) || translation.value.trim().length < 1) {
                    result = false;
                }
            });
        } else {
            // we look for the corresponding segment with the same title in selected language
            let selectedSegment: Segment = this.selectedLanguage.segments.find((segment: Segment) => {
                return editedSegment.title == segment.title;
            });

            if (selectedSegment) {
                selectedSegment.translations.forEach((translation: Translation) => {
                    if (translation.value.trim().length < 1) {
                        result = false;
                    }
                });
            }
        }

        return result;
    }

    async saveChanges() {
        let isValid = true;
        let invalidSegment: Segment;

        //check to see if all data is formatted correctly
        this.languages.forEach((language: Language) => {
            language.segments.forEach((segment: Segment) => {
                if (!this.segmentDataValid(segment)) {
                    invalidSegment = segment;
                    isValid = false;
                }
            });
        });

        if (isValid) {
            // we make a deep copy of the languages we want to save
            let languagesToSave: Language[] = JSON.parse(JSON.stringify(this.languages));

            this.userPromptsService.showLoading();
            this.deleteUIMetaProperties(languagesToSave);

            for (let language of languagesToSave) {
                await this.translatorService.updateLanguage(JSON.parse(JSON.stringify(language)));
            };

            this.userPromptsService.hideLoading();
        } else {
            this.userPromptsService.showToast(`${invalidSegment.title}, has errors`, null);
        }
    }

    deleteUIMetaProperties(languages: Language[]) {
        languages.forEach((language: Language) => {
            language.segments.forEach((segment: Segment) => {
                delete segment.isOpen;
                delete segment.matchedSearch;

                segment.translations.forEach((translation: Translation) => {
                    delete translation.matchedSearch;
                });
            });
        });
    }

    toggleSegment(segmentTitle: string) {
        // we look for the corresponding segment with the same title in selected language
        let selectedSegment: Segment = this.baseLanguage.segments.find((segment: Segment) => {
            return segmentTitle == segment.title;
        });

        let openState: boolean = selectedSegment.isOpen;

        this.baseLanguage.segments.forEach((segment: Segment) => {
            segment.isOpen = false;
        });

        selectedSegment.isOpen = !openState;
    }

    search(searchText: string) {
        searchText = searchText.toLocaleLowerCase();
        this.searchActive = !!searchText;

        if (searchText) {
            // we look for matching secgments and translations
            this.languages.forEach((language: Language) => {
                language.segments.forEach((segment: Segment) => {
                    let translationsMatchedSearch: boolean = false;

                    segment.translations.forEach((translation: Translation) => {
                        Object.keys(translation).forEach((property: string) => {
                            if (property != 'matchedSearch') {
                                if (translation[property].toLocaleLowerCase().indexOf(searchText) != -1) {
                                    translationsMatchedSearch = true;
                                    translation.matchedSearch = true;
                                }
                            }
                        });
                    });

                    segment.matchedSearch = segment
                        .title
                        .toLocaleLowerCase()
                        .indexOf(searchText) != -1 || translationsMatchedSearch;
                });
            });
        } else {
            // here we undo all search results highlighted in the language
            this.languages.forEach((language: Language) => {
                language.segments.forEach((segment: Segment) => {
                    delete segment.matchedSearch;

                    segment.translations.forEach((translation: Translation) => {
                        delete translation.matchedSearch;
                    });
                });
            });
        }
    }

    showDialogue(handler?: any) {
        let dialogRef = this.dialog.open(NewLanguagePromptComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && handler) {
                handler(result);
            }
        });
    }
}
