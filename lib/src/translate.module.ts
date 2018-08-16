import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslatorComponent } from './components/translator/translator.component';
import { NewLanguagePromptComponent } from './entry-components/language-form-prompt/language-form-prompt.component';
import { PromptDialog } from './entry-components/prompt';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Mat_LOADERS } from './mat-loaders';
import { UserPromptsService } from './services/user-prompts.service';
import { TranslatorService } from './services/translator.service';

@NgModule({
    declarations: [TranslatorComponent, NewLanguagePromptComponent, PromptDialog],
    exports: [TranslatorComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, Mat_LOADERS.IMPORTS],
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
                {provide: 'db', useClass: db}
            ]
        };
    }

    public static forChild(): ModuleWithProviders {
        return {
            ngModule: TranslateModule
        };
    }
}
