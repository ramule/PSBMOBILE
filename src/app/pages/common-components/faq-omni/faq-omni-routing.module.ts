import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqOmniComponent } from './faq-omni.component';

const routes: Routes = [
  {path: '', component: FaqOmniComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqOmniRoutingModule { }
