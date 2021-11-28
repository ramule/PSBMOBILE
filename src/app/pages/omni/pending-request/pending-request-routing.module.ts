import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingRequestComponent} from './pending-request.component'


const routes: Routes = [{path: '', component: PendingRequestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestRoutingModule { }
