import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationMobileRoutingModule } from './notification-mobile-routing.module';
import { NotificationMobileComponent } from './notification-mobile.component';


@NgModule({
  declarations: [NotificationMobileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationMobileRoutingModule
  ]
})
export class NotificationMobileModule { }
