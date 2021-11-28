import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TemporarilyPageRoutingModule } from './temporarily-page-routing.module';
import { TemporarilyPageComponent } from './temporarily-page.component';


@NgModule({
  declarations: [TemporarilyPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    TemporarilyPageRoutingModule
  ]
})
export class TemporarilyPageModule { }
