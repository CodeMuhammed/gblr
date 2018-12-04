
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { LoginComponent, AuthRootComponent } from './components';
import { AuthRouting } from './auth.routing';

@NgModule({
    imports: [
        CommonModule,
        AuthRouting,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        AuthRootComponent
    ]
})
export class AuthModule { } // just added this
