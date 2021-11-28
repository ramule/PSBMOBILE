import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyReceiptRoutingModule } from './pmsby-receipt-routing.module';
import { PmsbyReceiptComponent } from './pmsby-receipt.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PmsbyReceiptComponent],
  imports: [
    CommonModule,
    SharedModule,
    PmsbyReceiptRoutingModule
  ]
})
export class PmsbyReceiptModule { }
