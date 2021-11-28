import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApyDetailsRoutingModule } from './apy-details-routing.module';
import { ApyDetailsComponent } from './apy-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [ApyDetailsComponent],
  imports: [
    CommonModule,
    ApyDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class ApyDetailsModule { }
