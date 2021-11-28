import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOpeningSuccessRoutingModule } from './account-opening-success-routing.module';
import { AccountOpeningSuccessComponent } from './account-opening-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AccountOpeningSuccessComponent],
  imports: [
    CommonModule,
    AccountOpeningSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AccountOpeningSuccessModule { }
