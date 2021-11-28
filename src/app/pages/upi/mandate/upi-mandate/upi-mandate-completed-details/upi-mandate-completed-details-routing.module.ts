import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpiMandateCompletedDetailsComponent } from './upi-mandate-completed-details.component';

const routes: Routes = [
  {path: '', component: UpiMandateCompletedDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiMandateCompletedDetailsRoutingModule { }
