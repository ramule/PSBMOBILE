import { SharedModule } from './../../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintDurationSuccessRoutingModule } from './raise-complaint-duration-success-routing.module';
import { RaiseComplaintDurationSuccessComponent } from './raise-complaint-duration-success.component';


@NgModule({
  declarations: [RaiseComplaintDurationSuccessComponent],
  imports: [
    CommonModule,
    RaiseComplaintDurationSuccessRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class RaiseComplaintDurationSuccessModule { }

