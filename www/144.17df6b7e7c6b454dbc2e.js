(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{"3Yho":function(e,t,a){"use strict";a.r(t),a.d(t,"CreateMandateModule",(function(){return V}));var i=a("ofXK"),c=a("tyNb"),s=a("3Pt+"),n=a("fXoL"),o=a("EnSQ"),r=a("oBZJ"),d=a("au7T"),l=a("L7Xq"),h=a("5IsW"),p=a("H9Rt"),u=a("38VJ"),v=a("4oXj"),S=a("paUM"),g=a("Eioz"),m=a("4Efi"),f=a("RZqO");function b(e,t){1&e&&(n.ec(0,"p",56),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_UPI_ID_MOBILE_NUMBER_ERROR")," "))}function D(e,t){1&e&&(n.ec(0,"p",56),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_VALID_UPI_ID_MOBILE_NO")," "))}function _(e,t){if(1&e){const e=n.fc();n.ec(0,"div",44),n.ec(1,"div",9),n.ec(2,"div",45),n.ec(3,"div",46),n.ec(4,"label",47),n.Sc(5),n.qc(6,"translate"),n.dc(),n.Zb(7,"input",48),n.qc(8,"translate"),n.ec(9,"a",49),n.lc("click",(function(){return n.Hc(e),n.pc().goToPage("searchContactList")})),n.Zb(10,"em",50),n.dc(),n.Rc(11,b,3,3,"p",51),n.Rc(12,D,3,3,"p",51),n.ec(13,"p",52),n.Sc(14,"e.g. name@psb/9820000000"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(15,"div",53),n.ec(16,"div",9),n.Zb(17,"div",54),n.ec(18,"div",54),n.ec(19,"button",55),n.lc("click",(function(){return n.Hc(e),n.pc().verify()})),n.Sc(20),n.qc(21,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()}if(2&e){const e=n.pc();n.Mb(5),n.Tc(n.rc(6,6,"UPI ID/Mobile Number")),n.Mb(2),n.vc("placeholder",n.rc(8,8,"ENTER_UPI_ID_MOBILE_NUMBER")),n.Mb(4),n.uc("ngIf",e.createMandateForm.controls.upiIdOrMobno.hasError("required")&&e.createMandateForm.controls.upiIdOrMobno.touched),n.Mb(1),n.uc("ngIf",!e.createMandateForm.controls.upiIdOrMobno.hasError("required")&&e.createMandateForm.controls.upiIdOrMobno.touched&&e.createMandateForm.controls.upiIdOrMobno.hasError("pattern")),n.Mb(7),n.uc("disabled",e.createMandateForm.invalid),n.Mb(1),n.Tc(n.rc(21,10,"VERIFY"))}}function y(e,t){if(1&e&&(n.ec(0,"em"),n.Sc(1),n.dc()),2&e){const e=n.pc(2);n.Mb(1),n.Tc(null==e.DataService.validateAddressResp?null:e.DataService.validateAddressResp.mobileNumber)}}function R(e,t){if(1&e){const e=n.fc();n.ec(0,"div",57),n.ec(1,"div",58),n.ec(2,"div",59),n.ec(3,"span",60),n.ec(4,"h6"),n.Sc(5),n.qc(6,"firstLastChar"),n.dc(),n.dc(),n.dc(),n.ec(7,"div",61),n.ec(8,"h5"),n.Sc(9),n.dc(),n.ec(10,"h6"),n.Sc(11),n.qc(12,"translate"),n.dc(),n.Rc(13,y,2,1,"em",27),n.dc(),n.dc(),n.ec(14,"div",53),n.ec(15,"div",9),n.ec(16,"div",54),n.ec(17,"button",62),n.lc("click",(function(){return n.Hc(e),n.pc().cancel()})),n.Sc(18),n.qc(19,"translate"),n.dc(),n.dc(),n.ec(20,"div",54),n.ec(21,"button",63),n.lc("click",(function(){return n.Hc(e),n.pc().proceed()})),n.Sc(22),n.qc(23,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()}if(2&e){const e=n.pc();n.Mb(5),n.Tc(n.rc(6,7,e.DataService.validateAddressResp.MASKNAME)),n.Mb(4),n.Tc(e.DataService.validateAddressResp.MASKNAME),n.Mb(2),n.Vc("",n.rc(12,9,"UPI_ID")," : ",e.DataService.validateAddressResp.validatedVpa,""),n.Mb(2),n.uc("ngIf",null==e.DataService.validateAddressResp?null:e.DataService.validateAddressResp.mobileNumber),n.Mb(5),n.Tc(n.rc(19,11,"CANCEL")),n.Mb(4),n.Tc(n.rc(23,13,"PROCEED"))}}function M(e,t){1&e&&(n.ec(0,"div",64),n.ec(1,"h6"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()),2&e&&(n.Mb(2),n.Uc(" ",n.rc(3,1,"NO_RECENT_PAYEE_FOUND"),""))}function A(e,t){if(1&e&&n.Zb(0,"img",66),2&e){const e=n.pc().$implicit;n.uc("src",e.beneImageUrl,n.Jc)}}function P(e,t){if(1&e&&(n.ec(0,"h6"),n.Sc(1),n.qc(2,"firstLastChar"),n.dc()),2&e){const e=n.pc().$implicit;n.Mb(1),n.Uc("",n.rc(2,1,e.nickName)," ")}}function I(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",49),n.lc("click",(function(){n.Hc(e);const a=t.$implicit;return n.pc(2).validatePayee("recent",a)})),n.ec(2,"span",60),n.Rc(3,A,1,1,"img",65),n.Rc(4,P,3,3,"h6",27),n.dc(),n.ec(5,"em"),n.Sc(6),n.qc(7,"truncate"),n.dc(),n.dc(),n.dc()}if(2&e){const e=t.$implicit;n.Mb(3),n.uc("ngIf",e.beneImageUrl),n.Mb(1),n.uc("ngIf",!e.beneImageUrl),n.Mb(2),n.Tc(n.rc(7,3,e.nickName))}}function C(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",49),n.lc("click",(function(){return n.Hc(e),n.pc(2).searchContact("recent")})),n.ec(2,"span",67),n.Zb(3,"img",68),n.dc(),n.ec(4,"em"),n.Sc(5),n.qc(6,"translate"),n.dc(),n.dc(),n.dc()}2&e&&(n.Mb(5),n.Tc(n.rc(6,1,"VIEW_MORE")))}function L(e,t){if(1&e&&(n.ec(0,"ul",25),n.Rc(1,I,8,5,"li",26),n.Rc(2,C,7,3,"li",27),n.dc()),2&e){const e=n.pc();n.Mb(1),n.uc("ngForOf",e.recentPayeeReqList),n.Mb(1),n.uc("ngIf",e.recentPayeeReqList.length>0)}}function Q(e,t){1&e&&(n.ec(0,"div",64),n.ec(1,"h6"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()),2&e&&(n.Mb(2),n.Uc(" ",n.rc(3,1,"NO_FAVORITE_PAYEE_FOUND"),""))}function q(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",49),n.lc("click",(function(){n.Hc(e);const a=t.$implicit;return n.pc().validatePayee("fav",a)})),n.ec(2,"span",60),n.ec(3,"h6"),n.Sc(4),n.qc(5,"firstLastChar"),n.dc(),n.dc(),n.ec(6,"em"),n.Sc(7),n.qc(8,"truncate"),n.dc(),n.dc(),n.dc()}if(2&e){const e=t.$implicit;n.Mb(4),n.Tc(n.rc(5,2,e.nickName)),n.Mb(3),n.Tc(n.rc(8,4,e.nickName))}}function N(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",49),n.lc("click",(function(){return n.Hc(e),n.pc().searchContact("favorite")})),n.ec(2,"span",67),n.Zb(3,"img",68),n.dc(),n.ec(4,"em"),n.Sc(5),n.qc(6,"translate"),n.dc(),n.dc(),n.dc()}2&e&&(n.Mb(5),n.Tc(n.rc(6,1,"VIEW_MORE")))}const T=[{path:"",component:(()=>{class e{constructor(e,t,a,i,c,s,n,o,r,d,l,h,p,u){this.router=e,this.DataService=t,this.location=a,this.pluginService=i,this.commonMethod=c,this.http=s,this.constant=n,this.localStorage=o,this.createMandateService=r,this.beneficiaryService=d,this.scanQrRequestService=l,this.translate=h,this.scanQrService=p,this.ngZone=u,this.showFavPayeeLength=10,this.showRecentPayeeLength=10,this.headerdata={headerType:"CloseNewHeader",titleName:"CREATE_MANDATE",footertype:"none"},this.showUserInfo=!1,this.showMoreFav=!1,this.showMoreRecentRequest=!1,this.recentPayeeReqList=[],this.favPayeeList=[],this.popupData={}}ngOnInit(){this.DataService.fetchContactsFromDevice=!1,history.pushState({},"upiMandate",this.location.prepareExternalUrl("upiMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.defaultVPAAccountDetails=this.getDefaultVpaAccountDetails(),this.DataService.changeMessage(this.headerdata),this.DataService.upiSearchPayeeList=[],this.buildForm(),this.validateAddressByVPAorMobNo(),this.getBenificiaryList(),this.DataService.contactPrevURL=this.router.url}buildForm(){this.createMandateForm=new s.j({upiIdOrMobno:new s.g("",[s.G.required,s.G.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])})}goToPage(e){"searchContactList"==e?(this.DataService.contactPrevURL=this.router.url,this.DataService.fetchContactsFromDevice=!0):this.DataService.fetchContactsFromDevice=!1,this.router.navigateByUrl("/"+e)}getBenificiaryList(){this.beneficiaryService.getBenificiaryList().then(e=>{this.recentPayeeReqList=[],e.recentBeneList.map((e,t)=>{"VPA"==e.txnMode&&this.recentPayeeReqList.push(e)}),this.favPayeeList=this.DataService.favPayeeList,this.recentPayeeReqList.length>10&&(this.showMoreRecentRequest=!0),this.favPayeeList.length>10&&(this.showMoreFav=!0)})}getFavPayeeList(){var e=this.createMandateService.setFavoritePayeeRequest();this.UpiApiCall(e)}verify(){if(this.createMandateForm.markAllAsTouched(),this.createMandateForm.valid){let t=this.createMandateForm.get("upiIdOrMobno").value;if(/^\d{10}$/.test(t)){var e=this.createMandateService.setDefaultVPARequest(t);this.UpiApiCall(e)}else this.pluginService.getTransactionId().subscribe(e=>{this.createMandateService.getUserLocation();var t=this.createMandateService.setValidateRequest(this.createMandateForm.value,this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}}validateVpa(){this.pluginService.getTransactionId().subscribe(e=>{var t=this.scanQrRequestService.setValidateVpaRequest(this.DataService.ScanQrCodeData,this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}validateQrGST(){this.pluginService.getTransactionId().subscribe(e=>{var t=this.scanQrRequestService.setValidateQrRequest(this.DataService.ScanQrCodeData,this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}validateQrSign(){var e=this.scanQrRequestService.setValidateQrSignRequest(this.scanQrText);this.UpiApiCall(e)}validateGlobalQr(){var e=this.scanQrRequestService.setValidateGlobalQrRequest(this.scanQrText,this.DataService.ScanQrCodeData,this.defaultVPAAccountDetails);this.UpiApiCall(e)}scanMandate(){if(this.defaultVPAAccountDetails){var e=this;e.DataService.platform.toLowerCase()==this.constant.val_android?cordova.plugins.diagnostic.requestCameraAuthorization(t=>{switch(t){case cordova.plugins.diagnostic.permissionStatus.GRANTED:e.DataService.platform.toLowerCase()==this.constant.val_android&&cordova.plugins.QRCodeScannerPlugin.scan({invalidQRMsg:e.translate.transform(e.constant.QRCodeErrorDesc),pointQRMsg:e.translate.transform(e.constant.QRCodeDesc),scanGalleryMsg:e.translate.transform(this.constant.ScanGalleryDesc),recentPayees:""},t=>{console.log("QRDetals Success => ",t),e.scanQrText=JSON.parse(t.text),this.qrScanResult=e.scanQrService.getQrResponse(e.scanQrText.response),this.qrScanResult?(e.DataService.ScanQrCodeData=this.qrScanResult,console.log("DataService.ScanQrCodeData",e.DataService.ScanQrCodeData),e.DataService.ScanQrCodeData.sign?this.qrScanResult.qrPaymentAddress||this.qrScanResult.pa?e.validateVpa():e.showPopup("inValidQrCode",""):e.showPopup("insecure-qrcode","")):e.showPopup("inValidQrCode","")},e=>{console.log("QRDetals Error => ",e)});break;case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:return void this.showPopup("enable-camera-permissions")}},(function(e){console.error(e)})):e.DataService.platform.toLowerCase()==this.constant.val_ios?window.plugins.qrscan.startCamera(e=>{console.log("qrscan success",e),console.log("Other data => ",JSON.stringify({invalidQRMsg:this.translate.transform(this.constant.QRCodeErrorDesc),pointQRMsg:this.translate.transform(this.constant.QRCodeDesc),scanGalleryMsg:this.translate.transform(this.constant.ScanGalleryDesc),recentPayees:""})),"Cancelled"!=e&&("DENIED"==e||"Not Authorized"==e?(this.DataService.cameraPermissionGrantedIos=!1,this.commonMethod.openPopup("div.popup-bottom.enable-camera-permission")):(this.scanQrText=e,this.validateQR()))},e=>{console.log("qrscan error ",e)}):console.log("Unknown Platform")}else this.showPopup("noAccountLinkAlert","")}scanQRCode(){if(this.defaultVPAAccountDetails=this.getDefaultVpaAccountDetails(),this.DataService.resetCreateMandateData(),this.DataService.resetUpiPayData(),this.defaultVPAAccountDetails){var e=this;this.DataService.platform.toLowerCase()==this.constant.val_android?cordova.plugins.diagnostic.requestCameraAuthorization(t=>{switch(t){case cordova.plugins.diagnostic.permissionStatus.GRANTED:console.log("Other data =>",JSON.stringify({invalidQRMsg:this.translate.transform(this.constant.QRCodeErrorDesc),pointQRMsg:this.translate.transform(this.constant.QRCodeDesc),scanGalleryMsg:this.translate.transform(this.constant.ScanGalleryDesc),recentPayees:""})),cordova.plugins.QRCodeScannerPlugin.scan({invalidQRMsg:this.translate.transform(this.constant.QRCodeErrorDesc),pointQRMsg:this.translate.transform(this.constant.QRCodeDesc),scanGalleryMsg:this.translate.transform(this.constant.ScanGalleryDesc),recentPayees:""},t=>{console.log("QRDetals Success => ",t),this.scanQrText=JSON.parse(t.text),"Y"==this.scanQrText.isValidQR?this.validateQR():e.showPopup("inValidQrCode",this.scanQrText)},e=>{console.log("QRDetals Error => ",e)});break;case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:return void cordova.plugins.diagnostic.switchToSettings((function(){console.log("Successfully switched to Settings app")}),(function(e){console.error("The following error occurred: "+e)}))}},(function(e){console.error(e)})):this.DataService.platform.toLowerCase()==this.constant.val_ios&&window.plugins.qrscan.startCamera(e=>{console.log("qrscan success",e),console.log("Other data => ",JSON.stringify({invalidQRMsg:this.translate.transform(this.constant.QRCodeErrorDesc),pointQRMsg:this.translate.transform(this.constant.QRCodeDesc),scanGalleryMsg:this.translate.transform(this.constant.ScanGalleryDesc),recentPayees:""})),"Cancelled"!=e&&("DENIED"==e||"Not Authorized"==e?(this.DataService.cameraPermissionGrantedIos=!1,this.commonMethod.openPopup("div.popup-bottom.enable-camera-permission")):(this.scanQrText=e,this.validateQR()))},e=>{console.log("qrscan error ",e)})}else e.showPopup("noAccountLinkAlert","")}validateQR(){this.DataService.platform.toLowerCase()==this.constant.val_android?this.qrScanResult=this.scanQrService.getQrResponse(this.scanQrText.response):this.DataService.platform.toLowerCase()==this.constant.val_ios?this.qrScanResult=this.scanQrService.getQrResponse(this.scanQrText):console.log("Unknown platform..."),this.qrScanResult?(this.DataService.ScanQrCodeData=this.qrScanResult,console.log("DataService.ScanQrCodeData",this.DataService.ScanQrCodeData),"upiGlobal"==this.DataService.ScanQrCodeData.qrType?this.validateGlobalQr():"GST"==this.DataService.ScanQrCodeData.qrType?(console.log("qrType=>",this.DataService.ScanQrCodeData.qrType),this.DataService.ScanQrCodeData.sign?this.validateQrSign():this.validateQrGST()):"pay"!=this.DataService.ScanQrCodeData.qrType&&"mandate"!=this.DataService.ScanQrCodeData.qrType&&"collect"!=this.DataService.ScanQrCodeData.qrType&&"BHARAT_QR"!=this.DataService.ScanQrCodeData.qrType||(this.DataService.ScanQrCodeData.sign?this.DataService.ScanQrCodeData.qrPaymentAddress||this.DataService.ScanQrCodeData.pa?this.validateQrSign():this.showPopup("inValidQrCode",""):this.showPopup("insecure-qrcode",""))):this.showPopup("inValidQrCode","")}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if("00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_GETDEFAULTVPA:let e=t.responseParameter.defaultVpaDetail.paymentAddress;this.pluginService.getTransactionId().subscribe(t=>{this.createMandateService.getUserLocation();var a=this.createMandateService.setValidateRequest({upiIdOrMobno:e},this.defaultVPAAccountDetails,t);this.UpiApiCall(a)});case this.constant.upiserviceName_VALIDATEADDRESS:this.showUserInfo=!0,this.ngZone.run(()=>{this.DataService.validateAddressResp=t.responseParameter}),this.qrScanResult&&this.ngZone.run(()=>{"upiGlobal"==this.DataService.ScanQrCodeData.qrType?this.goToPage("/internationalPaymentConfirmation"):"mandate"==this.DataService.ScanQrCodeData.qrType||"collect"==this.DataService.ScanQrCodeData.qrType?(this.DataService.createMandateObj.frequency=this.DataService.ScanQrCodeData.recur,this.DataService.createMandateObj.startDate=this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validitystart),this.DataService.createMandateObj.endDate=this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validityend),this.DataService.createMandateObj.amount=this.DataService.ScanQrCodeData.am,this.DataService.createMandateObj.validatedVpaAdress=this.DataService.ScanQrCodeData.pa,this.goToPage("/createMandatePayment")):(this.DataService.selectedFlow=this.constant.val_npci_upiPayVpa,this.goToPage("/scanQRPayment"))});break;case this.constant.upiserviceName_VALIDATEQRSIGNATURE:this.ngZone.run(()=>{this.goToPage("/createMandatePayment")});break;case this.constant.upiserviceName_VALIDATEQRSIGNATURE:this.DataService.selectedFlow=this.constant.val_npci_upiPayVpa,"GST"==this.DataService.ScanQrCodeData.qrType?this.validateQrGST():this.validateVpa();break;case this.constant.upiserviceName_VALIDATEQR:this.DataService.selectedFlow=this.constant.val_npci_upiPayVpa,this.DataService.validateAddressResp=t.responseParameter,"GST"==this.DataService.ScanQrCodeData.qrType?this.goToPage("/scanQRPayment"):this.validateVpa();break;case this.constant.upiserviceName_VALIDATEGLOBALQR:this.validateQrSign()}else switch(t.subActionId){case this.constant.upiserviceName_VALIDATEADDRESS:break;case this.constant.upiserviceName_VALIDATEQRSIGNATURE:let t=e.responseParameter.upiResponse;this.showPopup("inValidSignature",t);break;case this.constant.upiserviceName_VALIDATEQR:case this.constant.upiserviceName_VALIDATEGLOBALQR:break;default:this.ngZone.run(()=>{this.DataService.errorMsg=t.msg,this.DataService.informationLabel=this.translate.transform("ERROR"),this.DataService.primaryBtnText=this.translate.transform("OK"),this.commonMethod.openPopup("div.popup-bottom.show-common-error")})}},e=>{console.log("ERROR!",e)})}getDefaultVpaAccountDetails(){let e=this.DataService.vpaAddressList.find(e=>"Y"==e.default);if(e)return{vpaDetails:e,accountDetails:this.getDefaultAccountNoByVpa(e.accounts)}}getDefaultAccountNoByVpa(e){if(e.length>0)return e.find(e=>"Y"==e.isDefaultAccount)}validateAddressByVPAorMobNo(){if(this.DataService.deviceMobileNo){var e=this.createMandateService.setDefaultVPARequest(this.DataService.deviceMobileNo);this.UpiApiCall(e)}this.DataService.upiValidatedVpaAdress&&this.pluginService.getTransactionId().subscribe(e=>{this.createMandateService.getUserLocation();var t=this.createMandateService.setValidateRequest({upiIdOrMobno:this.DataService.upiValidatedVpaAdress},this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}showPopup(e,t){this.commonMethod.openPopup("div.popup-bottom."+e),this.popupData=t||{},console.log("this.popupData",this.popupData)}closePopup(e){this.commonMethod.closePopup("div.popup-bottom."+e)}proceed(){this.DataService.resetCreateMandateData(),this.router.navigateByUrl("/createMandatePayment")}ngOnDestroy(){this.DataService.deviceMobileNo="",this.DataService.upiValidatedVpaAdress=""}cancel(){this.showUserInfo=!1,this.createMandateForm.reset()}searchContact(e){this.DataService.upiSearchCollectPayeeList="recent"==e?this.recentPayeeReqList:this.favPayeeList,this.DataService.upiCollectsearchType=e,this.router.navigateByUrl("/collectSearchContact")}validatePayee(e,t){var a;this.pluginService.getTransactionId().subscribe(e=>{this.createMandateService.getUserLocation(),a=this.createMandateService.setValidateRequest({upiIdOrMobno:t.beneVpa},this.defaultVPAAccountDetails,e),this.UpiApiCall(a)})}showMore(e){"recent"==e?this.showRecentPayeeLength=this.recentPayeeReqList.length:this.showFavPayeeLength=this.favPayeeList.length}onClickYes(){"GST"==this.DataService.ScanQrCodeData.qrType?this.validateQrGST():this.validateVpa()}}return e.\u0275fac=function(t){return new(t||e)(n.Yb(c.c),n.Yb(o.a),n.Yb(i.n),n.Yb(r.a),n.Yb(d.a),n.Yb(l.a),n.Yb(h.a),n.Yb(p.a),n.Yb(u.a),n.Yb(v.a),n.Yb(S.a),n.Yb(g.a),n.Yb(m.a),n.Yb(n.H))},e.\u0275cmp=n.Sb({type:e,selectors:[["app-create-mandate"]],decls:107,vars:51,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container"],[1,"body-page-container"],[1,"container-fluid"],[3,"formGroup"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1"],["class","upiId",4,"ngIf"],["class","userinfo",4,"ngIf"],[1,"ux-nav-tabs",2,"margin","0"],[1,"responsive3"],["role","tablist",1,"nav","nav-tabs","nav-justified","bor-n"],[1,"nav-item"],["data-toggle","tab","href","#recent",1,"nav-link","active"],["data-toggle","tab","href","#favorite",1,"nav-link"],[1,"tab-content","custom-tab-content"],["id","recent",1,"tab-pane","active"],["class","unfound-info",4,"ngIf"],["class","payee-list1",4,"ngIf"],["id","favorite",1,"tab-pane","fade"],[1,"payee-list1"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"powered-logo","mt-0"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"popup-bottom","UPI-global","inValidQrCode"],[1,"text-center"],[1,"row1","mt-2"],[1,"col-12","text-center"],[1,"ux-button","primary","md",3,"click"],[1,"popup-bottom","insecure-qrcode"],[1,"col-6","text-center"],[1,"ux-button","primary","close-btn","md",3,"click"],[1,"ux-button","secondary","close-btn","md",3,"click"],[1,"popup-bottom","inValidSignature"],[1,"ux-button","secondary","no","md","close-btn",3,"click"],[1,"upiId"],[1,"col-12","col-sm-12","col-md-12"],[1,"custom-input2","ux-input"],["for","upiId"],["type","text","name","upiId","formControlName","upiIdOrMobno","required","",3,"placeholder"],[3,"click"],[1,"show-phonebook2",2,"right","6px"],["class","error-message",4,"ngIf"],[1,"info-message"],[1,"mt-2"],[1,"col-6","col-sm-6","col-md-6"],[1,"verify","ux-button","sm2","primary","float-right",3,"disabled","click"],[1,"error-message"],[1,"userinfo"],[1,"payee-info","mt-4","mb-4"],[1,"info-lft"],[1,"green1"],[1,"info-rit"],[1,"cancel","ux-button","sm2","secondary",3,"click"],[1,"proceed","ux-button","sm2","primary",3,"click"],[1,"unfound-info"],["alt","user-img",3,"src",4,"ngIf"],["alt","user-img",3,"src"],[1,"white1"],["src","assets/images/svg/more.svg","alt","more-icon"]],template:function(e,t){1&e&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"form",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.ec(10,"div",10),n.ec(11,"div",11),n.Rc(12,_,22,12,"div",12),n.Rc(13,R,24,15,"div",13),n.dc(),n.dc(),n.ec(14,"div",10),n.ec(15,"div",14),n.ec(16,"div",15),n.ec(17,"ul",16),n.ec(18,"li",17),n.ec(19,"a",18),n.Sc(20),n.qc(21,"translate"),n.dc(),n.dc(),n.ec(22,"li",17),n.ec(23,"a",19),n.Sc(24),n.qc(25,"translate"),n.dc(),n.dc(),n.dc(),n.ec(26,"div",20),n.ec(27,"div",21),n.ec(28,"div",6),n.ec(29,"div",10),n.Rc(30,M,4,3,"div",22),n.Rc(31,L,3,2,"ul",23),n.dc(),n.dc(),n.dc(),n.ec(32,"div",24),n.ec(33,"div",6),n.ec(34,"div",10),n.Rc(35,Q,4,3,"div",22),n.ec(36,"ul",25),n.Rc(37,q,9,6,"li",26),n.Rc(38,N,7,3,"li",27),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(39,"div",28),n.ec(40,"div",29),n.ec(41,"div",4),n.ec(42,"div",6),n.ec(43,"div",30),n.ec(44,"div",31),n.Zb(45,"img",32),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(46,"div",33),n.ec(47,"div",6),n.ec(48,"div",8),n.ec(49,"h4",34),n.Sc(50),n.qc(51,"translate"),n.dc(),n.dc(),n.dc(),n.ec(52,"div",6),n.ec(53,"div",8),n.ec(54,"p"),n.Sc(55),n.qc(56,"translate"),n.Zb(57,"br"),n.Sc(58),n.dc(),n.dc(),n.dc(),n.ec(59,"div",35),n.ec(60,"div",36),n.ec(61,"button",37),n.lc("click",(function(){return t.closePopup("inValidQrCode")})),n.Sc(62),n.qc(63,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(64,"div",38),n.ec(65,"div",6),n.ec(66,"div",8),n.ec(67,"h4",34),n.Sc(68),n.qc(69,"translate"),n.dc(),n.dc(),n.dc(),n.ec(70,"div",6),n.ec(71,"div",8),n.ec(72,"p"),n.Sc(73),n.qc(74,"translate"),n.dc(),n.dc(),n.dc(),n.ec(75,"div",35),n.ec(76,"div",39),n.ec(77,"button",40),n.lc("click",(function(){return t.validateVpa(),t.closePopup("insecure-qrcode")})),n.Sc(78),n.qc(79,"translate"),n.dc(),n.dc(),n.ec(80,"div",39),n.ec(81,"button",41),n.lc("click",(function(){return t.closePopup("insecure-qrcode")})),n.Sc(82),n.qc(83,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(84,"div",42),n.ec(85,"div",6),n.ec(86,"div",8),n.ec(87,"h4",34),n.Sc(88),n.qc(89,"translate"),n.dc(),n.dc(),n.dc(),n.ec(90,"div",6),n.ec(91,"div",8),n.ec(92,"p"),n.Sc(93),n.qc(94,"translate"),n.dc(),n.ec(95,"p"),n.Sc(96),n.qc(97,"translate"),n.dc(),n.dc(),n.dc(),n.ec(98,"div",35),n.ec(99,"div",39),n.ec(100,"button",43),n.lc("click",(function(){return t.closePopup("inValidSignature")})),n.Sc(101),n.qc(102,"translate"),n.dc(),n.dc(),n.ec(103,"div",39),n.ec(104,"button",37),n.lc("click",(function(){return t.onClickYes()})),n.Sc(105),n.qc(106,"translate"),n.dc(),n.dc(),n.dc(),n.dc()),2&e&&(n.Mb(5),n.uc("formGroup",t.createMandateForm),n.Mb(7),n.uc("ngIf",!t.showUserInfo),n.Mb(1),n.uc("ngIf",t.showUserInfo),n.Mb(7),n.Tc(n.rc(21,23,"RECENT_PAYEE")),n.Mb(4),n.Tc(n.rc(25,25,"FAVORITE_PAYEE")),n.Mb(6),n.uc("ngIf",0==t.recentPayeeReqList.length),n.Mb(1),n.uc("ngIf",t.recentPayeeReqList.length>0),n.Mb(4),n.uc("ngIf",0==t.favPayeeList.length),n.Mb(2),n.uc("ngForOf",t.favPayeeList),n.Mb(1),n.uc("ngIf",t.favPayeeList.length>0),n.Mb(12),n.Tc(n.rc(51,27,"INVALID_QR_CODE")),n.Mb(5),n.Uc(" ",n.rc(56,29,"SCAN_VALID_QR_CODE")," "),n.Mb(3),n.Uc(" ",t.popupData.error," "),n.Mb(4),n.Tc(n.rc(63,31,"OK")),n.Mb(6),n.Tc(n.rc(69,33,"INSECURE_QR_CODE")),n.Mb(5),n.Uc(" ",n.rc(74,35,"INSECURE_QR_CODE_DO_YOU_WANT_TO_PROCEED")," "),n.Mb(5),n.Tc(n.rc(79,37,"YES")),n.Mb(4),n.Tc(n.rc(83,39,"NO")),n.Mb(6),n.Tc(n.rc(89,41,"ALERT")),n.Mb(5),n.Uc(" ",n.rc(94,43,"INVALID_QR_SIGNATURE")," "),n.Mb(3),n.Uc(" ",n.rc(97,45,"DO_YOU_WANT_TO_PROCEED")," "),n.Mb(5),n.Tc(n.rc(102,47,"NO")),n.Mb(4),n.Tc(n.rc(106,49,"YES")))},directives:[s.I,s.t,s.k,i.t,i.s,s.c,s.s,s.i,s.D],pipes:[g.a,f.a,f.c],styles:[""]}),e})()}];let E=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[c.g.forChild(T)],c.g]}),e})();var k=a("PCNd");let V=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[i.c,k.a,s.m,s.C,E]]}),e})()},"4oXj":function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var i=a("fXoL"),c=a("5IsW"),s=a("fHQ/"),n=a("H9Rt"),o=a("EnSQ"),r=a("au7T"),d=a("oBZJ"),l=a("L7Xq");let h=(()=>{class e{constructor(e,t,a,i,c,s,n,o,r){this.constant=e,this.encryptDecryptService=t,this.storage=a,this.dataService=i,this.commonMethod=c,this.pluginService=s,this.localStorage=n,this.http=o,this.ngZone=r}getUserLocation(){this.latitude=this.dataService.latitude?this.dataService.latitude:"0",this.longitude=this.dataService.longitude?this.dataService.longitude:"0",this.userLocationName=this.dataService.userLocationName}setAddBenificiaryRequest(e,t,a,i){var c=this.dataService.ScanQrCodeData?this.dataService.ScanQrCodeData:{},s={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_ADDBENIFICIARY,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_payeeName]:e.payeeName,[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_nickName]:e.nickName,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_is_Favourite]:e.isFavourite,[this.constant.key_upi_appID]:this.constant.val_upi_psb,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return t?(s[this.constant.key_upi_inputParam][this.constant.key_upi_accNum]=this.dataService.upiBenfAccNo?this.dataService.upiBenfAccNo:c.qrAccountNo,s[this.constant.key_upi_inputParam][this.constant.key_upi_ifsc]=this.dataService.upiBenfIfsc?this.dataService.upiBenfIfsc:c.qrIfsc):a?s[this.constant.key_upi_inputParam][this.constant.key_upi_payeeVPA]=e.payeeVPA:i&&(s[this.constant.key_upi_inputParam][this.constant.key_upi_mmid]=this.dataService.upiBenfMMId),console.log("setAddBenificiaryRequest ",JSON.stringify(s)),this.getOmniRequestObject(s)}getOmniRequestObject(e){e=e;var t={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_upiRequest]:JSON.stringify(e)};return console.log("inputData => ",JSON.stringify(t)),this.getEncryptedOmniRequestObject(t)}getBenficiaryListReq(e,t){var a={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBENIFICIARYLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_beneListType]:e,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_beneListMode]:t,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return console.log("getBenficiaryListReq ",JSON.stringify(a)),this.getOmniRequestObject(a)}getEncryptedOmniRequestObject(e){console.log("session Key : ",this.storage.getSessionStorage(this.constant.val_sessionKey));let t=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e));return console.log("encryptDatagetOmniRequestObject => ",JSON.stringify(t)),t}getBenificiaryList(){return new Promise((e,t)=>{this.ngZone.run(()=>{this.dataService.fetchUPIbenificiaryLists?(this.getUserLocation(),this.fetchBenificiaryList(e)):e({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList})})})}fetchBenificiaryList(e){var t=this.getBenficiaryListReq(this.constant.val_upi_benListType_ALL,this.constant.val_upi_ANY);this.UpiApiCall(t,e)}UpiApiCall(e,t){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{var a,i,c,s;let n=e.responseParameter.upiResponse;if("00"==n.status)switch(n.subActionId){case this.constant.upiserviceName_GETBENIFICIARYLIST:this.dataService.recentBeneficiaryList=(null===(a=n.responseParameter)||void 0===a?void 0:a.beneficiaryList)?null===(i=n.responseParameter)||void 0===i?void 0:i.beneficiaryList:[],this.dataService.favPayeeList=(null===(c=n.responseParameter)||void 0===c?void 0:c.FavBeneList)?null===(s=n.responseParameter)||void 0===s?void 0:s.FavBeneList:[],t({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList}),this.dataService.fetchUPIbenificiaryLists=!1}},e=>{console.log("ERROR!",e)})}}return e.\u0275fac=function(t){return new(t||e)(i.ic(c.a),i.ic(s.a),i.ic(n.a),i.ic(o.a),i.ic(r.a),i.ic(d.a),i.ic(n.a),i.ic(l.a),i.ic(i.H))},e.\u0275prov=i.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);