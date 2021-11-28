import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelinkAccountComponent } from './delink-account.component';

const routes: Routes = [{path: '', component: DelinkAccountComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelinkAccountRoutingModule { }
