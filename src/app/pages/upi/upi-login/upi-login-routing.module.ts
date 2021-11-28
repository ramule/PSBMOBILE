import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpiLoginComponent } from './upi-login.component';

const routes: Routes = [
  {path: '', component: UpiLoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UpiLoginRoutingModule { }
