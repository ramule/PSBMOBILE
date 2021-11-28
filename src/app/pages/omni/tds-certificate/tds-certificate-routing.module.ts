import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TdsCertificateComponent } from './tds-certificate.component';

const routes: Routes = [
  {path:'' , component: TdsCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TdsCertificateRoutingModule { }
