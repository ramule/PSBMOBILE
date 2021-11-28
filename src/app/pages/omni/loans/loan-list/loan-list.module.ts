import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanListRoutingModule } from './loan-list-routing.module';
import { LoanListComponent } from './loan-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [LoanListComponent],
  imports: [
    CommonModule,
    LoanListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CarouselModule
  ]
})
export class LoanListModule { }
