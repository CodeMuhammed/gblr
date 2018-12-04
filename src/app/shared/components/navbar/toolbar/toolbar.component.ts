import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService, RouterService, UtilitiesService } from 'app/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../../viewModel';
@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    @Input() public nav: any;
    @Input() public toggleMenuButton: boolean;

    public menuItem: MenuItem;

    public constructor(
        private router: Router,
        private routerService: RouterService,
        private location: Location,
        private utilitiesService: UtilitiesService,
        private layoutService: LayoutService
    ) { }

    protected open() {
        this.nav.toggle().then((res) => {
            if (res) {
                if (res.type === 'open') {
                    return false;
                }
            }
            return true;
        });
    }

    public ngOnInit() {
        this.routerService.mainMenuItemSource$.subscribe(
            mainMenuItem => {
                this.menuItem = Object.assign({}, mainMenuItem);

                // we add the default logout submenu
                this.menuItem.submenuItems.push({
                    'title': 'logout',
                    'route': '',
                    'icon': 'power_settings_new'
                });
            });
    }

    // click on back button
    protected goBack() {
        this.location.back();
    }
}
