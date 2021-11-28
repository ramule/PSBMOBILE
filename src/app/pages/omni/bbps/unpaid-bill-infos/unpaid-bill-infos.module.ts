import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnpaidBillInfosRoutingModule } from './unpaid-bill-infos-routing.module';
import { UnpaidBillInfosComponent } from './unpaid-bill-infos.component';


@NgModule({
  declarations: [
    UnpaidBillInfosComponent
  ],
  imports: [
    CommonModule,
    UnpaidBillInfosRoutingModule
  ]
})
export class UnpaidBillInfosModule { }
