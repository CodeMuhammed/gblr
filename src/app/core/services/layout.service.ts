import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable()
export class LayoutService {
    public status$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public changeState(newState: boolean) {
        this.status$.next(newState);
    }
}
