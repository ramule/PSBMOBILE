import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotlistCardAuthorizationComponent } from './hotlist-card-authorization.component';

const routes: Routes = [
  {path: '', component : HotlistCardAuthorizationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotlistCardAuthorizationRoutingModule { }
