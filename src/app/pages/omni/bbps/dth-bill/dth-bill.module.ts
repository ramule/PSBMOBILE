import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DthBillRoutingModule } from './dth-bill-routing.module';
import { DthBillComponent } from './dth-bill.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DthBillComponent
  ],
  imports: [
    CommonModule,
    DthBillRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DthBillModule { }
