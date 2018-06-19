import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import "hammerjs";
import { AppComponent } from './app.component';
import { TranslateModule } from '@anchorsolutions/translator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({}) // the empty object should be an instance of firestore service
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
