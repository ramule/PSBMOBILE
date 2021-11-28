import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUpiGlobalSettingsComponent } from './update-upi-global-settings.component';

const routes: Routes = [
  {path:'' , component: UpdateUpiGlobalSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUpiGlobalSettingsRoutingModule { }
