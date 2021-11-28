import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpiMandateActiveViewDetailsRoutingModule } from './upi-mandate-active-view-details-routing.module';
import { UpiMandateActiveViewDetailsComponent } from './upi-mandate-active-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpiMandateActiveViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UpiMandateActiveViewDetailsRoutingModule
  ]
})
export class UpiMandateActiveViewDetailsModule { }
