import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyMandateConfirmationRoutingModule } from './modify-mandate-confirmation-routing.module';
import { ModifyMandateConfirmationComponent } from './modify-mandate-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ModifyMandateConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModifyMandateConfirmationRoutingModule
  ]
})
export class ModifyMandateConfirmationModule { }
