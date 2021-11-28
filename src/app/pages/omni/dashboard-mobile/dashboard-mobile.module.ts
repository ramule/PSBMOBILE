import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMobileComponent } from './dashboard-mobile.component';
import { DashboardMobileRoutingModule } from './dashboard-mobile-routing.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';


@NgModule({
  declarations: [DashboardMobileComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardMobileRoutingModule,
    CarouselModule,
    SharedModule,
    CommonModules
  ],
  exports:[
    DashboardMobileComponent
  ]
})
export class DashboardMobileModule { }
