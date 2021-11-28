import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-accounts.component';
import  {myAccountRoutingModule} from './my-accounts-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    myAccountRoutingModule,
    SharedModule,
    CarouselModule,
    NgxPaginationModule,
    DataTablesModule
  ],
  exports:[
    MyAccountComponent,
  ]
})
export class MyAccountsModule { }
