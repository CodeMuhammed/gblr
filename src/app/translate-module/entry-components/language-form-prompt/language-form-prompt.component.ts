import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { isAfter, isBefore, format } from 'date-fns';
import { Language } from '../../models/translator';

// This is the dialog component for rescheduling dates
@Component({
    selector: 'app-new-language-prompt',
    templateUrl: './language-form-prompt.component.html',
})
export class NewLanguagePromptComponent {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<NewLanguagePromptComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    async ngOnInit() {
        this.createForm();
    }

    continue(): void {
        let language: Language = new Language();
        this.dialogRef.close(Object.assign({}, language, this.form.value, {
            id:  this.form.value.symbol
        }));
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            symbol: ['', Validators.required]
        });
    }
}
