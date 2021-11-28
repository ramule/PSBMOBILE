import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingBillsRoutingModule } from './pending-bills-routing.module';
import { PendingBillsComponent } from './pending-bills.component';


@NgModule({
  declarations: [PendingBillsComponent],
  imports: [
    CommonModule,
    PendingBillsRoutingModule
  ]
})
export class PendingBillsModule { }
