import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyMandateConfirmationComponent } from './modify-mandate-confirmation.component';

const routes: Routes = [
  {path: '', component: ModifyMandateConfirmationComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyMandateConfirmationRoutingModule { }
