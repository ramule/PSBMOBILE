import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {ProfileDetailsRoutingModule} from './profile-details-routing.module';
import { ProfileDetailsComponent } from './profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../../shared/shared.module';
import {ProfileEditModule} from '../profile-edit/profile-edit.module';
//import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ProfileDetailsRoutingModule,
    SharedModule,
    ProfileEditModule,
    //ImageCropperModule,
  ],
  exports:[
    ProfileDetailsComponent
  ]
})
export class ProfileDetailsModule { }
