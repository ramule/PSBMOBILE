import { PmsbyReceiptComponent } from './pmsby-receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : PmsbyReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsbyReceiptRoutingModule { }
