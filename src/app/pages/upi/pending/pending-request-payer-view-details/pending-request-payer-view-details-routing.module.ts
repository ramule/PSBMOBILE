import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingRequestPayerViewDetailsComponent } from './pending-request-payer-view-details.component';

const routes: Routes = [
  {path: '', component: PendingRequestPayerViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestPayerViewDetailsRoutingModule { }
