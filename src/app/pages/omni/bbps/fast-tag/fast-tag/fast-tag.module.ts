import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FastTagRoutingModule } from './fast-tag-routing.module';
import { FastTagComponent } from './fast-tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FastTagComponent
  ],
  imports: [
    CommonModule,
    FastTagRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class FastTagModule { }
