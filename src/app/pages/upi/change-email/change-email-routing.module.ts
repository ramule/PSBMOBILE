import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeEmailComponent } from './change-email.component';

const routes: Routes = [
  {path : '' , component : ChangeEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeEmailRoutingModule { }
