import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionStatusPageRoutingModule } from './transaction-status-page-routing.module';
import { TransactionStatusPageComponent } from './transaction-status-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [TransactionStatusPageComponent],
  imports: [
    CommonModule,
    TransactionStatusPageRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ]
})
export class TransactionStatusPageModule { }
