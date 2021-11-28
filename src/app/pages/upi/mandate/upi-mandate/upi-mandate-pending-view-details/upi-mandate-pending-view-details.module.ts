import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpiMandatePendingViewDetailsRoutingModule } from './upi-mandate-pending-view-details-routing.module';
import { UpiMandatePendingViewDetailsComponent } from './upi-mandate-pending-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpiMandatePendingViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UpiMandatePendingViewDetailsRoutingModule
  ]
})
export class UpiMandatePendingViewDetailsModule { }
