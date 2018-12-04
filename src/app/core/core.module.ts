/* 3rd party libraries */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* our own custom services  */
import {
  AuthService,
  FirestoreService,
  LayoutService,
  UserService,
  TranslatorService,
  UtilitiesService,
  RouterService,
} from './services';

import { AuthGuard } from './guards';

@NgModule({
  imports: [],
  exports: [
  ],
  declarations: [
  ],
  providers: [
    AuthService,
    FirestoreService,
    LayoutService,
    UserService,
    TranslatorService,
    UtilitiesService,
    RouterService,

    AuthGuard
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      // throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
