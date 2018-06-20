import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Language } from '../models/translator';

@Injectable()
export class TranslatorService {
    constructor(@Inject('db') private afsDB) {
       this.initLnguages();
    }

    async initLnguages() {
        const languages = await this.getLanguages().take(1).toPromise();

        if(languages.length == 0) {
            const defaultLanguage: Language = new Language();

            defaultLanguage.id = 'en';
            defaultLanguage.name = 'english',
            defaultLanguage.symbol = 'en',
            defaultLanguage.segments = [];

            this.updateLanguage(JSON.parse(JSON.stringify(defaultLanguage)));
        }
    }

    getLanguages(): Observable<Language[]> {
        return this.afsDB.colWithIds$('/languages')
    }

    updateLanguage(language: Language) {
        return this.afsDB.doc(`/languages/${language.id}`).set(language);
    }
}
