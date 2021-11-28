import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyRoutingModule } from './pmsby-routing.module';
import { PmsbyComponent } from './pmsby.component';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PmsbyComponent],
  imports: [
    CommonModule,
    PmsbyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CarouselModule,
  ]
})
export class PmsbyModule { }
