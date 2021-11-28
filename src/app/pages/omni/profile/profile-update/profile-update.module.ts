import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {ProfileUpdateRoutingModule} from './profile-update-routing.module';
import { ProfileUpdateComponent } from './profile-update.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';

@NgModule({
  declarations: [ProfileUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    ProfileUpdateRoutingModule,
    SharedModule,
    CommonModules
  ],
  exports:[
    ProfileUpdateComponent
  ]
})
export class ProfileUpdateModule { } 
