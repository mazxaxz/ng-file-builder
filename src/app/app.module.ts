import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgFileBuilderModule } from 'projects/ng-file-builder/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgFileBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
