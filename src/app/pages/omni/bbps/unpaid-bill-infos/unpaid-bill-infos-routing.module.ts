import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnpaidBillInfosComponent } from './unpaid-bill-infos.component';

const routes: Routes = [
  { path :'', component: UnpaidBillInfosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnpaidBillInfosRoutingModule { }
