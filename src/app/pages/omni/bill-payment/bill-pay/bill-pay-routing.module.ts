import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BillPayComponent} from './bill-pay.component';


const routes: Routes = [{path: '', component: BillPayComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillPayRoutingModule { }
