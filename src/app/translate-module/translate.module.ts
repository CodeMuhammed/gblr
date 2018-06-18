import { NgModule } from '@angular/core';
import { TranslatorComponent  } from './components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Mat_LOADERS } from './mat-loaders';
import { TranslatorService, UserPromptsService } from './services';

@NgModule({
    declarations: [TranslatorComponent],
    exports: [TranslatorComponent],
    imports: [CommonModule,FormsModule,BrowserAnimationsModule, Mat_LOADERS.IMPORTS],
    providers: [
        TranslatorService,
        UserPromptsService
    ]
})
export class TranslateModule { }
