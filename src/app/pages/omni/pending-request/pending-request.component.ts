import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../app/services/data.service';
import { HttpRestApiService } from '../../../../app/services/http-rest-api.service';
import { AppConstants } from '../../../../app/app.constant';
import { LocalStorageService } from '../../../../app/services/local-storage-service.service';
import { PendingRequestService } from './pending-request.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {

  commonPageComponent: any;
  pendingOmniReq: any;
  pendingSearchQuery: any;


  constructor(
    public dataService: DataService,
    private router: Router,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private pendingRequestService: PendingRequestService,
    private commonMethod: CommonMethods,
    private loader: pageLoaderService,
  ) { }

  ngOnInit(): void {
    this.pageSettings();
    this.initialization();
  }
  initialization() {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('PENDING_REQUEST' , this.router.url)
    this.dataService.changeMessage(this.commonPageComponent);
    //api call to get the list of all omni channel
    var param = this.pendingRequestService.getOmniChannelReq();
    this.getPendingOmniChannel(param);
  }


  pageSettings() {
    if (window.innerWidth < 767) {

      this.commonPageComponent = {
        'headerType': 'TitleHeader',
        'titleName': 'Pending Request',
        'sidebarNAv': 'OmniNAv',
        'footer': 'none',

      }

    } else {
      this.commonPageComponent = {
        'headerType': 'innerHeader',
        'sidebarNAv': 'OmniNAv',
        'footer': 'innerFooter',

      }
    }
  }


  /**
   * function get all pending omni channel request
   */
  getPendingOmniChannel(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOMNICHANNELREQ).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus) {
        console.log(data.set.records);
        this.pendingOmniReq = data.set.records;
        // this.loader.showLoader();
        // setTimeout(()=>{                           //<<<---using ()=> syntax
        //   this.loader.hideLoader(); 
        //  }, 5000);
        this.pendingOmniReq.forEach(el => {
          switch (el.channelAction) {
            case this.constant.serviceName_ADDBENEFICIARY: {
              el.accountName = JSON.parse(el.reqData)["benefName"];
              el.accountNumber = JSON.parse(el.reqData)["beneficiary_account_no"];
              el.bankName = JSON.parse(el.reqData)["beneficiary_bank_name"];
              el.remarks = "-"; //TODO: ask for remark
              el.amount = JSON.parse(el.reqData)["amount"];
              el.benfName = JSON.parse(el.reqData)["benefName"];
              el.type = "addPayee";
              break;
            }
            case this.constant.serviceName_OWNFUNDTRANSFER: {
              el.accountName = "Own bank";//TODO: ask for bank name
              el.accountNumber = JSON.parse(el.reqData)["beneficiary_account_no"];
              el.bankName = "-";//TODO: ask for bank name
              el.remarks = JSON.parse(el.reqData)["remarks"];
              el.amount = JSON.parse(el.reqData)["amount"];
              el.benfName = "Own bank";//TODO: ask for bank name
              el.type = "fundTransfer";
              break;
            }
            case this.constant.serviceName_RTGSFUNDTRANSFER: {
              el.accountName = JSON.parse(el.reqData)["sender"];
              el.accountNumber = JSON.parse(el.reqData)["beneficiaryAccount"];
              el.bankName = JSON.parse(el.reqData)["recevier"];//TODO: ask for bank name
              el.remarks = JSON.parse(el.reqData)["remarks"];
              el.amount = JSON.parse(el.reqData)["amount"];
              el.benfName = JSON.parse(el.reqData)["sender"];
              el.type = "fundTransfer";
              break;
            }
            case this.constant.serviceName_NEFTFUNDTRANSFER: {
              el.accountName = JSON.parse(el.reqData)["benefName"];
              el.accountNumber = JSON.parse(el.reqData)["beneficiary_account_no"];
              el.bankName = "";//TODO: ask for bank name
              el.remarks = JSON.parse(el.reqData)["remarks"];
              el.amount = JSON.parse(el.reqData)["amount"];
              el.benfName = JSON.parse(el.reqData)["benefName"];
              el.type = "fundTransfer";
              break;
            }
            case this.constant.serviceName_STOPBULKCHEQUEPAYMENT: {
              el.accountNumber = JSON.parse(el.reqData)["accountno"]
              el.startChequeNo = JSON.parse(el.reqData)["startChequeNo"]
              el.stopChequeNo = JSON.parse(el.reqData)["stopChequeNo"]
              el.remarks = JSON.parse(el.reqData)["reasonForStoppingCheques"]
              el.type = "bulkChequeCancel";
              break;
            }
            case this.constant.serviceName_STOPCHEQUEPAYMENT: {
              el.accountNumber = JSON.parse(el.reqData)["accountno"];
              el.chequeNo = JSON.parse(el.reqData)["chequeNo"];
              el.remarks = JSON.parse(el.reqData)["remarks"]
              el.type = "stopCheque";
              break;
            }
            case this.constant.serviceName_ISSUECHEQUEBOOK: {
              el.accountNumber = JSON.parse(el.reqData)["accountno"];
              el.numberOfPages = JSON.parse(el.reqData)["numberOfPages"];
              el.address = JSON.parse(el.reqData)["cust_address"];
              el.type = "issueChequeBook";
              break;
            }

            case this.constant.serviceName_RECHARGEMOBILEDTHDATACARD: {
              let reqData = JSON.parse(el.reqData)
              el.accountno = reqData["accountno"];
              el.subscriber = reqData["numberToRecharge"];
              let operatorObj = this.getOperatorName(reqData);
              if(operatorObj){
                el.operatorName = operatorObj.operatorName;
                el.labelName = this.getOperatorDynamicIdByType(operatorObj.id)
              }else{
                el.operatorName = '-';
                el.labelName = '-'
              }
              
              el.amount = reqData["amount"];
              el.type = "DTH";
              break;
            }
            case this.constant.serviceName_WATERBILLPAYMENT: {
              let reqData = JSON.parse(el.reqData)
              el.accountno = reqData["accountno"];
              el.amount = reqData["amount"];
              el.billerTypeID = reqData['customerId'];
              let boardObj = this.getBoardName(reqData);
              if(boardObj){
                el.boardName = boardObj.boardName;
                el.labelName= this.getBoardDynamicIdByType(boardObj.id)
              }else{
                el.boardName = '-';
                el.labelName = '-'
              }
              
              el.type = "Water Bill Pay";
              break;
            }
            case this.constant.serviceName_PAYMOBILEBILL: {
              let reqData = JSON.parse(el.reqData)
              el.mobileNo = reqData["numberToPayBill"];
              el.amount = reqData["amount"];
              el.accountno = reqData["accountno"];
              el.type = "Mobile Recharge";
              break;
            }
            case this.constant.serviceName_INTERNATIONALTRANSFER: {
              console.log("el=====>");
              console.log(el);
              el.accountName = JSON.parse(el.reqData)["recevier"];
              el.accountNumber = JSON.parse(el.reqData)["senderAccount"];
              el.bankName = "";//TODO: ask for bank name
              el.remarks = JSON.parse(el.reqData)["remarks"];
              el.amount = JSON.parse(el.reqData)["amount"];
              el.benfName = JSON.parse(el.reqData)["recevier"];
              el.type = "fundTransfer";
              break;
            }
          }
          el.responce = JSON.parse(el.reqData);
        });
        console.log(this.pendingOmniReq);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }


  /**
   * function to delete pending request
   * @requestDtl
   */
  deleteReq(requestDtl) {
    console.log(requestDtl);
    this.router.navigate(['/dashboard']);
  }

  /**
   * function to proceed transaction
   * @requestDtl
   */
  proceedPendingTransaction(requestDtl) {
    console.log(requestDtl);
    requestDtl.responce.deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
    this.dataService.request = this.pendingRequestService.getPendingRequestMapParam(requestDtl.responce);
    this.dataService.endPoint = requestDtl.channelAction;
    this.dataService.transactionReceiptObj.from_acc = requestDtl.channelAction == this.constant.serviceName_RTGSFUNDTRANSFER ?  requestDtl.responce?.senderAccount : requestDtl.responce?.accountno;
    this.dataService.transactionReceiptObj.to_acc = requestDtl.channelAction == this.constant.serviceName_RTGSFUNDTRANSFER ? requestDtl.responce?.beneficiaryAccount : requestDtl.responce?.beneficiary_account_no;
    this.dataService.transactionReceiptObj.payee_name = requestDtl.channelAction == this.constant.serviceName_RTGSFUNDTRANSFER ? requestDtl.responce?.sender : requestDtl.responce?.benefName;
    this.dataService.transactionReceiptObj.amount = requestDtl.responce?.amount;
    this.dataService.transactionReceiptObj.remarks = requestDtl.responce?.remarks;
    this.dataService.referenceNo = requestDtl.referenceNumber;
    this.dataService.otpSessionPreviousPage = "/pendingRequest"


    if (requestDtl.service_Type == "ADDBENEFICIARY") {
      this.dataService.screenType = 'addPayee';
      this.dataService.authorizeHeader = "Add Payee";
    }
    else if (requestDtl.service_Type == "ISSUECHEQUEBOOK") {
      this.dataService.screenType = 'chequeBookRequest';
      this.dataService.authorizeHeader = "Cheque Book Request";
    } else if (requestDtl.service_Type == "RECHARGEMOBILEDTHDATACARD") {
      this.dataService.screenType = 'DTHBillPay';
      this.dataService.authorizeHeader = "DTH Bill Pay";
       this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno = requestDtl.accountno;
      this.dataService.billPayObj.operatorName =requestDtl.operatorName;
      this.dataService.billPayObj.dynamicID = requestDtl.subscriber ;
      this.dataService.billPayObj.labelName = requestDtl.labelName;
      this.dataService.billPayObj.amount=  requestDtl.amount;
    } else if (requestDtl.service_Type == "WATERBILLPAYMENT") {
      this.dataService.screenType = 'waterBillPay';
      this.dataService.authorizeHeader = "Water Bill Pay";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno= requestDtl.accountno;
      this.dataService.billPayObj.boardName= requestDtl.boardName;
      this.dataService.billPayObj.billNo = requestDtl.billerTypeID ;
      this.dataService.billPayObj.labelName = requestDtl.labelName ;
      this.dataService.billPayObj.amount=  requestDtl.amount;
    } else if (requestDtl.service_Type == "PAYUTILITYMOBILEPOSTPAIDBILL") {
      this.dataService.screenType = 'mobileRecharge';
      this.dataService.authorizeHeader = "Mobile Recharge";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.type = requestDtl.requestType == "PREPAIDMOBILE" ? 'Prepaid' : 'Postpaid';
      this.dataService.billPayObj.mobileNo = requestDtl.mobileNo;
      this.dataService.billPayObj.operator= requestDtl.responce?.operator;
      this.dataService.billPayObj.amount= requestDtl.amount;
      this.dataService.billPayObj.accountno= requestDtl.accountno;

    }

    else if (requestDtl.service_Type == "INTERNATIONALTRANSFER") {
      this.dataService.screenType = 'fundTransfer';
      this.dataService.authorizeHeader = "International Account";
      
      this.dataService.transactionReceiptObj.from_acc = requestDtl.responce?.senderAccount;
      this.dataService.transactionReceiptObj.to_acc = requestDtl.responce?.beneficiaryAccount;
      this.dataService.transactionReceiptObj.payee_name= requestDtl.responce?.recevier;
      this.dataService.transactionReceiptObj.amount= requestDtl.responce?.amount;
      this.dataService.transactionReceiptObj.remarks= requestDtl.responce?.remarks;
      // this.dataService.transactionReceiptObj.internationalTransfer= requestDtl.responce?.;

      console.log(this.dataService.transactionReceiptObj);
    }
    else {
      this.dataService.screenType = 'fundTransfer';
      this.dataService.authorizeHeader = "Other Account";
    }

    this.router.navigate(['/otpSession']);
  }

  /**
   * function to get list of board name
   * @reqData
   */
  getBoardName(reqData) {
    let boardTypeId = reqData.boardType;
    return this.constant.waterSupplyBoardList.filter(obj => obj.id == boardTypeId)[0];
  }

  /**
   * function to get list of operator name
   * @reqData
   */
  getOperatorName(reqData) {
    let operatorTypeID = reqData.operatorType;
    return this.constant.operatorList.filter(obj => obj.id == operatorTypeID)[0];
  }

  /**
   * function to get operator Id
   * @operatorType
   */
  getOperatorDynamicIdByType(operatorType) {
    switch (operatorType) {
      case '0':
        return "Customer Id";
      case '1':
        return "Registered Mobile No./Viewing Card No.";
      case '2':
        return "Smart Card Number";
      case '3':
        return "Registered Mobile No./Subscriber ID";
      case '4':
        return "Registered Mobile No./Subscriber ID";

      //TODO : Add other labels depends on bank requirement

      default:
        break;
    }
  }

  /**
   * function to get Borad dynamic id
   * @boardType
   */
  getBoardDynamicIdByType(boardType) {
    switch (boardType) {
      case '0':
        return "RR No";
      case '1':
        return "Connection ID";
      case '2':
        return "Customer ID";
      case '3':
        return "K Number";
      case '4':
        return "Consumer Number";

      //TODO : Add other labels depends on bank requirement

      default:
        break;
    }
  }
}
