import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelinkAccountRoutingModule } from './delink-account-routing.module';
import { DelinkAccountComponent } from './delink-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [DelinkAccountComponent],
  imports: [
    CommonModule,
    DelinkAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DelinkAccountModule { }
