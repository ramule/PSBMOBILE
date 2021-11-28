import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';
@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    CommonModules
  ]
})
export class LandingPageModule { }
