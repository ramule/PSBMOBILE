import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenRdAccountOverviewRoutingModule } from './open-rd-account-overview-routing.module';
import { OpenRdAccountOverviewComponent } from './open-rd-account-overview.component';


@NgModule({
  declarations: [OpenRdAccountOverviewComponent],
  imports: [
    CommonModule,
    OpenRdAccountOverviewRoutingModule
  ]
})
export class OpenRdAccountOverviewModule { }
