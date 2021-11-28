import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityRoutingModule } from './electricity-routing.module';
import { ElectricityComponent } from './electricity.component';


@NgModule({
  declarations: [ElectricityComponent],
  imports: [
    CommonModule,
    ElectricityRoutingModule
  ]
})
export class ElectricityModule { }
