import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { ForgotUsernameRoutingModule } from './forgot-username-routing.module';
import { ForgotUsernameComponent } from './forgot-username.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [ForgotUsernameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ForgotUsernameRoutingModule,
    OwlDateTimeModule, OwlNativeDateTimeModule
  ]
})
export class ForgotUsernameModule { }
