import { OpenDepositAccountSuccessReceiptComponent } from './open-deposit-account-success-receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : OpenDepositAccountSuccessReceiptComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenDepositAccountSuccessReceiptRoutingModule { }
