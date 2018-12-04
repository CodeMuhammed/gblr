import { OnChanges } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SubMenu } from 'app/shared/viewModel';
import { AuthService, RouterService } from 'app/core';

@Component({
    selector: 'app-submenu',
    templateUrl: 'submenu.component.html',
    styleUrls: ['submenu.component.css']
})
export class SubmenuComponent {

    @Input()
    public submenu: SubMenu;

    public constructor(
        private routerService: RouterService,
        private authService: AuthService,
        private router: Router
    ) { }

    public async handleClick(subMenu) {
        if (subMenu.handleAtSource) {
            this.routerService.submenuItemCallback$.next(subMenu.id);
        }

        if (subMenu.title === 'logout') {
            await this.authService.logout();
            localStorage.clear();
            this.router.navigateByUrl('auth');
        }

        if (subMenu.route) {
            this.router.navigateByUrl(`${this.router.url}/${subMenu.route}`);
        }
    }
}
