import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePinSuccessComponent } from './generate-pin-success.component';

const routes: Routes = [
  {path : '', component : GeneratePinSuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePinSuccessRoutingModule { }
