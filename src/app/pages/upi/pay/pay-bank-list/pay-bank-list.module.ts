import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PayBankListRoutingModule } from './pay-bank-list-routing.module';
import { PayBankListComponent } from './pay-bank-list.component';


@NgModule({
  declarations: [PayBankListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PayBankListRoutingModule
  ]
})
export class PayBankListModule { }
