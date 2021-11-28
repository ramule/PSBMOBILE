import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingBillsDetailsRoutingModule } from './pending-bills-details-routing.module';
import { PendingBillsDetailsComponent } from './pending-bills-details.component';


@NgModule({
  declarations: [PendingBillsDetailsComponent],
  imports: [
    CommonModule,
    PendingBillsDetailsRoutingModule
  ]
})
export class PendingBillsDetailsModule { }
