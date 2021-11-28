import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationMobileComponent } from './notification-mobile.component';

const routes: Routes = [
  {path: '', component: NotificationMobileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationMobileRoutingModule { }
