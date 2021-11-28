import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmjjbyDetailsRoutingModule } from './pmjjby-details-routing.module';
import { PmjjbyDetailsComponent } from './pmjjby-details.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [PmjjbyDetailsComponent],
  imports: [
    CommonModule,
    PmjjbyDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class PmjjbyDetailsModule { }
