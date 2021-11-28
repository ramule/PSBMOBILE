import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerViewRoutingModule } from './register-biller-view-routing.module';
import { RegisterBillerViewComponent } from './register-biller-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterBillerViewComponent
  ],
  imports: [
    CommonModule,
    RegisterBillerViewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterBillerViewModule { }
