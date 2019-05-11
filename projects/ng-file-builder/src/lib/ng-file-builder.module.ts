import { NgModule } from '@angular/core';
import { NgFileBuilderComponent } from './ng-file-builder.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    NgFileBuilderComponent
  ],
  exports: [NgFileBuilderComponent]
})
export class NgFileBuilderModule { }
