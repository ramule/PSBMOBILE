import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOpeningPersonalDetailsComponent } from './account-opening-personal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [AccountOpeningPersonalDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
     ReactiveFormsModule,
     SharedModule
  ],
  exports: [AccountOpeningPersonalDetailsComponent]
})
export class AccountOpeningPersonalDetailsModule { }
