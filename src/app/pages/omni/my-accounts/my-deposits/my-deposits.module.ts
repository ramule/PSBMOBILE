import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDepositsComponent } from './my-deposits.component';
import  {myDepositsRoutingModule} from './my-deposits-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [MyDepositsComponent],
  imports: [
    CommonModule,
    FormsModule,
    myDepositsRoutingModule,
    SharedModule,
    CarouselModule,
    NgxPaginationModule,
    DataTablesModule
  ],
  exports:[
    MyDepositsComponent,
  ]
})
export class MyDepositsModule { }
