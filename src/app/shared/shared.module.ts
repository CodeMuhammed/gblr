import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    NavbarComponent,
    SubmenuComponent,
    ToolbarComponent,
    ModalComponent,
    ThumbnailComponent
} from './components';

import { Mat_LOADERS } from './md-loaders';

@NgModule({
    declarations: [
        NavbarComponent,
        SubmenuComponent,
        ToolbarComponent,
        ModalComponent,
        ThumbnailComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ModalComponent,
        NavbarComponent,
        SubmenuComponent,
        ToolbarComponent,
        ThumbnailComponent,
        Mat_LOADERS.IMPORTS
    ],
    imports: [
        Mat_LOADERS.IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    providers: [],
    entryComponents: [

    ]
})
export class SharedModule { }
