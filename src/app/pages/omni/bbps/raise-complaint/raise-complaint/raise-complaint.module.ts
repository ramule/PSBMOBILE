import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintRoutingModule } from './raise-complaint-routing.module';
import { RaiseComplaintComponent } from './raise-complaint.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


@NgModule({
  declarations: [RaiseComplaintComponent],
  imports: [
    CommonModule,
    RaiseComplaintRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class RaiseComplaintModule { }
