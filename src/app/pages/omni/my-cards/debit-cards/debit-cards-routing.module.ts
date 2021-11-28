import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitCardsComponent } from './debit-cards.component';

const routes: Routes = [{path: '', component: DebitCardsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitCardsRoutingModule { }
