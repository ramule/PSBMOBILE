import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilePostpaidRoutingModule } from './mobile-postpaid-routing.module';
import { MobilePostpaidComponent } from './mobile-postpaid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MobilePostpaidComponent
  ],
  imports: [
    CommonModule,
    MobilePostpaidRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MobilePostpaidModule { }
