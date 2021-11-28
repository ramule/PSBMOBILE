import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentTransactionComponent } from './recent-transaction.component';

const routes: Routes = [
  {path: '', component: RecentTransactionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentTransactionRoutingModule { }
