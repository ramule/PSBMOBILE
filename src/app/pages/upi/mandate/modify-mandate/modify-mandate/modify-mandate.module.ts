import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyMandateRoutingModule } from './modify-mandate-routing.module';
import { ModifyMandateComponent } from './modify-mandate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModifyMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModifyMandateRoutingModule
  ]
})
export class ModifyMandateModule { }
