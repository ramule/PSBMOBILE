
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TPINComponent } from './tpin.component';


const routes: Routes = [
  {path: '', component: TPINComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TPINRoutingModule { }
