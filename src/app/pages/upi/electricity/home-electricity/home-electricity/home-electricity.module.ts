import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeElectricityRoutingModule } from './home-electricity-routing.module';
import { HomeElectricityComponent } from './home-electricity.component';


@NgModule({
  declarations: [HomeElectricityComponent],
  imports: [
    CommonModule,
    HomeElectricityRoutingModule
  ]
})
export class HomeElectricityModule { }
