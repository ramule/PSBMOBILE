import { PendingRequestConfirmationComponent } from './pending-request-confirmation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: PendingRequestConfirmationComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestConfirmationRoutingModule { }
