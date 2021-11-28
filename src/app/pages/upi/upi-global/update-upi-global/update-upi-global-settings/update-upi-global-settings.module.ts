import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUpiGlobalSettingsRoutingModule } from './update-upi-global-settings-routing.module';
import { UpdateUpiGlobalSettingsComponent } from './update-upi-global-settings.component';


@NgModule({
  declarations: [UpdateUpiGlobalSettingsComponent],
  imports: [
    CommonModule,
    UpdateUpiGlobalSettingsRoutingModule
  ]
})
export class UpdateUpiGlobalSettingsModule { }
