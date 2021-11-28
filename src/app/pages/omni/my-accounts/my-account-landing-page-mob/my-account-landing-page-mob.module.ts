import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountLandingPageMobRoutingModule } from './my-account-landing-page-mob-routing.module';
import { MyAccountLandingPageMobComponent } from './my-account-landing-page-mob.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MyAccountLandingPageMobComponent],
  imports: [
    CommonModule,
    MyAccountLandingPageMobRoutingModule,
    SharedModule
  ]
})
export class MyAccountLandingPageMobModule { }
