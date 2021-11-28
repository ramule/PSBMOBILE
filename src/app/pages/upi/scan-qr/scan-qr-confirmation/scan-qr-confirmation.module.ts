import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrConfirmationRoutingModule } from './scan-qr-confirmation-routing.module';
import { ScanQrConfirmationComponent } from './scan-qr-confirmation.component';
import { SharedModule } from '../../../../../app/shared/shared.module';


@NgModule({
  declarations: [ScanQrConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScanQrConfirmationRoutingModule
  ]
})
export class ScanQrConfirmationModule { }
