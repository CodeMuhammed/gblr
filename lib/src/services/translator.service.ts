import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Language } from '../models/translator';

@Injectable()
export class TranslatorService {
    constructor(@Inject('db') private afsDB) {}

    getLanguages(): Observable<Language[]> {
        return this.afsDB.colWithIds$('/languages')
    }

    updateLanguage(language: Language) {
        return this.afsDB.doc(`/languages/${language.id}`).set(language);
    }
}
