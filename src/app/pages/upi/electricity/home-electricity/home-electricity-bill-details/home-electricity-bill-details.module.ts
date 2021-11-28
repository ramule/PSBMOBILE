import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeElectricityBillDetailsRoutingModule } from './home-electricity-bill-details-routing.module';
import { HomeElectricityBillDetailsComponent } from './home-electricity-bill-details.component';


@NgModule({
  declarations: [HomeElectricityBillDetailsComponent],
  imports: [
    CommonModule,
    HomeElectricityBillDetailsRoutingModule
  ]
})
export class HomeElectricityBillDetailsModule { }
