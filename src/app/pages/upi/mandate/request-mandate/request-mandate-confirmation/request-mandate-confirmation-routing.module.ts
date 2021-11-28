import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMandateConfirmationComponent } from './request-mandate-confirmation.component';

const routes: Routes = [
  {path: '', component: RequestMandateConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMandateConfirmationRoutingModule { }
