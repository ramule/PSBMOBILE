
import { ChequeBookRequestComponent } from './cheque-book-request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: ChequeBookRequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeBookRequestRoutingModule { }
