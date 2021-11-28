import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionSuccessComponent } from './transaction-success.component';

const routes: Routes = [
  {path: '', component: TransactionSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionSuccessRoutingModule { }
