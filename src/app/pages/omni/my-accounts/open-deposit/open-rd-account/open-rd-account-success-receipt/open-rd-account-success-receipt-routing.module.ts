import { OpenRdAccountSuccessReceiptComponent } from './open-rd-account-success-receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : OpenRdAccountSuccessReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenRdAccountSuccessReceiptRoutingModule { }
