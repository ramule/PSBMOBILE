import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMandateConfirmationComponent } from './create-mandate-confirmation.component';

const routes: Routes = [
  {path: '', component: CreateMandateConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMandateConfirmationRoutingModule { }
