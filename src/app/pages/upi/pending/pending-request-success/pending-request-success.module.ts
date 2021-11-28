import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestSuccessRoutingModule } from './pending-request-success-routing.module';
import { PendingRequestSuccessComponent } from './pending-request-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingRequestSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    PendingRequestSuccessRoutingModule
  ]
})
export class PendingRequestSuccessModule { }
