import { PayIfscSearchComponent } from './pay-ifsc-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: PayIfscSearchComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayIfscSearchRoutingModule { }
