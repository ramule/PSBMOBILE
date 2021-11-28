import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkAccountSuccessComponent } from './link-account-success.component';

const routes: Routes = [
  {path :'' , component : LinkAccountSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkAccountSuccessRoutingModule { }
