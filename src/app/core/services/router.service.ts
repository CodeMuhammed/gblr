import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'app/shared/viewModel';

@Injectable()
export class RouterService {
    public mainMenuItemSource$ = new Subject<MenuItem>();
    public submenuItemCallback$ = new Subject<string>();
    public sideMenuActive$ =  new Subject<boolean>();

    public setMainMenuItem(mainMenuItem: MenuItem) {
        this.mainMenuItemSource$.next(mainMenuItem);
    }

    public submenuClicked(menuId: string) {
        this.submenuItemCallback$.next(menuId);
    }
}
