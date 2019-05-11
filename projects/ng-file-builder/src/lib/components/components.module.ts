import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { InputComponent } from './inputs/input/input.component';
import { LayerItemsComponent } from './layer-items/layer-items.component';
import { OptionsTabComponent } from './options-tab/options-tab.component';
import { OptionTextInputComponent } from './inputs/option-text-input/option-text-input.component';
import { FontFamilyInputComponent } from './inputs/font-family-input/font-family-input.component';
import { FontWeightInputComponent } from './inputs/font-weight-input/font-weight-input.component';
import { FontSizeInputComponent } from './inputs/font-size-input/font-size-input.component';
import { BackgroundInputComponent } from './inputs/background-input/background-input.component';
import { ColorpickerInputComponent } from './inputs/colorpicker-input/colorpicker-input.component';
import { ModalSetupComponent } from './modal-setup/modal-setup.component';
import { InfoBoxComponent } from './modals/info-box/info-box.component';
import { ModalBoxHeaderComponent } from './modal-box-header/modal-box-header.component';

export const components = [
  InputComponent,
  LayerItemsComponent,
  OptionsTabComponent,
  OptionTextInputComponent,
  FontFamilyInputComponent,
  FontWeightInputComponent,
  FontSizeInputComponent,
  BackgroundInputComponent,
  ColorpickerInputComponent,
  ModalSetupComponent,
  ModalBoxHeaderComponent,
  InfoBoxComponent
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ...components
  ],
  entryComponents: [
    InfoBoxComponent
  ]
})
export class ComponentsModule { }