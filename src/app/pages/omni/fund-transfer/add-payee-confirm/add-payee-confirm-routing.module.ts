
import { AddPayeeConfirmComponent } from './add-payee-confirm.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: AddPayeeConfirmComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPayeeConfirmRoutingModule { }
