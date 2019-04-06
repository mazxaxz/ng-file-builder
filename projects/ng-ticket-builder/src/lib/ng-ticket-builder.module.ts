import { NgModule } from '@angular/core';
import { NgTicketBuilderComponent } from './ng-ticket-builder.component';
import { SafeSanitizerPipe } from './pipes/safe-sanitizer.pipe';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [
    NgTicketBuilderComponent,
    SafeSanitizerPipe
  ],
  exports: [NgTicketBuilderComponent]
})
export class NgTicketBuilderModule { }
