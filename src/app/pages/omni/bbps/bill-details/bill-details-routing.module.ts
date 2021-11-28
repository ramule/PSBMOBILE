import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BillDetailsComponent} from './bill-details.component'


const routes: Routes = [
  { path :'', component: BillDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillDetailsRoutingModule { }
