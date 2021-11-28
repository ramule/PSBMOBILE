import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayEmiRoutingModule } from './pay-emi-routing.module';
import { PayEmiComponent } from './pay-emi.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PayEmiComponent],
  imports: [
    CommonModule,
    PayEmiRoutingModule,
    FormsModule,
    CarouselModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PayEmiModule { }
