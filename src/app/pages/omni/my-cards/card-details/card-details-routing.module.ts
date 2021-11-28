import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsComponent } from './card-details.component';

const routes: Routes = [
  { path: '', component : CardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardDetailsRoutingModule { }
