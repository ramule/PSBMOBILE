import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferReceiptComponent } from './transfer-receipt.component';
import {TransferReceiptRoutingModule} from './transfer-receipt-routing.module'
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [TransferReceiptComponent],
  imports: [
    CommonModule,
    TransferReceiptRoutingModule,
    SharedModule
  ]
})
export class TransferReceiptModule { }
