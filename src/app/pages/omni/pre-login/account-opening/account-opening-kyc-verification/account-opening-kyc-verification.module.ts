import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { AccountOpeningKycVerificationRoutingModule } from './account-opening-kyc-verification-routing.module';
import { AccountOpeningKycVerificationComponent } from './account-opening-kyc-verification.component';


@NgModule({
  declarations: [AccountOpeningKycVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AccountOpeningKycVerificationRoutingModule
  ]
})
export class AccountOpeningKycVerificationModule { }
