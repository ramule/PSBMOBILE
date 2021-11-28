import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseFdRoutingModule } from './close-fd-routing.module';
import { CloseFdComponent } from './close-fd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CloseFdComponent],
  imports: [
    CommonModule,
    CloseFdRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CloseFdModule { }
