import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NliLandingPageRoutingModule } from './nli-landing-page-routing.module';
import { NliLandingPageComponent } from './nli-landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModules } from 'src/app/pages/common-ui/common.module';


@NgModule({
  declarations: [NliLandingPageComponent],
  imports: [
    CommonModule,
    NliLandingPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class NliLandingPageModule { }
