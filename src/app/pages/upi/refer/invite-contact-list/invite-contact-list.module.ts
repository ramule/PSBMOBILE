import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteContactListRoutingModule } from './invite-contact-list-routing.module';
import { InviteContactListComponent } from './invite-contact-list.component';


@NgModule({
  declarations: [InviteContactListComponent],
  imports: [
    CommonModule,
    InviteContactListRoutingModule
  ]
})
export class InviteContactListModule { }
