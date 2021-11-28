import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiateSendMoneyComponent } from './initiate-send-money.component';

const routes: Routes = [
  {path: '', component: InitiateSendMoneyComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiateSendMoneyRoutingModule { }
