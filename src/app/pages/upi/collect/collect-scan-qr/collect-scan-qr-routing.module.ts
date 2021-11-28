import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectScanQrComponent } from './collect-scan-qr.component';

const routes: Routes = [
  {path: '', component: CollectScanQrComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectScanQrRoutingModule { }
