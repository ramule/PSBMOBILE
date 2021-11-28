import { SocialSecurityLandingPageComponent } from './social-security-landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : SocialSecurityLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialSecurityLandingPageRoutingModule { }
