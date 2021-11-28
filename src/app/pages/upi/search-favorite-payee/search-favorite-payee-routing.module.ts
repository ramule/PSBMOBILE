import { SearchFavoritePayeeComponent } from './search-favorite-payee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: SearchFavoritePayeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFavoritePayeeRoutingModule { }
