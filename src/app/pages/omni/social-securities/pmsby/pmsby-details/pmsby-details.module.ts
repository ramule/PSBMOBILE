import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyDetailsRoutingModule } from './pmsby-details-routing.module';
import { PmsbyDetailsComponent } from './pmsby-details.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [PmsbyDetailsComponent],
  imports: [
    CommonModule,
    PmsbyDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class PmsbyDetailsModule { }
