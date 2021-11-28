import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewRegisterBillerConfirmationRoutingModule } from './add-new-register-biller-confirmation-routing.module';
import { AddNewRegisterBillerConfirmationComponent } from './add-new-register-biller-confirmation.component';


@NgModule({
  declarations: [AddNewRegisterBillerConfirmationComponent],
  imports: [
    CommonModule,
    AddNewRegisterBillerConfirmationRoutingModule
  ]
})
export class AddNewRegisterBillerConfirmationModule { }
