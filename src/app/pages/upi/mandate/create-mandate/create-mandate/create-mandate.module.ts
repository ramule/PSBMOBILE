import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMandateRoutingModule } from './create-mandate-routing.module';
import { CreateMandateComponent } from './create-mandate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CreateMandateRoutingModule
  ]
})
export class CreateMandateModule { }
