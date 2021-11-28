import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { AccountOpeningStepsRoutingModule } from './account-opening-steps-routing.module';
import { AccountOpeningStepsComponent } from './account-opening-steps.component';
import {AccountOpeningPersonalDetailsModule} from '../account-opening-personal-details/account-opening-personal-details.module';
import {AccountOpeningAdditonalDetailsModule} from '../account-opening-additonal-details/account-opening-additonal-details.module';
import {AccountOpeningBranchDetailsModule} from '../account-opening-branch-details/account-opening-branch-details.module';
import {AccountOpeningNomineeDetailsModule} from '../account-opening-nominee-details/account-opening-nominee-details.module';
import {AccountOpeningCreateUpiModule} from '../account-opening-create-upi/account-opening-create-upi.module';
import {AccountOpeningAccountSelectionModule} from '../account-opening-account-selection/account-opening-account-selection.module';
import { TermsConditonsModule } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.module';

@NgModule({
  declarations: [AccountOpeningStepsComponent],
  imports: [
    CommonModule,
    AccountOpeningStepsRoutingModule,
    AccountOpeningPersonalDetailsModule,
    AccountOpeningAdditonalDetailsModule,
    AccountOpeningBranchDetailsModule,
    AccountOpeningNomineeDetailsModule,
    AccountOpeningCreateUpiModule,
    AccountOpeningAccountSelectionModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TermsConditonsModule
  ]
})
export class AccountOpeningStepsModule { }
