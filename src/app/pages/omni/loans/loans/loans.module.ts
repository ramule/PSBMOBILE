import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoansComponent],
  imports: [
    CommonModule,
    LoansRoutingModule,
    SharedModule
  ]
})
export class LoansModule { }
