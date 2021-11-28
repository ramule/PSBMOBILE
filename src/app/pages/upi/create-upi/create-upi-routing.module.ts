

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUPIComponent } from './create-upi.component'

const routes: Routes = [
   {path: '', component: CreateUPIComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpiRoutingModule { }
