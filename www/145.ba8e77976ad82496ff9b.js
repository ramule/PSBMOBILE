(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{"4oXj":function(t,e,i){"use strict";i.d(e,"a",(function(){return p}));var a=i("fXoL"),s=i("5IsW"),c=i("fHQ/"),n=i("H9Rt"),o=i("EnSQ"),r=i("au7T"),d=i("oBZJ"),l=i("L7Xq");let p=(()=>{class t{constructor(t,e,i,a,s,c,n,o,r){this.constant=t,this.encryptDecryptService=e,this.storage=i,this.dataService=a,this.commonMethod=s,this.pluginService=c,this.localStorage=n,this.http=o,this.ngZone=r}getUserLocation(){this.latitude=this.dataService.latitude?this.dataService.latitude:"0",this.longitude=this.dataService.longitude?this.dataService.longitude:"0",this.userLocationName=this.dataService.userLocationName}setAddBenificiaryRequest(t,e,i,a){var s=this.dataService.ScanQrCodeData?this.dataService.ScanQrCodeData:{},c={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_ADDBENIFICIARY,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_payeeName]:t.payeeName,[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_nickName]:t.nickName,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_is_Favourite]:t.isFavourite,[this.constant.key_upi_appID]:this.constant.val_upi_psb,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return e?(c[this.constant.key_upi_inputParam][this.constant.key_upi_accNum]=this.dataService.upiBenfAccNo?this.dataService.upiBenfAccNo:s.qrAccountNo,c[this.constant.key_upi_inputParam][this.constant.key_upi_ifsc]=this.dataService.upiBenfIfsc?this.dataService.upiBenfIfsc:s.qrIfsc):i?c[this.constant.key_upi_inputParam][this.constant.key_upi_payeeVPA]=t.payeeVPA:a&&(c[this.constant.key_upi_inputParam][this.constant.key_upi_mmid]=this.dataService.upiBenfMMId),console.log("setAddBenificiaryRequest ",JSON.stringify(c)),this.getOmniRequestObject(c)}getOmniRequestObject(t){t=t;var e={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_upiRequest]:JSON.stringify(t)};return console.log("inputData => ",JSON.stringify(e)),this.getEncryptedOmniRequestObject(e)}getBenficiaryListReq(t,e){var i={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBENIFICIARYLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_beneListType]:t,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_beneListMode]:e,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return console.log("getBenficiaryListReq ",JSON.stringify(i)),this.getOmniRequestObject(i)}getEncryptedOmniRequestObject(t){console.log("session Key : ",this.storage.getSessionStorage(this.constant.val_sessionKey));let e=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(t));return console.log("encryptDatagetOmniRequestObject => ",JSON.stringify(e)),e}getBenificiaryList(){return new Promise((t,e)=>{this.ngZone.run(()=>{this.dataService.fetchUPIbenificiaryLists?(this.getUserLocation(),this.fetchBenificiaryList(t)):t({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList})})})}fetchBenificiaryList(t){var e=this.getBenficiaryListReq(this.constant.val_upi_benListType_ALL,this.constant.val_upi_ANY);this.UpiApiCall(e,t)}UpiApiCall(t,e){this.http.callBankingAPIService(t,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(t=>{var i,a,s,c;let n=t.responseParameter.upiResponse;if("00"==n.status)switch(n.subActionId){case this.constant.upiserviceName_GETBENIFICIARYLIST:this.dataService.recentBeneficiaryList=(null===(i=n.responseParameter)||void 0===i?void 0:i.beneficiaryList)?null===(a=n.responseParameter)||void 0===a?void 0:a.beneficiaryList:[],this.dataService.favPayeeList=(null===(s=n.responseParameter)||void 0===s?void 0:s.FavBeneList)?null===(c=n.responseParameter)||void 0===c?void 0:c.FavBeneList:[],e({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList}),this.dataService.fetchUPIbenificiaryLists=!1}},t=>{console.log("ERROR!",t)})}}return t.\u0275fac=function(e){return new(e||t)(a.ic(s.a),a.ic(c.a),a.ic(n.a),a.ic(o.a),a.ic(r.a),a.ic(d.a),a.ic(n.a),a.ic(l.a),a.ic(a.H))},t.\u0275prov=a.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"W/xy":function(t,e,i){"use strict";i.r(e),i.d(e,"MandateHistoryDetailsModule",(function(){return Y}));var a=i("ofXK"),s=i("lDwX"),c=i("Q9Ys"),n=i("XNiG"),o=i("fXoL"),r=i("tyNb"),d=i("EnSQ"),l=i("L7Xq"),p=i("H9Rt"),h=i("5IsW"),u=i("au7T"),m=i("4oXj"),v=i("Eioz"),y=i("Ygbc"),g=i("TiA8"),b=i("pDwy"),_=i("4bKs"),S=i("fUdP"),D=i("goA9");function f(t,e){1&t&&(o.ec(0,"h5"),o.Zb(1,"img",51),o.Sc(2),o.qc(3,"translate"),o.dc()),2&t&&(o.Mb(2),o.Uc(" ",o.rc(3,1,"TRANSACTION_SUCCESSFUL")," "))}function M(t,e){1&t&&(o.ec(0,"h5",52),o.Zb(1,"img",53),o.Sc(2),o.qc(3,"translate"),o.dc()),2&t&&(o.Mb(2),o.Uc(" ",o.rc(3,1,"TRANSACTION_FAILED")," "))}function A(t,e){1&t&&(o.ec(0,"h5",52),o.Zb(1,"img",53),o.Sc(2),o.qc(3,"translate"),o.dc()),2&t&&(o.Mb(2),o.Uc(" ",o.rc(3,1,"TRANSACTION_REJECTED")," "))}function I(t,e){1&t&&(o.ec(0,"h5",52),o.Zb(1,"img",53),o.Sc(2),o.qc(3,"translate"),o.dc()),2&t&&(o.Mb(2),o.Uc(" ",o.rc(3,1,"TRANSACTION_FAILED")," "))}function N(t,e){1&t&&(o.ec(0,"h5",54),o.Zb(1,"img",55),o.Sc(2),o.qc(3,"translate"),o.dc()),2&t&&(o.Mb(2),o.Uc(" ",o.rc(3,1,"TRANSACTION_PENDING")," "))}function P(t,e){if(1&t&&(o.ec(0,"small"),o.Sc(1),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Tc(t.mandateHistoryDetails.successMsg)}}function T(t,e){if(1&t&&(o.ec(0,"small"),o.Sc(1),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Tc(t.mandateHistoryDetails.errorMsg)}}function E(t,e){if(1&t&&(o.ec(0,"div",33),o.ec(1,"div",22),o.ec(2,"h6"),o.Sc(3),o.qc(4,"translate"),o.dc(),o.ec(5,"h5"),o.Sc(6),o.dc(),o.dc(),o.dc()),2&t){const t=o.pc();o.Mb(3),o.Tc(o.rc(4,2,"NUMBER_OF_DEBITS")),o.Mb(3),o.Tc(t.mandateHistoryDetails.noOfDebits)}}function k(t,e){if(1&t&&(o.ec(0,"div",33),o.ec(1,"div",22),o.ec(2,"h6"),o.Sc(3),o.qc(4,"translate"),o.dc(),o.ec(5,"h5"),o.Sc(6),o.dc(),o.dc(),o.dc()),2&t){const t=o.pc();o.Mb(3),o.Tc(o.rc(4,2,"PENDING_DEBITS")),o.Mb(3),o.Tc(t.mandateHistoryDetails.pendingDebits)}}const O=function(){return{standalone:!0}};function L(t,e){if(1&t){const t=o.fc();o.ec(0,"div",33),o.ec(1,"div",19),o.ec(2,"div",56),o.ec(3,"div",57),o.ec(4,"h6"),o.Sc(5),o.qc(6,"translate"),o.dc(),o.dc(),o.dc(),o.ec(7,"div",58),o.ec(8,"div",59),o.ec(9,"div",60),o.ec(10,"div",61),o.ec(11,"input",62),o.lc("ngModelChange",(function(e){return o.Hc(t),o.pc().mandatePause=e}))("change",(function(){o.Hc(t);const e=o.pc();return e.showPauseUnpausePopup("pauseMandate",e.mandateHistoryDetails)})),o.dc(),o.Zb(12,"label",63),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()}if(2&t){const t=o.pc();o.Mb(5),o.Tc(o.rc(6,3,"PAUSE")),o.Mb(6),o.uc("ngModel",t.mandatePause)("ngModelOptions",o.xc(5,O))}}function R(t,e){if(1&t){const t=o.fc();o.ec(0,"div",33),o.ec(1,"div",22),o.ec(2,"div",64),o.ec(3,"div",65),o.ec(4,"h5"),o.ec(5,"a",66),o.lc("click",(function(){o.Hc(t);const e=o.pc();return e.viewInvoice(null==e.mandateHistoryDetails?null:e.mandateHistoryDetails.refUrl)})),o.Zb(6,"img",67),o.Sc(7),o.qc(8,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()}2&t&&(o.Mb(7),o.Uc(" ",o.rc(8,1,"VIEW_INVOICE")," "))}function U(t,e){if(1&t&&(o.ec(0,"p"),o.Sc(1),o.qc(2,"translate"),o.qc(3,"translate"),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Wc(" ",o.rc(2,3,"WOULD_YOU_LIKE_TO_ADD")," ",t.favoriteName," ",o.rc(3,5,"TO_FAVORITES")," ? ")}}function H(t,e){if(1&t&&(o.ec(0,"p"),o.Sc(1),o.qc(2,"translate"),o.qc(3,"translate"),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Wc(" ",o.rc(2,3,"WOULD_YOU_LIKE_TO_REMOVE")," ",t.favoriteName," ",o.rc(3,5,"FROM_FAVORITES")," ? ")}}function w(t,e){if(1&t&&(o.ec(0,"p"),o.Sc(1),o.qc(2,"translate"),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Vc(" ",o.rc(2,2,"DO_YOU_WANT_TO_PAUSE_MANDATE_TO_PAYEE")," ",t.selectedMandate.payeeName," ? ")}}function C(t,e){if(1&t&&(o.ec(0,"p"),o.Sc(1),o.qc(2,"translate"),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Vc(" ",o.rc(2,2,"DO_YOU_WANT_TO_UNPAUSE_MANDATE_TO_PAYEE")," ",t.selectedMandate.payeeName," ? ")}}const q=[{path:"",component:(()=>{class t{constructor(t,e,i,a,s,c,n,o,r,d,l,p,h,u){this.router=t,this.DataService=e,this.location=i,this.http=a,this.localStorage=s,this.constant=c,this.commonMethod=n,this.benificiaryService=o,this.ngZone=r,this.translatePipe=d,this.npciIosService=l,this.npciAndroidService=p,this.upiMandateService=h,this.loaderService=u,this.popupData={},this.isFavorite=!1,this.mandatePause=!1,this.headerdata={headerType:"none",titleName:"",footertype:"none"}}ngOnInit(){var t,e;this.DataService.changeMessage(this.headerdata),this.mandateHistoryDetails=this.DataService.mandateHistoryDetails,console.log("this.mandateHistoryDetails => "),console.log(this.mandateHistoryDetails),this.favoriteName="DR"==(null===(t=this.mandateHistoryDetails)||void 0===t?void 0:t.TYPE)?this.mandateHistoryDetails.payeeName:this.mandateHistoryDetails.payerName,this.favoriteVpa="DR"==(null===(e=this.mandateHistoryDetails)||void 0===e?void 0:e.TYPE)?this.mandateHistoryDetails.payeeAddr:this.mandateHistoryDetails.payerAddr,history.pushState({},"mandateHistory",this.location.prepareExternalUrl("mandateHistory")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}goToPage(t){this.DataService.routeWithNgZone(t)}UpiApiCall(t){this.http.callBankingAPIService(t,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(t=>{let e=t.responseParameter.upiResponse;if("00"==e.status)switch(e.subActionId){case this.constant.upiserviceName_ADDBENIFICIARY:this.DataService.fetchUPIbenificiaryLists=!0,e.msg&&this.ngZone.run(()=>{this.DataService.information=e.msg,this.DataService.informationLabel=this.translatePipe.transform("INFORMATION"),this.DataService.primaryBtnText=this.translatePipe.transform("OK"),this.commonMethod.openPopup("div.popup-bottom.show-common-info")});break;case this.constant.upiserviceName_PAUSEMANDATE:case this.constant.upiserviceName_UNPAUSEMANDATE:this.mandatePause=!this.mandatePause,this.pauseUnpauseMsg=e.msg,this.showPopup("pauseUnpause-success");break;default:console.log("default ",e.subActionId)}},t=>{console.log("ERROR!",t)})}showPopup(t,e){this.commonMethod.openPopup("div.popup-bottom."+t),this.popupData=e||{},console.log("this.popupData",this.popupData)}closePopup(t){this.commonMethod.closePopup("div.popup-bottom."+t)}addPayeeToFavorite(){var t,e,i;this.closePopup("fav-popup"),this.isFavorite=!this.isFavorite;let a=this.isFavorite?"Y":"N",c=(new s.a).deserialize({isFavourite:a,payeeName:"DR"==(null===(t=this.mandateHistoryDetails)||void 0===t?void 0:t.TYPE)?this.mandateHistoryDetails.payeeName:this.mandateHistoryDetails.payerName,nickName:"DR"==(null===(e=this.mandateHistoryDetails)||void 0===e?void 0:e.TYPE)?this.mandateHistoryDetails.payeeName:this.mandateHistoryDetails.payerName,payeeVPA:"DR"==(null===(i=this.mandateHistoryDetails)||void 0===i?void 0:i.TYPE)?this.mandateHistoryDetails.payeeAddr:this.mandateHistoryDetails.payerAddr});this.benificiaryService.getUserLocation();var n=this.benificiaryService.setAddBenificiaryRequest(c,!1,!0,!1);this.closePopup("fav-popup"),this.UpiApiCall(n)}downloadPdf(){if(this.DataService.isCordovaAvailable){var t="transaction_Details"+Date.now()+".png";let e=document.querySelector("#transactionDtl");this.DataService.platform.toLowerCase()==this.constant.val_android?this.commonMethod.savePDFInDevice(e,t):this.DataService.platform.toLowerCase()==this.constant.val_ios?this.commonMethod.takeScreenshot():console.log("Unknown Platform...")}}shareReceipt(){if(this.DataService.isCordovaAvailable){var t="transaction_Details"+Date.now();let e=document.querySelector("#transactionDtl");this.commonMethod.shareImageInDevice(e,t)}}goBack(){this.location.back()}showPauseUnpausePopup(t,e){this.selectedMandate=e,this.popupMsg=this.mandatePause?"DO_YOU_WANT_TO_PAUSE_MANDATE_TO_PAYEE":"DO_YOU_WANT_TO_UNPAUSE_MANDATE_TO_PAYEE",this.commonMethod.openPopup("div.popup-bottom."+t)}hidePauseUnpausePopup(t){this.mandatePause=!this.mandatePause,this.commonMethod.closePopup("div.popup-bottom."+t)}pauseUnpauseMandate(){if(this.closePopup("pauseMandate"),this.VPAAccountDetails=this.DataService.VPAAccountDetails,"N"==this.VPAAccountDetails.mbeba)this.ngZone.run(()=>{this.DataService.information=this.translatePipe.transform("UPI_PIN_NOT_SET"),this.DataService.informationLabel=this.translatePipe.transform("INFORMATION"),this.DataService.primaryBtnText=this.translatePipe.transform("OK"),this.commonMethod.openPopup("div.popup-bottom.show-common-info")});else{let t=(new c.a).deserialize(this.VPAAccountDetails);this.DataService.platform.toLowerCase()==this.constant.val_android?(this.npciAndroidService.selectedMandateDetails.payerVPA=this.selectedMandate.payerAddr,this.npciAndroidService.selectedMandateDetails.payeeVPA=this.selectedMandate.payeeAddr,this.npciAndroidService.selectedMandateDetails.txnAmount=this.selectedMandate.txnAmount,this.npciAndroidService.selectedMandateDetails.payeeName=this.selectedMandate.payeeName,this.npciAndroidService.selectedMandateDetails.txnId=this.selectedMandate.txnId):this.DataService.platform.toLowerCase()==this.constant.val_ios?(this.npciIosService.selectedMandateDetails.payerVPA=this.selectedMandate.payerAddr,this.npciIosService.selectedMandateDetails.payeeVPA=this.selectedMandate.payeeAddr,this.npciIosService.selectedMandateDetails.txnAmount=this.selectedMandate.txnAmount,this.npciIosService.selectedMandateDetails.payeeName=this.selectedMandate.payeeName,this.npciIosService.selectedMandateDetails.txnId=this.selectedMandate.txnId):console.log("Unknown platform..."),t.ifsc.includes("PSIB")?(this.DataService.preApprovedFlowIdentifier="activeViewPauseUnpauseMandate",this.DataService.preApprovedBankName=t.bankName,this.DataService.preApprovedAccNo=t.maskedAccountNumber,this.DataService.preApprovedAmount=this.selectedMandate.amount,this.DataService.mandatePauseFlag=this.mandatePause,this.DataService.preApprovedPreviousPageUrl=this.router.url,this.router.navigateByUrl("/transactionPin")):this.callNpciLibrary(t,this.constant.val_npci_flow_pauseUnpauseMandate)}}callNpciLibrary(t,e){if(console.log("calling npci library..."),console.log("accountData",t),this.loaderService.showLoader(),window.hasOwnProperty("cordova"))if(this.DataService.platform.toLowerCase()==this.constant.val_android){console.log("Calling NPCI Android service..."),this.npciAndroidService.initData();let i=new n.a;this.npciAndroidService.getTransactionId().subscribe(a=>{this.npciAndroidService.transactionId=a,this.npciAndroidService.androidStartCLLibrary(t,e,i).subscribe(t=>{if(console.log("Android StartCLLibrary Success => ",t),t.hasOwnProperty("status")&&"00"==t.status){let e=this.upiMandateService.pauseUnpauseMandate(t,this.mandatePause,this.selectedMandate);this.UpiApiCall(e)}},t=>{console.log("Android StartCLLibrary error => ",t)})})}else if(this.DataService.platform.toLowerCase()==this.constant.val_ios){console.log("Calling NPCI iOS service..."),this.npciIosService.initData();let i=new n.a;this.npciIosService.getTransactionId().subscribe(a=>{console.log("transactionId Received => ",a),this.npciIosService.txnId=a,this.npciIosService.iosStartCLLibrary(t,e,i).subscribe(t=>{if(console.log("iOS StartCLLibrary Success => ",t),t&&t.credkey){let e=this.upiMandateService.pauseUnpauseMandate(t,this.mandatePause,this.selectedMandate);this.UpiApiCall(e)}else console.log("NPCI flow cancelled...")},t=>{console.log("iOS StartCLLibrary error => ",t)})})}else console.log("unknown platform = ",this.DataService.platform);else console.log("Cordova not available... unable to start NPCI Library on web")}viewInvoice(t){this.DataService.isCordovaAvailable?cordova.InAppBrowser.open(t,"_blank","location=no"):window.open(t)}}return t.\u0275fac=function(e){return new(e||t)(o.Yb(r.c),o.Yb(d.a),o.Yb(a.n),o.Yb(l.a),o.Yb(p.a),o.Yb(h.a),o.Yb(u.a),o.Yb(m.a),o.Yb(o.H),o.Yb(v.a),o.Yb(y.a),o.Yb(g.a),o.Yb(b.a),o.Yb(_.a))},t.\u0275cmp=o.Sb({type:t,selectors:[["app-mandate-history-details"]],decls:180,vars:107,consts:[[1,"main"],[1,"global-header","success-bg","minus-nav"],[1,"in-header"],[1,"header-icons-lft"],[1,"header-actions"],[1,"ux-button-header",3,"click"],["src","./assets/images/svg/close-w.svg","alt","left-arrow-icon",1,"img-vsmall"],[1,"brand-logo"],[1,"header-icons-rit"],[1,"ux-button-header","mr-2",3,"click"],["src","assets/images/svg/download1-w.svg","alt","download-icon",1,"img-small"],["src","assets/images/svg/share1-w.svg","alt","share-icon",1,"img-small"],["alt","star-icon",1,"img-small",3,"src"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"container-fluid"],["id","transactionDtl",1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2"],[1,"row"],[1,"success"],[4,"ngIf"],["class","error",4,"ngIf"],["class","pending",4,"ngIf"],[1,"mt-3"],[1,"bg-img"],["src","assets/images/svg/psb-receipt icon.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom"],[1,"info-details","mt-3"],[1,"info-details"],[1,"top-border"],["class","info-details",4,"ngIf"],[1,"popup-bottom","fav-popup"],[1,"text-center"],[1,"row1","mt-2"],[1,"col-6","text-center"],[1,"ux-button","secondary","no","md","close-btn",3,"click"],[1,"logout-btn","ux-button","primary","md",3,"click"],[1,"popup-bottom","pauseMandate"],["type","button",1,"ux-button","secondary","md","close-btn",3,"click"],["type","button",1,"ux-button","primary","md",3,"click"],[1,"popup-bottom","pauseUnpause-success"],[1,"row","mt-3"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"row1","mt-3"],[1,"col-12","text-center"],[1,"ux-button","primary","md",3,"click"],["src","assets/images/svg/success-arrow1.svg","alt","success-icon"],[1,"error"],["src","assets/images/svg/fail.svg","alt","success-icon"],[1,"pending"],["src","assets/images/svg/pending-icon.svg","alt","success-icon"],[1,"col-9","col-md-5"],[1,"left-info"],[1,"col-3","col-md-2"],[1,"right-info","pl-3"],[1,"custom-control2"],[1,"custom-control","custom-switch","pad-2"],["type","checkbox","id","customSwitch1",1,"custom-control-input",3,"ngModel","ngModelOptions","ngModelChange","change"],["for","customSwitch1",1,"custom-control-label","md"],[1,"col-6"],[1,"left-info1"],[1,"reminder-btn","set",3,"click"],["src","assets/images/svg/view-invoice.svg","alt","view-invoice-icon",1,"big-img"]],template:function(t,e){1&t&&(o.ec(0,"div",0),o.ec(1,"header",1),o.ec(2,"div",2),o.ec(3,"div",3),o.ec(4,"div",4),o.ec(5,"button",5),o.lc("click",(function(){return e.goBack()})),o.Zb(6,"img",6),o.dc(),o.dc(),o.dc(),o.ec(7,"div",7),o.ec(8,"h3"),o.Sc(9),o.qc(10,"translate"),o.dc(),o.dc(),o.ec(11,"div",8),o.ec(12,"div",4),o.ec(13,"button",9),o.lc("click",(function(){return e.downloadPdf()})),o.Zb(14,"img",10),o.dc(),o.ec(15,"button",9),o.lc("click",(function(){return e.shareReceipt()})),o.Zb(16,"img",11),o.dc(),o.ec(17,"button",9),o.lc("click",(function(){return e.showPopup("fav-popup",e.mandateHistoryDetails)})),o.Zb(18,"img",12),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(19,"div",13),o.ec(20,"div",14),o.ec(21,"div",15),o.ec(22,"div",16),o.ec(23,"div",17),o.ec(24,"div",18),o.ec(25,"div",19),o.ec(26,"div",20),o.ec(27,"div",21),o.ec(28,"div",22),o.ec(29,"div",23),o.Rc(30,f,4,3,"h5",24),o.Rc(31,M,4,3,"h5",25),o.Rc(32,A,4,3,"h5",25),o.Rc(33,I,4,3,"h5",25),o.Rc(34,N,4,3,"h5",26),o.Rc(35,P,2,1,"small",24),o.Rc(36,T,2,1,"small",24),o.ec(37,"h4"),o.Sc(38),o.qc(39,"customcurrency"),o.dc(),o.ec(40,"small",27),o.ec(41,"span"),o.Sc(42),o.qc(43,"dateFormat"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(44,"div",28),o.Zb(45,"img",29),o.dc(),o.dc(),o.dc(),o.ec(46,"div",20),o.ec(47,"div",30),o.ec(48,"div",31),o.ec(49,"div",32),o.ec(50,"div",22),o.ec(51,"h6"),o.Sc(52),o.qc(53,"translate"),o.dc(),o.ec(54,"h5"),o.Sc(55),o.dc(),o.ec(56,"h5"),o.ec(57,"span"),o.Sc(58),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(59,"div",33),o.ec(60,"div",22),o.ec(61,"h6"),o.Sc(62),o.qc(63,"translate"),o.dc(),o.ec(64,"h5"),o.Sc(65),o.qc(66,"translate"),o.dc(),o.ec(67,"h5"),o.ec(68,"span"),o.Sc(69),o.dc(),o.dc(),o.dc(),o.dc(),o.Zb(70,"div",34),o.ec(71,"div",33),o.ec(72,"div",22),o.ec(73,"h6"),o.Sc(74),o.qc(75,"translate"),o.dc(),o.ec(76,"h5"),o.Sc(77),o.dc(),o.dc(),o.dc(),o.ec(78,"div",33),o.ec(79,"div",22),o.ec(80,"h6"),o.Sc(81),o.qc(82,"translate"),o.dc(),o.ec(83,"h5"),o.Sc(84),o.dc(),o.dc(),o.dc(),o.ec(85,"div",33),o.ec(86,"div",22),o.ec(87,"h6"),o.Sc(88),o.qc(89,"translate"),o.dc(),o.ec(90,"h5"),o.Sc(91),o.dc(),o.dc(),o.dc(),o.ec(92,"div",33),o.ec(93,"div",22),o.ec(94,"h6"),o.Sc(95),o.qc(96,"translate"),o.dc(),o.ec(97,"h5"),o.Sc(98),o.qc(99,"dateFormat"),o.qc(100,"dateFormat"),o.dc(),o.dc(),o.dc(),o.ec(101,"div",33),o.ec(102,"div",22),o.ec(103,"h6"),o.Sc(104),o.qc(105,"translate"),o.dc(),o.ec(106,"h5"),o.Sc(107),o.dc(),o.dc(),o.dc(),o.ec(108,"div",33),o.ec(109,"div",22),o.ec(110,"h6"),o.Sc(111),o.qc(112,"translate"),o.dc(),o.ec(113,"h5"),o.Sc(114),o.qc(115,"customcurrency"),o.dc(),o.dc(),o.dc(),o.ec(116,"div",33),o.ec(117,"div",22),o.ec(118,"h6"),o.Sc(119),o.qc(120,"translate"),o.dc(),o.ec(121,"h5"),o.Sc(122),o.qc(123,"dateFormat"),o.dc(),o.dc(),o.dc(),o.Rc(124,E,7,4,"div",35),o.Rc(125,k,7,4,"div",35),o.Rc(126,L,13,6,"div",35),o.Rc(127,R,9,3,"div",35),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(128,"div",36),o.ec(129,"div",22),o.ec(130,"div",18),o.ec(131,"h4",37),o.Sc(132),o.qc(133,"translate"),o.dc(),o.dc(),o.dc(),o.ec(134,"div",22),o.ec(135,"div",18),o.Rc(136,U,4,7,"p",24),o.Rc(137,H,4,7,"p",24),o.dc(),o.dc(),o.ec(138,"div",38),o.ec(139,"div",39),o.ec(140,"button",40),o.lc("click",(function(){return e.closePopup("fav-popup")})),o.Sc(141),o.qc(142,"translate"),o.dc(),o.dc(),o.ec(143,"div",39),o.ec(144,"button",41),o.lc("click",(function(){return e.addPayeeToFavorite()})),o.Sc(145),o.qc(146,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(147,"div",42),o.ec(148,"div",22),o.ec(149,"div",18),o.ec(150,"h4",37),o.Sc(151),o.qc(152,"translate"),o.dc(),o.dc(),o.dc(),o.ec(153,"div",22),o.ec(154,"div",18),o.Rc(155,w,3,4,"p",24),o.Rc(156,C,3,4,"p",24),o.dc(),o.dc(),o.ec(157,"div",38),o.ec(158,"div",39),o.ec(159,"button",43),o.lc("click",(function(){return e.hidePauseUnpausePopup("pauseMandate")})),o.Sc(160),o.qc(161,"translate"),o.dc(),o.dc(),o.ec(162,"div",39),o.ec(163,"button",44),o.lc("click",(function(){return e.pauseUnpauseMandate()})),o.Sc(164),o.qc(165,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(166,"div",45),o.ec(167,"div",46),o.ec(168,"div",23),o.Zb(169,"img",47),o.ec(170,"h3"),o.Sc(171),o.qc(172,"translate"),o.dc(),o.ec(173,"h5"),o.Sc(174),o.dc(),o.dc(),o.dc(),o.ec(175,"div",48),o.ec(176,"div",49),o.ec(177,"button",50),o.lc("click",(function(){return e.closePopup("pauseUnpause-success")})),o.Sc(178),o.qc(179,"translate"),o.dc(),o.dc(),o.dc(),o.dc()),2&t&&(o.Mb(9),o.Tc(o.rc(10,51,"RECEIPT")),o.Mb(9),o.uc("src",e.isFavorite?"assets/images/svg/star1-active.svg":"assets/images/svg/star1-w.svg",o.Jc),o.Mb(12),o.uc("ngIf","COMPLETED"==e.mandateHistoryDetails.status&&"REVOKE"!=e.mandateHistoryDetails.action),o.Mb(1),o.uc("ngIf","FAILED"==e.mandateHistoryDetails.status||"FAILURE"==e.mandateHistoryDetails.status),o.Mb(1),o.uc("ngIf","REJECTED"==e.mandateHistoryDetails.status||"REVOKE"==e.mandateHistoryDetails.action),o.Mb(1),o.uc("ngIf","EXPIRED"==e.mandateHistoryDetails.status),o.Mb(1),o.uc("ngIf","PENDING"==e.mandateHistoryDetails.status),o.Mb(1),o.uc("ngIf","COMPLETED"==e.mandateHistoryDetails.status),o.Mb(1),o.uc("ngIf","COMPLETED"!=e.mandateHistoryDetails.status),o.Mb(2),o.Uc(" ",o.sc(39,53,e.mandateHistoryDetails.txnAmount,"symbol")," "),o.Mb(4),o.Uc(" ",o.sc(43,56,e.mandateHistoryDetails.txnTime,"DD MMM yyyy hh:mm A")," "),o.Mb(10),o.Tc(o.rc(53,59,"CREDITED_TO")),o.Mb(3),o.Tc(e.mandateHistoryDetails.payeeName),o.Mb(3),o.Tc(e.mandateHistoryDetails.payeeAddr),o.Mb(4),o.Tc(o.rc(63,61,"DEBITED_FROM")),o.Mb(3),o.Vc("",o.rc(66,63,"UPI_ID")," : ",e.mandateHistoryDetails.payerAddr,""),o.Mb(4),o.Vc("",null==e.mandateHistoryDetails?null:e.mandateHistoryDetails.payerAccountType," ",e.mandateHistoryDetails.fromAccount,""),o.Mb(5),o.Tc(o.rc(75,65,"TRANSACTION_ID")),o.Mb(3),o.Tc(e.mandateHistoryDetails.txnId),o.Mb(4),o.Tc(o.rc(82,67,"UMN")),o.Mb(3),o.Tc(e.mandateHistoryDetails.umn),o.Mb(4),o.Tc(o.rc(89,69,"REMARKS")),o.Mb(3),o.Tc(null!=e.mandateHistoryDetails&&e.mandateHistoryDetails.remarks?null==e.mandateHistoryDetails?null:e.mandateHistoryDetails.remarks:"-"),o.Mb(4),o.Tc(o.rc(96,71,"VALIDITY_FROM_DATE_TO_DATE")),o.Mb(3),o.Vc("",o.sc(99,73,e.mandateHistoryDetails.validityStartDate,"DD MMM yyyy")," - ",o.sc(100,76,e.mandateHistoryDetails.validityEndDate,"DD MMM yyyy")," "),o.Mb(6),o.Tc(o.rc(105,79,"FREQUENCY")),o.Mb(3),o.Tc(e.mandateHistoryDetails.frequency),o.Mb(4),o.Tc(o.rc(112,81,"AMOUNT")),o.Mb(3),o.Uc(" ",o.sc(115,83,e.mandateHistoryDetails.txnAmount,"symbol")," "),o.Mb(5),o.Tc(o.rc(120,86,"DATE_AND_TIME")),o.Mb(3),o.Tc(o.sc(123,88,e.mandateHistoryDetails.txnTime,"DD MMM yyyy hh:mm A")),o.Mb(2),o.uc("ngIf","ONETIME"!=(null==e.mandateHistoryDetails?null:e.mandateHistoryDetails.frequency)||"ASPRESENTED"!=e.mandateHistoryDetails.frequency),o.Mb(1),o.uc("ngIf","ONETIME"!=e.mandateHistoryDetails.frequency||"ASPRESENTED"!=e.mandateHistoryDetails.frequency),o.Mb(1),o.uc("ngIf","ONETIME"!=e.mandateHistoryDetails.frequency&&"PAYER"==e.mandateHistoryDetails.initiatedBy),o.Mb(1),o.uc("ngIf",e.mandateHistoryDetails.payeeCode&&"null"!=e.mandateHistoryDetails.payeeCode&&"0000"!=e.mandateHistoryDetails.payeeCode),o.Mb(5),o.Tc(o.rc(133,91,"CONFIRMATION")),o.Mb(4),o.uc("ngIf",!e.isFavorite),o.Mb(1),o.uc("ngIf",e.isFavorite),o.Mb(4),o.Tc(o.rc(142,93,"NO")),o.Mb(4),o.Tc(o.rc(146,95,"YES")),o.Mb(6),o.Tc(o.rc(152,97,"CONFIRMATION")),o.Mb(4),o.uc("ngIf",e.mandatePause),o.Mb(1),o.uc("ngIf",!e.mandatePause),o.Mb(4),o.Tc(o.rc(161,99,"NO")),o.Mb(4),o.Tc(o.rc(165,101,"YES")),o.Mb(7),o.Tc(o.rc(172,103,"SUCCESS")),o.Mb(3),o.Tc(e.pauseUnpauseMsg),o.Mb(4),o.Tc(o.rc(179,105,"OK")))},directives:[a.t],pipes:[v.a,S.a,D.a],styles:[""]}),t})()}];let B=(()=>{class t{}return t.\u0275mod=o.Wb({type:t}),t.\u0275inj=o.Vb({factory:function(e){return new(e||t)},imports:[[r.g.forChild(q)],r.g]}),t})();var F=i("PCNd");let Y=(()=>{class t{}return t.\u0275mod=o.Wb({type:t}),t.\u0275inj=o.Vb({factory:function(e){return new(e||t)},imports:[[a.c,F.a,B]]}),t})()}}]);