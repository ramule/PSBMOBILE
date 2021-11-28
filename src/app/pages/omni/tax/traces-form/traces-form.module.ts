import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracesFormRoutingModule } from './traces-form-routing.module';
import { TracesFormComponent } from './traces-form.component';


@NgModule({
  declarations: [TracesFormComponent],
  imports: [
    CommonModule,
    TracesFormRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TracesFormModule { }
