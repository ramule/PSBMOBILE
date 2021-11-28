import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreezeAccountRoutingModule } from './freeze-account-routing.module';
import { FreezeAccountComponent } from './freeze-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [FreezeAccountComponent],
  imports: [
    CommonModule,
    FreezeAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FreezeAccountModule { }
