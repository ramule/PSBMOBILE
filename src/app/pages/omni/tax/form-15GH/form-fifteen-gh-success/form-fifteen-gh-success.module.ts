import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFifteenGhSuccessRoutingModule } from './form-fifteen-gh-success-routing.module';
import { FormFifteenGhSuccessComponent } from './form-fifteen-gh-success.component';


@NgModule({
  declarations: [FormFifteenGhSuccessComponent],
  imports: [
    CommonModule,
    FormFifteenGhSuccessRoutingModule
  ]
})
export class FormFifteenGhSuccessModule { }
