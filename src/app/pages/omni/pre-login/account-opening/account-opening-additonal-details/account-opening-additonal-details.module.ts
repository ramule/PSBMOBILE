import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningAdditonalDetailsComponent } from './account-opening-additonal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [AccountOpeningAdditonalDetailsComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule ,SharedModule
  ],
  exports:[AccountOpeningAdditonalDetailsComponent]
})
export class AccountOpeningAdditonalDetailsModule { }
