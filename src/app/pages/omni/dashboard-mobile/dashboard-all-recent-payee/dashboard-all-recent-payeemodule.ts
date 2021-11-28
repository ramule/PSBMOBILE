import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardAllRecentPayeeComponent } from './dashboard-all-recent-payee.component';
import { DashboardAllRecentPayeeRoutingModule } from './dashboard-all-recent-payee-routing.module';

@NgModule({
  declarations: [DashboardAllRecentPayeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardAllRecentPayeeRoutingModule
  ]
})
export class DashboardAllRecentPayeeModule { }
