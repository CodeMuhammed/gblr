import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslatorComponent } from './components';
import { NewLanguagePromptComponent, PromptDialog } from './entry-components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Mat_LOADERS } from './mat-loaders';
import { TranslatorService, UserPromptsService } from './services';

@NgModule({
    declarations: [TranslatorComponent, NewLanguagePromptComponent, PromptDialog],
    exports: [TranslatorComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, Mat_LOADERS.IMPORTS],
    entryComponents: [
        NewLanguagePromptComponent,
        PromptDialog
    ],
    providers: [
        UserPromptsService,
        TranslatorService
    ]
})
export class TranslateModule {
    public static forRoot(db): ModuleWithProviders {
        return {
            ngModule: TranslateModule,
            providers: [
                TranslatorService,
                {provide: 'db', useValue: db}
            ]
        };
    }
}
