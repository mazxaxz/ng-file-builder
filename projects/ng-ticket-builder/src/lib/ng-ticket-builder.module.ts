import { NgModule } from '@angular/core';
import { NgTicketBuilderComponent } from './ng-ticket-builder.component';
import { SafeSanitizerPipe } from './pipes/safe-sanitizer.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [NgTicketBuilderComponent, SafeSanitizerPipe],
  exports: [NgTicketBuilderComponent]
})
export class NgTicketBuilderModule { }
