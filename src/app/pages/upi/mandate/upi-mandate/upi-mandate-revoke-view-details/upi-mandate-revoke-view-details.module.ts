import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpiMandateRevokeViewDetailsRoutingModule } from './upi-mandate-revoke-view-details-routing.module';
import { UpiMandateRevokeViewDetailsComponent } from './upi-mandate-revoke-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpiMandateRevokeViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UpiMandateRevokeViewDetailsRoutingModule
  ]
})
export class UpiMandateRevokeViewDetailsModule { }
