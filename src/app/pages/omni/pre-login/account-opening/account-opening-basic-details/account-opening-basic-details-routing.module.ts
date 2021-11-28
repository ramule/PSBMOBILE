import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountOpeningBasicDetailsComponent} from './account-opening-basic-details.component';



const routes: Routes = [{path:'',component:AccountOpeningBasicDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningBasicDetailsRoutingModule { }
