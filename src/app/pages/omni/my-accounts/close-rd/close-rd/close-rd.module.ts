import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseRdRoutingModule } from './close-rd-routing.module';
import { CloseRdComponent } from './close-rd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CloseRdComponent],
  imports: [
    CommonModule,
    CloseRdRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CloseRdModule { }
