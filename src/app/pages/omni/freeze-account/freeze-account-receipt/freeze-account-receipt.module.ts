import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreezeAccountReceiptRoutingModule } from './freeze-account-receipt-routing.module';
import { FreezeAccountReceiptComponent } from './freeze-account-receipt.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [FreezeAccountReceiptComponent],
  imports: [
    CommonModule,
    FreezeAccountReceiptRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FreezeAccountReceiptModule { }
