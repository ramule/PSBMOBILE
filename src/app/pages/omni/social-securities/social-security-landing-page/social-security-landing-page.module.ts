import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { SocialSecurityLandingPageRoutingModule } from './social-security-landing-page-routing.module';
import { SocialSecurityLandingPageComponent } from './social-security-landing-page.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [SocialSecurityLandingPageComponent],
  imports: [
    CommonModule,
    SocialSecurityLandingPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CarouselModule,
  ]
})
export class SocialSecurityLandingPageModule { }
