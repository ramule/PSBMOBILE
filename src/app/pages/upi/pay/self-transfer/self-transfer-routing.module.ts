import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfTransferComponent } from './self-transfer.component';

const routes: Routes = [
  {path: '', component: SelfTransferComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfTransferRoutingModule { }
