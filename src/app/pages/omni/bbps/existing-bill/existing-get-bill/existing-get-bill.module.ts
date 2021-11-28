import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingGetBillRoutingModule } from './existing-get-bill-routing.module';
import { ExistingGetBillComponent } from './existing-get-bill.component';


@NgModule({
  declarations: [ExistingGetBillComponent],
  imports: [
    CommonModule,
    ExistingGetBillRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExistingGetBillModule { }
