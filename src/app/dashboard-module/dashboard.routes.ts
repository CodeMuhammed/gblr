import { Routes } from '@angular/router';
import { DashboardRootComponent, AppListComponent} from './components';

export const DashboardRoutes: Routes = [{
    path: '',
    component: DashboardRootComponent,
    children: [
        {
            path: '',
            redirectTo: 'apps'
        },
        {
            path: 'apps',
            component: AppListComponent
        }
    ]
}];
