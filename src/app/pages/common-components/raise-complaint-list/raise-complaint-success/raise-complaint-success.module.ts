import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintSuccessRoutingModule } from './raise-complaint-success-routing.module';
import { RaiseComplaintSuccessComponent } from './raise-complaint-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RaiseComplaintSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    RaiseComplaintSuccessRoutingModule
  ]
})
export class RaiseComplaintSuccessModule { }
