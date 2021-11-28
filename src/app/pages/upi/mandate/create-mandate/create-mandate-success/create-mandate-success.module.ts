import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMandateSuccessRoutingModule } from './create-mandate-success-routing.module';
import { CreateMandateSuccessComponent } from './create-mandate-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CreateMandateSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    CreateMandateSuccessRoutingModule
  ]
})
export class CreateMandateSuccessModule { }
