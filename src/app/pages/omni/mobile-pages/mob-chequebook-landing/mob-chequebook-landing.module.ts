import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobChequebookLandingRoutingModule } from './mob-chequebook-landing-routing.module';
import { MobChequebookLandingComponent } from './mob-chequebook-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MobChequebookLandingComponent],
  imports: [
    CommonModule,
    MobChequebookLandingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MobChequebookLandingModule { }
