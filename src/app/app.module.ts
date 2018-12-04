import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreModule } from 'app/core';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        RouterModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
    exports: [],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
