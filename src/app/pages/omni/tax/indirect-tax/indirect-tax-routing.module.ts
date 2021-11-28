import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndirectTaxComponent } from './indirect-tax.component';

const routes: Routes = [
  {path : '', component : IndirectTaxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndirectTaxRoutingModule { }
