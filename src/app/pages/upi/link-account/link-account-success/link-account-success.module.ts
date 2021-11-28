import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkAccountSuccessRoutingModule } from './link-account-success-routing.module';
import { LinkAccountSuccessComponent } from './link-account-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LinkAccountSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    LinkAccountSuccessRoutingModule
  ]
})
export class LinkAccountSuccessModule { }
