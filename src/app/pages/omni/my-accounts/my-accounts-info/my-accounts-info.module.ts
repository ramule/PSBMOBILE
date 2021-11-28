import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountsInfoRoutingModule } from './my-accounts-info-routing.module';
import { MyAccountsInfoComponent } from './my-accounts-info.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [MyAccountsInfoComponent],
  imports: [
    CommonModule,
    MyAccountsInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MyAccountsInfoModule { }
