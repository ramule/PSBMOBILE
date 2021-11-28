import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCardsComponent } from './my-cards.component';
import  {myCardsRoutingModule} from './my-cards-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [MyCardsComponent],
  imports: [
    CommonModule,
    FormsModule,
    myCardsRoutingModule,
    SharedModule,
    CarouselModule
  ],
  exports:[
    MyCardsComponent,
  ]
})
export class MyCardsModule { }
