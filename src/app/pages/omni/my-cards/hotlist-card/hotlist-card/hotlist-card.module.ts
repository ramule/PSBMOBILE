import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlistCardRoutingModule } from './hotlist-card-routing.module';
import { HotlistCardComponent } from './hotlist-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HotlistCardComponent],
  imports: [
    CommonModule,
    HotlistCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HotlistCardModule { }
