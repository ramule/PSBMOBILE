import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt.component';
import { ReceiptRoutingModule} from './receipt-routing.module'
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [ReceiptComponent],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    SharedModule
  ]
})
export class ReceiptModule { }
