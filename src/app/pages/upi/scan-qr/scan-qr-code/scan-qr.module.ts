import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrRoutingModule } from './scan-qr-routing.module';
import { ScanQrComponent } from './scan-qr.component';
import { CommonModules } from '../../../common-ui/common.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ScanQrComponent],
  imports: [
    CommonModule,
    ScanQrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class ScanQrModule { }
