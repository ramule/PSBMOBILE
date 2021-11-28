import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobBillerDropdownComponent } from './mob-biller-dropdown.component';

const routes: Routes = [
  { path : '', component : MobBillerDropdownComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobBillerDropdownRoutingModule { }
