import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpiDashboardRoutingModule } from './upi-dashboard-routing.module';
import { UpiDashboardComponent } from './upi-dashboard.component';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [UpiDashboardComponent],
  imports: [
    CommonModule,
    UpiDashboardRoutingModule,
    SharedModule,
    CommonModules,
    CarouselModule
  ]
})
export class UpiDashboardModule { }
