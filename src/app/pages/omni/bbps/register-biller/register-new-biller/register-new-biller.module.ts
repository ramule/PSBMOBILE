import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterNewBillerRoutingModule } from './register-new-biller-routing.module';
import { RegisterNewBillerComponent } from './register-new-biller.component';


@NgModule({
  declarations: [RegisterNewBillerComponent],
  imports: [
    CommonModule,
    RegisterNewBillerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterNewBillerModule { }
