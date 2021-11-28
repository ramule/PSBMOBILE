import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReissueCardSuccessComponent } from './reissue-card-success.component';

const routes: Routes = [
  {path : '', component : ReissueCardSuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReissueCardSuccessRoutingModule { }
