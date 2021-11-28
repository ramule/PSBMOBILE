import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePinComponent } from './generate-pin.component';

const routes: Routes = [
  {path : '', component : GeneratePinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePinRoutingModule { }
