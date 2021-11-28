import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUPIComponent } from './create-upi.component';
import { CreateUpiRoutingModule } from './create-upi-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [CreateUPIComponent],
  imports: [
    CommonModule, 
    CreateUpiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModules,
    SharedModule
  ]
})
export class CreateUpiModule { }
