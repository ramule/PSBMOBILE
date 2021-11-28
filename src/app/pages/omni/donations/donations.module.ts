import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './donations.component';


@NgModule({
  declarations: [DonationsComponent],
  imports: [
    CommonModule,
    DonationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DonationsModule { }
