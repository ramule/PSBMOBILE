(window.webpackJsonp=window.webpackJsonp||[]).push([[223],{KPK8:function(t,e,c){"use strict";c.r(e),c.d(e,"StandingInstructionOverviewModule",(function(){return F}));var i=c("ofXK"),n=c("3Pt+"),s=c("PqYM"),o=c("fXoL"),r=c("tyNb"),a=c("EnSQ"),d=c("+VxH"),l=c("L7Xq"),u=c("H9Rt"),p=c("5IsW"),h=c("fHQ/"),m=c("au7T");let v=(()=>{class t{constructor(t,e,c,i,n){this.constant=t,this.encryptDecryptService=e,this.storage=c,this.dataService=i,this.commonMethod=n}getSendOTPSessionReq(t){var e;return e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_OTP]:t,[this.constant.key_latitude]:this.constant.val_latitude,[this.constant.key_longitude]:this.constant.val_longitude},console.log("Standing Instruction OTP ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getResendOTPSessionReq(t){var e;return e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_latitude]:this.constant.val_latitude,[this.constant.key_longitude]:this.constant.val_longitude,[this.constant.key_service_Type]:t},console.log("Standing Instruction resend OTP",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}}return t.\u0275fac=function(e){return new(e||t)(o.ic(p.a),o.ic(h.a),o.ic(u.a),o.ic(a.a),o.ic(m.a))},t.\u0275prov=o.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var g=c("Eioz"),b=c("goA9");const S=["sTpin"];function y(t,e){if(1&t){const t=o.fc();o.ec(0,"li"),o.ec(1,"a",65),o.lc("click",(function(){o.Hc(t);const c=e.$implicit;return o.pc().dataService.breadcrumroute(c.routeName)})),o.Sc(2),o.qc(3,"translate"),o.dc(),o.dc()}if(2&t){const t=e.$implicit;o.Mb(2),o.Tc(o.rc(3,1,t.currentRoute))}}function f(t,e){1&t&&(o.ec(0,"p",66),o.Sc(1),o.qc(2,"translate"),o.dc()),2&t&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"VALID_OTP")," "))}function I(t,e){if(1&t&&(o.ec(0,"span",67),o.Sc(1),o.qc(2,"formatTimer"),o.dc()),2&t){const t=o.pc();o.Mb(1),o.Tc(o.rc(2,1,t.counter))}}function T(t,e){if(1&t&&(o.ec(0,"div",20),o.ec(1,"div",68),o.ec(2,"div",69),o.ec(3,"div",70),o.ec(4,"div",6),o.ec(5,"h6"),o.Sc(6,"Debit Account Number"),o.dc(),o.ec(7,"h5"),o.Sc(8),o.dc(),o.dc(),o.dc(),o.ec(9,"div",71),o.ec(10,"div",6),o.ec(11,"h6"),o.Sc(12,"Credit Account Number"),o.dc(),o.ec(13,"h5"),o.Sc(14),o.dc(),o.dc(),o.dc(),o.ec(15,"div",71),o.ec(16,"div",6),o.ec(17,"h6"),o.Sc(18,"Next Execution Date"),o.dc(),o.ec(19,"h5"),o.Sc(20),o.dc(),o.dc(),o.dc(),o.ec(21,"div",71),o.ec(22,"div",6),o.ec(23,"h6"),o.Sc(24,"Total Number of Payments"),o.dc(),o.ec(25,"h5"),o.Sc(26),o.dc(),o.dc(),o.dc(),o.ec(27,"div",71),o.ec(28,"div",6),o.ec(29,"h6"),o.Sc(30,"Payment Frequency"),o.dc(),o.ec(31,"h5"),o.Sc(32),o.dc(),o.dc(),o.dc(),o.ec(33,"div",71),o.ec(34,"div",6),o.ec(35,"h6"),o.Sc(36,"Amount"),o.dc(),o.ec(37,"h5"),o.Sc(38),o.dc(),o.dc(),o.dc(),o.ec(39,"div",71),o.ec(40,"div",6),o.ec(41,"h6"),o.Sc(42,"Remark"),o.dc(),o.ec(43,"h5"),o.Sc(44),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()),2&t){const t=o.pc();o.Mb(8),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.debitAccount),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.creditAccount),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.datepicker1),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.installmentNumber),o.Mb(6),o.Tc("W"==t.standingInstructionDtl.paymentFrequency?"Weekly":"M"==t.standingInstructionDtl.paymentFrequency?"Monthly":"H"==t.standingInstructionDtl.paymentFrequency?"Half-Yearly":"Q"==t.standingInstructionDtl.paymentFrequency?"Quartely":"Y"==t.standingInstructionDtl.paymentFrequency?"Yearly":"D"==t.standingInstructionDtl.paymentFrequency?"Daily":"-"),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.amount),o.Mb(6),o.Tc(t.standingInstructionDtl.remarks?t.standingInstructionDtl.remarks:"-")}}function D(t,e){if(1&t&&(o.ec(0,"div",20),o.ec(1,"div",68),o.ec(2,"div",69),o.ec(3,"div",70),o.ec(4,"div",6),o.ec(5,"h6"),o.Sc(6,"Debit Account"),o.dc(),o.ec(7,"h5"),o.Sc(8),o.dc(),o.dc(),o.dc(),o.ec(9,"div",71),o.ec(10,"div",6),o.ec(11,"h6"),o.Sc(12,"Credit Account"),o.dc(),o.ec(13,"h5"),o.Sc(14),o.dc(),o.dc(),o.dc(),o.ec(15,"div",71),o.ec(16,"div",6),o.ec(17,"h6"),o.Sc(18,"Credit Account Name"),o.dc(),o.ec(19,"h5"),o.Sc(20),o.dc(),o.dc(),o.dc(),o.ec(21,"div",71),o.ec(22,"div",6),o.ec(23,"h6"),o.Sc(24,"SI Execution Date"),o.dc(),o.ec(25,"h5"),o.Sc(26),o.dc(),o.dc(),o.dc(),o.ec(27,"div",71),o.ec(28,"div",6),o.ec(29,"h6"),o.Sc(30,"Total Number of Payments"),o.dc(),o.ec(31,"h5"),o.Sc(32),o.dc(),o.dc(),o.dc(),o.ec(33,"div",71),o.ec(34,"div",6),o.ec(35,"h6"),o.Sc(36,"Payment Frequency"),o.dc(),o.ec(37,"h5"),o.Sc(38),o.dc(),o.dc(),o.dc(),o.ec(39,"div",71),o.ec(40,"div",6),o.ec(41,"h6"),o.Sc(42,"Amount"),o.dc(),o.ec(43,"h5"),o.Zb(44,"img",72),o.Sc(45),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()),2&t){const t=o.pc();o.Mb(8),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.drAccountNumber),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.crForacid),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.crAcctName),o.Mb(6),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.nextDate),o.Mb(6),o.Tc(t.dataService.noSIPeriod?t.dataService.noSIPeriod:"-"),o.Mb(6),o.Tc("W"==t.standingInstructionDtl.siFreq?"Weekly":"M"==t.standingInstructionDtl.siFreq?"Monthly":"H"==t.standingInstructionDtl.siFreq?"Half-Yearly":"Q"==t.standingInstructionDtl.siFreq?"Quartely":"Y"==t.standingInstructionDtl.siFreq?"Yearly":"D"==t.standingInstructionDtl.siFreq?"Daily":"-"),o.Mb(7),o.Tc(null==t.standingInstructionDtl?null:t.standingInstructionDtl.flowAmount)}}const k=[{path:"",component:(()=>{class t{constructor(t,e,c,i,n,s,o,r,a,d){this.router=t,this.dataService=e,this.otpSessionService=c,this.http=i,this.storage=n,this.constant=s,this.date=o,this.encryptDecryptService=r,this.standingInstructionAuthService=a,this.commonMethod=d,this.counter=120,this.tick=1e3,this.invalidOtp=!1}ngOnInit(){this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.mobNumber=this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo)),this.dataService.getBreadcrumb("OVERVIEW",this.router.url),this.dataService.setPageSettings("Standing Instruction"),this.standingInstructionDtl=this.dataService.standingInstructionDtl,console.log("standingInstructionDtl :: ",this.standingInstructionDtl),console.log("delete standing instruction : : ",this.dataService.standingInstructionDelete),this.screenTypeValue(),this.resendOTP(1),this.buildForm()}screenTypeValue(){switch(this.dataService.screenType){case"modifyStandingInstruction":this.serviceNameType=this.constant.val_MODIFYSTANDINGINSTRUCTIONS,this.serviceName=this.constant.serviceName_MODIFYSTANDINGINSTRUCTIONS;break;case"addStandingInstruction":this.serviceNameType=this.constant.val_ADDSTANDINGINSTRUCTION,this.serviceName=this.constant.serviceName_ADDSTANDINGINSTRUCTION;break;case"deleteStandingInstruction":this.serviceNameType=this.constant.val_DELETESTANDINGINSTRUCTION,this.serviceName=this.constant.serviceName_DELETESTANDINGINSTRUCTION}}goToPage(t){this.router.navigateByUrl("/"+t)}tpinConfirm(){if(this.validateForm(),this.tpinForm.valid){var t=this.standingInstructionAuthService.getSendOTPSessionReq(this.tpinForm.value.tpin1+this.tpinForm.value.tpin2+this.tpinForm.value.tpin3+this.tpinForm.value.tpin4+this.tpinForm.value.tpin5+this.tpinForm.value.tpin6);console.log(t),this.submitOtpSession(t)}}submitTpin(t){this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.serviceName).subscribe(t=>{console.log(t);var e=t.responseParameter;"00"==e.opstatus?(console.log(t.responseParameter),this.goToPage("standingInstructionSuccess")):this.errorCallBack(t.subActionId,e)})}errorCallBack(t,e){showToastMessage(e.Result,"error")}buildForm(){this.tpinForm=new n.j({tpin1:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)]),tpin2:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)]),tpin3:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)]),tpin4:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)]),tpin5:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)]),tpin6:new n.g("",[n.G.required,n.G.minLength(1),n.G.maxLength(1)])})}validateForm(){this.tpinForm.invalid&&(this.tpinForm.get("tpin1").markAsTouched(),this.tpinForm.get("tpin2").markAsTouched(),this.tpinForm.get("tpin3").markAsTouched(),this.tpinForm.get("tpin4").markAsTouched(),this.tpinForm.get("tpin5").markAsTouched(),this.tpinForm.get("tpin6").markAsTouched())}onKeyUp(t,e){const c=e.which||e.keyCode;console.log(t),console.log(e.which),console.log(e.keyCode),1===this.getSpasswordElement(t).value.length&&(5!==t?this.getSpasswordElement(t+1).focus():(this.getSpasswordElement(t).blur(),console.log("submit code "))),12===c&&1!==t&&this.getSpasswordElement(t-1).focus(),8!==c&&229!==c||"Unidentified"!=e.key&&this.getSpasswordElement(t-1).focus()}onFocus(t){for(let e=1;e<t;e++){const t=this.getSpasswordElement(e);if(!t.value){t.focus();break}}}getSpasswordElement(t){if(t<=5)return this.sTpin._results[t].nativeElement}submitOtpSession(t){console.log("this.DataService.request"+this.dataService.request),this.tempDecryptedReq=JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),this.dataService.request)),console.log("si auth ",this.tempDecryptedReq),console.log(this.tempDecryptedReq),this.tempDecryptedReq.methodName=this.dataService.endPoint.split("/")[1],"OTP"==this.dataService.otpName?this.tempDecryptedReq.value=this.tpinForm.value.tpin1+this.tpinForm.value.tpin2+this.tpinForm.value.tpin3+this.tpinForm.value.tpin4+this.tpinForm.value.tpin5+this.tpinForm.value.tpin6:(this.tempDecryptedReq.value=this.encryptDecryptService.createMD5Value(this.tpinForm.value.tpin1+this.tpinForm.value.tpin2+this.tpinForm.value.tpin3+this.tpinForm.value.tpin4+this.tpinForm.value.tpin5+this.tpinForm.value.tpin6),this.tempDecryptedReq.customerID=this.dataService.userDetails.customerId),console.log(this.tempDecryptedReq);let e=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(this.tempDecryptedReq));this.dataService.request=e,console.log(this.dataService.request),this.submitReq()}submitReq(){console.log("this.DataService.request"+this.dataService.request),this.http.callBankingAPIService(this.dataService.request,this.storage.getLocalStorage(this.constant.storage_deviceId),this.dataService.endPoint).subscribe(t=>{switch(console.log(t),t.responseParameter.opstatus){case"00":console.log(t),this.dataService.siReceiptObj.response="Successful",this.dataService.siReceiptObj.msg=t.responseParameter.Result,this.dataService.siReceiptObj.rrn=""==t.RRN?"-":t.RRN,this.router.navigate(["/standingInstructionSuccess"]);break;case"11":this.invalidOtp=!0;break;case"12":this.dataService.isOTPMaxAttempts=!0,this.commonMethod.openPopup("div.popup-bottom.otp-attempt-expired");break;case"03":this.dataService.isOTPMaxAttempts=!0;break;default:this.dataService.siReceiptObj.response="Failed",this.dataService.siReceiptObj.msg=t.responseParameter.Result,this.dataService.siReceiptObj.rrn=""==t.RRN?"-":t.RRN,this.router.navigate(["/standingInstructionSuccess"])}})}resendOTP(t){this.invalidOtp=!1;var e=this.standingInstructionAuthService.getResendOTPSessionReq(this.serviceNameType);this.http.callBankingAPIService(e,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_RESENDOTPSESSION).subscribe(e=>{"00"==e.responseParameter.opstatus&&(this.startCounter(),2==t&&showToastMessage(e.responseParameter.Result,"success"))})}startCounter(){this.tick=1e3,this.counter=120,this.countDown&&!this.countDown.closed&&this.countDown.unsubscribe(),this.countDown=Object(s.a)(0,this.tick).subscribe(()=>{1==this.counter&&this.countDown.unsubscribe(),--this.counter})}closePopup(){this.commonMethod.closeAllPopup()}}return t.\u0275fac=function(e){return new(e||t)(o.Yb(r.c),o.Yb(a.a),o.Yb(d.a),o.Yb(l.a),o.Yb(u.a),o.Yb(p.a),o.Yb(i.f),o.Yb(h.a),o.Yb(v),o.Yb(m.a))},t.\u0275cmp=o.Sb({type:t,selectors:[["app-standing-instruction-overview"]],viewQuery:function(t,e){var c;1&t&&o.Yc(S,!0),2&t&&o.Dc(c=o.mc())&&(e.sTpin=c)},decls:111,vars:20,consts:[[1,"main","bg-m"],[1,"nav-overlay"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[3,"formGroup"],[1,"row3"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["id","otppassword1","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin1",3,"keyup","focus"],["sTpin",""],["id","otppassword2","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin2",3,"keyup","focus"],["id","otppassword3","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin3",3,"keyup","focus"],["id","otppassword4","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin4",3,"keyup","focus"],["id","otppassword5","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin5",3,"keyup","focus"],["id","otppassword6","type","password","maxlength","1","placeholder","\u25cf","formControlName","tpin6",3,"keyup","focus"],[1,"ux-input","password1","mt-0","mb-0"],["class","error-message",4,"ngIf"],[1,"col-6","col-md-6"],[1,"text-left"],["class","success-text",4,"ngIf"],[1,"text-right"],[1,"ux-linkbutton","default-underline","mt3",3,"ngClass","click"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],["class","col-sm-12 col-12 col-md-12",4,"ngIf"],[1,"bottom-footer1"],[1,"btn-div"],["type","submit",1,"ux-button","secondary","sm-mob",3,"click"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[1,"popup-bottom","sm-popup","otp-attempt-expired"],[1,"text-center"],["src","assets/images/svg/information.svg","alt","success-icon"],[1,"col-12","mb-4"],[1,"row1","mt-2"],[1,"col-12","text-center"],[1,"ux-button","primary","submit-btn",3,"click"],[3,"click"],[1,"error-message"],[1,"success-text"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],["src","assets/images/svg/rupee-bl.svg","alt","rupees-icon"]],template:function(t,e){1&t&&(o.ec(0,"div",0),o.Zb(1,"div",1),o.ec(2,"div",2),o.ec(3,"div",3),o.ec(4,"div",4),o.ec(5,"div",5),o.ec(6,"div",6),o.ec(7,"div",7),o.ec(8,"div",8),o.ec(9,"ul",9),o.Rc(10,y,4,3,"li",10),o.dc(),o.dc(),o.dc(),o.dc(),o.Zb(11,"div",11),o.ec(12,"div",12),o.ec(13,"div",13),o.ec(14,"div",14),o.ec(15,"div",15),o.ec(16,"div",16),o.ec(17,"div",17),o.ec(18,"div",18),o.ec(19,"h4"),o.Sc(20,"Overview"),o.dc(),o.dc(),o.Zb(21,"div",19),o.dc(),o.ec(22,"div",14),o.ec(23,"div",20),o.ec(24,"div",21),o.ec(25,"div",14),o.ec(26,"div",22),o.ec(27,"div",14),o.ec(28,"div",23),o.ec(29,"div",24),o.ec(30,"em",25),o.Sc(31),o.qc(32,"translate"),o.dc(),o.dc(),o.dc(),o.ec(33,"div",26),o.ec(34,"div",6),o.ec(35,"div",27),o.ec(36,"form",28),o.ec(37,"div",29),o.ec(38,"div",30),o.ec(39,"div",31),o.ec(40,"input",32,33),o.lc("keyup",(function(t){return e.onKeyUp(0,t)}))("focus",(function(){return e.onFocus(0)})),o.dc(),o.dc(),o.dc(),o.ec(42,"div",30),o.ec(43,"div",31),o.ec(44,"input",34,33),o.lc("keyup",(function(t){return e.onKeyUp(1,t)}))("focus",(function(){return e.onFocus(1)})),o.dc(),o.dc(),o.dc(),o.ec(46,"div",30),o.ec(47,"div",31),o.ec(48,"input",35,33),o.lc("keyup",(function(t){return e.onKeyUp(2,t)}))("focus",(function(){return e.onFocus(2)})),o.dc(),o.dc(),o.dc(),o.ec(50,"div",30),o.ec(51,"div",31),o.ec(52,"input",36,33),o.lc("keyup",(function(t){return e.onKeyUp(3,t)}))("focus",(function(){return e.onFocus(3)})),o.dc(),o.dc(),o.dc(),o.ec(54,"div",30),o.ec(55,"div",31),o.ec(56,"input",37,33),o.lc("keyup",(function(t){return e.onKeyUp(4,t)}))("focus",(function(){return e.onFocus(4)})),o.dc(),o.dc(),o.dc(),o.ec(58,"div",30),o.ec(59,"div",31),o.ec(60,"input",38,33),o.lc("keyup",(function(t){return e.onKeyUp(5,t)}))("focus",(function(){return e.onFocus(5)})),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(62,"div",14),o.ec(63,"div",13),o.ec(64,"div",39),o.Rc(65,f,3,3,"p",40),o.dc(),o.dc(),o.dc(),o.ec(66,"div",29),o.ec(67,"div",41),o.ec(68,"div",42),o.ec(69,"p",42),o.Rc(70,I,3,3,"span",43),o.dc(),o.dc(),o.dc(),o.ec(71,"div",41),o.ec(72,"div",44),o.ec(73,"button",45),o.lc("click",(function(){return e.resendOTP(2)})),o.Sc(74,"Resend Otp"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(75,"div",46),o.ec(76,"div",47),o.Zb(77,"img",48),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.Rc(78,T,45,7,"div",49),o.Rc(79,D,46,7,"div",49),o.ec(80,"div",23),o.ec(81,"ul",50),o.ec(82,"li"),o.ec(83,"div",51),o.ec(84,"button",52),o.lc("click",(function(){return e.goToPage("standingInstructionList")})),o.Sc(85,"Cancel"),o.dc(),o.dc(),o.ec(86,"div",51),o.ec(87,"button",53),o.lc("click",(function(){return e.tpinConfirm()})),o.Sc(88,"Confirm"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(89,"div",54),o.ec(90,"div",55),o.ec(91,"a"),o.Zb(92,"img",56),o.dc(),o.dc(),o.Zb(93,"div",57),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(94,"div",58),o.ec(95,"div",14),o.ec(96,"div",13),o.ec(97,"h4",59),o.Zb(98,"img",60),o.Sc(99),o.qc(100,"translate"),o.dc(),o.dc(),o.dc(),o.ec(101,"div",14),o.ec(102,"div",61),o.ec(103,"p"),o.Sc(104),o.qc(105,"translate"),o.dc(),o.dc(),o.dc(),o.ec(106,"div",62),o.ec(107,"div",63),o.ec(108,"button",64),o.lc("click",(function(){return e.closePopup()})),o.Sc(109),o.qc(110,"translate"),o.dc(),o.dc(),o.dc(),o.dc()),2&t&&(o.Mb(10),o.uc("ngForOf",e.dataService.breadcrumblist),o.Mb(21),o.Vc("",o.rc(32,12,"OTP_REGISTER_NO")," ******",e.mobNumber.slice(e.mobNumber.length-4),""),o.Mb(5),o.uc("formGroup",e.tpinForm),o.Mb(29),o.uc("ngIf",e.invalidOtp),o.Mb(5),o.uc("ngIf",e.counter>0),o.Mb(3),o.uc("ngClass",e.counter>0?"mydisabled":"resendActive"),o.Mb(5),o.uc("ngIf","addStandingInstruction"==e.dataService.screenType||"modifyStandingInstruction"==e.dataService.screenType),o.Mb(1),o.uc("ngIf","deleteStandingInstruction"==e.dataService.screenType),o.Mb(20),o.Uc(" ",o.rc(100,14,"INFORMATION")," "),o.Mb(5),o.Uc("",o.rc(105,16,"REACHED_MAXIMUM_ATTEMPT")," "),o.Mb(5),o.Uc(" ",o.rc(110,18,"OK"),""))},directives:[i.s,n.I,n.t,n.k,n.c,n.n,n.s,n.i,i.t,i.q],pipes:[g.a,b.c],styles:[""]}),t})()}];let N=(()=>{class t{}return t.\u0275mod=o.Wb({type:t}),t.\u0275inj=o.Vb({factory:function(e){return new(e||t)},imports:[[r.g.forChild(k)],r.g]}),t})();var w=c("PCNd");let F=(()=>{class t{}return t.\u0275mod=o.Wb({type:t}),t.\u0275inj=o.Vb({factory:function(e){return new(e||t)},imports:[[i.c,N,n.m,n.C,w.a]]}),t})()}}]);