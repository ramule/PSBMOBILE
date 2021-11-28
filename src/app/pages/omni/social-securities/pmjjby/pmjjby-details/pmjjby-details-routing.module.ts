import { PmjjbyDetailsComponent } from './pmjjby-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : PmjjbyDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmjjbyDetailsRoutingModule { }
