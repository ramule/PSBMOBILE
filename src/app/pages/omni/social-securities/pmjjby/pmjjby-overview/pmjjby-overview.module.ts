import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PmjjbyOverviewRoutingModule } from './pmjjby-overview-routing.module';
import { PmjjbyOverviewComponent } from './pmjjby-overview.component';


@NgModule({
  declarations: [PmjjbyOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    PmjjbyOverviewRoutingModule
  ]
})
export class PmjjbyOverviewModule { }
