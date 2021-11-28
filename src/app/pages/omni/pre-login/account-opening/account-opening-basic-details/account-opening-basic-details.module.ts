import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { AccountOpeningBasicDetailsRoutingModule } from './account-opening-basic-details-routing.module';
import { AccountOpeningBasicDetailsComponent } from './account-opening-basic-details.component';


@NgModule({
  declarations: [AccountOpeningBasicDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AccountOpeningBasicDetailsRoutingModule
  ]
})
export class AccountOpeningBasicDetailsModule { }
