import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteContactListComponent } from './invite-contact-list.component';

const routes: Routes = [
  {path: '', component: InviteContactListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteContactListRoutingModule { }
