import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanQrIdListComponent } from './scan-qr-id-list.component';

const routes: Routes = [
  {path: '', component: ScanQrIdListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanQrIdListRoutingModule { }
