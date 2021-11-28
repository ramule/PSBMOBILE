import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeregisterRoutingModule } from './deregister-routing.module';
import { DeregisterComponent } from './deregister.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModules } from '../../common-ui/common.module';


@NgModule({
  declarations: [DeregisterComponent],
  imports: [
    CommonModule,
    DeregisterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModules
  ]
})
export class DeregisterModule { }
