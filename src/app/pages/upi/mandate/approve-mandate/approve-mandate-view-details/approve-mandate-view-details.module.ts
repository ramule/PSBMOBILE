import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveMandateViewDetailsRoutingModule } from './approve-mandate-view-details-routing.module';
import { ApproveMandateViewDetailsComponent } from './approve-mandate-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ApproveMandateViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ApproveMandateViewDetailsRoutingModule
  ]
})
export class ApproveMandateViewDetailsModule { }
