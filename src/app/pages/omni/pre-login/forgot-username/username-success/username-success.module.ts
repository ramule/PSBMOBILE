import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsernameSuccessRoutingModule } from './username-success-routing.module';
import { UsernameSuccessComponent } from './username-success.component';


@NgModule({
  declarations: [UsernameSuccessComponent],
  imports: [
    CommonModule,
    UsernameSuccessRoutingModule
  ]
})
export class UsernameSuccessModule { }
