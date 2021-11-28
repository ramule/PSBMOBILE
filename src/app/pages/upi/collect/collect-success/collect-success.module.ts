import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectSuccessRoutingModule } from './collect-success-routing.module';
import { CollectSuccessComponent } from './collect-success.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectSuccessRoutingModule
  ]
})
export class CollectSuccessModule { }
