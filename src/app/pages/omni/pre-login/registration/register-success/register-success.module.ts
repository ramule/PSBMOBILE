import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSuccessComponent } from './register-success.component';
import { RegistrationSuccessRoutingModule } from './register-success-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [RegisterSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationSuccessRoutingModule,
    SharedModule
  ],
  exports:[
    RegisterSuccessComponent
,
  ]
})
export class RegistrationSuccessModule { } 
