import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectRecentRequestRoutingModule } from './collect-recent-request-routing.module';
import { CollectRecentRequestComponent } from './collect-recent-request.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectRecentRequestComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectRecentRequestRoutingModule
  ]
})
export class CollectRecentRequestModule { }
