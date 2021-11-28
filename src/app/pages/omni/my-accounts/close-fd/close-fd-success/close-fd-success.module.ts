import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseFDSuccessRoutingModule } from './close-fd-success-routing.module';
import { CloseFDSuccessComponent } from '../close-fd-success/close-fd-success.component';


@NgModule({
  declarations: [CloseFDSuccessComponent],
  imports: [
    CommonModule,
    CloseFDSuccessRoutingModule
  ]
})
export class CloseFDSuccessModule { }
