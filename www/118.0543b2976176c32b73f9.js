(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{EQeT:function(t,e,s){"use strict";s.r(e),s.d(e,"CloseRDAuthorizationModule",(function(){return A}));var o=s("3Pt+"),i=s("ofXK"),c=s("PqYM"),n=s("fXoL"),a=s("tyNb"),r=s("EnSQ"),l=s("L7Xq"),h=s("H9Rt"),d=s("5IsW"),p=s("fHQ/"),g=s("au7T"),u=s("CgMK"),m=s("UASX"),y=s("dVSZ"),v=s("goA9"),_=s("fUdP"),b=s("Eioz");const S=["closeRdOTPRow"];function k(t,e){if(1&t){const t=n.fc();n.ec(0,"li"),n.ec(1,"a",61),n.lc("click",(function(){n.Hc(t);const s=e.$implicit;return n.pc().DataService.breadcrumroute(s.routeName)})),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()}if(2&t){const t=e.$implicit;n.Mb(2),n.Tc(n.rc(3,1,t.currentRoute))}}function f(t,e){1&t&&(n.ec(0,"p",62),n.Sc(1," Please enter valid OTP "),n.dc())}const D=[{path:"",component:(()=>{class t{constructor(t,e,s,o,i,c,n,a,r,l,h){this.router=t,this.dataService=e,this.http=s,this.storage=o,this.constant=i,this.location=c,this.encryptDecryptService=n,this.commonMethod=a,this.nomineeAuthorizationService=r,this.mydepositeService=l,this.myAccountInfoService=h,this.counter=120,this.tick=1e3,this.invalidOtp=!1,this.depositsDtl={},this.totalAccountList=[],this.closeRdOTPInput=["otp1","otp2","otp3","otp4","otp5","otp6"]}ngOnInit(){this.buildForm(),this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.dataService.getBreadcrumb("AUTHORIZATION",this.router.url),this.dataService.setPageSettings("AUTHORIZATION"),console.log("mobileNo: ",this.storage.getLocalStorage(this.constant.storage_mobileNo)),this.mobNumber=this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo),4),this.closeRDDetails=this.dataService.closeRDObj,this.totalAccountList=this.dataService.customerMyDepostie,this.selAccDtl=this.totalAccountList.filter(t=>t.accountNo==this.closeRDDetails.RDAccNumber),console.log("selected account details : ",this.selAccDtl),this.resendOTP(1),this.AccountEnquiryDtl(),this.DepositeAccountEnquery(),history.pushState({},this.dataService.previousPageUrl,this.location.prepareExternalUrl(this.dataService.previousPageUrl)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}AccountEnquiryDtl(){var t=this.myAccountInfoService.getAccountEnquiryParam(this.selAccDtl[0]);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_ACCOUNTINQUIRY).subscribe(t=>{"00"==t.responseParameter.opstatus&&(console.log(t),t.hasOwnProperty("set")&&(this.accountDtls=t.set.records[0],console.log("Account details::",this.accountDtls)))})}buildForm(){this.closeRdForm=new o.j({otp1:new o.g("",[o.G.required,o.G.maxLength(1)]),otp2:new o.g("",[o.G.required,o.G.maxLength(1)]),otp3:new o.g("",[o.G.required,o.G.maxLength(1)]),otp4:new o.g("",[o.G.required,o.G.maxLength(1)]),otp5:new o.g("",[o.G.required,o.G.maxLength(1)]),otp6:new o.g("",[o.G.required,o.G.maxLength(1)])})}DepositeAccountEnquery(){let t=this.mydepositeService.depositeAccountEquirey(this.closeRDDetails.RDAccNumber);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_DEPOSITACCOUNTINQUIRY).subscribe(t=>{console.log(t),console.log("Temp Deposite Data :: "),"00"==t.responseParameter.opstatus&&(console.log(t),this.depositsDtl=t.set.records[0],console.log("depositsDtl: ",this.depositsDtl),this.depositsDtl.interest_Rate=parseFloat(this.depositsDtl.interest_Rate).toFixed(2),this.depositsDtl.accountOpenDate=this.setDate(this.depositsDtl.accountOpenDate),this.depositsDtl.maturityDate=this.setDate(this.depositsDtl.maturityDate),this.depositsDtl.depositPeriodMonthsComponent=parseInt(this.depositsDtl.depositPeriodMonthsComponent))})}setDate(t){var e=t.match(/(\d{4})(\d{2})(\d{2})/);return e[3]+"/"+e[2]+"/"+e[1]}validateForm(){if(this.closeRdForm.invalid)return this.closeRdForm.get("otp1").markAsTouched(),this.closeRdForm.get("otp2").markAsTouched(),this.closeRdForm.get("otp3").markAsTouched(),this.closeRdForm.get("otp4").markAsTouched(),this.closeRdForm.get("otp5").markAsTouched(),void this.closeRdForm.get("otp6").markAsTouched()}onKeyUpEvent(t,e,s){var o;const i=e.which||e.keyCode;1===this.getSpasswordElement(t,s).value.length&&(7!==t?this.getSpasswordElement(t+1,s).focus():(this.getSpasswordElement(t,s).blur(),console.log("submit code "))),12===i&&1!==t&&this.getSpasswordElement(t-1,s).focus(),8!==i&&229!==i||"Unidentified"!=e.key&&("otp"==s&&(null===(o=this.closeRdForm.get(this.closeRdOTPInput[t]))||void 0===o||o.setValue("")),this.getSpasswordElement(t-1,s).focus())}onFocusEvent(t,e){for(let s=1;s<t;s++){const t=this.getSpasswordElement(s,e);if(!t.value){t.focus();break}}}getSpasswordElement(t,e){if("otp"==e)return this.closeRdOTPRows._results[t].nativeElement}goToPage(t){this.router.navigateByUrl("/"+t,{state:{account:this.closeRDDetails.RDAccNumber,FDRDData:this.depositsDtl,accountDtls:this.accountDtls}})}closeFdSubmit(){let t;if(this.closeRdForm.valid){t=this.closeRdForm.value.otp1+this.closeRdForm.value.otp2+this.closeRdForm.value.otp3+this.closeRdForm.value.otp4+this.closeRdForm.value.otp5+this.closeRdForm.value.otp6;var e=this.nomineeAuthorizationService.getSendOTPSessionReq(t);this.submitOtpSession(e)}else this.validateForm()}submitOtpSession(t){console.log("this.DataService.request"+this.dataService.request),this.tempDecryptedReq=JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),this.dataService.request)),console.log("close FD: ",this.tempDecryptedReq),console.log(this.tempDecryptedReq),this.tempDecryptedReq.methodName=this.dataService.endPoint.split("/")[1],this.tempDecryptedReq.value=this.closeRdForm.value.otp1+this.closeRdForm.value.otp2+this.closeRdForm.value.otp3+this.closeRdForm.value.otp4+this.closeRdForm.value.otp5+this.closeRdForm.value.otp6,this.tempDecryptedReq.customerID=this.dataService.userDetails.customerId,console.log(this.tempDecryptedReq);let e=this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(this.tempDecryptedReq));this.dataService.request=e,console.log(this.dataService.request),this.submitReq()}submitReq(){console.log("this.dataService.request"+this.dataService.request),this.http.callBankingAPIService(this.dataService.request,this.storage.getLocalStorage(this.constant.storage_deviceId),this.dataService.endPoint).subscribe(t=>{switch(console.log(t),this.closeRdForm.reset(),t.responseParameter.opstatus){case this.constant.val_InvalidCredentials:break;case"03":this.dataService.isOTPMaxAttempts=!0;break;case"11":this.invalidOtp=!0;break;case"12":this.dataService.isOTPMaxAttempts=!0,this.commonMethod.openPopup("div.popup-bottom.otp-attempt-expired");break;default:"00"==t.responseParameter.opstatus?(console.log(t),this.dataService.receiptType="Successful"):this.dataService.receiptType="Failed",this.dataService.receiptmsg=t.responseParameter.Result,this.dataService.receipdRefID=""==t.RRN?"-":t.RRN,this.router.navigate(["/closeRDSuccess"])}})}resendOTP(t){this.closeRdForm.reset();var e=this.nomineeAuthorizationService.getResendOTPSessionReq("Close RD");this.http.callBankingAPIService(e,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_RESENDOTPSESSION).subscribe(e=>{"00"==e.responseParameter.opstatus&&(this.startCounter(),2==t&&showToastMessage(e.responseParameter.Result,"success"))})}maskCharacter(t,e){return(""+t).slice(0,-e).replace(/./g,"*")+(""+t).slice(-e)}startCounter(){this.tick=1e3,this.counter=120,this.countDown&&!this.countDown.closed&&this.countDown.unsubscribe(),this.countDown=Object(c.a)(0,this.tick).subscribe(()=>{1==this.counter&&this.countDown.unsubscribe(),--this.counter})}closePopup(t){this.commonMethod.closePopup(t),this.router.navigateByUrl("/pmjjbyDetails")}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(a.c),n.Yb(r.a),n.Yb(l.a),n.Yb(h.a),n.Yb(d.a),n.Yb(i.n),n.Yb(p.a),n.Yb(g.a),n.Yb(u.a),n.Yb(m.a),n.Yb(y.a))},t.\u0275cmp=n.Sb({type:t,selectors:[["app-close-rd-authorization"]],viewQuery:function(t,e){var s;1&t&&n.Yc(S,!0),2&t&&n.Dc(s=n.mc())&&(e.closeRdOTPRows=s)},decls:159,vars:24,consts:[[1,"main","bg-m"],[1,"nav-overlay"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[3,"formGroup"],[1,"row3"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["id","otppassword1","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp1",3,"keyup","focus"],["closeRdOTPRow",""],["id","otppassword2","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp2",3,"keyup","focus"],["id","otppassword3","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp3",3,"keyup","focus"],["id","otppassword4","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp4",3,"keyup","focus"],["id","otppassword5","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp5",3,"keyup","focus"],["id","otppassword6","type","password","maxlength","1","placeholder","\u25cf","formControlName","otp6",3,"keyup","focus"],[1,"ux-input","password1","mt-0","mb-0"],["class","error-message",4,"ngIf"],[1,"col-6","col-md-6"],[1,"text-left"],[1,"success-text"],[1,"text-right"],[1,"ux-linkbutton","default-underline","mt3",3,"ngClass","click"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[1,"error-message"]],template:function(t,e){1&t&&(n.ec(0,"div",0),n.Zb(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"div",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"ul",9),n.Rc(10,k,4,3,"li",10),n.dc(),n.dc(),n.dc(),n.dc(),n.Zb(11,"div",11),n.ec(12,"div",12),n.ec(13,"div",13),n.ec(14,"div",14),n.ec(15,"div",15),n.ec(16,"div",16),n.ec(17,"div",17),n.ec(18,"div",18),n.ec(19,"h4"),n.Sc(20,"Enter OTP"),n.dc(),n.dc(),n.Zb(21,"div",19),n.dc(),n.ec(22,"div",14),n.ec(23,"div",20),n.ec(24,"div",21),n.ec(25,"div",14),n.ec(26,"div",22),n.ec(27,"div",14),n.ec(28,"div",23),n.ec(29,"div",24),n.ec(30,"em",25),n.Sc(31),n.dc(),n.dc(),n.dc(),n.ec(32,"div",26),n.ec(33,"div",6),n.ec(34,"div",27),n.ec(35,"form",28),n.ec(36,"div",29),n.ec(37,"div",30),n.ec(38,"div",31),n.ec(39,"input",32,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(0,t,"otp")}))("focus",(function(){return e.onFocusEvent(1,"otp")})),n.dc(),n.dc(),n.dc(),n.ec(41,"div",30),n.ec(42,"div",31),n.ec(43,"input",34,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(1,t,"otp")}))("focus",(function(){return e.onFocusEvent(2,"otp")})),n.dc(),n.dc(),n.dc(),n.ec(45,"div",30),n.ec(46,"div",31),n.ec(47,"input",35,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(2,t,"otp")}))("focus",(function(){return e.onFocusEvent(3,"otp")})),n.dc(),n.dc(),n.dc(),n.ec(49,"div",30),n.ec(50,"div",31),n.ec(51,"input",36,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(3,t,"otp")}))("focus",(function(){return e.onFocusEvent(4,"otp")})),n.dc(),n.dc(),n.dc(),n.ec(53,"div",30),n.ec(54,"div",31),n.ec(55,"input",37,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(4,t,"otp")}))("focus",(function(){return e.onFocusEvent(5,"otp")})),n.dc(),n.dc(),n.dc(),n.ec(57,"div",30),n.ec(58,"div",31),n.ec(59,"input",38,33),n.lc("keyup",(function(t){return e.onKeyUpEvent(5,t,"otp")}))("focus",(function(){return e.onFocusEvent(6,"otp")})),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(61,"div",14),n.ec(62,"div",13),n.ec(63,"div",39),n.Rc(64,f,2,0,"p",40),n.dc(),n.dc(),n.dc(),n.ec(65,"div",29),n.ec(66,"div",41),n.ec(67,"div",42),n.ec(68,"p",42),n.ec(69,"span",43),n.Sc(70),n.qc(71,"formatTimer"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(72,"div",41),n.ec(73,"div",44),n.ec(74,"button",45),n.lc("click",(function(){return e.resendOTP(2)})),n.Sc(75,"RESEND"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(76,"div",46),n.ec(77,"div",47),n.Zb(78,"img",48),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(79,"div",20),n.ec(80,"div",49),n.ec(81,"div",50),n.ec(82,"div",51),n.ec(83,"div",6),n.ec(84,"h6"),n.Sc(85,"Deposit Type"),n.dc(),n.ec(86,"h5"),n.Sc(87),n.dc(),n.dc(),n.dc(),n.ec(88,"div",52),n.ec(89,"div",6),n.ec(90,"h6"),n.Sc(91,"Depositer Type"),n.dc(),n.ec(92,"h5"),n.Sc(93),n.dc(),n.dc(),n.dc(),n.ec(94,"div",52),n.ec(95,"div",6),n.ec(96,"h6"),n.Sc(97,"RD Account Number"),n.dc(),n.ec(98,"h5"),n.Sc(99),n.dc(),n.dc(),n.dc(),n.ec(100,"div",52),n.ec(101,"div",6),n.ec(102,"h6"),n.Sc(103,"Applicable Rate of interest"),n.dc(),n.ec(104,"h5"),n.Sc(105),n.dc(),n.dc(),n.dc(),n.ec(106,"div",52),n.ec(107,"div",6),n.ec(108,"h6"),n.Sc(109,"Effective Rate of interest"),n.dc(),n.ec(110,"h5"),n.Sc(111),n.dc(),n.dc(),n.dc(),n.ec(112,"div",52),n.ec(113,"div",6),n.ec(114,"h6"),n.Sc(115,"Installment Amount"),n.dc(),n.ec(116,"h5"),n.Sc(117),n.qc(118,"customcurrency"),n.dc(),n.dc(),n.dc(),n.ec(119,"div",52),n.ec(120,"div",6),n.ec(121,"h6"),n.Sc(122,"Current Maturity Amount"),n.dc(),n.ec(123,"h5"),n.Sc(124),n.qc(125,"customcurrency"),n.dc(),n.dc(),n.dc(),n.ec(126,"div",52),n.ec(127,"div",6),n.ec(128,"h6"),n.Sc(129,"Credit to close"),n.dc(),n.ec(130,"h5"),n.Sc(131),n.qc(132,"customcurrency"),n.dc(),n.dc(),n.dc(),n.ec(133,"div",52),n.ec(134,"div",6),n.ec(135,"h6"),n.Sc(136,"Maturity Payout Account"),n.dc(),n.ec(137,"h5"),n.Sc(138),n.dc(),n.dc(),n.dc(),n.ec(139,"div",52),n.ec(140,"div",6),n.ec(141,"h6"),n.Sc(142,"Maturity Date"),n.dc(),n.ec(143,"h5"),n.Sc(144),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(145,"div",23),n.ec(146,"ul",53),n.ec(147,"li"),n.ec(148,"div",54),n.ec(149,"button",55),n.lc("click",(function(){return e.goToPage("closeRD")})),n.Sc(150,"Cancel"),n.dc(),n.dc(),n.ec(151,"div",54),n.ec(152,"button",56),n.lc("click",(function(){return e.closeFdSubmit()})),n.Sc(153,"Continue"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(154,"div",57),n.ec(155,"div",58),n.ec(156,"a"),n.Zb(157,"img",59),n.dc(),n.dc(),n.Zb(158,"div",60),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&t&&(n.Mb(10),n.uc("ngForOf",e.dataService.breadcrumblist),n.Mb(21),n.Uc("OTP sent on your registered Mobile number ending with ",e.mobNumber,""),n.Mb(4),n.uc("formGroup",e.closeRdForm),n.Mb(29),n.uc("ngIf",e.invalidOtp),n.Mb(6),n.Tc(n.rc(71,16,e.counter)),n.Mb(4),n.uc("ngClass",e.counter>0?"mydisabled":"resendActive"),n.Mb(13),n.Tc(e.closeRDDetails.depositType),n.Mb(6),n.Tc(null!=e.closeRDDetails&&null!=e.closeRDDetails.depositorType&&e.closeRDDetails.depositorType.schemeDescription?null==e.closeRDDetails||null==e.closeRDDetails.depositorType?null:e.closeRDDetails.depositorType.schemeDescription:"-"),n.Mb(6),n.Tc(e.closeRDDetails.RDAccNumber),n.Mb(6),n.Uc("",e.closeRDDetails.rateOfInterest," %"),n.Mb(6),n.Uc("",e.closeRDDetails.rateOfInterest," %"),n.Mb(6),n.Uc(" ",n.rc(118,18,e.closeRDDetails.depositAmount)," "),n.Mb(7),n.Uc(" ",n.rc(125,20,e.closeRDDetails.currentMaturityAmount)," "),n.Mb(7),n.Uc(" ",n.rc(132,22,e.closeRDDetails.creditToClose)," "),n.Mb(7),n.Tc(e.closeRDDetails.maturityPayoutAccount),n.Mb(6),n.Tc(e.closeRDDetails.maturityDate))},directives:[i.s,o.I,o.t,o.k,o.c,o.n,o.s,o.i,i.t,i.q],pipes:[v.c,_.a,b.a],styles:[""]}),t})()}];let R=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[a.g.forChild(D)],a.g]}),t})();var N=s("PCNd");let A=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[i.c,R,o.m,o.C,N.a]]}),t})()},dVSZ:function(t,e,s){"use strict";s.d(e,"a",(function(){return l}));var o=s("fXoL"),i=s("5IsW"),c=s("fHQ/"),n=s("H9Rt"),a=s("EnSQ"),r=s("au7T");let l=(()=>{class t{constructor(t,e,s,o,i){this.constant=t,this.encryptDecryptService=e,this.storage=s,this.dataService=o,this.commonMethod=i}getMiniStatementParam(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_accountNo]:t.accountNo,[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_branchCode]:t.branchCode};return console.log(" getMiniStatementParam ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getCashCreditHistory(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_subCode]:"01",[this.constant.key_accountNo]:t,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9)};return console.log(" getBalEnqParam ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getBalEnqParam(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_accountNo]:t.accountNo,[this.constant.key_branchCode]:t.branchCode,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9)};return console.log(" getBalEnqParam ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getMyAccountList(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_omniDashData]:t,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude};return console.log(" getMyAccountParam ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getAccountEnquiryParam(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_accountNo]:t.accountNo,[this.constant.key_branchCode]:t.branchCode,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9)};return console.log(" getAccountEnquiryParam ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getAccountEnquiryParams(t,e){var s={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_accountNo]:t,[this.constant.key_branchCode]:e,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9)};return console.log(" getAccountEnquiryParam ",JSON.stringify(s)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(s))}getLienAccountParam(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_accountNo]:t.accountNo,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_lienInquiryData]:this.constant.val_upi_ALL};return console.log(" getAccountEnquiryParam ",JSON.stringify(e)),console.log(this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getInterestCertificateParam(t,e){var s={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_localStorage_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_accountNo]:t.accNo,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),depositDetailsData:this.getInterstData(t)};return console.log(" getInterestCertificateParam ",JSON.stringify(s)),console.log(this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(s))}getInterstData(t){var e="01-01-"+(+t.period.split("-")[0]+1),s="01-01-"+t.period.split("-")[0];return console.log(e),console.log(s),this.dataService.userDetails.cifNumber+"|"+s+"|"+e+"|"+t.accNo}getBalanceCertificateParam(t){console.log(t);var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_accountNo]:t[0].accountNo,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_branchCode]:t[0].branchCode,[this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo)};return console.log(" getBalanceCertificateParam ",JSON.stringify(e)),console.log(this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}getNomineeData(t,e){var s=e+"|"+t,o={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_inquiryNomineeData]:s};return console.log(" Nominee Data :: =>  ",JSON.stringify(o)),console.log(this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(o))}delinkAccountParam(t){var e="~"+t+"|"+this.storage.getLocalStorage(this.constant.storage_mobileNo)+"|D|~";console.log("linkData"+e);var s={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_accountNo]:t,[this.constant.key_requestType]:"DELINK",[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.key_deviceId),[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_linkDelinkData]:e};return console.log("linkAccountParam",JSON.stringify(s)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(s))}getGenerateMMID(t,e,s){var o={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_ifsc_code]:e,[this.constant.key_accountNo]:t,[this.constant.key_payerName]:s,[this.constant.key_payerAccount]:t,[this.constant.key_payerMobile]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.key_deviceId)};return console.log("generateMMID",JSON.stringify(o)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(o))}getCancelMMID(t,e,s){var o={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_ifsc_code]:e,[this.constant.key_accountNo]:t,[this.constant.key_txn_amount]:0,[this.constant.key_payerName]:s,[this.constant.key_payerAccount]:t,[this.constant.key_payerMobile]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.key_deviceId)};return console.log("cancelMMID",JSON.stringify(o)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(o))}}return t.\u0275fac=function(e){return new(e||t)(o.ic(i.a),o.ic(c.a),o.ic(n.a),o.ic(a.a),o.ic(r.a))},t.\u0275prov=o.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);