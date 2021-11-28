import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectScanQrRoutingModule } from './collect-scan-qr-routing.module';
import { CollectScanQrComponent } from './collect-scan-qr.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectScanQrComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectScanQrRoutingModule
  ]
})
export class CollectScanQrModule { }
