import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingGetBillComponent } from './existing-get-bill.component';

const routes: Routes = [
  {path : '' , component: ExistingGetBillComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingGetBillRoutingModule { }
