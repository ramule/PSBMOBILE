import { MyAccountComponent } from './my-accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: '', component: MyAccountComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myAccountRoutingModule { } 
