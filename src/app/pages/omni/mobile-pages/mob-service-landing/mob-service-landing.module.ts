import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobServiceLandingRoutingModule } from './mob-service-landing-routing.module';
import { MobServiceLandingComponent } from './mob-service-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MobServiceLandingComponent],
  imports: [
    CommonModule,
    SharedModule,
    MobServiceLandingRoutingModule
  ]
})
export class MobServiceLandingModule { }
