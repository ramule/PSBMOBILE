import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NreDepositeRoutingModule } from './nre-deposite-routing.module';
import { NreDepositeComponent } from './nre-deposite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NreDepositeComponent
  ],
  imports: [
    CommonModule,
    NreDepositeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class NreDepositeModule { }
