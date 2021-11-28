import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestViewDetailsRoutingModule } from './pending-request-view-details-routing.module';
import { PendingRequestViewDetailsComponent } from './pending-request-view-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestViewDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PendingRequestViewDetailsRoutingModule
  ]
})
export class PendingRequestViewDetailsModule { }
