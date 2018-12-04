import { Injectable } from '@angular/core';
import { Observer, Observable, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { User } from '../../shared/model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/app';

@Injectable()
export class AuthService {
    public redirectUrl = '';
    private isAuth: boolean;
    public authState$ = new Subject<any>();

    public constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {
        this.afAuth.auth.onAuthStateChanged(auth => {
            this.isAuth = !!auth;
            this.authState$.next(auth);
        });
    }

    public register(user: any) {
        const email = user.email.toLowerCase();
        return this.afAuth.auth.createUserWithEmailAndPassword(email, user.password);
    }

    public login(email, password) {
        email = email.toLowerCase();
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    public loginSocial(socialNetwork: string) {
        switch (socialNetwork) {
            case 'google': return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            case 'twitter': return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
            case 'facebook': return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        }
    }

    public isLoggedIn() {
        return this.isAuth;
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }

    public sendVerificationEmail(): Observable<any> {
        return Observable.create((observer) => {
            const user: firebase.User = firebase.auth().currentUser;

            const interval = setInterval(async () => {
                await user.reload();
                if (user.emailVerified) {
                    clearInterval(interval);
                    observer.next();
                }
            }, 2000);

            user.sendEmailVerification();
        });
    }

    public emailIsRegistered(email: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const signInMethods: string[] = await this.afAuth.auth.fetchSignInMethodsForEmail(email);
            return resolve(signInMethods.length > 0);
        });
    }

    public resetPassword(email: string) {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    // Used by the http interceptor to set the auth header
    public getUserIdToken(): Observable<string> {
        return fromPromise(this.afAuth.auth.currentUser.getIdToken());
    }
}
