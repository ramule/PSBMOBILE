import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePinRoutingModule } from './generate-pin-routing.module';
import { GeneratePinComponent } from './generate-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [GeneratePinComponent],
  imports: [
    CommonModule,
    GeneratePinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GeneratePinModule { }
