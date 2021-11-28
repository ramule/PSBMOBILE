import { UpiMandateRevokeViewDetailsComponent } from './upi-mandate-revoke-view-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: UpiMandateRevokeViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiMandateRevokeViewDetailsRoutingModule { }
