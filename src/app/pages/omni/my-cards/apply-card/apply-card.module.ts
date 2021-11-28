import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyCardRoutingModule } from './apply-card-routing.module';
import { ApplyCardComponent } from './apply-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ApplyCardComponent],
  imports: [
    CommonModule,
    ApplyCardRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ApplyCardModule { }
