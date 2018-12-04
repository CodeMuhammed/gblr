import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent, AuthRootComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthRootComponent,
        children: [
          {
            path: '',
            redirectTo: 'apps'
          },
          {
            path: 'apps',
            component: LoginComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRouting { }
