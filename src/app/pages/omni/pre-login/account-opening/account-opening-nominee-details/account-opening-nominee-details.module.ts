import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningNomineeDetailsComponent } from './account-opening-nominee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [AccountOpeningNomineeDetailsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    SharedModule, OwlDateTimeModule, OwlNativeDateTimeModule
  ],
  exports:[AccountOpeningNomineeDetailsComponent]
})
export class AccountOpeningNomineeDetailsModule { }
