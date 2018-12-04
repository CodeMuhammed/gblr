import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';

import { SharedModule } from '../shared/shared.module';
import { DashboardRootComponent, AppListComponent } from './components';

@NgModule({
    declarations: [
        DashboardRootComponent,
        AppListComponent
    ],
    exports: [],
    imports: [
        RouterModule.forChild(DashboardRoutes),
        SharedModule
    ],
    providers: []
})
export class DashboardModule { }
