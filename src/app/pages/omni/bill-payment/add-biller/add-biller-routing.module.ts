import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddBillerComponent} from './add-biller.component'


const routes: Routes = [{path: '', component: AddBillerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBillerRoutingModule { }
