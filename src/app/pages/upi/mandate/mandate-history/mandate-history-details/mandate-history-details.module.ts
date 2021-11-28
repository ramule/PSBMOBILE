import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandateHistoryDetailsRoutingModule } from './mandate-history-details-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { MandateHistoryDetailsComponent } from './mandate-history-details.component';


@NgModule({
  declarations: [MandateHistoryDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MandateHistoryDetailsRoutingModule
  ]
})
export class MandateHistoryDetailsModule { }
