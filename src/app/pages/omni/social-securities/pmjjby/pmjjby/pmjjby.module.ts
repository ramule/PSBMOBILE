import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmjjbyRoutingModule } from './pmjjby-routing.module';
import { PmjjbyComponent } from './pmjjby.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [PmjjbyComponent],
  imports: [
    CommonModule,
    PmjjbyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    CarouselModule,
  ]
})
export class PmjjbyModule { }
