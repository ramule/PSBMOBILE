import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpiMandatePendingViewDetailsComponent } from './upi-mandate-pending-view-details.component';

const routes: Routes = [
  {path: '', component: UpiMandatePendingViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiMandatePendingViewDetailsRoutingModule { }
