import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveMandateConfirmationRoutingModule } from './approve-mandate-confirmation-routing.module';
import { ApproveMandateConfirmationComponent } from './approve-mandate-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ApproveMandateConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApproveMandateConfirmationRoutingModule
  ]
})
export class ApproveMandateConfirmationModule { }
