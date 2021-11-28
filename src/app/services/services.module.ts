import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRestApiService } from './http-rest-api.service';
import { LocalStorageService } from './local-storage-service.service';
import { DataService } from './data.service';
import { pageLoaderService } from './pageloader.service';
import { NavigationGuard } from './navigation-guard.service';
import { PrintingService } from './print.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  providers:[
    HttpRestApiService,
    LocalStorageService,
    DataService,
    pageLoaderService,
    NavigationGuard,
    PrintingService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServicesModule { }
