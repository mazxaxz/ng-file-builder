import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgTicketBuilderModule } from 'projects/ng-ticket-builder/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgTicketBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
