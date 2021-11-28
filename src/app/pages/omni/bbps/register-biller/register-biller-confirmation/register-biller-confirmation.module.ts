import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerConfirmationRoutingModule } from './register-biller-confirmation-routing.module';
import { RegisterBillerConfirmationComponent } from './register-biller-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RegisterBillerConfirmationComponent],
  imports: [
    CommonModule,
    RegisterBillerConfirmationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class RegisterBillerConfirmationModule { }
