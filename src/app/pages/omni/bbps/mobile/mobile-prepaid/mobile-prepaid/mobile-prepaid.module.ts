import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilePrepaidRoutingModule } from './mobile-prepaid-routing.module';
import { MobilePrepaidComponent } from './mobile-prepaid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MobilePrepaidComponent
  ],
  imports: [
    CommonModule,
    MobilePrepaidRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MobilePrepaidModule { }
