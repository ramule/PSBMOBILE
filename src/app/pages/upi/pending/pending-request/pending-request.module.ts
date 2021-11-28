import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestRoutingModule } from './pending-request-routing.module';
import { PendingRequestComponent } from './pending-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PendingRequestRoutingModule
  ]
})
export class PendingRequestModule { }
