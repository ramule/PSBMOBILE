import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewRegisterBillerRoutingModule } from './add-new-register-biller-routing.module';
import { AddNewRegisterBillerComponent } from './add-new-register-biller.component';


@NgModule({
  declarations: [AddNewRegisterBillerComponent],
  imports: [
    CommonModule,
    AddNewRegisterBillerRoutingModule
  ]
})
export class AddNewRegisterBillerModule { }
