import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferFriendRoutingModule } from './refer-friend-routing.module';
import { ReferFriendComponent } from './refer-friend.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReferFriendComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReferFriendRoutingModule
  ]
})
export class ReferFriendModule { }
