import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TdsCertificateRoutingModule } from './tds-certificate-routing.module';
import { TdsCertificateComponent } from './tds-certificate.component';

import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TdsCertificateComponent],
  imports: [
    CommonModule,
    TdsCertificateRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class TdsCertificateModule { }
