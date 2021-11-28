import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteRegisterBillerSuccessComponent } from './delete-register-biller-success.component';


const routes: Routes = [
  {path:'' , component: DeleteRegisterBillerSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteRegisterBillerSuccessRoutingModule { }
