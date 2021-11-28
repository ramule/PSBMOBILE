import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobBillerDropdownRoutingModule } from './mob-biller-dropdown-routing.module';
import { MobBillerDropdownComponent } from './mob-biller-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MobBillerDropdownComponent
  ],
  imports: [
    CommonModule,
    MobBillerDropdownRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MobBillerDropdownModule { }
