import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlistCardSuccessRoutingModule } from './hotlist-card-success-routing.module';
import { HotlistCardSuccessComponent } from './hotlist-card-success.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HotlistCardSuccessComponent],
  imports: [
    CommonModule,
    HotlistCardSuccessRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class HotlistCardSuccessModule { }
