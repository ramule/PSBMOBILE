import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDetailsRoutingModule } from './card-details-routing.module';
import { CardDetailsComponent } from './card-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CardDetailsComponent],
  imports: [
    CommonModule,
    CardDetailsRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CardDetailsModule { }
