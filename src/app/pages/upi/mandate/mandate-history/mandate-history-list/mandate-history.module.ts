import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandateHistoryRoutingModule } from './mandate-history-routing.module';
import { MandateHistoryComponent } from './mandate-history.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [MandateHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    MandateHistoryRoutingModule
  ]
})
export class MandateHistoryModule { }
