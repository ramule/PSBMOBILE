import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { ChangeEmailComponent } from './change-email.component';


@NgModule({
  declarations: [ChangeEmailComponent],
  imports: [
    CommonModule,
    ChangeEmailRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChangeEmailModule { }
