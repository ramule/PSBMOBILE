import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpiMandateActiveViewDetailsComponent } from './upi-mandate-active-view-details.component';

const routes: Routes = [
  {path: '', component: UpiMandateActiveViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiMandateActiveViewDetailsRoutingModule { }
