import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMasComponent } from './e-mas.component';
import { EMasRoutingModule } from './e-mas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';

@NgModule({
  declarations: [EMasComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EMasRoutingModule
  ]
})
export class EMasModule { }
