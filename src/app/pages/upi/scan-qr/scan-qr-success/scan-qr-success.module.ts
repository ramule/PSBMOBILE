import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrSuccessRoutingModule } from './scan-qr-success-routing.module';
import { ScanQrSuccessComponent } from './scan-qr-success.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [ScanQrSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScanQrSuccessRoutingModule
  ]
})
export class ScanQrSuccessModule { }
