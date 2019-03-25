import { NgModule } from '@angular/core';
import { NgTicketBuilderComponent } from './ng-ticket-builder.component';
import { SafeSanitizerPipe } from './pipes/safe-sanitizer.pipe';

@NgModule({
  imports: [
  ],
  declarations: [NgTicketBuilderComponent, SafeSanitizerPipe],
  exports: [NgTicketBuilderComponent]
})
export class NgTicketBuilderModule { }
