import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Language } from 'app/shared/model';

@Injectable()
export class TranslatorService {
    constructor(
        private afsDB: FirestoreService
    ) {}

    getLanguages(): Observable<Language[]> {
        return this.afsDB.colWithIds$('/languages');
    }

    updateLanguage(language: Language) {
        return this.afsDB.set(`/languages/${language.id}`, language );
    }
}
