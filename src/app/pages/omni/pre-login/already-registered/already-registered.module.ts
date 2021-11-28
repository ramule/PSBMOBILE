import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlreadyRegisteredRoutingModule } from './already-registered-routing.module';
import { AlreadyRegisteredComponent } from './already-registered.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';


@NgModule({
  declarations: [AlreadyRegisteredComponent],
  imports: [
    CommonModule,
    AlreadyRegisteredRoutingModule,
    SharedModule,
    CommonModules
  ]
})
export class AlreadyRegisteredModule { }
