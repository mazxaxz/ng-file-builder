import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './inputs/input/input.component';

export const components = [
    InputComponent
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ReactiveFormsModule,
    ...components
  ]
})
export class ComponentsModule { }