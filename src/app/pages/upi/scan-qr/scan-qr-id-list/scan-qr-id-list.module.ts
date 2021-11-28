import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrIdListRoutingModule } from './scan-qr-id-list-routing.module';
import { ScanQrIdListComponent } from './scan-qr-id-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ScanQrIdListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScanQrIdListRoutingModule
  ]
})
export class ScanQrIdListModule { }
