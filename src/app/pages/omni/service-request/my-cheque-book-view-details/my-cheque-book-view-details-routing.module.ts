import { MyChequeBookViewDetailsComponent } from './my-cheque-book-view-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MyChequeBookViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyChequeBookViewDetailsRoutingModule { }
