
import { PayeeAddSuccessComponent } from './payee-add-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PayeeAddSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class payeeAddSuccessRoutingModule { }
