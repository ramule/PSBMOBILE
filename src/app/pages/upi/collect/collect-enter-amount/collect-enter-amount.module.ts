import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectEnterAmountRoutingModule } from './collect-enter-amount-routing.module';
import { CollectEnterAmountComponent } from './collect-enter-amount.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CollectEnterAmountComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectEnterAmountRoutingModule
  ]
})
export class CollectEnterAmountModule { }
