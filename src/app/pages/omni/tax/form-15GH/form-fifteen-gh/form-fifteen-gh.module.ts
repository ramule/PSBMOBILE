import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFifteenGhRoutingModule } from './form-fifteen-gh-routing.module';
import { FormFifteenGhComponent } from './form-fifteen-gh.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [FormFifteenGhComponent],
  imports: [
    CommonModule,
    FormFifteenGhRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class FormFifteenGhModule { }
