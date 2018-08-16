import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { PromptDialog } from '../entry-components/prompt';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Injectable()
export class UserPromptsService {
    private loading = false;
    public activeMediaQuery = '';

    constructor(
        private media: ObservableMedia,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
        // set up subscription for the media query
        this.media.subscribe((change: MediaChange) => {
            this.activeMediaQuery = change ? change.mqAlias : '';
        });
    }

    showLoading() {
        setTimeout(() => {
            this.loading = true;
        }, 0);
    }

    hideLoading() {
        setTimeout(() => {
            this.loading = false;
        }, 100);
    }

    isLoading() {
        return this.loading;
    }

    showToast(message: string, actionText: string, actionCallbak?: any) {
        const snackbarRef = this.snackBar.open(message, actionText, {
            duration: 4000
        });

        if (actionCallbak) {
            snackbarRef.onAction().subscribe(() => {
                actionCallbak();
            });
        }
    }

    showDialogue(title: string, message: string, handler?: any) {
        const { width, height } = this.getDimension();
        const dialogRef = this.dialog.open(PromptDialog, {
            width,
            height,
            data: {
                message,
                title
            }
        });

        dialogRef.afterClosed().subscribe(handler);
    }

    processAsync(promise: Promise<any>) {
        return new Promise((resolve, reject) => {
            this.showLoading();

            promise.then((res) => {
                this.hideLoading();
                resolve(res);
            })
                .catch((err) => {
                    this.hideLoading();
                    reject(err);
                });
        });
    }

    // calculates the appropriate length and height based on media
    private getDimension() {
        const isXs = this.activeMediaQuery === 'xs';
        return {
            width: isXs ? '100%' : '500px',
            height: isXs ? '50vh' : '300px'
        };
    }

}
