import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectUpiIdListRoutingModule } from './collect-upi-id-list-routing.module';
import { CollectUpiIdListComponent } from './collect-upi-id-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CollectUpiIdListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectUpiIdListRoutingModule
  ]
})
export class CollectUpiIdListModule { }
