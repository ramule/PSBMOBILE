import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBorrowingsComponent } from './my-borrowings.component';
import  {myBorrowingsRoutingModule} from './my-borrowings-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
/*****modified by USER PSB1*****/
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";
/*****modified by USER PSB1 ENDS*****/

@NgModule({
  declarations: [MyBorrowingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    myBorrowingsRoutingModule,
    SharedModule,
    CarouselModule,    
    NgxPaginationModule, //Added by User PSB1
    DataTablesModule //Added by User PSB1
  ],
  exports:[
    MyBorrowingsComponent,
  ]
})
export class MyBorrowingsModule { } 
