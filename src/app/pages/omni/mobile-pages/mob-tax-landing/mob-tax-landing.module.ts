import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobTaxLandingRoutingModule } from './mob-tax-landing-routing.module';
import { MobTaxLandingComponent } from './mob-tax-landing.component';


@NgModule({
  declarations: [MobTaxLandingComponent],
  imports: [
    CommonModule,
    MobTaxLandingRoutingModule
  ]
})
export class MobTaxLandingModule { }
