import { Component, OnInit } from '@angular/core';
import { RouterService } from 'app/core';

@Component({
    selector: 'app-dashboard-root',
    templateUrl: './root.component.html',
    styleUrls: [ './root.component.scss']
})

export class DashboardRootComponent implements OnInit {
    public items = [];

    constructor(
        private routerService: RouterService
    ) { }

    ngOnInit(): void {
        this.items = [
            { name: 'Apps', path: '/dashboard/apps', icon: 'group_work' },
            { name: 'Users', path: '/dashboard/users', icon: 'person' }
        ];
    }
 }
