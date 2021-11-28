import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CollectSetValidityRoutingModule } from './collect-set-validity-routing.module';
import { CollectSetValidityComponent } from './collect-set-validity.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectSetValidityComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectSetValidityRoutingModule
  ],providers:[
    DatePipe
  ]
})
export class CollectSetValidityModule { }
