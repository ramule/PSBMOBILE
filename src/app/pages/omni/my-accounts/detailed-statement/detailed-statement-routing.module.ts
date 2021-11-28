import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailedStatementComponent} from './detailed-statement.component'



const routes: Routes = [{path: '', component: DetailedStatementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedStatementRoutingModule { }
