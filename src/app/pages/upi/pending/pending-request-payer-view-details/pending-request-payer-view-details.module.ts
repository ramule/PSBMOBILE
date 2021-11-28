import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestPayerViewDetailsRoutingModule } from './pending-request-payer-view-details-routing.module';
import { PendingRequestPayerViewDetailsComponent } from './pending-request-payer-view-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestPayerViewDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PendingRequestPayerViewDetailsRoutingModule
  ]
})
export class PendingRequestPayerViewDetailsModule { }
