import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectSearchContactListRoutingModule } from './collect-search-contact-list-routing.module';
import { CollectSearchContactListComponent } from './collect-search-contact-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectSearchContactListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollectSearchContactListRoutingModule
  ]
})
export class CollectSearchContactListModule { }
