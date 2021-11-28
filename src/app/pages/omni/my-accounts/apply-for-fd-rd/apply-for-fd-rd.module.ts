import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyForFdRdRoutingModule } from './apply-for-fd-rd-routing.module';
import { ApplyForFdRdComponent } from './apply-for-fd-rd.component';


@NgModule({
  declarations: [ApplyForFdRdComponent],
  imports: [
    CommonModule,
    ApplyForFdRdRoutingModule
  ]
})
export class ApplyForFdRdModule { }
