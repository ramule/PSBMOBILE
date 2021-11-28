import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpiLoginComponent } from './upi-login.component';
import { UpiLoginRoutingModule } from './upi-login-routing.module';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ UpiLoginComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UpiLoginRoutingModule,
    CommonModules,
    SharedModule
  ]
})

export class UpiLoginModule { }
