(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{"4oXj":function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));var c=i("fXoL"),a=i("5IsW"),s=i("fHQ/"),n=i("H9Rt"),o=i("EnSQ"),r=i("au7T"),d=i("oBZJ"),h=i("L7Xq");let l=(()=>{class e{constructor(e,t,i,c,a,s,n,o,r){this.constant=e,this.encryptDecryptService=t,this.storage=i,this.dataService=c,this.commonMethod=a,this.pluginService=s,this.localStorage=n,this.http=o,this.ngZone=r}getUserLocation(){this.latitude=this.dataService.latitude?this.dataService.latitude:"0",this.longitude=this.dataService.longitude?this.dataService.longitude:"0",this.userLocationName=this.dataService.userLocationName}setAddBenificiaryRequest(e,t,i,c){var a=this.dataService.ScanQrCodeData?this.dataService.ScanQrCodeData:{},s={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_ADDBENIFICIARY,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_payeeName]:e.payeeName,[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_nickName]:e.nickName,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_is_Favourite]:e.isFavourite,[this.constant.key_upi_appID]:this.constant.val_upi_psb,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return t?(s[this.constant.key_upi_inputParam][this.constant.key_upi_accNum]=this.dataService.upiBenfAccNo?this.dataService.upiBenfAccNo:a.qrAccountNo,s[this.constant.key_upi_inputParam][this.constant.key_upi_ifsc]=this.dataService.upiBenfIfsc?this.dataService.upiBenfIfsc:a.qrIfsc):i?s[this.constant.key_upi_inputParam][this.constant.key_upi_payeeVPA]=e.payeeVPA:c&&(s[this.constant.key_upi_inputParam][this.constant.key_upi_mmid]=this.dataService.upiBenfMMId),console.log("setAddBenificiaryRequest ",JSON.stringify(s)),this.getOmniRequestObject(s)}getOmniRequestObject(e){e=e;var t={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_upiRequest]:JSON.stringify(e)};return console.log("inputData => ",JSON.stringify(t)),this.getEncryptedOmniRequestObject(t)}getBenficiaryListReq(e,t){var i={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_GETBENIFICIARYLIST,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_beneListType]:e,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_beneListMode]:t,[this.constant.key_upi_device]:{[this.constant.key_upi_app]:this.constant.val_app_pakage_name,[this.constant.key_upi_capability]:this.constant.val_upi_capability,[this.constant.key_upi_lng]:this.longitude,[this.constant.key_upi_lat]:this.latitude,[this.constant.key_upi_os]:this.dataService.platform,[this.constant.key_upi_ip]:this.dataService.ipAddress,[this.constant.key_upi_location]:this.userLocationName,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId)}}};return console.log("getBenficiaryListReq ",JSON.stringify(i)),this.getOmniRequestObject(i)}getEncryptedOmniRequestObject(e){console.log("session Key : ",this.storage.getSessionStorage(this.constant.val_sessionKey));let t=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e));return console.log("encryptDatagetOmniRequestObject => ",JSON.stringify(t)),t}getBenificiaryList(){return new Promise((e,t)=>{this.ngZone.run(()=>{this.dataService.fetchUPIbenificiaryLists?(this.getUserLocation(),this.fetchBenificiaryList(e)):e({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList})})})}fetchBenificiaryList(e){var t=this.getBenficiaryListReq(this.constant.val_upi_benListType_ALL,this.constant.val_upi_ANY);this.UpiApiCall(t,e)}UpiApiCall(e,t){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{var i,c,a,s;let n=e.responseParameter.upiResponse;if("00"==n.status)switch(n.subActionId){case this.constant.upiserviceName_GETBENIFICIARYLIST:this.dataService.recentBeneficiaryList=(null===(i=n.responseParameter)||void 0===i?void 0:i.beneficiaryList)?null===(c=n.responseParameter)||void 0===c?void 0:c.beneficiaryList:[],this.dataService.favPayeeList=(null===(a=n.responseParameter)||void 0===a?void 0:a.FavBeneList)?null===(s=n.responseParameter)||void 0===s?void 0:s.FavBeneList:[],t({recentBeneList:this.dataService.recentBeneficiaryList,FavBeneList:this.dataService.favPayeeList}),this.dataService.fetchUPIbenificiaryLists=!1}},e=>{console.log("ERROR!",e)})}}return e.\u0275fac=function(t){return new(t||e)(c.ic(a.a),c.ic(s.a),c.ic(n.a),c.ic(o.a),c.ic(r.a),c.ic(d.a),c.ic(n.a),c.ic(h.a),c.ic(c.H))},e.\u0275prov=c.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},isgQ:function(e,t,i){"use strict";i.r(t),i.d(t,"RequestMandateModule",(function(){return U}));var c=i("ofXK"),a=i("tyNb"),s=i("3Pt+"),n=i("fXoL"),o=i("EnSQ"),r=i("L7Xq"),d=i("5IsW"),h=i("H9Rt"),l=i("oBZJ"),u=i("au7T"),p=i("hmxD"),v=i("4oXj"),g=i("Eioz"),f=i("RZqO");function _(e,t){1&e&&(n.ec(0,"p",45),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_UPI_ID_MOBILE_NUMBER_ERROR")," "))}function m(e,t){1&e&&(n.ec(0,"p",45),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_VALID_UPI_ID_MOBILE_NO")," "))}function y(e,t){if(1&e){const e=n.fc();n.ec(0,"div",33),n.ec(1,"div",9),n.ec(2,"div",34),n.ec(3,"div",35),n.ec(4,"label",36),n.Sc(5),n.qc(6,"translate"),n.dc(),n.Zb(7,"input",37),n.qc(8,"translate"),n.ec(9,"a",38),n.lc("click",(function(){return n.Hc(e),n.pc().goToPage("searchContactList")})),n.Zb(10,"em",39),n.dc(),n.Rc(11,_,3,3,"p",40),n.Rc(12,m,3,3,"p",40),n.ec(13,"p",41),n.Sc(14,"e.g. name@psb/9820000000"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(15,"div",42),n.ec(16,"div",9),n.Zb(17,"div",43),n.ec(18,"div",43),n.ec(19,"button",44),n.lc("click",(function(){return n.Hc(e),n.pc().verify()})),n.Sc(20),n.qc(21,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()}if(2&e){const e=n.pc();n.Mb(5),n.Tc(n.rc(6,6,"UPI_ID_MOBILE_NUMBER")),n.Mb(2),n.vc("placeholder",n.rc(8,8,"ENTER_UPI_ID_MOBILE_NUMBER")),n.Mb(4),n.uc("ngIf",e.requestMandateForm.controls.upiIdOrMobno.hasError("required")&&e.requestMandateForm.controls.upiIdOrMobno.touched),n.Mb(1),n.uc("ngIf",!e.requestMandateForm.controls.upiIdOrMobno.hasError("required")&&e.requestMandateForm.controls.upiIdOrMobno.touched&&e.requestMandateForm.controls.upiIdOrMobno.hasError("pattern")),n.Mb(7),n.uc("disabled",e.requestMandateForm.invalid),n.Mb(1),n.Tc(n.rc(21,10,"VERIFY"))}}function b(e,t){if(1&e&&(n.ec(0,"em"),n.Sc(1),n.dc()),2&e){const e=n.pc(2);n.Mb(1),n.Tc(null==e.DataService.validateAddressResp?null:e.DataService.validateAddressResp.mobileNumber)}}function S(e,t){if(1&e){const e=n.fc();n.ec(0,"div",46),n.ec(1,"div",47),n.ec(2,"div",48),n.ec(3,"span",49),n.ec(4,"h6"),n.Sc(5),n.qc(6,"firstLastChar"),n.dc(),n.dc(),n.dc(),n.ec(7,"div",50),n.ec(8,"h5"),n.Sc(9),n.dc(),n.ec(10,"h6"),n.Sc(11),n.qc(12,"translate"),n.dc(),n.Rc(13,b,2,1,"em",27),n.dc(),n.dc(),n.ec(14,"div",42),n.ec(15,"div",9),n.ec(16,"div",43),n.ec(17,"button",51),n.lc("click",(function(){return n.Hc(e),n.pc().cancel()})),n.Sc(18),n.qc(19,"translate"),n.dc(),n.dc(),n.ec(20,"div",43),n.ec(21,"button",52),n.lc("click",(function(){return n.Hc(e),n.pc().proceed()})),n.Sc(22),n.qc(23,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()}if(2&e){const e=n.pc();n.Mb(5),n.Tc(n.rc(6,7,e.DataService.validateAddressResp.MASKNAME)),n.Mb(4),n.Tc(e.DataService.validateAddressResp.MASKNAME),n.Mb(2),n.Vc("",n.rc(12,9,"UPI_ID")," : ",e.DataService.validateAddressResp.validatedVpa,""),n.Mb(2),n.uc("ngIf",null==e.DataService.validateAddressResp?null:e.DataService.validateAddressResp.mobileNumber),n.Mb(5),n.Tc(n.rc(19,11,"CANCEL")),n.Mb(4),n.Tc(n.rc(23,13,"PROCEED"))}}function I(e,t){1&e&&(n.ec(0,"div",53),n.ec(1,"h6"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()),2&e&&(n.Mb(2),n.Uc(" ",n.rc(3,1,"NO_RECENT_PAYEE_FOUND"),""))}function M(e,t){if(1&e&&n.Zb(0,"img",55),2&e){const e=n.pc().$implicit;n.uc("src",e.beneImageUrl,n.Jc)}}function R(e,t){if(1&e&&(n.ec(0,"h6"),n.Sc(1),n.qc(2,"firstLastChar"),n.dc()),2&e){const e=n.pc().$implicit;n.Mb(1),n.Uc("",n.rc(2,1,e.nickName)," ")}}function P(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",38),n.lc("click",(function(){n.Hc(e);const i=t.$implicit;return n.pc(2).validatePayee("recent",i)})),n.ec(2,"span",49),n.Rc(3,M,1,1,"img",54),n.Rc(4,R,3,3,"h6",27),n.dc(),n.ec(5,"em"),n.Sc(6),n.qc(7,"truncate"),n.dc(),n.dc(),n.dc()}if(2&e){const e=t.$implicit;n.Mb(3),n.uc("ngIf",e.beneImageUrl),n.Mb(1),n.uc("ngIf",!e.beneImageUrl),n.Mb(2),n.Tc(n.rc(7,3,e.nickName))}}function L(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",38),n.lc("click",(function(){return n.Hc(e),n.pc(2).searchContact("recent")})),n.ec(2,"span",56),n.Zb(3,"img",57),n.dc(),n.ec(4,"em"),n.Sc(5),n.qc(6,"translate"),n.dc(),n.dc(),n.dc()}2&e&&(n.Mb(5),n.Tc(n.rc(6,1,"VIEW_MORE")))}function A(e,t){if(1&e&&(n.ec(0,"ul",25),n.Rc(1,P,8,5,"li",26),n.Rc(2,L,7,3,"li",27),n.dc()),2&e){const e=n.pc();n.Mb(1),n.uc("ngForOf",e.recentPayeeReqList),n.Mb(1),n.uc("ngIf",e.recentPayeeReqList.length>0)}}function k(e,t){1&e&&(n.ec(0,"div",53),n.ec(1,"h6"),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()),2&e&&(n.Mb(2),n.Uc(" ",n.rc(3,1,"NO_FAVORITE_PAYEE_FOUND"),""))}function q(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",38),n.lc("click",(function(){n.Hc(e);const i=t.$implicit;return n.pc().validatePayee("fav",i)})),n.ec(2,"span",49),n.ec(3,"h6"),n.Sc(4),n.qc(5,"firstLastChar"),n.dc(),n.dc(),n.ec(6,"em"),n.Sc(7),n.qc(8,"truncate"),n.dc(),n.dc(),n.dc()}if(2&e){const e=t.$implicit;n.Mb(4),n.Tc(n.rc(5,2,e.nickName)),n.Mb(3),n.Tc(n.rc(8,4,e.nickName))}}function N(e,t){if(1&e){const e=n.fc();n.ec(0,"li"),n.ec(1,"a",38),n.lc("click",(function(){return n.Hc(e),n.pc().searchContact("favorite")})),n.ec(2,"span",56),n.Zb(3,"img",57),n.dc(),n.ec(4,"em"),n.Sc(5),n.qc(6,"translate"),n.dc(),n.dc(),n.dc()}2&e&&(n.Mb(5),n.Tc(n.rc(6,1,"VIEW_MORE")))}const D=[{path:"",component:(()=>{class e{constructor(e,t,i,c,a,s,n,o,r,d,h,l){this.router=e,this.DataService=t,this.location=i,this.http=c,this.constant=a,this.localStorage=s,this.pluginService=n,this.commonMethod=o,this.requestMandateService=r,this.beneficiaryService=d,this.ngZone=h,this.translatePipe=l,this.showFavPayeeLength=10,this.showRecentPayeeLength=10,this.headerdata={headerType:"CloseNewHeader",titleName:"REQUEST_MANDATE",footertype:"none"},this.showUserInfo=!1,this.showMoreFav=!1,this.showMoreRecentRequest=!1,this.recentPayeeReqList=[],this.favPayeeList=[]}ngOnInit(){this.DataService.fetchContactsFromDevice=!1,history.pushState({},"upiMandate",this.location.prepareExternalUrl("upiMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.defaultVPAAccountDetails=this.getDefaultVpaAccountDetails(),this.DataService.changeMessage(this.headerdata),this.DataService.upiSearchPayeeList=[],this.buildForm(),this.validateAddressByVPAorMobNo(),this.getBenificiaryList(),this.DataService.contactPrevURL=this.router.url}buildForm(){this.requestMandateForm=new s.j({upiIdOrMobno:new s.g("",[s.G.required,s.G.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])})}goToPage(e){"searchContactList"==e?(this.DataService.contactPrevURL=this.router.url,this.DataService.fetchContactsFromDevice=!0):this.DataService.fetchContactsFromDevice=!1,this.router.navigateByUrl("/"+e)}getBenificiaryList(){this.beneficiaryService.getBenificiaryList().then(e=>{this.recentPayeeReqList=[],e.recentBeneList.map((e,t)=>{"VPA"==e.txnMode&&this.recentPayeeReqList.push(e)}),this.favPayeeList=this.DataService.favPayeeList,this.recentPayeeReqList.length>10&&(this.showMoreRecentRequest=!0),this.favPayeeList.length>10&&(this.showMoreFav=!0)})}getFavPayeeList(){var e=this.requestMandateService.setFavoritePayeeRequest();this.UpiApiCall(e)}verify(){if(this.requestMandateForm.markAllAsTouched(),this.requestMandateForm.valid){let t=this.requestMandateForm.get("upiIdOrMobno").value;if(/^\d{10}$/.test(t)){var e=this.requestMandateService.setDefaultVPARequest(t);this.UpiApiCall(e)}else this.pluginService.getTransactionId().subscribe(e=>{var t=this.requestMandateService.setValidateRequest(this.requestMandateForm.value,this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if("00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_VALIDATEADDRESS:this.showUserInfo=!0,this.ngZone.run(()=>{this.DataService.validateAddressResp=t.responseParameter});break;case this.constant.upiserviceName_GETDEFAULTVPA:let e=t.responseParameter.defaultVpaDetail.paymentAddress;this.pluginService.getTransactionId().subscribe(t=>{var i=this.requestMandateService.setValidateRequest({upiIdOrMobno:e},this.defaultVPAAccountDetails,t);this.UpiApiCall(i)})}else this.ngZone.run(()=>{this.DataService.errorMsg=t.msg,this.DataService.informationLabel=this.translatePipe.transform("ERROR"),this.DataService.primaryBtnText=this.translatePipe.transform("OK"),this.commonMethod.openPopup("div.popup-bottom.show-common-error")})},e=>{console.log("ERROR!",e)})}getDefaultVpaAccountDetails(){let e=this.DataService.vpaAddressList.find(e=>"Y"==e.default);if(e)return{vpaDetails:e,accountDetails:this.getDefaultAccountNoByVpa(e.accounts)}}getDefaultAccountNoByVpa(e){if(e.length>0)return e.find(e=>"Y"==e.isDefaultAccount)}validateAddressByVPAorMobNo(){if(this.DataService.deviceMobileNo){var e=this.requestMandateService.setDefaultVPARequest(this.DataService.deviceMobileNo);this.UpiApiCall(e)}this.DataService.upiValidatedVpaAdress&&this.pluginService.getTransactionId().subscribe(e=>{var t=this.requestMandateService.setValidateRequest({upiIdOrMobno:this.DataService.upiValidatedVpaAdress},this.defaultVPAAccountDetails,e);this.UpiApiCall(t)})}proceed(){this.DataService.resetRequestMandateData(),this.router.navigateByUrl("/requestMandatePayment")}ngOnDestroy(){this.DataService.deviceMobileNo="",this.DataService.upiValidatedVpaAdress=""}cancel(){this.showUserInfo=!1,this.requestMandateForm.reset()}searchContact(e){this.DataService.upiSearchCollectPayeeList="recent"==e?this.recentPayeeReqList:this.favPayeeList,this.DataService.upiCollectsearchType=e,this.router.navigateByUrl("/collectSearchContact")}validatePayee(e,t){var i;this.pluginService.getTransactionId().subscribe(e=>{i=this.requestMandateService.setValidateRequest({upiIdOrMobno:t.beneVpa},this.defaultVPAAccountDetails,e),this.UpiApiCall(i)})}showMore(e){"recent"==e?this.showRecentPayeeLength=this.recentPayeeReqList.length:this.showFavPayeeLength=this.favPayeeList.length}}return e.\u0275fac=function(t){return new(t||e)(n.Yb(a.c),n.Yb(o.a),n.Yb(c.n),n.Yb(r.a),n.Yb(d.a),n.Yb(h.a),n.Yb(l.a),n.Yb(u.a),n.Yb(p.a),n.Yb(v.a),n.Yb(n.H),n.Yb(g.a))},e.\u0275cmp=n.Sb({type:e,selectors:[["app-request-mandate"]],decls:46,vars:14,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container"],[1,"body-page-container"],[1,"container-fluid"],[3,"formGroup"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1"],["class","upiId",4,"ngIf"],["class","userinfo",4,"ngIf"],[1,"ux-nav-tabs",2,"margin","0"],[1,"responsive3"],["role","tablist",1,"nav","nav-tabs","nav-justified","bor-n"],[1,"nav-item"],["data-toggle","tab","href","#recent",1,"nav-link","active"],["data-toggle","tab","href","#favorite",1,"nav-link"],[1,"tab-content","custom-tab-content"],["id","recent",1,"tab-pane","active"],["class","unfound-info",4,"ngIf"],["class","payee-list1",4,"ngIf"],["id","favorite",1,"tab-pane","fade"],[1,"payee-list1"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"powered-logo","mt-0"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"upiId"],[1,"col-12","col-sm-12","col-md-12"],[1,"ux-input"],["for","upiId"],["type","text","name","upiId","formControlName","upiIdOrMobno","required","",3,"placeholder"],[3,"click"],[1,"show-phonebook"],["class","error-message",4,"ngIf"],[1,"info-message"],[1,"mt-2"],[1,"col-6","col-sm-6","col-md-6"],[1,"verify","ux-button","sm2","primary","float-right",3,"disabled","click"],[1,"error-message"],[1,"userinfo"],[1,"payee-info","mt-4","mb-4"],[1,"info-lft"],[1,"green1"],[1,"info-rit"],[1,"cancel","ux-button","sm2","secondary",3,"click"],[1,"proceed","ux-button","sm2","primary",3,"click"],[1,"unfound-info"],["alt","user-img",3,"src",4,"ngIf"],["alt","user-img",3,"src"],[1,"white1"],["src","assets/images/svg/more.svg","alt","more-icon"]],template:function(e,t){1&e&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"form",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.ec(10,"div",10),n.ec(11,"div",11),n.Rc(12,y,22,12,"div",12),n.Rc(13,S,24,15,"div",13),n.dc(),n.dc(),n.ec(14,"div",10),n.ec(15,"div",14),n.ec(16,"div",15),n.ec(17,"ul",16),n.ec(18,"li",17),n.ec(19,"a",18),n.Sc(20),n.qc(21,"translate"),n.dc(),n.dc(),n.ec(22,"li",17),n.ec(23,"a",19),n.Sc(24),n.qc(25,"translate"),n.dc(),n.dc(),n.dc(),n.ec(26,"div",20),n.ec(27,"div",21),n.ec(28,"div",6),n.ec(29,"div",10),n.Rc(30,I,4,3,"div",22),n.Rc(31,A,3,2,"ul",23),n.dc(),n.dc(),n.dc(),n.ec(32,"div",24),n.ec(33,"div",6),n.ec(34,"div",10),n.Rc(35,k,4,3,"div",22),n.ec(36,"ul",25),n.Rc(37,q,9,6,"li",26),n.Rc(38,N,7,3,"li",27),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(39,"div",28),n.ec(40,"div",29),n.ec(41,"div",4),n.ec(42,"div",6),n.ec(43,"div",30),n.ec(44,"div",31),n.Zb(45,"img",32),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&e&&(n.Mb(5),n.uc("formGroup",t.requestMandateForm),n.Mb(7),n.uc("ngIf",!t.showUserInfo),n.Mb(1),n.uc("ngIf",t.showUserInfo),n.Mb(7),n.Tc(n.rc(21,10,"RECENT_PAYER")),n.Mb(4),n.Tc(n.rc(25,12,"FAVORITE_PAYER")),n.Mb(6),n.uc("ngIf",0==t.recentPayeeReqList.length),n.Mb(1),n.uc("ngIf",t.recentPayeeReqList.length>0),n.Mb(4),n.uc("ngIf",0==t.favPayeeList.length),n.Mb(2),n.uc("ngForOf",t.favPayeeList),n.Mb(1),n.uc("ngIf",t.favPayeeList.length>0))},directives:[s.I,s.t,s.k,c.t,c.s,s.c,s.s,s.i,s.D],pipes:[g.a,f.a,f.c],styles:[""]}),e})()}];let E=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[a.g.forChild(D)],a.g]}),e})();var O=i("PCNd");let U=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[c.c,O.a,s.m,s.C,E]]}),e})()}}]);