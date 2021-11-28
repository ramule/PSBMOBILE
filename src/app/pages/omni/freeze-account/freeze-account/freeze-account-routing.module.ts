import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreezeAccountComponent } from './freeze-account.component';

const routes: Routes = [{path: '', component: FreezeAccountComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreezeAccountRoutingModule { }
