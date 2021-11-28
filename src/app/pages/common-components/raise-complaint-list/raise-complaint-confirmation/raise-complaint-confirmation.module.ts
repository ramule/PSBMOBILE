import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintConfirmationRoutingModule } from './raise-complaint-confirmation-routing.module';
import { RaiseComplaintConfirmationComponent } from './raise-complaint-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RaiseComplaintConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RaiseComplaintConfirmationRoutingModule
  ]
})
export class RaiseComplaintConfirmationModule { }
