import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPayeeComponent } from './add-payee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AddPayeeRoutingModule} from './add-payee-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [AddPayeeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddPayeeRoutingModule,
    SharedModule
  ]
})
export class AddPayeeModule { }
