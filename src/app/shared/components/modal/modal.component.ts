import { Component, ContentChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  @ContentChild('modal_header') header: any;
  @ContentChild('modal_footer') footer: any;
  @Input() showCloseButton: boolean;

  constructor(
    private matDialogRef: MatDialogRef<any>,
    public breakpointObserver?: BreakpointObserver
  ) {
    const smallDialogSubscription = this.isExtraSmall.subscribe((result) => {
      if (result.matches) {
        matDialogRef.updateSize('100%', '100%');
      } else {
        matDialogRef.updateSize(
          matDialogRef._containerInstance._config.width,
          matDialogRef._containerInstance._config.height
        );
      }
    });

    matDialogRef.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe();
    });
  }

  closeModal() {
    this.matDialogRef.close();
  }
}
