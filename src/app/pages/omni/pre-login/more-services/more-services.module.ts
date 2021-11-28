import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreServicesRoutingModule } from './more-services-routing.module';
import { MoreServicesComponent } from './more-services.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';
import { TermsConditonsModule } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.module';


@NgModule({
  declarations: [MoreServicesComponent],
  imports: [
    CommonModule,
    MoreServicesRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    TermsConditonsModule
  ],
  exports:[
    MoreServicesComponent,
  ]
})
export class MoreServicesModule { }
