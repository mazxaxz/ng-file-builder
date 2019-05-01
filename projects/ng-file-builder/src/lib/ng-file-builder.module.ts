import { NgModule } from '@angular/core';
import { NgFileBuilderComponent } from './ng-file-builder.component';
import { SafeSanitizerPipe } from './pipes/safe-sanitizer.pipe';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  declarations: [
    NgFileBuilderComponent,
    SafeSanitizerPipe
  ],
  exports: [NgFileBuilderComponent]
})
export class NgFileBuilderModule { }
