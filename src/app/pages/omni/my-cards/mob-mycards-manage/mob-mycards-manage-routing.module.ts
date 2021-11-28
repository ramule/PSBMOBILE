import { MobMycardsManageComponent } from './mob-mycards-manage.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '',  component : MobMycardsManageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobMycardsManageRoutingModule { }
