import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionPinRoutingModule } from './transaction-pin-routing.module';
import { TransactionPinComponent } from './transaction-pin.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [TransactionPinComponent],
  imports: [
    CommonModule,
    TransactionPinRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TransactionPinModule { }
