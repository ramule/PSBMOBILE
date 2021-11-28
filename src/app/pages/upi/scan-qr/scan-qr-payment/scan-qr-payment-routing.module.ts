import { ScanQrPaymentComponent } from './scan-qr-payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ScanQrPaymentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanQrPaymentRoutingModule { }
