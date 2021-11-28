import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingBillerDeleteSuccessRoutingModule } from './existing-biller-delete-success-routing.module';
import { ExistingBillerDeleteSuccessComponent } from './existing-biller-delete-success.component';


@NgModule({
  declarations: [ExistingBillerDeleteSuccessComponent],
  imports: [
    CommonModule,
    ExistingBillerDeleteSuccessRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExistingBillerDeleteSuccessModule { }
