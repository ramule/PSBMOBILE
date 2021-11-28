import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule,
  ]
})
export class NotificationModule { }
