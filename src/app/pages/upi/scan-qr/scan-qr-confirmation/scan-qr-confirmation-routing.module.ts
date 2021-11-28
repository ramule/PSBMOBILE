import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrConfirmationComponent } from './scan-qr-confirmation.component';

const routes: Routes = [
  {path: '', component: ScanQrConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanQrConfirmationRoutingModule { }
