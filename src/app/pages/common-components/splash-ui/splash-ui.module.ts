import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashUiRoutingModule } from './splash-ui-routing.module';
import { SplashUiComponent } from './splash-ui.component';


@NgModule({
  declarations: [SplashUiComponent],
  imports: [
    CommonModule,
    SharedModule,
    SplashUiRoutingModule
  ]
})
export class SplashUiModule { }
