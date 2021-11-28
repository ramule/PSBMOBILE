import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApySuccessComponent } from './apy-success.component';

const routes: Routes = [
  {path : '', component : ApySuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApySuccessRoutingModule { }
