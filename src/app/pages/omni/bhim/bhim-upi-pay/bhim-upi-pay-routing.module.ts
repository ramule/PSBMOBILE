import { BhimUpiPayComponent } from './bhim-upi-pay.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : BhimUpiPayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BhimUpiPayRoutingModule { }
