import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpiSuccessComponent } from './create-upi-success.component';

const routes: Routes = [
  {path :'' , component : CreateUpiSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpiSuccessRoutingModule { }
