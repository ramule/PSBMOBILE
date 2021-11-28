import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenRdAccountSuccessReceiptRoutingModule } from './open-rd-account-success-receipt-routing.module';
import { OpenRdAccountSuccessReceiptComponent } from './open-rd-account-success-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OpenRdAccountSuccessReceiptComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OpenRdAccountSuccessReceiptRoutingModule
  ]
})
export class OpenRdAccountSuccessReceiptModule { }
