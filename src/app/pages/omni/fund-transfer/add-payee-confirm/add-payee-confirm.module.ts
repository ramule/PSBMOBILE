import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPayeeConfirmComponent } from './add-payee-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AddPayeeConfirmRoutingModule} from './add-payee-confirm-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [AddPayeeConfirmComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddPayeeConfirmRoutingModule,
    SharedModule
  ]
})
export class AddPayeeModule { }
