import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomineeDetailsRoutingModule } from './nominee-details-routing.module';
import { NomineeDetailsComponent } from './nominee-details.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


@NgModule({
  declarations: [NomineeDetailsComponent],
  imports: [
    CommonModule,
    NomineeDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ]
})
export class NomineeDetailsModule { }
