import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningCreateUpiComponent } from './account-opening-create-upi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [AccountOpeningCreateUpiComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, SharedModule
  ],
  exports:[AccountOpeningCreateUpiComponent]
})
export class AccountOpeningCreateUpiModule { }
