import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'app/shared/viewModel';

import { RouterService } from 'app/core';

@Component({
    selector: 'app-translator-app-list',
    templateUrl: 'app-list.component.html',
    styleUrls: ['app-list.component.css']
})
export class AppListComponent implements OnInit {
    private menuItem: MenuItem = Object.assign({}, new MenuItem(), {
        backButtonEnabled: true,
        title: 'Translator Apps'
    });

    constructor(
        private routerService: RouterService
    ) { }

    ngOnInit(): void {
        this.routerService.setMainMenuItem(this.menuItem);
    }
}
