import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountOpeningKycVerificationComponent} from './account-opening-kyc-verification.component'

const routes: Routes = [{path:'',component:AccountOpeningKycVerificationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningKycVerificationRoutingModule { }
