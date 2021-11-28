import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobSocialLandingRoutingModule } from './mob-social-landing-routing.module';
import { MobSocialLandingComponent } from './mob-social-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MobSocialLandingComponent],
  imports: [
    CommonModule,
    SharedModule,
    MobSocialLandingRoutingModule
  ]
})
export class MobSocialLandingModule { }
