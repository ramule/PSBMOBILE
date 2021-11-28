import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingRequestSuccessComponent } from './pending-request-success.component';

const routes: Routes = [
  {path: '', component: PendingRequestSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestSuccessRoutingModule { }
