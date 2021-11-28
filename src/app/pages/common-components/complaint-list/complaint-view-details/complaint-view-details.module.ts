import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintViewDetailsRoutingModule } from './complaint-view-details-routing.module';
import { ComplaintViewDetailsComponent } from './complaint-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ComplaintViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComplaintViewDetailsRoutingModule
  ]
})
export class ComplaintViewDetailsModule { }
