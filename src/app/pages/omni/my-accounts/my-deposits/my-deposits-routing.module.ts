import { MyDepositsComponent } from './my-deposits.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: '', component: MyDepositsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myDepositsRoutingModule { } 
