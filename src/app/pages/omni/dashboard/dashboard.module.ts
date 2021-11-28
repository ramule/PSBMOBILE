import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../shared/shared.module';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    CarouselModule,
    SharedModule,
    NgApexchartsModule
  ],
  exports:[
    DashboardPageComponent
  ]
})
export class DashboardModule { }
