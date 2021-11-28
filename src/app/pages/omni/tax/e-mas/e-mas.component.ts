import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { EMasService } from './e-mas.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-e-mas',
  templateUrl: './e-mas.component.html',
  styleUrls: ['./e-mas.component.scss']
})
export class EMasComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private emasService: EMasService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants
  ) { }

  ngOnInit(): void {
  }

  onGenerateToken() {
    var param = this.emasService.getGenerateTokenCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_PKIENROLLMENT)
    .subscribe((data) => {
      var resp = data.responseParameter;
      if (data.responseParameter.opstatus == '00') {
        //showToastMessage(resp.Result, 'success');
      }
    });
  }

}
