import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrComponent } from './scan-qr.component';

const routes: Routes = [
  {path: '', component: ScanQrComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanQrRoutingModule { }
