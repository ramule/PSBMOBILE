import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { FavoritepayeeService } from '../favorite-payee/favoritepayee.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-favorite-payee',
  templateUrl: './favorite-payee.component.html',
  styleUrls: ['./favorite-payee.component.scss'],
})
export class FavoritePayeeComponent implements OnInit {
  commonPageComponent = {
    headerType: 'innerHeader',
    sidebarNAv: 'OmniNAv',
    footer: 'innerFooter',
  };
  favroutelist: any = [];
  searchText: any = '';
  tempFavouriteList: any = [];
  favouriteListArray: any = [];
  txn_within: any;
  txn_outside: any;
  /*****modified by USER PSB1*****/
  config1:any;
  /*****modified by USER PSB1 Ends****/


  constructor(
    private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private favouritePayeeService: FavoritepayeeService,
    private http: HttpRestApiService,
    private storage: LocalStorageService
  )
  /*****modified by USER PSB1*****/
    {
      this.config1 = {id:"basicPaginate1", itemsPerPage:this.DataService.listCountObj.itemsPerPage, currentPage: this.DataService.listCountObj.currentPage};
    }
   pageChanged1(event){this.config1.currentPage= event;}
  /*****modified by USER PSB1 Ends****/ 


  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.changeMessage(this.commonPageComponent);
    this.DataService.getBreadcrumb('FAVOURITE_PAYEE' , this.router.url)
    this.DataService.setPageSettings('FAVOURITE_PAYEE');
    this.favourite();

    this.DataService.beneficiaryType;
    console.log('formtypeeeeeeeeeeeeeeee', this.DataService.beneficiaryType);
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  errorCallBack(subActionId, resp) {
    if (resp.opstatus == '02' || resp.opstatus == '01') {
      showToastMessage(resp.Result, 'error');
    }
  }

  favourite() {
    var param = this.favouritePayeeService.getFavouritePayee();
    console.log('get fav payee params: ', param);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceNmae_GETFAVORITETRANSACTIONS
      )
      .subscribe((data) => {
        console.log(data);

        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.favroutelist = data.set['records'];

          console.log('get favourite list', this.favroutelist);
          this.tempFavouriteList = this.favroutelist;
          console.log('tempFavouriteList', this.tempFavouriteList);
        } else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  searchAccount(event) {
    console.log(event);
    if (this.searchText != '') {
      var payeeArray = this.tempFavouriteList;
      var filterArray = payeeArray.filter((x) =>
        x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
      );

      this.favroutelist = [];
      this.favroutelist = filterArray;
    } else {
      this.favroutelist = [];
      this.favroutelist = this.tempFavouriteList;
    }
  }

  sendMoneyy(favourites) {
    this.DataService.managePayeeToFundTransferData = favourites;
    console.log(this.DataService.managePayeeToFundTransferData);
    this.router.navigate(['/sendMoney']);
  }
}
