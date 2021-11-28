import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestRejectedRoutingModule } from './pending-request-rejected-routing.module';
import { PendingRequestRejectedComponent } from './pending-request-rejected.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestRejectedComponent],
  imports: [
    CommonModule,
    SharedModule,
    PendingRequestRejectedRoutingModule
  ]
})
export class PendingRequestRejectedModule { }
