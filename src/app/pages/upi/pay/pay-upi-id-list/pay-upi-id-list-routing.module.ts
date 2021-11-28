import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayUpiIdListComponent } from './pay-upi-id-list.component';

const routes: Routes = [
  {path: '', component: PayUpiIdListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayUpiIdListRoutingModule { }
