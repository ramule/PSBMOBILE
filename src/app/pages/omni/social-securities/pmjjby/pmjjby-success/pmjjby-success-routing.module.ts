import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmjjbySuccessComponent } from './pmjjby-success.component';

const routes: Routes = [
  {path : '', component : PmjjbySuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmjjbySuccessRoutingModule { }
