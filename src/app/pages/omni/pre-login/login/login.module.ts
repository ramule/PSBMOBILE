import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import  {LoginRoutingModule} from './login-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';



@NgModule({
  declarations: [LoginComponent, ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ],
  exports:[
    LoginComponent,
  ]
})
export class LoginModule { }
