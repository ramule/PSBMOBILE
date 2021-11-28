import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopChequeReceiptComponent } from './stop-cheque-receipt.component';

const routes: Routes = [
  {path : '', component : StopChequeReceiptComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopChequeReceiptRoutingModule { }
