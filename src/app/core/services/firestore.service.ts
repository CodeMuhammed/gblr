import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/app';

import { IObjectMap } from 'app/shared/interface';

type collectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
    constructor(private afs: AngularFirestore) {
        const settings: firebase.firestore.Settings = { timestampsInSnapshots: true };
        firebase.firestore().settings(settings);
    }

    col<T>(ref: collectionPredicate<T>, queryfn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryfn) : ref;
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    getNewId(): string {
        return firebase.firestore().collection('_').doc().id;
    }

    docWithId$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().map((doc) => {
            let data;
            if (doc.payload.exists) {
                data = doc.payload.data();
                data.id = doc.payload.id;
            }

            return this.convertDocTimeStampsToDate(data) as T;
        });
    }

    docsFromId$<T>(ref: collectionPredicate<T>, ids: string[]): Observable<T[]> {
        const colRef = this.col(ref).ref.path;
        const refs = ids.map(id => `/${colRef}/${id}`);

        return this.docsFromRefs$(refs);
    }

    docsFromRefs$<T>(refs): Observable<T[]> {
        const subjects = refs.map((ref) => {
            ref = this.doc(ref).ref.path;
            return this.docWithId$(ref);
        });

        return Observable.combineLatest(
            ...subjects
        );
    }

    colWithIds$<T>(ref: collectionPredicate<T>, queryfn?, addDocRef?: boolean): Observable<T[]> {
        return this.col(ref, queryfn).snapshotChanges().map(docs => {
            return docs.map((doc: any) => {
                const data: any = doc.payload.doc.data();
                data.id = doc.payload.doc.id;

                if (addDocRef) {
                    data.__doc = doc.payload.doc;
                }

                const cData = this.convertDocTimeStampsToDate(data);
                return cData;
            }) as T[];
        });
    }

    batchUpdate<T>(docs: any[], colRef: collectionPredicate<T>): Promise<any> {
        const batch = firebase.firestore().batch();

        docs.forEach((doc) => {
            doc.log = Object.assign({}, doc.log, {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            const docRef = `${colRef}/${doc.id}`;
            batch.update(firebase.firestore().doc(docRef), doc);
        });

        return batch.commit();
    }

    private convertDocTimeStampsToDate(doc: IObjectMap<any>): IObjectMap<any> {
        if (doc) {
            if (Array.isArray(doc)) {
                doc = doc.map(this.checkPropertyValue.bind(this));
            }

            if (doc.constructor.name === 'Object') {
                Object.keys(doc).forEach(key => {
                    doc[key] = this.checkPropertyValue(doc[key]);
                });
            }
        }

        return doc;
    }

    private checkPropertyValue(element: any) {
        if (element) {
            if ((element._seconds >= 0 || element.seconds >= 0) &&
                (element._nanoseconds >= 0 || element.nanoseconds >= 0)) {
                element = new Date((element._seconds || element.seconds) * 1000);
            } else {
                element = this.convertDocTimeStampsToDate(element);
            }
        }

        return element;
    }

    add(colRef: collectionPredicate<any>, data: IObjectMap<any>): Promise<any> {
        data.log = Object.assign({}, data.log, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return this.col(colRef).add(data);
    }

    set(docRef: DocPredicate<any>, data: IObjectMap<any>): Promise<any> {
        data.log = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        return this.doc(docRef).set(data);
    }

    update(docRef: DocPredicate<any>, data: IObjectMap<any>): Promise<any> {
        if (data.log) {
            data.log.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        }

        return this.doc(docRef).update(data);
    }
}
