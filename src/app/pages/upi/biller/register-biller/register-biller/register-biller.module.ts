import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerRoutingModule } from './register-biller-routing.module';
import { RegisterBillerComponent } from './register-biller.component';


@NgModule({
  declarations: [RegisterBillerComponent],
  imports: [
    CommonModule,
    RegisterBillerRoutingModule
  ]
})
export class RegisterBillerModule { }
