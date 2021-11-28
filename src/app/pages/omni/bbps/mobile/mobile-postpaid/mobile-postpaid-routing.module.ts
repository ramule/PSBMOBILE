import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobilePostpaidComponent } from './mobile-postpaid.component';

const routes: Routes = [
  { path : '', component : MobilePostpaidComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilePostpaidRoutingModule { }
