import { CommonMethods } from 'src/app/utilities/common-methods';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationStart,
  NavigationExtras,
} from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../app.constant';
import { OtherBankService } from '../other-bank/other-bank.service';
import { ManagePayeeService } from './manage-payee.service';
import { FavoritepayeeService } from '../favorite-payee/favoritepayee.service';
import { Location } from '@angular/common';
declare var $: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-manage-payee',
  templateUrl: './manage-payee.component.html',
  styleUrls: ['./manage-payee.component.scss'],
})
export class ManagePayeeComponent implements OnInit, AfterViewInit {
  otherAccList: any;
  ownBenificiaryList: any = [];
  otherBenificiaryList: any = [];
  internationalBenificiaryList: any = [];
  dtOptions: any = {};
  ownSearchQuery: any;
  otherSearchQuery: any;
  internationalSearchQuery: any;
  withinBankPendingPayeeDetails: any = [];
  withinBankPayeeDetailsList: any = [];
  outsideBankPendingPayeeDetails: any = [];
  outsideBankPayeeDetailsList: any = [];
  mmidBankPendingPayeeDetails: any = [];
  mmidBankPayeeDetailsList: any = [];
  vpaBankPendingPayeeDetails: any = [];
  vpaBankPayeeDetailsList: any = [];
  arrayToDelete: any = [];
  elementToDelete: any;
  confirmElementToDelete: any;
  confirmArrayToDelete: any = [];
  config: any;
  config1: any;
  config2: any;
  config3: any;
  config4: any;
  config5: any;
  config6: any;
  config7: any;
  config8: any;
  itemsPerPage: any;
  currentPage: any;
  totalItems: any;
  deletedPayee: any;
  selectedAddPayeeMethod: any;
  confirmAndPendingPayeeList = [];
  favoritePayeeResult: any;

  datainfo = {
    data: [
      {
        id: 860,
        firstName: 'Superman',
        lastName: 'Yoda',
      },
      {
        id: 870,
        firstName: 'Foo',
        lastName: 'Whateveryournameis',
      },
      {
        id: 590,
        firstName: 'Toto',
        lastName: 'Titi',
      },
      {
        id: 803,
        firstName: 'Luke',
        lastName: 'Kyle',
      },
    ],
  };
  ownmaxselrow: any = 5;
  ownPaginateConfig: pageFomat = {
    id: 'own',
    itemsPerPage: this.ownmaxselrow,
    currentPage: 1,
    totalItems: 0,
  };

  othermaxselrow: any = 5;
  otherPaginateConfig: pageFomat = {
    id: 'other',
    itemsPerPage: this.ownmaxselrow,
    currentPage: 1,
    totalItems: 0,
  };

  intermaxselrow: any = 5;
  interPaginateConfig: pageFomat = {
    id: 'inter',
    itemsPerPage: this.ownmaxselrow,
    currentPage: 1,
    totalItems: 0,
  };
  selected: any;
  bankSelection: any = 'within';

  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute': this.router.url
  }

  searchText: any = '';
  tempMMIDPayeeList: any = [];
  tempVPAPayeeList: any = [];
  tempWITHINPayeeList: any = [];
  tempOUTSIDEPayeeList: any = [];
  constructor(
    private router: Router,
    public DataService: DataService,
    private otherBankService: OtherBankService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private managePayeeService: ManagePayeeService,
    private commonMethods: CommonMethods,
    private favouritePayeeService: FavoritepayeeService,
    private location: Location
  ) {
    this.config1 = {
      id: 'basicPaginate1',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config2 = {
      id: 'basicPaginate2',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config3 = {
      id: 'basicPaginate3',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config4 = {
      id: 'basicPaginate4',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config5 = {
      id: 'basicPaginate5',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config6 = {
      id: 'basicPaginate6',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config7 = {
      id: 'basicPaginate7',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
    this.config8 = {
      id: 'basicPaginate8',
      itemsPerPage: this.DataService.listCountObj.itemsPerPage,
      currentPage: this.DataService.listCountObj.currentPage,
    };
  }
  pageChanged1(event) {
    this.config1.currentPage = event;
  }
  pageChanged2(event) {
    this.config2.currentPage = event;
  }
  pageChanged3(event) {
    this.config3.currentPage = event;
  }
  pageChanged4(event) {
    this.config4.currentPage = event;
  }
  pageChanged5(event) {
    this.config5.currentPage = event;
  }
  pageChanged6(event) {
    this.config6.currentPage = event;
  }
  pageChanged7(event) {
    this.config7.currentPage = event;
  }
  pageChanged8(event) {
    this.config8.currentPage = event;
  }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.changeMessage(this.commonPageComponent);
    this.DataService.getBreadcrumb('MANAGE_PAYEE' , this.router.url)
    this.DataService.bankTypeCode = '1';
    this.DataService.setPageSettings('MANAGE_PAYEE');
    if(this.DataService.paymentType != ''){
      this.bankSelection = this.DataService.paymentType;
      if(this.bankSelection == "vpa"){
        this.bankSelection = "Vpa"
      }
    }

    var prevUrl = this.constant.getPlatform() == "web" ? 'dashboard' : 'dashboardMobile';
    history.pushState({},prevUrl,this.location.prepareExternalUrl(prevUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));

    // this.commonMethods.openPopup('div.popup-bottom.search-ifsc2');
    this.initialize();
    var openRows = new Array();
    function dtSampleExpand() {
      var table = $('table#dt-sample-ex').DataTable({
        // select: true,
        dom: "<'row1 ml-0 mr-0 pt-2 pb-1 '<'col-sm-4 col-md-4 col-12 pt-0' <'dt-title'>><'col-sm-8 col-md-8 col-12 pt-1'<'dt-custom'<'dt-addpayee'>f>>> <'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pb-0'<'col-sm-12 col-md-5 col-xl-5 col-lg-5'l > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>",

        // dom:"<'row1 ml-0 mr-0 pt-2 pb-1 '<'col-sm-2'l><'col-sm-6 text-center'<'selection-tags'>><'col-sm-4 text-right'<'dt-customizecolumn'><'dt-filter' <' customfilter'> >f>>" +
        //     "<'row1'<'col-sm-12'tr>>" +
        //     "<'dt-footer'<'row1 ml-0 mr-0 pt-3 pb-0'<'col-sm-3'i><'col-sm-7'<'dt-actions'>><'col-sm-2 text-right'p>>>",
        // select: true,
        responsive: true,

        bSort: false,

        columns: [
          {
            className: 'dt-viewdetails',
            orderable: false,
          },
        ],

        language: {
          // search: "Search in table:",
          zeroRecords: 'No matching records found,<br/>try another search term',
          processing: 'Loading...',
          lengthMenu: 'Showing _MENU_',
          info: 'Showing _START_ to _END_ of <b>_TOTAL_</b> entries',
        },
      });
      $('div.exportlinks').html(
        '<div class="row">' +
          '<div class="col-12 text-align p-0">' +
          '<button class="ux-linkbutton  primary"> <img src="assets/images/svg/download.svg" alt="download-icon">Download</button>' +
          '<button class="ux-linkbutton  ml-2 primary"> <img src="assets/images/svg/print.svg" alt="print-icon">Print</button>' +
          '</div> <!--.dt-extras-->'
      );
      // dtsetResponsive();

      $('table#dt-sample-ex tbody').on(
        'click',
        'tr td.dt-viewdetails',
        function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('dt-rowexpandable');
          } else {
            // Open this row
            // row.child( format(row.data()) ).show();
            closeOpenedRows(table, tr);
            row.child(expandedData()).show();
            tr.addClass('dt-rowexpandable')
              .next('tr')
              .addClass('dt-rowexpanded-details');
            openRows.push(tr);
          }
        }
      );

      $('div.dt-title').html('<span>Payee List</span>');

      $('div.dt-addpayee').html(
        '<button class=" ux-button primary sm"><img src="assets/images/icons/notification.png"><em>Add Payee</em></button>'
      );

      $('table#dt-sample-ex').wrap('<div class="restable-box"></div>');
    }

    function closeOpenedRows(table, selectedRow) {
      $.each(openRows, function (index, openRow) {
        // not the selected row!
        if ($.data(selectedRow) !== $.data(openRow)) {
          var rowToCollapse = table.row(openRow);
          rowToCollapse.child.hide();
          openRow.removeClass('dt-rowexpandable');
          // openRow.addClass( 'iahmad-row' );
          // replace icon to expand
          $(openRow).find('td.dt-viewdetails');
          // remove from list
          var index = $.inArray(selectedRow, openRows);
          openRows.splice(index, 1);
        }
      });
    }

    function expandedData() {
      return innerHTMLTemplate();
    }

    function innerHTMLTemplate() {
      return (
        '<div class="dt-exdetails-container">' +
        '<div class="dt-exdetails">' +
        '<div class="row">' +
        '<div class="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-12">' +
        ' <div class="ux-input ux-readonly">' +
        ' <label>Payee Name </label>' +
        ' <h4>Ashmitha</h4>' +
        ' </div>  ' +
        ' </div>' +
        ' <div class="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-12">' +
        ' <div class="ux-input ux-readonly">' +
        '<label>Payee Nick Name</label>' +
        '<h4>Ash</h4>' +
        ' </div>  ' +
        ' </div>' +
        ' <div class="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-12">' +
        ' <div class="ux-input ux-readonly">' +
        ' <label>Account Number</label>' +
        ' <h4>**** **** 1096</h4>' +
        ' </div>  ' +
        ' </div>' +
        ' <div class="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-12">' +
        ' <div class="ux-input ux-readonly">' +
        ' <label>Status</label>' +
        '<h4>Pending</h4>' +
        ' </div>  ' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        '<div class="dt-exfooter">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<div class="text-right">' +
        '<button class=" ux-button secondary sm">Cancel</button>' +
        ' <button class=" ux-button primary sm" >confirm</button>' +
        '</div>' +
        ' </div>  ' +
        ' </div>' +
        ' </div>' +
        '</div>'
      );
    }

    dtSampleExpand();
  }

  ngAfterViewInit(){
    this.initialize();
  }

  /**
   * Operation to be handeled at the time of intilaization
   * 1=> invoke customer beneficiary
   */
  initialize() {
    this.getBeneficiaryList();
  }

  /**
   * This function is invoked to get benificiary List
   */
  getBeneficiaryList() {
    var param = this.otherBankService.benificiaryListParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BENIFICIARYLIST
      )
      .subscribe((data) => {
        console.log(data);

        let payeeDetailsListData = data.set['records'];
        console.log('Temp Manage beneficiary Data :: ', payeeDetailsListData);

        this.DataService.beneficiaryList.payeeAccNumber =
          payeeDetailsListData.ID;

        // Payee List Data Collection
        this.getBeneficiaryListData(payeeDetailsListData);

        var resp = data.responseParameter;
        // this.ownBenificiaryList =[];

        // console.log("own",this.ownBenificiaryList)

        // this.otherBenificiaryList= [];

        // console.log("otherBenificiaryList",this.otherBenificiaryList)
        // this.internationalBenificiaryList=[];

        // console.log("internationalBenificiaryList",this.internationalBenificiaryList)
        if (resp.opstatus == '00') {
          /****** Beneficiary list is categorised on the basis of type  ******/
          // data.set.records.forEach(el => {
          //   if (el.beneficiaryType == "INTRA") {
          //     this.ownBenificiaryList.push(el);
          //     console.log(el);
          //   }
          //   else if (el.beneficiaryType == "INTER" || el.beneficiaryType == "INTERBANK" ) {
          //     this.otherBenificiaryList.push(el);
          //     console.log(el);
          //   }
          //   else if(el.beneficiaryType == "INTERNATIONAL"){
          //     this.internationalBenificiaryList.push(el);
          //     console.log(el);
          //   }
          // });

          console.log(this.ownBenificiaryList.length);
          /******* configure pagination ******/
          this.ownPaginateConfig = {
            id: 'own',
            itemsPerPage: this.ownmaxselrow,
            currentPage: 1,
            totalItems: this.ownBenificiaryList.length,
          };
          this.otherPaginateConfig = {
            id: 'other',
            itemsPerPage: this.othermaxselrow,
            currentPage: 1,
            totalItems: this.otherBenificiaryList.length,
          };
          this.interPaginateConfig = {
            id: 'inter',
            itemsPerPage: this.intermaxselrow,
            currentPage: 1,
            totalItems: this.internationalBenificiaryList.length,
          };
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  //Collecting data for all beneficiary of different types mode
  getBeneficiaryListData(payeeDetailsListData) {
    this.withinBankPendingPayeeDetails = [];
    this.withinBankPayeeDetailsList = [];
    this.outsideBankPendingPayeeDetails = [];
    this.outsideBankPayeeDetailsList = [];
    this.mmidBankPendingPayeeDetails = [];
    this.mmidBankPayeeDetailsList = [];
    this.vpaBankPendingPayeeDetails = [];
    this.vpaBankPayeeDetailsList = [];

    for (let i = 0; i < payeeDetailsListData.length; i++) {
      //Within Bank
      if (
        payeeDetailsListData[i]['statusId'] == '8' &&
        payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
      ) {
        this.withinBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
      }
      if (
        payeeDetailsListData[i]['statusId'] == '3' &&
        payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
      ) {
        this.withinBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }

      //Outside Bank
      if (
        payeeDetailsListData[i]['statusId'] == '8' &&
        payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
      ) {
        this.outsideBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
      }
      if (
        payeeDetailsListData[i]['statusId'] == '3' &&
        payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
      ) {
        this.outsideBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }

      //mmid Bank
      if (
        payeeDetailsListData[i]['statusId'] == '8' &&
        payeeDetailsListData[i]['MMID'] != 'null'
      ) {
        this.mmidBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
      }
      if (
        payeeDetailsListData[i]['statusId'] == '3' &&
        payeeDetailsListData[i]['MMID'] != 'null'
      ) {
        this.mmidBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }
      //Vpa Bank
      if (
        payeeDetailsListData[i]['statusId'] == '8' &&
        payeeDetailsListData[i]['VPA'] != 'null'
      ) {
        this.vpaBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
      }
      if (
        payeeDetailsListData[i]['statusId'] == '3' &&
        payeeDetailsListData[i]['VPA'] != 'null'
      ) {
        this.vpaBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }
    }

    this.withinBankPendingPayeeDetails =
      this.withinBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
    this.withinBankPayeeDetailsList = this.withinBankPayeeDetailsList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );
    this.outsideBankPendingPayeeDetails =
      this.outsideBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
    this.outsideBankPayeeDetailsList = this.outsideBankPayeeDetailsList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );
    this.mmidBankPendingPayeeDetails = this.mmidBankPendingPayeeDetails.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );
    this.mmidBankPayeeDetailsList = this.mmidBankPayeeDetailsList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );
    this.vpaBankPendingPayeeDetails = this.vpaBankPendingPayeeDetails.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );
    this.vpaBankPayeeDetailsList = this.vpaBankPayeeDetailsList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );

    console.log(
      'Within PendingPayeeList :: ',
      this.withinBankPendingPayeeDetails
    );
    console.log('Within PayeeDetailsList :: ', this.withinBankPayeeDetailsList);
    console.log(
      'Outside PendingPayeeList :: ',
      this.outsideBankPendingPayeeDetails
    );
    console.log(
      'Outside PayeeDetailsList :: ',
      this.outsideBankPayeeDetailsList
    );
    console.log(
      'mmid PendingPayeeDetailsList :: ',
      this.mmidBankPendingPayeeDetails
    );
    console.log('mmid PayeeDetailsList :: ', this.mmidBankPayeeDetailsList);
    console.log(
      'vpa PendingPayeeDetailsList :: ',
      this.vpaBankPendingPayeeDetails
    );
    console.log('vpa PayeeDetailsList :: ', this.vpaBankPayeeDetailsList);

    this.tempMMIDPayeeList = this.mmidBankPayeeDetailsList;
    this.tempVPAPayeeList = this.vpaBankPayeeDetailsList;
    this.tempWITHINPayeeList = this.withinBankPayeeDetailsList;
    this.tempOUTSIDEPayeeList = this.outsideBankPayeeDetailsList;

    // this.searchFilter();
  }

  changeBank(param) {
    this.bankSelection = param;
    this.searchText = '';

    this.mmidBankPayeeDetailsList = this.tempMMIDPayeeList;
    this.vpaBankPayeeDetailsList = this.tempVPAPayeeList;
    this.withinBankPayeeDetailsList = this.tempWITHINPayeeList;
    this.outsideBankPayeeDetailsList = this.tempOUTSIDEPayeeList;
  }

  // searchFilter(){
  //   switch (this.bankSelection) {
  //     case "within":
  //       this.tempPayeeList=this.withinBankPayeeDetailsList;
  //       this.searchText = ""

  //       break;
  //     case "outside" :
  //       this.tempPayeeList=this.outsideBankPayeeDetailsList;

  //       this.searchText = ""

  //       break;
  //     case "mmid" :
  //       this.tempPayeeList=this.mmidBankPayeeDetailsList;

  //       this.searchText = ""

  //       break;
  //     case "vpa" :
  //       this.tempPayeeList=this.vpaBankPayeeDetailsList;

  //       this.searchText = ""

  //       break;
  // }

  // }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == '02' || resp.opstatus == '01') {
      showToastMessage(resp.Result, 'error');
    }
  }

  changBank(param) {
    this.bankSelection = param;
  }

  cancel() {
    $('#confirmationModal').modal('hide');
  }


  /**
   * function to called when edit payee button click event
   * @payee user details to edit payee
   */
  editPayee(payee,addpayeselected){
    this.DataService.payeeDtl = payee;
    this.DataService.managePayeeToAddpayee = addpayeselected;
    if(addpayeselected == 'Vpa'){
      this.confirmEditPayee()
    }else{
      this.commonMethods.openPopup('div.popup-bottom.si-warning');
    }
    console.log(payee);
  }

  confirmEditPayee(){
    this.DataService.isEditPayee = true;
    //within: this.withinBankPayeeDetailsList , outside: this.outsideBankPayeeDetailsList , mmid: this.mmidBankPayeeDetailsList , vpa : this.vpaBankPayeeDetailsList 
    this.DataService.withinBankPayeeList  = [ ...this.withinBankPayeeDetailsList , ...this.withinBankPendingPayeeDetails ]
    this.DataService.outsideBankPayeeList  = [ ...this.outsideBankPayeeDetailsList , ...this.outsideBankPendingPayeeDetails ]
    this.DataService.mmidBankPayeeList  = [ ...this.mmidBankPayeeDetailsList , ...this.mmidBankPendingPayeeDetails ]
    this.DataService.vpainBankPayeeList  = [ ...this.vpaBankPayeeDetailsList , ...this.vpaBankPendingPayeeDetails ];
    this.DataService.isAddPayeeFrompage = "/managePayee";
    this.router.navigate(['/addPayee']);
  }

  /**
   * function to called when delete payee button click event
   * @user user details to delete payee
   */
  deletePayee(element) {
    //$('#confirmationModal').modal('hide');
    this.elementToDelete = element;
    console.log('user:', element.ID);
    this.DataService.paymentType = this.bankSelection
    var param = this.managePayeeService.deletePayeeParam(element.ID);
    this.DataService.endPoint = this.constant.serviceName_DELETEBENEFICIARY;
    this.DataService.screenType="deletePayee"
    this.DataService.request = param;
    this.commonMethods.openPopup('div.popup-bottom.confirm');
  }

  withinBankPendingPayeeOnConfirm(element, list) {
    this.confirmElementToDelete = element;
    this.confirmArrayToDelete = list;
    var param = this.managePayeeService.withinBankPendingPayeeConfirmCall(
      element.ID
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_UPDATEBENEFICIARY
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          var index = this.confirmArrayToDelete.findIndex(
            (obj) => obj.ID == this.confirmElementToDelete.ID
          );
          this.confirmArrayToDelete.splice(index, 1);

          this.getBeneficiaryList();
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  closePopup(popup) {
    this.commonMethods.closePopup(popup);
  }

  /**
   * api call to delete payee
   * @param
   */
  deleteSelPayee(param) {
    this.DataService.resetTransactionObj();
    this.router.navigate(['/otpSession']);

    // console.log('delete beneficiary params: ', param);
    // this.http
    //   .callBankingAPIService(
    //     param,
    //     this.storage.getLocalStorage(this.constant.storage_deviceId),
    //     this.constant.serviceName_DELETEBENEFICIARY
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //     var resp = data.responseParameter;
    //     if (resp.opstatus == '00') {
    //       var index = this.arrayToDelete.findIndex(
    //         (obj) => obj.ID == this.elementToDelete.ID
    //       );
    //       this.arrayToDelete.splice(index, 1);

    //       this.closePopup();
    //       showToastMessage(resp.Result, 'success');
    //       // this.getBeneficiaryList();
    //     } else {
    //       this.errorCallBack(data.subActionId, resp);
    //     }
    //   });
  }

  /**
   * Set bank type code on tab selection
   */
  setBankTypeCode(code) {
    this.DataService.bankTypeCode = code;
    // switch (code) {
    //   case "1":
    //     console.log("own");
    //     this.ownPaginateConfig = {
    //       itemsPerPage: this.ownmaxselrow,
    //       currentPage: 1,
    //       totalItems: this.ownBenificiaryList.length
    //     };
    //     break;
    //   case "3":
    //     console.log("other");

    //     this.otherPaginateConfig = {
    //       itemsPerPage: this.othermaxselrow,
    //       currentPage: 1,
    //       totalItems: this.otherBenificiaryList.length
    //     }
    //     break;
    //   case "4":
    //     console.log("inter");
    //     this.interPaginateConfig = {
    //       itemsPerPage: this.intermaxselrow,
    //       currentPage: 1,
    //       totalItems: this.internationalBenificiaryList.length
    //     }
    //     break;
    // }
  }

  maxPaginateRowChange(event, type) {
    switch (type) {
      case 'own':
        console.log('own');
        this.ownPaginateConfig.itemsPerPage = this.ownmaxselrow;
        break;
      case 'other':
        console.log('other');
        this.otherPaginateConfig.itemsPerPage = this.othermaxselrow;
        break;
      case 'international':
        console.log('inter');
        this.interPaginateConfig.itemsPerPage = this.intermaxselrow;
        break;
    }
  }

  pageChanged(event, type) {
    switch (type) {
      case 'own':
        console.log('own');
        this.ownPaginateConfig.currentPage = event;
        break;
      case 'other':
        console.log('other');
        this.otherPaginateConfig.currentPage = event;
        break;
      case 'international':
        console.log('inter');
        this.interPaginateConfig.currentPage = event;
        break;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  searchAccount(event) {
    switch (this.bankSelection) {
      case 'mmid':
        if (this.searchText != '') {
          var payeeArray = this.tempMMIDPayeeList;
          var filterArray = payeeArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
          );
          this.mmidBankPayeeDetailsList = [];
          this.mmidBankPayeeDetailsList = filterArray;
        } else {
          this.mmidBankPayeeDetailsList = [];
          this.mmidBankPayeeDetailsList = this.tempMMIDPayeeList;
        }
        break;
      case 'within':
        if (this.searchText != '') {
          var payeeArray = this.tempWITHINPayeeList;
          var filterArray = payeeArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
          );
          this.withinBankPayeeDetailsList = [];
          this.withinBankPayeeDetailsList = filterArray;
        } else {
          this.withinBankPayeeDetailsList = [];
          this.withinBankPayeeDetailsList = this.tempWITHINPayeeList;
        }
        break;
      case 'outside':
        if (this.searchText != '') {
          var payeeArray = this.tempOUTSIDEPayeeList;
          var filterArray = payeeArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
          );
          this.outsideBankPayeeDetailsList = [];
          this.outsideBankPayeeDetailsList = filterArray;
        } else {
          this.outsideBankPayeeDetailsList = [];
          this.outsideBankPayeeDetailsList = this.tempOUTSIDEPayeeList;
        }
        break;
      case 'vpa':
        if (this.searchText != '') {
          var payeeArray = this.tempVPAPayeeList;
          var filterArray = payeeArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
          );
          this.vpaBankPayeeDetailsList = [];
          this.vpaBankPayeeDetailsList = filterArray;
        } else {
          this.vpaBankPayeeDetailsList = [];
          this.vpaBankPayeeDetailsList = this.tempVPAPayeeList;
        }
        break;
    }
  }

  sendMoneyy(payeeList) {
    console.log('sendMoneyyyy==================', JSON.stringify(payeeList));
    this.DataService.managePayeeToFundTransferData = payeeList;
    this.DataService.managePayeeToSend.selected = this.bankSelection;
    this.router.navigate(['/sendMoney']);
  }

  addPayee(addpayeselected) {
    console.log('selecteddddddddddddy==================', addpayeselected);
    this.DataService.managePayeeToAddpayee = addpayeselected;
    console.log(this.DataService.managePayeeToAddpayee);
    this.DataService.isEditPayee = false;
    this.DataService.withinBankPayeeList  = [ ...this.withinBankPayeeDetailsList , ...this.withinBankPendingPayeeDetails ]
    this.DataService.outsideBankPayeeList  = [ ...this.outsideBankPayeeDetailsList , ...this.outsideBankPendingPayeeDetails ]
    this.DataService.mmidBankPayeeList  = [ ...this.mmidBankPayeeDetailsList , ...this.mmidBankPendingPayeeDetails ]
    this.DataService.vpainBankPayeeList  = [ ...this.vpaBankPayeeDetailsList , ...this.vpaBankPendingPayeeDetails ]
    this.DataService.isAddPayeeFrompage = "/managePayee";
    this.router.navigate(['/addPayee']);
  }

  goToFavourite() {
    this.router.navigate(['/favoritePayee']);
    // this.favourite();
  }

  addFavourite(payeeList) {
    console.log('selected payeeList: ', payeeList);
    if (payeeList.isFavoriteTransaction == 'N') {
      console.log('favorite PayeeList===========', payeeList);
      var param = this.favouritePayeeService.AddfavouritePayee(
        payeeList.ID,
        this.bankSelection
      );
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceNmae_ADDFAVORITETRANSACTIONS
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          // showToastMessage(resp.Result,"Success");
          if (resp.opstatus == '00') {
            //showToastMessage(resp.Result, 'success');
            this.favoritePayeeResult = 'Payee added in favorite list';
            this.commonMethods.openPopup('div.popup-bottom.pop');
            this.getBeneficiaryList();
          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });
    } else {
      this.deleteFavourite(payeeList);
    }
  }

  deleteFavourite(payeeList) {
    console.log('favorite PayeeList===========', payeeList);
    var param = this.favouritePayeeService.DeletefavouritePayee(
      payeeList.ID,
      this.bankSelection
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceNmae_DELETEFAVORITETRANSACTIONS
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.favoritePayeeResult = 'Payee removed from favorite list';
          this.commonMethods.openPopup('div.popup-bottom.pop');
          //showToastMessage(resp.Result, 'success');
          this.getBeneficiaryList();
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }
}

export interface pageFomat {
  id: string;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}
