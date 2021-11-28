import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { TPINComponent } from './tpin.component';
import { TPINRoutingModule } from './tpin-routing.module';

@NgModule({
  declarations: [TPINComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TPINRoutingModule,
    SharedModule
  ]
})
export class TPINModule { }
