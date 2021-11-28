import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillerRoutingModule } from './add-biller-routing.module';
import { AddBillerComponent } from './add-biller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddBillerComponent],
  imports: [
    CommonModule,
    AddBillerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddBillerModule { }
