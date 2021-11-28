import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyOverviewRoutingModule } from './pmsby-overview-routing.module';
import { PmsbyOverviewComponent } from './pmsby-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PmsbyOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    PmsbyOverviewRoutingModule
  ]
})
export class PmsbyOverviewModule { }
