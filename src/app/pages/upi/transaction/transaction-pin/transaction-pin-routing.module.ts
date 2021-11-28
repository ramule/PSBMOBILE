import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPinComponent } from './transaction-pin.component';

const routes: Routes = [
  {path: '', component: TransactionPinComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionPinRoutingModule { }
