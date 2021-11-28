import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritePayeeComponent } from './favorite-payee.component';

const routes: Routes = [
  {path: '', component: FavoritePayeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritePayeeRoutingModule { }
