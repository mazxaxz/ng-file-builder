import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorFormatterPipe } from './color-formatter.pipe';
import { SafeSanitizerPipe } from './safe-sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeSanitizerPipe,
    ColorFormatterPipe
  ],
  exports: [
    SafeSanitizerPipe,
    ColorFormatterPipe
  ]
})
export class PipesModule { }