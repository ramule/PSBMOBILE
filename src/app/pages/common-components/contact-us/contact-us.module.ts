import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import {ContactUsRoutingModule} from './contact-us-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class ContactUsModule { }
