import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingBillMoreDetailsRoutingModule } from './pending-bill-more-details-routing.module';
import { PendingBillMoreDetailsComponent } from './pending-bill-more-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PendingBillMoreDetailsComponent],
  imports: [
    CommonModule,
    PendingBillMoreDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PendingBillMoreDetailsModule { }
