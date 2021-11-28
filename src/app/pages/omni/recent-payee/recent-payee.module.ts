import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentPayeeRoutingModule } from './recent-payee-routing.module';
import { RecentPayeeComponent } from './recent-payee.component';


@NgModule({
  declarations: [RecentPayeeComponent],
  imports: [
    CommonModule,
    RecentPayeeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RecentPayeeComponent]
})
export class RecentPayeeModule { }
