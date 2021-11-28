import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstantPayComponent } from './instant-pay.component';

const routes: Routes = [
  {path : '', component : InstantPayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstantPayRoutingModule { }
