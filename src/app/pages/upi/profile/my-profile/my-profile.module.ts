import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { CommonModules } from '../../../common-ui/common.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    CarouselModule
  ]
})
export class MyProfileModule { }
