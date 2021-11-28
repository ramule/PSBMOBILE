import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnBankComponent } from './own-bank.component';

const routes: Routes = [
  {path: '', component: OwnBankComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnBankRoutingModule { }
