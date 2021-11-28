import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkAccountRoutingModule } from './link-account-routing.module';
import { LinkAccountComponent } from './link-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [LinkAccountComponent],
  imports: [
    CommonModule,
    LinkAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LinkAccountModule { }
