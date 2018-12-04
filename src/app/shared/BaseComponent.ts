import { OnDestroy } from "@angular/core"
import { Subscription } from "rxjs";

export class BaseComponent implements OnDestroy {

    protected subscriptions: Subscription[] = [];
    constructor() { }
    ngOnDestroy(): void {

        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe()
        });
    }
}
