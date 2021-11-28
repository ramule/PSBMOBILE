import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BillDetailsComponent} from './bill-details.component'
import { BillDetailsRoutingModule } from './bill-details-routing.module';


@NgModule({
  declarations: [BillDetailsComponent],
  imports: [
    CommonModule,
    BillDetailsRoutingModule
  ]
})
export class BillDetailsModule { }
