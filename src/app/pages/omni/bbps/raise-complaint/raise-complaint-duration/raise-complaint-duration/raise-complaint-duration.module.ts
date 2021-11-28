import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintDurationRoutingModule } from './raise-complaint-duration-routing.module';
import { RaiseComplaintDurationComponent } from './raise-complaint-duration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RaiseComplaintDurationComponent],
  imports: [
    CommonModule,
    RaiseComplaintDurationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class RaiseComplaintDurationModule { }
