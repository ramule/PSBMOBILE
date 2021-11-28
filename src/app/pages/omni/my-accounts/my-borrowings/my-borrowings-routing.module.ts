import { MyBorrowingsComponent } from './my-borrowings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: '', component: MyBorrowingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myBorrowingsRoutingModule { } 
