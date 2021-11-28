import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpiMandateCompletedDetailsRoutingModule } from './upi-mandate-completed-details-routing.module';
import { UpiMandateCompletedDetailsComponent } from './upi-mandate-completed-details.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [UpiMandateCompletedDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    UpiMandateCompletedDetailsRoutingModule
  ]
})
export class UpiMandateCompletedDetailsModule { }
