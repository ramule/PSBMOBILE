(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{ce2j:function(t,e,c){"use strict";c.d(e,"a",(function(){return l}));var i=c("fXoL"),s=c("5IsW"),a=c("fHQ/"),n=c("H9Rt"),o=c("EnSQ"),r=c("au7T");let l=(()=>{class t{constructor(t,e,c,i,s){this.constant=t,this.encryptDecryptService=e,this.storage=c,this.dataService=i,this.commonMethod=s}getUserLocation(){this.dataService.getCurrentLatLong().subscribe(t=>{console.log("GeoLocation Plugin => getCurrentLatLong Success => ",t),console.log(this.dataService.latitude),console.log(this.dataService.longitude),this.latitude=this.dataService.latitude?this.dataService.latitude:"0",this.longitude=this.dataService.longitude?this.dataService.longitude:"0",this.dataService.getUserLocationName(this.latitude,this.longitude).subscribe(t=>{console.log("data",t),console.log("dataservice.userLocationName => ",this.dataService.userLocationName),this.userLocationName=this.dataService.userLocationName},t=>{console.log("err",t)})},t=>{console.log("GeoLocation Plugin => getCurrentLatLong Error => ",t)})}getPayRecentRequest(){var t={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBANKDETAILLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_mobileAppVersion,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_entityID]:this.constant.val_upi_psb}};return console.log("getVerifyRequest ",JSON.stringify(t)),this.getOmniRequestObject(t)}getFavoritePayeeRequest(){var t={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBANKDETAILLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_mobileAppVersion,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_entityID]:this.constant.val_upi_psb}};return console.log("getVerifyRequest ",JSON.stringify(t)),this.getOmniRequestObject(t)}getVerifyRequest(){var t={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB)};console.log("getVerifyRequest ",JSON.stringify(t)),this.getOmniRequestObject(t)}getBankListRequest(){var t={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBANKDETAILLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_mobileAppVersion,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_entityID]:this.constant.val_upi_psb}};return console.log("getVerifyRequest ",JSON.stringify(t)),this.getOmniRequestObject(t)}setValidateRequest(t,e,c){var i={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_VALIDATEADDRESS,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_payeeDetails]:[{[this.constant.key_upi_payeeName]:t.upiIdOrMobno.replace(/\s/g,""),[this.constant.key_upi_payeeAddr]:t.upiIdOrMobno.replace(/\s/g,"")}],[this.constant.key_upi_payerAddr]:e.vpaDetails.paymentAddress,[this.constant.key_upi_txnNote]:this.constant.val_upi_PayReq,[this.constant.key_upi_payerName]:e.vpaDetails.paymentAddress,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_refID]:c,[this.constant.key_upi_refUrl]:this.constant.val_upi_refUrl,[this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi(),[this.constant.key_upi_txnID]:c,[this.constant.key_upi_txnType]:this.constant.val_upi_PAY}};return console.log("setValidateRequest => ",JSON.stringify(i)),this.getOmniRequestObject(i)}setDefaultVPARequest(t){var e={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETDEFAULTVPA,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_beneMobileNo]:this.commonMethod.processPhoneNo(t),[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_language]:this.storage.hasKeyLocalStorage(this.constant.storage_language)?this.storage.getLocalStorage(this.constant.storage_language):this.constant.val_default_lang}};return console.log("setDefaultVPARequest ",JSON.stringify(e)),this.getOmniRequestObject(e)}setVerifyBranchRequest(t){var e={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_FETCHBANKNAME,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_language]:this.storage.hasKeyLocalStorage(this.constant.storage_language)?this.storage.getLocalStorage(this.constant.storage_language):this.constant.val_default_lang,[this.constant.key_upi_ifsc]:t}};return console.log("setDefaultVPARequest ",JSON.stringify(e)),this.getOmniRequestObject(e)}getVpaAccountList(){var t={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_language]:this.storage.hasKeyLocalStorage(this.constant.storage_language)?this.storage.getLocalStorage(this.constant.storage_language):this.constant.val_default_lang,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))}};return this.getOmniRequestObject(t)}getOmniRequestObject(t){return t=t,this.inputData={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_upiRequest]:JSON.stringify(t)},console.log("getOmniRequestObject Input",JSON.stringify(this.inputData)),this.getEncryptedOmniRequestObject()}getEncryptedOmniRequestObject(){console.log("Request Before Encrypt",JSON.stringify(this.inputData));let t=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(this.inputData));return console.log("getEncryptedOmniRequestObject => ",JSON.stringify(t)),t}}return t.\u0275fac=function(e){return new(e||t)(i.ic(s.a),i.ic(a.a),i.ic(n.a),i.ic(o.a),i.ic(r.a))},t.\u0275prov=i.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},oCcT:function(t,e,c){"use strict";c.r(e),c.d(e,"RecentTransactionModule",(function(){return O}));var i=c("ofXK"),s=c("tyNb"),a=c("wd/R"),n=c("fXoL"),o=c("EnSQ"),r=c("jOLR"),l=c("L7Xq"),d=c("H9Rt"),h=c("5IsW"),p=c("RZqO"),u=c("oBZJ"),g=c("ce2j"),v=c("Eioz"),m=c("AIZJ");const b=["content"];function _(t,e){if(1&t&&n.Zb(0,"img",36),2&t){const t=n.pc();n.uc("src",t.DataService.recentTransactionUPI.beneImageUrl,n.Jc)}}function S(t,e){if(1&t&&(n.ec(0,"h5"),n.Sc(1),n.qc(2,"firstLastChar"),n.dc()),2&t){const t=n.pc();n.Mb(1),n.Uc("",n.rc(2,1,t.DataService.recentTransactionUPI.nickName)," ")}}function y(t,e){if(1&t&&(n.ec(0,"h5"),n.ec(1,"span"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.Sc(4),n.dc()),2&t){const t=n.pc();n.Mb(2),n.Uc("",n.rc(3,2,"UPI_ID")," : "),n.Mb(2),n.Uc(" ",t.DataService.recentTransactionUPI.beneVpa," ")}}function T(t,e){if(1&t&&(n.ec(0,"h5"),n.ec(1,"span"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.Sc(4),n.qc(5,"maskAccountNo"),n.Zb(6,"br"),n.ec(7,"span"),n.Sc(8),n.qc(9,"translate"),n.dc(),n.Sc(10),n.Zb(11,"br"),n.dc()),2&t){const t=n.pc();n.Mb(2),n.Uc("",n.rc(3,4,"ACCOUNT_NUMBER")," : "),n.Mb(2),n.Uc(" ",n.rc(5,6,t.DataService.recentTransactionUPI.beneAccount)," "),n.Mb(4),n.Uc("",n.rc(9,8,"IFSC_CODE")," : "),n.Mb(2),n.Uc(" ",t.DataService.recentTransactionUPI.beneIfsc," ")}}function f(t,e){if(1&t){const t=n.fc();n.ec(0,"div",42),n.ec(1,"div",21),n.ec(2,"div",20),n.ec(3,"div",43),n.ec(4,"h5",44),n.Zb(5,"img",45),n.Sc(6),n.dc(),n.ec(7,"h6"),n.Sc(8),n.qc(9,"translate"),n.dc(),n.ec(10,"div",46),n.ec(11,"span",47),n.Zb(12,"img",48),n.dc(),n.ec(13,"em",49),n.Sc(14),n.qc(15,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(16,"div",50),n.ec(17,"div",51),n.ec(18,"em"),n.Sc(19),n.dc(),n.dc(),n.ec(20,"div",52),n.ec(21,"button",53),n.lc("click",(function(){n.Hc(t);const e=n.pc().$implicit;return n.pc(2).goToTransactionDetail(e)})),n.Zb(22,"img",54),n.dc(),n.dc(),n.dc(),n.ec(23,"div",55),n.ec(24,"em"),n.Sc(25),n.dc(),n.dc(),n.dc()}if(2&t){const t=n.pc().$implicit;n.Mb(6),n.Tc(t.AMOUNT),n.Mb(2),n.Tc(n.rc(9,5,"MONEY_RECEIVED")),n.Mb(6),n.Tc(n.rc(15,7,"SUCCESS")),n.Mb(5),n.Uc("",t.REMARKS," "),n.Mb(6),n.Tc(t.DATETIME)}}function D(t,e){if(1&t){const t=n.fc();n.ec(0,"div",56),n.ec(1,"div",21),n.ec(2,"div",20),n.ec(3,"div",43),n.ec(4,"h5",57),n.Zb(5,"img",58),n.Sc(6),n.dc(),n.ec(7,"h6"),n.Sc(8),n.qc(9,"translate"),n.dc(),n.ec(10,"div",46),n.ec(11,"span",47),n.Zb(12,"img",59),n.dc(),n.ec(13,"em",49),n.Sc(14),n.qc(15,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(16,"div",50),n.ec(17,"div",51),n.ec(18,"em"),n.Sc(19),n.dc(),n.dc(),n.ec(20,"div",52),n.ec(21,"button",53),n.lc("click",(function(){n.Hc(t);const e=n.pc().$implicit;return n.pc(2).goToTransactionDetail(e)})),n.Zb(22,"img",54),n.dc(),n.dc(),n.dc(),n.ec(23,"div",55),n.ec(24,"em"),n.Sc(25),n.dc(),n.dc(),n.dc()}if(2&t){const t=n.pc().$implicit;n.Mb(6),n.Tc(t.AMOUNT),n.Mb(2),n.Uc("",n.rc(9,5,"MONEY_SENT")," "),n.Mb(6),n.Tc(n.rc(15,7,"SUCCESS")),n.Mb(5),n.Tc(t.REMARKS),n.Mb(6),n.Tc(t.DATETIME)}}function I(t,e){if(1&t){const t=n.fc();n.ec(0,"div",60),n.ec(1,"div",21),n.ec(2,"div",20),n.ec(3,"div",43),n.ec(4,"h5",61),n.Zb(5,"img",62),n.Sc(6),n.dc(),n.ec(7,"h6"),n.Sc(8),n.qc(9,"translate"),n.qc(10,"translate"),n.dc(),n.ec(11,"div",46),n.ec(12,"span",63),n.Zb(13,"img",64),n.dc(),n.ec(14,"em",65),n.Sc(15),n.qc(16,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(17,"div",50),n.ec(18,"div",51),n.ec(19,"em"),n.Sc(20),n.dc(),n.dc(),n.ec(21,"div",52),n.ec(22,"button",53),n.lc("click",(function(){n.Hc(t);const e=n.pc().$implicit;return n.pc(2).goToTransactionDetail(e)})),n.Zb(23,"img",54),n.dc(),n.dc(),n.dc(),n.ec(24,"div",55),n.ec(25,"em"),n.Sc(26),n.dc(),n.dc(),n.dc()}if(2&t){const t=n.pc().$implicit;n.Mb(6),n.Tc(t.AMOUNT),n.Mb(2),n.Tc("COLLECT"==t.requestType?n.rc(9,5,"COLLECT_REQUEST"):n.rc(10,7,t.requestType)),n.Mb(7),n.Tc(n.rc(16,9,"FAILED")),n.Mb(5),n.Tc(t.REMARKS),n.Mb(6),n.Tc(t.DATETIME)}}function A(t,e){if(1&t){const t=n.fc();n.ec(0,"div",60),n.ec(1,"div",21),n.ec(2,"div",20),n.ec(3,"div",43),n.ec(4,"h5",61),n.Zb(5,"img",62),n.Sc(6),n.dc(),n.ec(7,"h6"),n.Sc(8),n.qc(9,"translate"),n.qc(10,"translate"),n.dc(),n.ec(11,"div",46),n.ec(12,"span",66),n.Zb(13,"img",67),n.dc(),n.ec(14,"em",68),n.Sc(15),n.qc(16,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(17,"div",50),n.ec(18,"div",51),n.ec(19,"em"),n.Sc(20),n.dc(),n.dc(),n.ec(21,"div",52),n.ec(22,"button",53),n.lc("click",(function(){n.Hc(t);const e=n.pc().$implicit;return n.pc(2).goToTransactionDetail(e)})),n.Zb(23,"img",54),n.dc(),n.dc(),n.dc(),n.ec(24,"div",55),n.ec(25,"em"),n.Sc(26),n.dc(),n.dc(),n.dc()}if(2&t){const t=n.pc().$implicit;n.Mb(6),n.Tc(t.AMOUNT),n.Mb(2),n.Uc(" ","COLLECT"==t.requestType?n.rc(9,5,"COLLECT_REQUEST"):n.rc(10,7,t.requestType)," "),n.Mb(7),n.Tc(n.rc(16,9,"EXPIRED")),n.Mb(5),n.Tc(t.REMARKS),n.Mb(6),n.Tc(t.DATETIME)}}function N(t,e){if(1&t){const t=n.fc();n.ec(0,"div",60),n.ec(1,"div",21),n.ec(2,"div",20),n.ec(3,"div",43),n.ec(4,"h5",61),n.Zb(5,"img",62),n.Sc(6),n.dc(),n.ec(7,"h6"),n.Sc(8),n.qc(9,"translate"),n.qc(10,"translate"),n.dc(),n.ec(11,"div",46),n.ec(12,"span",69),n.Zb(13,"img",70),n.dc(),n.ec(14,"em",68),n.Sc(15),n.qc(16,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(17,"div",50),n.ec(18,"div",51),n.ec(19,"em"),n.Sc(20),n.dc(),n.dc(),n.ec(21,"div",52),n.ec(22,"button",53),n.lc("click",(function(){n.Hc(t);const e=n.pc().$implicit;return n.pc(2).goToTransactionDetail(e)})),n.Zb(23,"img",54),n.dc(),n.dc(),n.dc(),n.ec(24,"div",55),n.ec(25,"em"),n.Sc(26),n.dc(),n.dc(),n.dc()}if(2&t){const t=n.pc().$implicit;n.Mb(6),n.Tc(t.AMOUNT),n.Mb(2),n.Uc("","COLLECT"==t.requestType?n.rc(9,5,"COLLECT_REQUEST"):n.rc(10,7,t.requestType)," "),n.Mb(7),n.Tc(n.rc(16,9,"PENDING")),n.Mb(5),n.Tc(t.REMARKS),n.Mb(6),n.Tc(t.DATETIME)}}function P(t,e){if(1&t&&(n.ec(0,"li"),n.Rc(1,f,26,9,"div",39),n.Rc(2,D,26,9,"div",40),n.Rc(3,I,27,11,"div",41),n.Rc(4,A,27,11,"div",41),n.Rc(5,N,27,11,"div",41),n.dc()),2&t){const t=e.$implicit;n.Mb(1),n.uc("ngIf","CR"==t.TYPE&&"COMPLETED"==t.TRNSTATUS),n.Mb(1),n.uc("ngIf","DR"==t.TYPE&&"COMPLETED"==t.TRNSTATUS),n.Mb(1),n.uc("ngIf","FAILED"==t.TRNSTATUS),n.Mb(1),n.uc("ngIf","EXPIRED"==t.TRNSTATUS),n.Mb(1),n.uc("ngIf","PENDING"==t.TRNSTATUS)}}function R(t,e){if(1&t&&(n.ec(0,"div",18),n.ec(1,"ul",37),n.Rc(2,P,6,5,"li",38),n.dc(),n.dc()),2&t){const t=n.pc();n.Mb(2),n.uc("ngForOf",t.recentTransactionList)}}function L(t,e){if(1&t){const t=n.fc();n.ec(0,"div",74),n.ec(1,"button",72),n.lc("click",(function(){return n.Hc(t),n.pc(2).proceed("collectRecentRequest")})),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()}2&t&&(n.Mb(2),n.Tc(n.rc(3,1,"COLLECT")))}function E(t,e){if(1&t){const t=n.fc();n.ec(0,"div",18),n.ec(1,"div",71),n.ec(2,"button",72),n.lc("click",(function(){return n.Hc(t),n.pc().proceed("payUpi")})),n.Sc(3),n.qc(4,"translate"),n.dc(),n.dc(),n.Rc(5,L,4,3,"div",73),n.dc()}if(2&t){const t=n.pc();n.Mb(1),n.uc("ngClass","ACCOUNT"!=t.DataService.recentTransactionUPI.txnMode?"col-6 col-md-6 text-center":"col-12 col-md-12 text-center"),n.Mb(2),n.Tc(n.rc(4,3,"PAY")),n.Mb(2),n.uc("ngIf","ACCOUNT"!=t.DataService.recentTransactionUPI.txnMode)}}const M=[{path:"",component:(()=>{class t{constructor(t,e,c,i,s,a,n,o,r,l){this.router=t,this.DataService=e,this.location=c,this.transactionListService=i,this.http=s,this.storage=a,this.constant=n,this.truncatePipe=o,this.pluginService=r,this.payUpiService=l,this.headerdata={headerType:"none",titleName:"",footertype:"none"},this.recentTransactionList=[],this.transactions=[],this.transactionsListFilter=[],this.isListSorted=!1,this.scrollToBottom=()=>{try{this.content.nativeElement.scrollTop=this.content.nativeElement.scrollHeight}catch(t){}}}ngOnInit(){this.recentPayeeName=this.truncatePipe.transform(this.DataService.recentTransactionUPI.nickName),history.pushState({},"upiDashboard",this.location.prepareExternalUrl("upiDashboard")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),console.log("DataService.recentTransactionUPI"),console.log(this.DataService.recentTransactionUPI),this.defaultVPAAccountDetails=this.getDefaultVpaAccountDetails(),this.DataService.changeMessage(this.headerdata),console.log("this.DataService.upiTransactionList"),console.log(this.DataService.upiTransactionList),console.log("this.DataService.upiCallTransactionHistoryApi = ",this.DataService.upiCallTransactionHistoryApi),this.DataService.upiCallTransactionHistoryApi?this.getParamTransactionListBankingService():(this.isListSorted=!0,this.setTransactionsList(this.DataService.upiTransactionList))}goToTransactionDetail(t){this.DataService.isRaiseComplaint=!1,this.DataService.baseStartUrl=this.DataService.currentPageUrl,this.DataService.selectedUPITranForFurtherProcess(t),this.DataService.routeWithNgZone("transactionDetails")}getParamTransactionListBankingService(){var t=this.transactionListService.getParamTransactionList();this.callTransactionListBankingService(t)}getDefaultVpaAccountDetails(){let t=this.DataService.vpaAddressList.find(t=>"Y"==t.default);if(t)return{vpaDetails:t,accountDetails:this.getDefaultAccountNoByVpa(t.accounts)};if(this.DataService.vpaAddressList.length>0){let t=this.DataService.vpaAddressList;t.map((t,e)=>{t.default=0==e?"Y":"N"});let e=t.find(t=>"Y"==t.default);if(e)return{vpaDetails:e,accountDetails:this.getDefaultAccountNoByVpa(e.accounts)}}}getDefaultAccountNoByVpa(t){if(t.length>0)return t.find(t=>"Y"==t.isDefaultAccount)}callTransactionListBankingService(t){console.log(t),this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICE,!0).subscribe(t=>{console.log(t);var e=t.responseParameter;if("00"==e.opstatus){console.log(t.responseParameter);var c=e.upiResponse;c.responseParameter.transactions.length>0&&(this.isListSorted=!1,this.setTransactionsList(c.responseParameter.transactions))}})}setTransactionsList(t){console.log("this.isListSorted",this.isListSorted),this.transactions=this.isListSorted?t:t.sort((t,e)=>0-(t>e?-1:1)),this.isListSorted=!0,console.log(" SORTED => this.transactions"),console.log(this.transactions),this.DataService.upiTransactionList=t,this.DataService.upiCallTransactionHistoryApi=!1,this.getTransactionsByVpa()}getTransactionsByVpa(){let t=this.DataService.recentTransactionUPI.beneVpa;this.transactions.map(e=>{(e.PAYEEADDR&&e.PAYEEADDR.toUpperCase()==t.toUpperCase()||e.PAYERADDR&&e.PAYERADDR.toUpperCase()==t.toUpperCase())&&(this.recentTransactionList.push(e),this.payeeCode=e.payeeCode)}),setTimeout(()=>{this.scrollToBottom()}),this.recentTransactionList.forEach(t=>{t.DATETIME=a(t.DATETIME).format("DD MMM yyyy hh:mm a")})}goToPage(t){this.DataService.routeWithNgZone(t)}proceed(t){var e;"collectRecentRequest"==t?(this.payType="COLLECT",this.pluginService.getTransactionId().subscribe(t=>{e=this.payUpiService.setValidateRequest({upiIdOrMobno:this.DataService.recentTransactionUPI.beneVpa},this.defaultVPAAccountDetails,t),this.UpiApiCall(e)})):(this.DataService.upiPayRequest.validatedVpaAdress=this.DataService.recentTransactionUPI.beneVpa,this.pluginService.getTransactionId().subscribe(t=>{this.payeeObj={},this.payeeObj.acctNum=this.DataService.recentTransactionUPI.beneAccount,this.payeeObj.bankIfsc=this.DataService.recentTransactionUPI.beneIfsc,this.payeeObj.bankPayeeName=this.DataService.recentTransactionUPI.nickName,this.payeeObj.reActNum=this.DataService.recentTransactionUPI.beneAccount,this.payeeObj.payType=this.DataService.recentTransactionUPI.txnMode,this.DataService.upiPayRequest.amount="",this.DataService.upiPayRequest.remarks="",e=this.payUpiService.setValidateRequest({upiIdOrMobno:this.DataService.recentTransactionUPI.beneVpa},this.defaultVPAAccountDetails,t),this.UpiApiCall(e)})),this.DataService.fromRecentTransaction=!1}UpiApiCall(t){this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(t=>{let e=t.responseParameter.upiResponse;if("00"==e.status)switch(e.subActionId){case this.constant.upiserviceName_VALIDATEADDRESS:console.log("this.DataService.verifyAddressResp"),"COLLECT"==this.payType?(this.DataService.validateAddressResp=e.responseParameter,this.goToPage("collectAmount")):(e.responseParameter.validatedVpa==this.DataService.recentTransactionUPI.beneVpa&&"ACCOUNT"==this.DataService.recentTransactionUPI.txnMode?this.DataService.verifyAddressResp=this.payeeObj:(this.DataService.verifyAddressResp=e.responseParameter,this.DataService.verifyAddressResp.payType=this.payeeObj.payType),this.goToPage("payUpiPayment"))}},t=>{console.log("ERROR!",t)})}goBack(){this.location.back()}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(s.c),n.Yb(o.a),n.Yb(i.n),n.Yb(r.a),n.Yb(l.a),n.Yb(d.a),n.Yb(h.a),n.Yb(p.c),n.Yb(u.a),n.Yb(g.a))},t.\u0275cmp=n.Sb({type:t,selectors:[["app-recent-transaction"]],viewQuery:function(t,e){var c;1&t&&n.Yc(b,!0),2&t&&n.Dc(c=n.mc())&&(e.content=c.first)},decls:44,vars:7,consts:[[1,"main"],[1,"global-header","brand-bg2","minus-nav"],[1,"in-header"],[1,"header-icons-lft"],[1,"header-actions"],[1,"ux-button-header",3,"click"],["src","assets/images/svg/left-arrow.svg","alt","left-arrow-icon",1,"img-small"],[1,"brand-logo"],[1,"custom-h3"],[1,"img-info"],[1,"green1"],["alt","user-img",3,"src",4,"ngIf"],[4,"ngIf"],[1,"header-icons-rit"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","pad-b30"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"green-bg2"],[1,"full-container"],[1,"col-12","col-md-12"],[1,"left-info"],[1,"white-bg-custom4"],[1,"innerbg-section"],["content",""],["class","row",4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"powered-logo3"],["src","assets/images/svg/powered-by-upi-big.svg","alt","powered-upi-logo"],["alt","user-img",3,"src"],[1,"transaction-list"],[4,"ngFor","ngForOf"],["class","receive-info1",4,"ngIf"],["class","sent-info1",4,"ngIf"],["class","failed-info",4,"ngIf"],[1,"receive-info1"],[1,"transaction-info"],[1,"received"],["src","assets/images/svg/rupee-g.svg","alt","rupees-icon"],[1,"rupee-info"],[1,"green"],["src","assets/images/svg/down-arrow-g.svg","alt","received-money-icon"],[1,"success"],[1,"row1","mar-t"],[1,"col-8","col-md-8"],[1,"col-4","col-md-4","text-right"],[1,"btn-icon",3,"click"],["src","assets/images/svg/arrow-right-g2.svg","alt","right-arrow-icon"],[1,"time-info"],[1,"sent-info1"],[1,"send"],["src","assets/images/svg/rupee-r.svg","alt","rupees-icon"],["src","assets/images/svg/up-arrow-r.svg","alt","send-money-icon"],[1,"failed-info"],[1,"default"],["src","assets/images/svg/rupee-grey.svg","alt","rupees-icon"],[1,"red"],["src","assets/images/svg/failed.svg","alt","failed-icon"],[1,"error"],[1,"grey"],["src","assets/images/svg/expired1.svg","alt","polygon-icon"],[1,"expired"],[1,"yellow"],["src","assets/images/svg/pending-icon1.svg","alt","polygon-icon"],[3,"ngClass"],[1,"ux-button","primary","md",3,"click"],["class","col-6 col-md-6 text-center",4,"ngIf"],[1,"col-6","col-md-6","text-center"]],template:function(t,e){1&t&&(n.ec(0,"div",0),n.ec(1,"header",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"button",5),n.lc("click",(function(){return e.goBack()})),n.Zb(6,"img",6),n.dc(),n.dc(),n.dc(),n.ec(7,"div",7),n.ec(8,"h3",8),n.ec(9,"div",9),n.ec(10,"span",10),n.Rc(11,_,1,1,"img",11),n.Rc(12,S,3,3,"h5",12),n.dc(),n.dc(),n.Sc(13),n.dc(),n.dc(),n.ec(14,"div",13),n.Zb(15,"div",4),n.dc(),n.dc(),n.dc(),n.ec(16,"div",14),n.ec(17,"div",15),n.ec(18,"div",16),n.ec(19,"div",17),n.ec(20,"div",18),n.ec(21,"div",19),n.ec(22,"div",20),n.ec(23,"div",21),n.ec(24,"div",22),n.ec(25,"div",23),n.ec(26,"div",24),n.ec(27,"div",21),n.ec(28,"div",25),n.ec(29,"div",26),n.Rc(30,y,5,4,"h5",12),n.Rc(31,T,12,10,"h5",12),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(32,"div",27),n.ec(33,"div",28,29),n.Rc(35,R,3,1,"div",30),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(36,"div",31),n.ec(37,"div",32),n.ec(38,"div",17),n.Rc(39,E,6,5,"div",30),n.ec(40,"div",18),n.ec(41,"div",33),n.ec(42,"div",34),n.Zb(43,"img",35),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&t&&(n.Mb(11),n.uc("ngIf",e.DataService.recentTransactionUPI.beneImageUrl),n.Mb(1),n.uc("ngIf",!e.DataService.recentTransactionUPI.beneImageUrl),n.Mb(1),n.Uc(" ",e.recentPayeeName,""),n.Mb(17),n.uc("ngIf","ACCOUNT"!=e.DataService.recentTransactionUPI.txnMode),n.Mb(1),n.uc("ngIf","ACCOUNT"==e.DataService.recentTransactionUPI.txnMode),n.Mb(4),n.uc("ngIf",e.recentTransactionList.length>0),n.Mb(4),n.uc("ngIf","0000"==e.payeeCode))},directives:[i.t,i.s,i.q],pipes:[p.a,v.a,m.a],styles:[""]}),t})()}];let k=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[s.g.forChild(M)],s.g]}),t})();var U=c("PCNd");let O=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[i.c,U.a,k]]}),t})()}}]);