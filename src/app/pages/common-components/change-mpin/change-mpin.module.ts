import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeMpinRoutingModule } from './change-mpin-routing.module';
import { ChangeMpinComponent } from './change-mpin.component';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangeMpinComponent],
  imports: [
    CommonModule,
    ChangeMpinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModules,
    SharedModule
  ]
})
export class ChangeMpinModule { }
