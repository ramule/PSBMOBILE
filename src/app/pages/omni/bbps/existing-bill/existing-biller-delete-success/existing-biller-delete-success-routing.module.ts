import { ExistingBillerDeleteSuccessComponent } from './existing-biller-delete-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : ExistingBillerDeleteSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingBillerDeleteSuccessRoutingModule { }
