import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApyOverviewRoutingModule } from './apy-overview-routing.module';
import { ApyOverviewComponent } from './apy-overview.component';


@NgModule({
  declarations: [ApyOverviewComponent],
  imports: [
    CommonModule,
    ApyOverviewRoutingModule,
    SharedModule
  ]
})
export class ApyOverviewModule { }
