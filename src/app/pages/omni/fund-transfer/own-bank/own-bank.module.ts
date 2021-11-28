import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnBankRoutingModule } from './own-bank-routing.module';
import { OwnBankComponent } from './own-bank.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OwnBankComponent],
  imports: [
    CommonModule,
    OwnBankRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OwnBankModule { }
