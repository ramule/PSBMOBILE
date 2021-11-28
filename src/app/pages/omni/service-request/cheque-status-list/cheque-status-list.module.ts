import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeStatusListRoutingModule } from './cheque-status-list-routing.module';
import { ChequeStatusListComponent } from './cheque-status-list.component';


@NgModule({
  declarations: [ChequeStatusListComponent],
  imports: [
    CommonModule,
    ChequeStatusListRoutingModule
  ]
})
export class ChequeStatusListModule { }
