import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayeeAddSuccessComponent } from './payee-add-success.component';
import { payeeAddSuccessRoutingModule } from './payee-add-success.routing.module'
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [PayeeAddSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    payeeAddSuccessRoutingModule
  ]
})
export class PayeeAddSuccessModule { }
