import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopChequesComponent } from './stop-cheques.component';
import {StopChequesRoutingModule} from './stop-cheques-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [StopChequesComponent],
  imports: [
    CommonModule,
    StopChequesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ]
})
export class StopChequesModule { }
