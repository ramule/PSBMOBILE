import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditonsComponent } from './terms-conditons.component';

const routes: Routes = [
  { path : '', component : TermsConditonsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditonsRoutingModule { }
