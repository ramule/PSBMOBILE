import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNomineeDetailsRoutingModule } from './add-nominee-details-routing.module';
import { AddNomineeDetailsComponent } from './add-nominee-details.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';

@NgModule({
  declarations: [AddNomineeDetailsComponent],
  imports: [
    CommonModule,
    AddNomineeDetailsRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class AddNomineeDetailsModule { }
