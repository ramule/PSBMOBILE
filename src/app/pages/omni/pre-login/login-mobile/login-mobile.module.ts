import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMobileComponent } from './login-mobile.component';
import  {LoginMobileRoutingModule} from './login-mobile-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [LoginMobileComponent],
  imports: [
    CommonModule,
    LoginMobileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    CarouselModule
  ],
  exports:[
    LoginMobileComponent,
  ]
})
export class LoginMobileModule { }
