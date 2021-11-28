import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetMpinComponent } from './set-mpin.component';
import { SetMpinRoutingModule } from './set-mpin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';

@NgModule({
  declarations: [ SetMpinComponent ],
  imports: [
    CommonModule,
    SetMpinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class SetMpinModule { }
