import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOpeningLandingRoutingModule } from './account-opening-landing-routing.module';
import { AccountOpeningLandingComponent } from './account-opening-landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AccountOpeningLandingComponent],
  imports: [
    CommonModule,
    AccountOpeningLandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AccountOpeningLandingModule { }
