import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobMycardsManageRoutingModule } from './mob-mycards-manage-routing.module';
import { MobMycardsManageComponent } from './mob-mycards-manage.component';


@NgModule({
  declarations: [MobMycardsManageComponent],
  imports: [
    CommonModule,
    MobMycardsManageRoutingModule
  ]
})
export class MobMycardsManageModule { }
