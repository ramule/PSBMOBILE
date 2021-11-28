import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningBranchDetailsComponent } from './account-opening-branch-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [AccountOpeningBranchDetailsComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,SharedModule

  ],
  exports:[AccountOpeningBranchDetailsComponent]
})
export class AccountOpeningBranchDetailsModule { }
