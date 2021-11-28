import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpiMandateComponent } from './upi-mandate.component';

const routes: Routes = [
  {path: '', component: UpiMandateComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiMandateRoutingModule { }
