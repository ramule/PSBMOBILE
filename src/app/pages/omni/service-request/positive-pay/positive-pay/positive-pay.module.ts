import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositivePayRoutingModule } from './positive-pay-routing.module';
import { PositivePayComponent } from './positive-pay.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


@NgModule({
  declarations: [PositivePayComponent],
  imports: [
    CommonModule,
    PositivePayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ],
//   providers: [
//     {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB'}
// ]
})
export class PositivePayModule { }
