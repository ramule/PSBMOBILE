(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{Geda:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var a=i("fXoL"),n=i("3Pt+"),o=i("au7T");let s=(()=>{class e{constructor(e,t){this.control=e,this.commonMethods=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const t=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=t){let e=this.control.value.substring(0,t);this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(n.r),a.Yb(o.a))},e.\u0275dir=a.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,t){1&e&&a.lc("input",(function(e){return t.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[a.Kb]}),e})()},OXpz:function(e,t,i){"use strict";i.d(t,"d",(function(){return o})),i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return c})),i.d(t,"c",(function(){return r}));var a=i("fXoL"),n=i("3Pt+");let o=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&!/^[0-9]*$/.test(this.control.value)){let e=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(n.r))},e.\u0275dir=a.Tb({type:e,selectors:[["","numbersOnly",""]],hostBindings:function(e,t){1&e&&a.lc("input",(function(e){return t.ngOnChanges(e)}))},features:[a.Kb]}),e})(),s=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&this.control.value){let e=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(n.r))},e.\u0275dir=a.Tb({type:e,selectors:[["","digitOnly",""]],hostBindings:function(e,t){1&e&&a.lc("input",(function(e){return t.ngOnChanges(e)}))},features:[a.Kb]}),e})(),c=(()=>{class e{constructor(e){this.el=e,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(e){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(e.key))return;let t=this.el.nativeElement.value;const i=this.el.nativeElement.selectionStart,a=[t.slice(0,i),"Decimal"==e.key?".":e.key,t.slice(i)].join("");a&&!String(a).match(this.regex)&&e.preventDefault()}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(a.o))},e.\u0275dir=a.Tb({type:e,selectors:[["","amountOnly",""]],hostBindings:function(e,t){1&e&&a.lc("keydown",(function(e){return t.onKeyDown(e)}))}}),e})(),r=(()=>{class e{constructor(e){this._el=e}onInputChange(e){const t=this._el.nativeElement.value;this._el.nativeElement.value=t.replace(/[^0-9]*/g,""),t!==this._el.nativeElement.value&&e.stopPropagation()}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(a.o))},e.\u0275dir=a.Tb({type:e,selectors:[["input","numericOnly",""]],hostBindings:function(e,t){1&e&&a.lc("input",(function(e){return t.onInputChange(e)}))}}),e})()},UoUZ:function(e,t,i){"use strict";i.r(t),i.d(t,"AddNomineeDetailsModule",(function(){return K}));var a=i("PCNd"),n=i("3Pt+"),o=i("ofXK"),s=i("kuSH"),c=i("wd/R"),r=i("fXoL"),d=i("tyNb"),l=i("EnSQ"),h=i("L7Xq"),u=i("H9Rt"),m=i("5IsW"),p=i("fHQ/"),g=i("au7T");let v=(()=>{class e{constructor(e,t,i,a,n,o){this.constant=e,this.encryptDecryptService=t,this.storage=i,this.dataService=a,this.commonMethod=n,this.datePipe=o}getStateListParams(){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsType,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_CountryCode]:"1",[this.constant.Key_type]:"ACCOPEN"};return console.log("getStateListParams ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(e))}getCityListParams(e){var t={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsType,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_StateId]:e,[this.constant.Key_type]:"ACCOPEN"};return console.log("city Params ",JSON.stringify(t)),this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(t))}getDropDownMasterParam(e){var t={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsType,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_omni_refRecType]:e};return console.log("request",t),this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(t))}getUpdateNomineeService(e,t,i,a,n){var o=this.storage.getLocalStorage(this.constant.storage_mobileNo),s=e+"|"+t+"|"+i.nomineeName+"|"+i.nomineeRelationship+"|"+i.address1+"|"+i.address2+"|"+n+"|"+a+"|"+i.guardianName+"|"+i.guardianAddress+"|"+o+"|"+i.city+"|"+i.state+"|IN",c={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_addNomineeData]:s};return console.log("Add Nomine Request ::",c),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(c))}}return e.\u0275fac=function(t){return new(t||e)(r.ic(m.a),r.ic(p.a),r.ic(u.a),r.ic(l.a),r.ic(g.a),r.ic(o.f))},e.\u0275prov=r.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var f=i("Geda"),y=i("z17N"),N=i("OXpz"),D=i("Eioz");function b(e,t){if(1&e){const e=r.fc();r.ec(0,"li"),r.ec(1,"a",53),r.lc("click",(function(){r.Hc(e);const i=t.$implicit;return r.pc().DataService.breadcrumroute(i.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&e){const e=t.$implicit;r.Mb(2),r.Tc(r.rc(3,1,e.currentRoute))}}function S(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function T(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," Only Alphabet is allowed "),r.dc())}function I(e,t){if(1&e&&(r.ec(0,"option",55),r.Sc(1),r.qc(2,"titlecase"),r.dc()),2&e){const e=t.$implicit;r.uc("value",e.ref_code),r.Mb(1),r.Tc(r.rc(2,2,e.DESCRIPTION))}}function A(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function k(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function _(e,t){1&e&&(r.ec(0,"div",13),r.ec(1,"div",37),r.ec(2,"h6",38),r.Sc(3,"Please Provide Guardian Details"),r.dc(),r.dc(),r.dc())}function P(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function C(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function E(e,t){if(1&e&&(r.ec(0,"option",55),r.Sc(1),r.dc()),2&e){const e=t.$implicit;r.uc("value",e.ref_code),r.Mb(1),r.Tc(e.DESCRIPTION)}}function R(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function w(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function O(e,t){if(1&e&&(r.ec(0,"div",13),r.ec(1,"div",25),r.ec(2,"div",26),r.ec(3,"label"),r.Sc(4,"Guardian Name"),r.dc(),r.Zb(5,"input",56),r.Rc(6,P,2,0,"p",28),r.Rc(7,C,2,0,"p",28),r.dc(),r.dc(),r.ec(8,"div",25),r.ec(9,"div",26),r.ec(10,"label"),r.Sc(11,"Guardian Relationship with Nominee"),r.dc(),r.ec(12,"select",57),r.ec(13,"option",30),r.Sc(14," Select Guardian Type "),r.dc(),r.Rc(15,E,2,2,"option",31),r.dc(),r.Rc(16,R,2,0,"p",28),r.dc(),r.dc(),r.ec(17,"div",25),r.ec(18,"div",26),r.ec(19,"label"),r.Sc(20,"Guardian Address"),r.dc(),r.Zb(21,"input",58),r.Rc(22,w,2,0,"p",28),r.dc(),r.dc(),r.dc()),2&e){const e=r.pc();r.Mb(6),r.uc("ngIf",e.addNomineeDetails.controls.guardianName.hasError("required")&&(e.addNomineeDetails.controls.guardianName.dirty||e.addNomineeDetails.controls.guardianName.touched)),r.Mb(1),r.uc("ngIf",e.addNomineeDetails.controls.guardianName.hasError("pattern")&&(e.addNomineeDetails.controls.guardianName.dirty||e.addNomineeDetails.controls.guardianName.touched)),r.Mb(8),r.uc("ngForOf",e.gardianTypeList),r.Mb(1),r.uc("ngIf",e.addNomineeDetails.controls.guardianRelationShip.hasError("required")&&(e.addNomineeDetails.controls.guardianRelationShip.dirty||e.addNomineeDetails.controls.guardianRelationShip.touched)),r.Mb(6),r.uc("ngIf",e.addNomineeDetails.controls.guardianAddress.hasError("required")&&(e.addNomineeDetails.controls.guardianAddress.dirty||e.addNomineeDetails.controls.guardianAddress.touched))}}function M(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function q(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function V(e,t){if(1&e&&(r.ec(0,"option",55),r.Sc(1),r.qc(2,"titlecase"),r.dc()),2&e){const e=t.$implicit;r.uc("value",e.ID),r.Mb(1),r.Tc(r.rc(2,2,e.state))}}function x(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function L(e,t){if(1&e&&(r.ec(0,"option",55),r.Sc(1),r.qc(2,"titlecase"),r.dc()),2&e){const e=t.$implicit;r.uc("value",e.ID),r.Mb(1),r.Tc(r.rc(2,2,e.city))}}function G(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}function B(e,t){1&e&&(r.ec(0,"p",54),r.Sc(1," This field is required "),r.dc())}const F=[{path:"",component:(()=>{class e{constructor(e,t,i,a,n,o,s,r){this.router=e,this.DataService=t,this.http=i,this.storage=a,this.constant=n,this.location=o,this.datePipe=s,this.addNomineeDetailsService=r,this.stateList=[],this.stateNomineeList=[],this.cityList=[],this.gardianTypeList=[],this.relationShipList=[],this.nomineeData=[],this.nomineeAge=18,this.currentDate=c().toDate(),this.max=new Date}ngOnInit(){history.pushState({},"myAccountsInfo",this.location.prepareExternalUrl("myAccountsInfo")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("ADD_NOMINEE",this.router.url),this.accountNo=this.DataService.selectedNomineeAccNo,this.buildForm(),this.getRelationShip(),this.getState(),this.DataService.setPageSettings("Nominee Details")}onDateChange(e){var t=Math.floor(this.currentDate-e),i=Math.floor(t/864e5),a=Math.floor(i/31);this.nomineeAge=Math.floor(a/12),this.nomineeAge<18?this.minorFlag="Y":(this.minorFlag="N",this.getGardianType()),this.DataService.minorFlagNominee=this.minorFlag}goToPage(e){this.router.navigateByUrl("/"+e)}buildForm(){this.addNomineeDetails=new n.j({nomineeName:new n.g("",[n.G.required,n.G.pattern("[a-zA-Z_ ]*$")]),nomineeRelationship:new n.g("",[n.G.required]),dob:new n.g("",[n.G.required]),guardianName:new n.g("",[n.G.required,n.G.pattern("[a-zA-Z_ ]*$")]),guardianRelationShip:new n.g("",[n.G.required]),guardianAddress:new n.g("",[n.G.required]),address1:new n.g("",[n.G.required]),address2:new n.g("",[n.G.required]),state:new n.g("",[n.G.required]),city:new n.g("",[n.G.required]),pinCode:new n.g("",[n.G.required])})}validateForm(){if(this.guradianValidation(),this.addNomineeDetails.invalid)return this.addNomineeDetails.get("nomineeName").markAsTouched(),this.addNomineeDetails.get("nomineeRelationship").markAsTouched(),this.addNomineeDetails.get("dob").markAsTouched(),this.addNomineeDetails.get("guardianName").markAsTouched(),this.addNomineeDetails.get("guardianRelationShip").markAsTouched(),this.addNomineeDetails.get("guardianAddress").markAsTouched(),this.addNomineeDetails.get("address1").markAsTouched(),this.addNomineeDetails.get("address2").markAsTouched(),this.addNomineeDetails.get("state").markAsTouched(),this.addNomineeDetails.get("city").markAsTouched(),void this.addNomineeDetails.get("pinCode").markAsTouched()}guradianValidation(){this.nomineeAge<18?(this.addNomineeDetails.get("guardianName").setValidators([n.G.required,,n.G.pattern("[a-zA-Z_ ]*$")]),this.addNomineeDetails.get("guardianAddress").setValidators([n.G.required]),this.addNomineeDetails.get("guardianRelationShip").setValidators([n.G.required]),this.addNomineeDetails.get("guardianName").updateValueAndValidity(),this.addNomineeDetails.get("guardianAddress").updateValueAndValidity(),this.addNomineeDetails.get("guardianRelationShip").updateValueAndValidity()):(this.addNomineeDetails.get("guardianName").clearValidators(),this.addNomineeDetails.get("guardianAddress").clearValidators(),this.addNomineeDetails.get("guardianRelationShip").clearValidators(),this.addNomineeDetails.get("guardianName").updateValueAndValidity(),this.addNomineeDetails.get("guardianAddress").updateValueAndValidity(),this.addNomineeDetails.get("guardianRelationShip").updateValueAndValidity())}getState(){let e=this.addNomineeDetailsService.getStateListParams();this.http.callBankingAPIService(e,this.constant.deviceID,this.constant.serviceName_GETSTATES).subscribe(e=>{console.log(e);var t=e.responseParameter;"00"==t.opstatus?(console.log(e.responseParameter),e.hasOwnProperty("set")&&(this.stateList=e.set.records,this.stateNomineeList=e.set.records)):this.errorCallBack(e.subActionId,t)})}errorCallBack(e,t){showToastMessage(t.Result,"error")}getCity(e){this.cityList=[];let t=this.addNomineeDetailsService.getCityListParams(e);this.http.callBankingAPIService(t,this.constant.deviceID,this.constant.serviceName_GETCITIES).subscribe(e=>{console.log(e);var t=e.responseParameter;"00"==t.opstatus?(console.log(e.responseParameter),e.hasOwnProperty("set")&&(this.cityList=e.set.records)):this.errorCallBack(e.subActionId,t)})}addNomineeService(){var e=this.datePipe.transform(this.addNomineeDetails.value.dob,"dd-MM-yyyy"),t=this.addNomineeDetailsService.getUpdateNomineeService(this.DataService.userDetails.cifNumber,this.accountNo,this.addNomineeDetails.value,this.minorFlag,e);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_ADDNOMINEEDATA).subscribe(t=>{var i=t.responseParameter;console.log("Response :: ",i),"00"==i.opstatus?(this.DataService.nomineeReceiptObj.dateOfBirth=e,console.log("Updated Nominee Data",t.set.records),this.DataService.otpSessionPreviousPage=this.router.url,this.goToPage("nomineeAuth")):this.errorCallBack(t.subActionId,i)})}addNomineeSubmit(){if(this.guradianValidation(),this.addNomineeDetails.valid){var e=this.datePipe.transform(this.addNomineeDetails.value.dob,"dd-MM-yyyy");"N"==this.minorFlag&&(this.addNomineeDetails.value.guardianName="",this.addNomineeDetails.value.guardianAddress=""),this.DataService.request=this.addNomineeDetailsService.getUpdateNomineeService(this.DataService.userDetails.cifNumber,this.accountNo,this.addNomineeDetails.value,this.minorFlag,e),this.DataService.endPoint=this.constant.serviceName_ADDNOMINEEDATA;var t=this.relationShipList.find(e=>e.ref_code==this.addNomineeDetails.value.nomineeRelationship),i=this.stateList.find(e=>e.ID==this.addNomineeDetails.value.state),a=this.cityList.find(e=>e.ID==this.addNomineeDetails.value.city);this.DataService.nomineeDetailsData=this.addNomineeDetails.value,this.DataService.nomineeDetailsData.nomineeDtl=t.DESCRIPTION,this.DataService.nomineeDetailsData.stateDtl=i.state,this.DataService.nomineeDetailsData.cityDtl=a.city,this.router.navigate(["/nomineeOverview"])}else this.validateForm()}getRelationShip(){var e=this.addNomineeDetailsService.getDropDownMasterParam(s.d.NOMINEE_TYPE);this.http.callBankingAPIService(e,this.constant.deviceID,this.constant.serviceName_GETREFCODE).subscribe(e=>{console.log(e);var t=e.responseParameter;"00"==t.opstatus?e.hasOwnProperty("listofDataset")&&(this.relationShipList=e.listofDataset[0].records):(this.relationShipList=[{DESCRIPTION:"Father",ref_code:"1"},{DESCRIPTION:"Mother",ref_code:"2"},{DESCRIPTION:"Daughter",ref_code:"3"},{DESCRIPTION:"Son",ref_code:"4"},{DESCRIPTION:"Brother",ref_code:"5"},{DESCRIPTION:"Sister",ref_code:"6"}],this.errorCallBack(e.subActionId,t))})}getNomineeCity(e){this.nomineeCityList=[];let t=this.addNomineeDetailsService.getCityListParams(e);this.http.callBankingAPIService(t,this.constant.deviceID,this.constant.serviceName_GETCITIES).subscribe(e=>{console.log(e);var t=e.responseParameter;"00"==t.opstatus?(console.log(e.responseParameter),e.hasOwnProperty("set")&&(this.nomineeCityList=e.set.records)):this.errorCallBack(e.subActionId,t)})}getGardianType(){var e=this.addNomineeDetailsService.getDropDownMasterParam(s.d.GUARDIAN_TYPE);this.http.callBankingAPIService(e,this.constant.deviceID,this.constant.serviceName_GETREFCODE).subscribe(e=>{console.log(e);var t=e.responseParameter;"00"==t.opstatus?e.hasOwnProperty("listofDataset")&&(this.gardianTypeList=e.listofDataset[0].records):(this.gardianTypeList=[{DESCRIPTION:"Father",ref_code:"1"},{DESCRIPTION:"Mother",ref_code:"2"},{DESCRIPTION:"grandFather",ref_code:"3"},{DESCRIPTION:"Uncle",ref_code:"4"}],this.errorCallBack(e.subActionId,t))})}gotToPage(){this.router.navigateByUrl("/myAccountsInfo")}}return e.\u0275fac=function(t){return new(t||e)(r.Yb(d.c),r.Yb(l.a),r.Yb(h.a),r.Yb(u.a),r.Yb(m.a),r.Yb(o.n),r.Yb(o.f),r.Yb(v))},e.\u0275cmp=r.Sb({type:e,selectors:[["app-add-nominee-details"]],decls:115,vars:22,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","myprofile"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-10","col-12"],[1,"col-md-2","col-12"],[3,"formGroup"],[1,"col-sm-12","col-12","col-md-12"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom"],[1,"flex-container2"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-12","full-info"],[1,"col-12","col-md-6","col-lg-4","col-xl-4"],[1,"ux-input"],["type","text","placeholder","Enter Name","formControlName","nomineeName","limit-to","30"],["class","error-message",4,"ngIf"],["formControlName","nomineeRelationship"],["value",""],[3,"value",4,"ngFor","ngForOf"],["type","text","placeholder","DD/MM/YYYY","formControlName","dob",3,"ngModel","owlDateTime","owlDateTimeTrigger","max","ngModelChange"],[3,"pickerType"],["dt1",""],[1,"calendar-ic","cal-top",3,"owlDateTimeTrigger"],["class","row1",4,"ngIf"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-12","my-2"],[1,"detail-heading"],["type","text","placeholder","Enter Address line 1","formControlName","address1","limit-to","25"],["type","text","placeholder","Enter Address line 2","formControlName","address2","limit-to","30"],["formControlName","state",3,"change"],[1,"col-6"],["formControlName","city"],["type","text","placeholder","Enter PIN","formControlName","pinCode","limit-to","6","numbersOnly",""],[1,"col-12","col-md-12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[3,"click"],[1,"error-message"],[3,"value"],["type","text","placeholder","Select Guardian Name","value","Rajesh Shah","formControlName","guardianName","limit-to","20"],["formControlName","guardianRelationShip"],["type","text","placeholder","Enter Address line 1","formControlName","guardianAddress","limit-to","25"]],template:function(e,t){if(1&e&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,b,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19,"Nominee Details"),r.dc(),r.dc(),r.Zb(20,"div",18),r.dc(),r.ec(21,"form",19),r.ec(22,"div",13),r.ec(23,"div",20),r.ec(24,"div",21),r.ec(25,"div",22),r.ec(26,"div",13),r.ec(27,"div",23),r.ec(28,"div",24),r.ec(29,"div",13),r.ec(30,"div",25),r.ec(31,"div",26),r.ec(32,"label"),r.Sc(33,"Nominee Name"),r.dc(),r.Zb(34,"input",27),r.Rc(35,S,2,0,"p",28),r.Rc(36,T,2,0,"p",28),r.dc(),r.dc(),r.ec(37,"div",25),r.ec(38,"div",26),r.ec(39,"label"),r.Sc(40,"Relationship with nominee"),r.dc(),r.ec(41,"select",29),r.ec(42,"option",30),r.Sc(43," Select "),r.dc(),r.Rc(44,I,3,4,"option",31),r.dc(),r.Rc(45,A,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.ec(46,"div",13),r.ec(47,"div",25),r.ec(48,"div",26),r.ec(49,"label"),r.Sc(50," Date of Birth"),r.dc(),r.ec(51,"input",32),r.lc("ngModelChange",(function(e){return t.defaultDate=e}))("ngModelChange",(function(e){return t.onDateChange(e)})),r.dc(),r.Zb(52,"owl-date-time",33,34),r.Zb(54,"em",35),r.Rc(55,k,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.Rc(56,_,4,0,"div",36),r.Rc(57,O,23,5,"div",36),r.ec(58,"div",13),r.ec(59,"div",37),r.ec(60,"h6",38),r.Sc(61,"Nominee's Communication Address"),r.dc(),r.dc(),r.dc(),r.ec(62,"div",13),r.ec(63,"div",25),r.ec(64,"div",26),r.ec(65,"label"),r.Sc(66,"Address line 1"),r.dc(),r.Zb(67,"input",39),r.Rc(68,M,2,0,"p",28),r.dc(),r.dc(),r.ec(69,"div",25),r.ec(70,"div",26),r.ec(71,"label"),r.Sc(72,"Address line 2"),r.dc(),r.Zb(73,"input",40),r.Rc(74,q,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.ec(75,"div",13),r.ec(76,"div",25),r.ec(77,"div",26),r.ec(78,"label"),r.Sc(79,"State"),r.dc(),r.ec(80,"select",41),r.lc("change",(function(e){return t.getCity(e.target.value)})),r.ec(81,"option",30),r.Sc(82," Select State "),r.dc(),r.Rc(83,V,3,4,"option",31),r.dc(),r.Rc(84,x,2,0,"p",28),r.dc(),r.dc(),r.ec(85,"div",25),r.ec(86,"div",13),r.ec(87,"div",42),r.ec(88,"div",26),r.ec(89,"label"),r.Sc(90,"City"),r.dc(),r.ec(91,"select",43),r.ec(92,"option",30),r.Sc(93," Select city "),r.dc(),r.Rc(94,L,3,4,"option",31),r.dc(),r.Rc(95,G,2,0,"p",28),r.dc(),r.dc(),r.ec(96,"div",42),r.ec(97,"div",26),r.ec(98,"label"),r.Sc(99,"PIN"),r.dc(),r.Zb(100,"input",44),r.Rc(101,B,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(102,"div",45),r.ec(103,"ul",46),r.ec(104,"li"),r.ec(105,"div",47),r.ec(106,"button",48),r.lc("click",(function(){return t.gotToPage()})),r.Sc(107,"Cancel"),r.dc(),r.dc(),r.ec(108,"div",47),r.ec(109,"button",49),r.lc("click",(function(){return t.addNomineeSubmit()})),r.Sc(110,"Update"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(111,"div",50),r.ec(112,"div",51),r.ec(113,"a"),r.Zb(114,"img",52),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&e){const e=r.Ec(53);r.Mb(9),r.uc("ngForOf",t.DataService.breadcrumblist),r.Mb(12),r.uc("formGroup",t.addNomineeDetails),r.Mb(14),r.uc("ngIf",t.addNomineeDetails.controls.nomineeName.hasError("required")&&(t.addNomineeDetails.controls.nomineeName.dirty||t.addNomineeDetails.controls.nomineeName.touched)),r.Mb(1),r.uc("ngIf",t.addNomineeDetails.controls.nomineeName.hasError("pattern")&&(t.addNomineeDetails.controls.nomineeName.dirty||t.addNomineeDetails.controls.nomineeName.touched)),r.Mb(8),r.uc("ngForOf",t.relationShipList),r.Mb(1),r.uc("ngIf",t.addNomineeDetails.controls.nomineeRelationship.hasError("required")&&(t.addNomineeDetails.controls.nomineeRelationship.dirty||t.addNomineeDetails.controls.nomineeRelationship.touched)),r.Mb(6),r.uc("ngModel",t.defaultDate)("owlDateTime",e)("owlDateTimeTrigger",e)("max",t.max),r.Mb(1),r.uc("pickerType","calendar"),r.Mb(2),r.uc("owlDateTimeTrigger",e),r.Mb(1),r.uc("ngIf",t.addNomineeDetails.controls.dob.hasError("required")&&(t.addNomineeDetails.controls.dob.dirty||t.addNomineeDetails.controls.dob.touched)),r.Mb(1),r.uc("ngIf",t.nomineeAge<18),r.Mb(1),r.uc("ngIf",t.nomineeAge<18),r.Mb(11),r.uc("ngIf",t.addNomineeDetails.controls.address1.hasError("required")&&(t.addNomineeDetails.controls.address1.dirty||t.addNomineeDetails.controls.address1.touched)),r.Mb(6),r.uc("ngIf",t.addNomineeDetails.controls.address2.hasError("required")&&(t.addNomineeDetails.controls.address2.dirty||t.addNomineeDetails.controls.address2.touched)),r.Mb(9),r.uc("ngForOf",t.stateList),r.Mb(1),r.uc("ngIf",t.addNomineeDetails.controls.state.hasError("required")&&(t.addNomineeDetails.controls.state.dirty||t.addNomineeDetails.controls.state.touched)),r.Mb(10),r.uc("ngForOf",t.cityList),r.Mb(1),r.uc("ngIf",t.addNomineeDetails.controls.city.hasError("required")&&(t.addNomineeDetails.controls.city.dirty||t.addNomineeDetails.controls.city.touched)),r.Mb(6),r.uc("ngIf",t.addNomineeDetails.controls.pinCode.hasError("required")&&(t.addNomineeDetails.controls.pinCode.dirty||t.addNomineeDetails.controls.pinCode.touched))}},directives:[o.s,n.I,n.t,n.k,n.c,n.s,n.i,f.a,o.t,n.E,n.x,n.H,y.c,y.e,y.b,N.d],pipes:[D.a,o.F],styles:[""]}),e})()}];let Y=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(t){return new(t||e)},imports:[[d.g.forChild(F)],d.g]}),e})(),K=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(t){return new(t||e)},imports:[[o.c,Y,n.m,a.a,n.C,y.d,y.f]]}),e})()}}]);