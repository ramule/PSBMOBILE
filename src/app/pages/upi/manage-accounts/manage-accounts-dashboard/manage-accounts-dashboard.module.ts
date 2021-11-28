import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountsDashboardComponent } from './manage-accounts-dashboard.component';
import { ManageAccountsDashboardRoutingModule } from './manage-accounts-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModules } from 'src/app/pages/common-ui/common.module';


@NgModule({
  declarations: [ManageAccountsDashboardComponent],
  imports: [
    CommonModule,
    ManageAccountsDashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModules,
    CarouselModule
  ]
})
export class ManageAccountsDashboardModule { }
