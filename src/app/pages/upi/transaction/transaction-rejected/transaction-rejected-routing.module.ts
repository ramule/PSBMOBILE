import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionRejectedComponent } from './transaction-rejected.component';

const routes: Routes = [
  {path: '', component: TransactionRejectedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRejectedRoutingModule { }
