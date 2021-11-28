import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseRDSuccessRoutingModule } from './close-rd-success-routing.module';
import { CloseRDSuccessComponent } from '../close-rd-success/close-rd-success.component';


@NgModule({
  declarations: [CloseRDSuccessComponent],
  imports: [
    CommonModule,
    CloseRDSuccessRoutingModule
  ]
})
export class CloseRDSuccessModule { }
