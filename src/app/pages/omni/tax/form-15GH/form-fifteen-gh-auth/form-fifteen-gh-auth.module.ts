import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFifteenGhAuthRoutingModule } from './form-fifteen-gh-auth-routing.module';
import { FormFifteenGhAuthComponent } from './form-fifteen-gh-auth.component';


@NgModule({
  declarations: [FormFifteenGhAuthComponent],
  imports: [
    CommonModule,
    FormFifteenGhAuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormFifteenGhAuthModule { }
