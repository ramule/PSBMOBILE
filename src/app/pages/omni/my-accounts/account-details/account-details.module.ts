import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {AccountDetailsRoutingModule} from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    AccountDetailsRoutingModule,
    SharedModule
  ],
  exports:[
    AccountDetailsComponent
  ]
})
export class AccountDetailsModule { } 
