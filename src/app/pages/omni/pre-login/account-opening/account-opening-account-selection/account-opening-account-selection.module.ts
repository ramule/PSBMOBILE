import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningAccountSelectionComponent } from './account-opening-account-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [AccountOpeningAccountSelectionComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule
  ],
  exports: [AccountOpeningAccountSelectionComponent]
})
export class AccountOpeningAccountSelectionModule { }
