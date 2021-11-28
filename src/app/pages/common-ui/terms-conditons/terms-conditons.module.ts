import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditonsRoutingModule } from './terms-conditons-routing.module';
import { TermsConditonsComponent } from './terms-conditons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TermsConditonsComponent
  ],
  imports: [
    CommonModule,
    TermsConditonsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TermsConditonsComponent]
})
export class TermsConditonsModule { }
