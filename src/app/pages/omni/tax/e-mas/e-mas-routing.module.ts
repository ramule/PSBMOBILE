import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EMasComponent } from './e-mas.component';

const routes: Routes = [
  { path : '', component : EMasComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EMasRoutingModule { }
