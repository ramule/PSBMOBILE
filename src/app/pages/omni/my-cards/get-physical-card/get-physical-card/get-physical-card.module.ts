import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetPhysicalCardRoutingModule } from './get-physical-card-routing.module';
import { GetPhysicalCardComponent } from './get-physical-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GetPhysicalCardComponent],
  imports: [
    CommonModule,
    GetPhysicalCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GetPhysicalCardModule { }
