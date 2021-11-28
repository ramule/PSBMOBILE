import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerConfirmationRoutingModule } from './register-biller-confirmation-routing.module';
import { RegisterBillerConfirmationComponent } from './register-biller-confirmation.component';


@NgModule({
  declarations: [RegisterBillerConfirmationComponent],
  imports: [
    CommonModule,
    RegisterBillerConfirmationRoutingModule
  ]
})
export class RegisterBillerConfirmationModule { }
