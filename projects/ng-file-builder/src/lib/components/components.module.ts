import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './inputs/input/input.component';
import { LayerItemsComponent } from './layer-items/layer-items.component';
import { OptionsTabComponent } from './options-tab/options-tab.component';
import { OptionTextInputComponent } from './inputs/option-text-input/option-text-input.component';
import { FontFamilyInputComponent } from './inputs/font-family-input/font-family-input.component';
import { FontWeightInputComponent } from './inputs/font-weight-input/font-weight-input.component';

export const components = [
  InputComponent,
  LayerItemsComponent,
  OptionsTabComponent,
  OptionTextInputComponent,
  FontFamilyInputComponent,
  FontWeightInputComponent
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