import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyChequeBookViewDetailsRoutingModule } from './my-cheque-book-view-details-routing.module';
import { MyChequeBookViewDetailsComponent } from './my-cheque-book-view-details.component';


@NgModule({
  declarations: [MyChequeBookViewDetailsComponent],
  imports: [
    CommonModule,
    MyChequeBookViewDetailsRoutingModule
  ]
})
export class MyChequeBookViewDetailsModule { }
