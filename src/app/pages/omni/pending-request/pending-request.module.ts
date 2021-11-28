import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestRoutingModule } from './pending-request-routing.module';
import { PendingRequestComponent } from './pending-request.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PendingRequestComponent],
  imports: [
    CommonModule,
    PendingRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PendingRequestModule { }
