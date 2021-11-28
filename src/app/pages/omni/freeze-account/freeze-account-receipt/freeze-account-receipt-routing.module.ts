import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreezeAccountReceiptComponent } from './freeze-account-receipt.component';

const routes: Routes = [{path: '', component: FreezeAccountReceiptComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreezeAccountReceiptRoutingModule { }
