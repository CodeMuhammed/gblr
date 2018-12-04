import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { User } from 'app/shared/model/user';
import {Observable } from 'rxjs';

@Injectable()
export class UserService {
    public constructor(
        private afsDB: FirestoreService
    ) { }

    public getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve) => {
            this.afsDB.colWithIds$('/users', (ref) => {
                return ref.where('email', '==', email).limit(1);
            }).subscribe((users: User[]) => {
                return resolve(users[0]);
            });
        });
    }

    public getUserById(userId: string): Observable<User> {
        const docRef = `/users/${userId}`;
        return this.afsDB.docWithId$(docRef);
    }

    public getCurrentUser(): Promise<User> {
        const userId: string = localStorage.getItem('user_id');

        return this.getUserById(userId).take(1).toPromise();
    }

    public updateUser(user: User) {
        const ref = `/users/${user.id}`;
        return this.afsDB.update(ref, user);
    }

    public createUser(user: User) {
        const ref = `/users`;
        return this.afsDB.add(ref, user);
    }
}
