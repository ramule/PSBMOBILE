import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetMpinComponent } from './set-mpin.component';

const routes: Routes = [
  {path: '', component: SetMpinComponent},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class SetMpinRoutingModule { }
