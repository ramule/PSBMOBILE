import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteUpiIdSuccessComponent } from './delete-upi-id-success.component';

const routes: Routes = [{path:'', component:DeleteUpiIdSuccessComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteUpiIdSuccessRoutingModule { }
