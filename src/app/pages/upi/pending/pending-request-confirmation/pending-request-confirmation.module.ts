import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestConfirmationRoutingModule } from './pending-request-confirmation-routing.module';
import { PendingRequestConfirmationComponent } from './pending-request-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestConfirmationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PendingRequestConfirmationRoutingModule
  ]
})
export class PendingRequestConfirmationModule { }
