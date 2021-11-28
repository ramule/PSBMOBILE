import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoveAccountSuccessRoutingModule } from './remove-account-success-routing.module';
import { RemoveAccountSuccessComponent } from './remove-account-success.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [RemoveAccountSuccessComponent],
  imports: [
    CommonModule,
    RemoveAccountSuccessRoutingModule,
    SharedModule
  ]
})
export class RemoveAccountSuccessModule { }
