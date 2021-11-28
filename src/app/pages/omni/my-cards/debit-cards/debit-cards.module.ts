import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebitCardsRoutingModule } from './debit-cards-routing.module';
import { DebitCardsComponent } from './debit-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [DebitCardsComponent],
  imports: [
    CommonModule,
    DebitCardsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CarouselModule
  ]
})
export class DebitCardsModule { }
