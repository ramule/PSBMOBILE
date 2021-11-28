import { RemoveAccountSuccessComponent } from './remove-account-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: RemoveAccountSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoveAccountSuccessRoutingModule { }
