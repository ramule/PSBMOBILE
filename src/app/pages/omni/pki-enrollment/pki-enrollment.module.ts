import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PkiEnrollmentRoutingModule } from './pki-enrollment-routing.module';
import { PkiEnrollmentComponent } from './pki-enrollment.component';


@NgModule({
  declarations: [PkiEnrollmentComponent],
  imports: [
    CommonModule,
    PkiEnrollmentRoutingModule
  ]
})
export class PkiEnrollmentModule { }
