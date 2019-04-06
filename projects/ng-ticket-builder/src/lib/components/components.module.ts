import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './inputs/input/input.component';
import { LayerItemsComponent } from './layer-items/layer-items.component';

export const components = [
  InputComponent,
  LayerItemsComponent
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ReactiveFormsModule,
    ...components
  ]
})
export class ComponentsModule { }