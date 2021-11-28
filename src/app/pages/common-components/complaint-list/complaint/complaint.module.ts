import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ComplaintComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComplaintRoutingModule
  ]
})
export class ComplaintModule { }
