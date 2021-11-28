import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenDepositRoutingModule } from './open-deposit-routing.module';
import { OpenDepositComponent } from './open-deposit.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


@NgModule({
  declarations: [OpenDepositComponent],
  imports: [
    CommonModule,
    OpenDepositRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class OpenDepositModule { }
