import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { format } from 'date-fns';

// This is the dialog component for rescheduling dates
@Component({
    selector: 'reschedule-date',
    template: `
    <div
    fxLayout="column"
    fxLayoutAlign="left top"
    style="padding: 1em; height: 100%">
        <div fxFlex="4em">
            <h2 mat-dialog-title>{{data.title}}</h2>    
        </div>

        <div fxFlex="stretch">
            <mat-dialog-content style="text-align: left">
                <h5>{{data.message}}</h5>
            </mat-dialog-content>
        </div>

        <div fxFlex="4em">
            <mat-dialog-actions>
                <button mat-button (click)="cancel()">Cancel</button>
                <button mat-button (click)="onClick()">continue</button>
            </mat-dialog-actions>   
        </div>
    </div>`,
})
export class PromptDialog {
    constructor(
        public dialogRef: MatDialogRef<PromptDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public scheduledDate: string;

    onClick(): void {
        this.dialogRef.close(true);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
