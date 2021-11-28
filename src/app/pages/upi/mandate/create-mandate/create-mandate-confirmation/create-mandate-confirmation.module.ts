import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMandateConfirmationRoutingModule } from './create-mandate-confirmation-routing.module';
import { CreateMandateConfirmationComponent } from './create-mandate-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CreateMandateConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    CreateMandateConfirmationRoutingModule
  ]
})
export class CreateMandateConfirmationModule { }
