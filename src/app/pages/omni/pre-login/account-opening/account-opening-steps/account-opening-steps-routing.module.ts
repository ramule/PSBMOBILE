import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountOpeningStepsComponent } from './account-opening-steps.component';

const routes: Routes = [{path:'',component:AccountOpeningStepsComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningStepsRoutingModule { }
