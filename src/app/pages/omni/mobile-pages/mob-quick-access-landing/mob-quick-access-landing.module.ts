import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobQuickAccessLandingRoutingModule } from './mob-quick-access-landing-routing.module';
import { MobQuickAccessLandingComponent } from './mob-quick-access-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MobQuickAccessLandingComponent],
  imports: [
    CommonModule,
    SharedModule,
    MobQuickAccessLandingRoutingModule
  ]
})
export class MobQuickAccessLandingModule { }
