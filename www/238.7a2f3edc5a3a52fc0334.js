(window.webpackJsonp=window.webpackJsonp||[]).push([[238],{hMQJ:function(t,e,c){"use strict";c.r(e),c.d(e,"CloseRdModule",(function(){return w}));var i=c("ofXK"),o=c("3Pt+"),a=c("fXoL"),s=c("tyNb"),n=c("EnSQ"),d=c("5IsW"),l=c("H9Rt"),r=c("au7T"),u=c("fHQ/");let h=(()=>{class t{constructor(t,e,c,i,o){this.constant=t,this.dataService=e,this.storage=c,this.common=i,this.encryptDecryptService=o}getCloseRDCall(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_MobileNoOrg]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_RRN]:this.common.genRandomDigit(9),[this.constant.key_referenceNumber]:this.common.genRandomDigit(9),[this.constant.key_rdClosureValidationData]:this.storage.getLocalStorage(this.constant.storage_mobileNo)+"|"+this.dataService.userDetails.cifNumber+"|"+t};return console.log("getCloseFD params: ",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}}return t.\u0275fac=function(e){return new(e||t)(a.ic(d.a),a.ic(n.a),a.ic(l.a),a.ic(r.a),a.ic(u.a))},t.\u0275prov=a.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var m=c("Eioz");function p(t,e){if(1&t){const t=a.fc();a.ec(0,"li"),a.ec(1,"a",105),a.lc("click",(function(){a.Hc(t);const c=e.$implicit;return a.pc().dataService.breadcrumroute(c.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&t){const t=e.$implicit;a.Mb(2),a.Tc(a.rc(3,1,t.currentRoute))}}function b(t,e){1&t&&(a.ec(0,"p",31),a.Sc(1," This field is required "),a.dc())}function v(t,e){1&t&&(a.ec(0,"p",31),a.Sc(1," This field is required "),a.dc())}function D(t,e){1&t&&(a.ec(0,"p",31),a.Sc(1," This field is required "),a.dc())}function f(t,e){1&t&&(a.ec(0,"h5"),a.Sc(1,"Online"),a.dc())}function g(t,e){1&t&&(a.ec(0,"h5"),a.Sc(1,"Branch"),a.dc())}const y=function(t){return{display:t}},S=[{path:"",component:(()=>{class t{constructor(t,e,c,i,o,a){this.router=t,this.dataService=e,this.location=c,this.constant=i,this.closeFdService=o,this.commonMethod=a,this.selectedAccData="",this.rdDetailsData="",this.totalAccountList=[],this.accountDetailsList=[],this.shareDtl={rdAccNumber:!1,maturityDate:!1,tenure:!1,interestRate:!1,modeOdRdOpening:!1,maturityPayoutAcc:!1},this.shareDetails=!1}ngOnInit(){this.selectedAccData=this.location.getState(),console.log("selected acc data: ",this.selectedAccData),this.rdDetailsData=this.selectedAccData.FDRDData,console.log("FD RD data: ",this.rdDetailsData),this.totalAccountList=this.dataService.customerMyDepostie,this.selAccDtl=this.totalAccountList.filter(t=>t.accountNo==this.selectedAccData.account),console.log("selected account details : ",this.selAccDtl),this.accountDtls=this.selectedAccData.accountDtls,console.log("accountDtls: ",this.accountDtls),this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.dataService.getBreadcrumb("CLOSE_RD",this.router.url),this.dataService.setPageSettings("CLOSE_RD"),this.buildForm(),this.closeRDForm.patchValue({fdAccount:this.selectedAccData.account,monthlyInstallment:this.convertCurrency(this.rdDetailsData.depositAmount),originalMaturityAmount:this.convertCurrency(this.rdDetailsData.maturityAmount),currentRDAccountBalance:this.convertCurrency(this.rdDetailsData.accountClearBalance),maturityPayoutAccount:this.rdDetailsData.repaymentAccountNumber})}convertCurrency(t){return OSREC.CurrencyFormatter.format(t,{currency:"INR",symbol:"\u20b9"})}goToPage(t){this.router.navigateByUrl("/"+t)}buildForm(){this.closeRDForm=new o.j({fdAccount:new o.g("",[o.G.required]),monthlyInstallment:new o.g(""),originalMaturityAmount:new o.g(""),currentFDAccountBalance:new o.g(""),currentRDAccountBalance:new o.g(""),maturityPayoutAccount:new o.g(""),remark:new o.g(""),termsCondition:new o.g("",[o.G.required])})}validateForm(){this.closeRDForm.invalid&&(this.closeRDForm.get("fdAccount").markAsTouched(),this.closeRDForm.get("remark").markAsTouched(),this.closeRDForm.get("termsCondition").markAsTouched())}closeRdSubmit(t){if(this.closeRDForm.valid){console.log("Close RD",t),this.dataService.feedbackType="closeFD";var e=this.closeFdService.getCloseRDCall(this.selectedAccData.account);this.dataService.request=e,this.dataService.endPoint=this.constant.serviceName_RDCLOSUREVALIDATION;var c=this.dataService.activitySettingData.findIndex(t=>t.ACTIVITYNAME==this.dataService.endPoint.split("/")[1]);"Y"==this.dataService.activitySettingData[c].OTPALLOWED&&(this.dataService.closeRDObj.depositType=this.rdDetailsData.accountType,this.dataService.closeRDObj.depositScheme=this.rdDetailsData.accountCategory+"-"+this.rdDetailsData.schemeDescription,this.dataService.closeRDObj.depositorType=this.rdDetailsData,this.dataService.closeRDObj.RDAccNumber=this.selectedAccData.account,this.dataService.closeRDObj.rateOfInterest=this.rdDetailsData.interest_Rate,this.dataService.closeRDObj.depositAmount=this.rdDetailsData.depositAmount,this.dataService.closeRDObj.currentMaturityAmount=this.rdDetailsData.maturityAmount,this.dataService.closeRDObj.creditToClose=this.rdDetailsData.maturityAmount,this.dataService.closeRDObj.maturityDate=this.rdDetailsData.maturityDate,this.dataService.closeRDObj.maturityPayoutAccount=this.rdDetailsData.repaymentAccountNumber,this.router.navigateByUrl("/closeRDAuthorization"))}else this.validateForm()}shareFdDetails(){this.shareDetails=!this.shareDetails}onCancel(){"web"==this.constant.getIsCordova()?this.router.navigateByUrl("/myAccountsInfo"):this.location.back()}openPopup(t){this.closeRDForm.valid&&this.isTermsAndCondition?this.commonMethod.openPopup("div.popup-bottom."+t):this.validateForm()}closePopup(){this.commonMethod.closeAllPopup()}termsConditionPopup(t){switch(t){case"closed":this.commonMethod.openPopup("div.terms-conditions-popup")}}closeTerms(){this.commonMethod.closeAllPopup()}onCheckboxChecked(t){console.log(t),this.isTermsAndCondition=t.target.checked}submitShare(){var t,e,c,i,o,a;this.accountDetailsList=[],console.log(this.shareDtl),this.shareDtl.rdAccNumber&&this.accountDetailsList.push({label:"RD Account Number",value:null===(t=this.selectedAccData)||void 0===t?void 0:t.account}),this.shareDtl.maturityDate&&this.accountDetailsList.push({label:"Maturity Date",value:null===(e=this.rdDetailsData)||void 0===e?void 0:e.maturityDate}),this.shareDtl.tenure&&this.accountDetailsList.push({label:"Tenure",value:(null===(c=this.rdDetailsData)||void 0===c?void 0:c.depositPeriodMonthsComponent)+" Months"}),this.shareDtl.interestRate&&this.accountDetailsList.push({label:"Current Rate of Interest",value:null===(i=this.rdDetailsData)||void 0===i?void 0:i.interest_Rate}),this.shareDtl.modeOdRdOpening&&this.accountDetailsList.push({label:"Mode Of RD Opening",value:"ONLINE USE"==(null===(o=this.rdDetailsData)||void 0===o?void 0:o.account)?"Online":"Branch"}),this.shareDtl.maturityPayoutAcc&&this.accountDetailsList.push({label:"Maturity Payout Account",value:null===(a=this.rdDetailsData)||void 0===a?void 0:a.repaymentAccountNumber}),this.shareAccountDtl()}shareAccountDtl(){this.shareDetails=!this.shareDetails;var t=this.getSelectedValues();"web"!=this.constant.getPlatform()?window.plugins.socialsharing.share(t):window.open("mailto:?subject=Account Details&body="+t)}getSelectedValues(){let t="";return this.accountDetailsList.forEach((e,c)=>{t+=e.label+" : "+e.value+", "}),t.replace(/,\s*$/,"")}cancelShare(){this.shareDetails=!1}}return t.\u0275fac=function(e){return new(e||t)(a.Yb(s.c),a.Yb(n.a),a.Yb(i.n),a.Yb(d.a),a.Yb(h),a.Yb(r.a))},t.\u0275cmp=a.Sb({type:t,selectors:[["app-close-rd"]],decls:285,vars:29,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-12","col-md-12"],[3,"formGroup"],[1,"col-sm-12","col-12","col-md-12"],[1,"widget-box5","overflow","mb-3"],[1,"bg-white1","bor-rad","pad-custom"],[1,"col-md-12","col-12"],[1,"col-md-6","col-lg-6","col-xl-4","col-12"],[1,"ux-input"],["type","text","disabled","","formControlName","fdAccount"],["class","error-message",4,"ngIf"],[1,"ux-input","ux-disabled"],["type","text","placeholder","Enter monthly installment amount","disabled","","formControlName","monthlyInstallment"],[1,"error-message"],["type","text","placeholder","Enter Original Maturity Amount","disabled","","formControlName","originalMaturityAmount"],["type","text","placeholder","Enter Current RD Balance","value","1,02,000.00","disabled","","formControlName","currentRDAccountBalance"],[1,"ux-input","ux-disabled","mb-0"],["type","text","placeholder","Enter Maturity Payout Account","disabled","","formControlName","maturityPayoutAccount"],[1,"ux-input","mt-0"],[1,"info-message"],[1,"col-12","col-md-6","col-lg-6","col-xl-4"],["type","text","placeholder","Enter Remarks","formControlName","remark"],[1,"col-md-10","col-lg-10","col-xl-7","col-12"],[1,"note-section"],[1,"col-md-6","col-lg-6","col-xl-6","col-12"],[1,"ux-selection"],[1,"ux-selection1","mar-rcustom","p-0"],["href","javascript:void(0)",3,"click"],["type","checkbox","name","termsCondition","formControlName","termsCondition",3,"change"],[1,"checkmark"],[1,"ux-input","m-0"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3"],[1,"col-xl-12","col-lg-6","col-md-12","col-12"],["id","account-detail",1,"show-div","inner-right-block","account-details"],[1,"header-block","clearfix"],[1,"share-btn","right-icon",3,"click"],["version","1.1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","x","0px","y","0px","viewBox","0 0 16 16",0,"xml","space","preserve",2,"enable-background","new 0 0 16 16"],["d","M12.8,5c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5c0,0,0,0,0,0C15.3,3.9,14.2,5,12.8,5z\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tM12.8,1.1c-0.8,0-1.5,0.7-1.5,1.5C11.3,3.4,12,4,12.8,4c0.8,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0C14.3,1.7,13.6,1.1,12.8,1.1L12.8,1.1z",1,"st0"],["d","M12.8,15.9c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5l0,0C15.3,14.8,14.2,15.9,12.8,15.9z\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tM12.8,12c-0.8,0-1.5,0.7-1.5,1.5c0,0.8,0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0C14.3,12.6,13.6,12,12.8,12L12.8,12z",1,"st0"],["d","M3.2,10.5c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5S5.7,6.6,5.7,8l0,0C5.7,9.4,4.6,10.5,3.2,10.5z\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tM3.2,6.5C2.4,6.5,1.7,7.2,1.7,8c0,0.8,0.7,1.5,1.5,1.5C4,9.5,4.7,8.8,4.7,8C4.7,7.2,4,6.5,3.2,6.5L3.2,6.5z",1,"st0"],["d","M4.9,7.5C4.7,7.5,4.4,7.3,4.4,7c0-0.2,0.1-0.3,0.3-0.4l6.1-3.5C11,3,11.4,3.1,11.5,3.3\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tc0.1,0.2,0.1,0.5-0.2,0.7L5.2,7.5C5.1,7.5,5,7.5,4.9,7.5L4.9,7.5z",1,"st0"],["d","M11.1,13c-0.1,0-0.2,0-0.2-0.1L4.7,9.4C4.5,9.3,4.4,9,4.5,8.7c0.1-0.2,0.4-0.3,0.7-0.2l6.1,3.5\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tc0.2,0.1,0.3,0.4,0.2,0.7C11.4,12.9,11.2,13,11.1,13L11.1,13z",1,"st0"],[1,"account-list"],[1,"full-container"],[1,"full-info2"],[1,"left-info","check",3,"ngClass"],[1,"ux-selection","share-info"],[1,"ux-selection1"],["type","checkbox","name",""],[1,"ux-input","mt-0","mb-0"],[4,"ngIf"],[1,"full-info"],[1,"left-info","check"],[1,"btn-section",3,"ngStyle"],[1,"col-6","col-md-6"],[1,"cancel-btn","ux-button","secondary","sm-mob",3,"click"],[1,"submit-info","ux-button","primary","sm-mob",3,"click"],[1,"popup-bottom","success-popup"],[1,"row","mt-3"],[1,"success"],["src","../assets/images/svg/check.svg","alt","success-icon"],[1,"row1","mt-3"],[1,"col-12","text-center"],[1,"ux-button","primary","md","ok-btn"],[1,"popup-bottom","sm-popup","close-rd-popup"],[1,"text-center"],["src","./assets/images/svg/information.svg","alt","information-icon"],[1,"row1","mt-2"],[1,"col-6","text-center"],[1,"ux-button","primary","md",3,"click"],[1,"ux-button","secondary","no","md","close-btn",3,"click"],[1,"popup-bottom","lg-popup","terms-conditions-popup"],[1,"col-10"],[1,"col-2"],[1,"ux-button-icon","close-btn",3,"click"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],[1,"scroll-content"],[1,"content-scroll"],[1,"col-12","p-2"],[1,"order-list"],[1,"orderlist"],[1,"ios-nav-overlay"],[1,"toast-messages3"],[3,"click"]],template:function(t,e){1&t&&(a.ec(0,"div",0),a.ec(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"ul",8),a.Rc(9,p,4,3,"li",9),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(10,"div",10),a.ec(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"h4"),a.Sc(19,"Close Recurring Deposit"),a.dc(),a.dc(),a.Zb(20,"div",18),a.dc(),a.ec(21,"div",13),a.ec(22,"div",19),a.ec(23,"from",20),a.ec(24,"div",13),a.ec(25,"div",21),a.ec(26,"div",22),a.ec(27,"div",23),a.ec(28,"div",13),a.ec(29,"div",24),a.ec(30,"div",13),a.ec(31,"div",25),a.ec(32,"div",26),a.ec(33,"label"),a.Sc(34,"RD Account"),a.dc(),a.Zb(35,"input",27),a.Rc(36,b,2,0,"p",28),a.dc(),a.dc(),a.ec(37,"div",25),a.ec(38,"div",29),a.ec(39,"label"),a.Sc(40,"Monthly Installment Amount "),a.dc(),a.Zb(41,"input",30),a.Zb(42,"p",31),a.dc(),a.dc(),a.dc(),a.ec(43,"div",13),a.ec(44,"div",25),a.ec(45,"div",29),a.ec(46,"label"),a.Sc(47,"Original Maturity Amount"),a.dc(),a.Zb(48,"input",32),a.Zb(49,"p",31),a.dc(),a.dc(),a.ec(50,"div",25),a.ec(51,"div",29),a.ec(52,"label"),a.Sc(53,"Current RD Account Balance"),a.dc(),a.Zb(54,"input",33),a.Zb(55,"p",31),a.dc(),a.dc(),a.dc(),a.ec(56,"div",13),a.ec(57,"div",25),a.ec(58,"div",34),a.ec(59,"label"),a.Sc(60,"Maturity Payout Account"),a.dc(),a.Zb(61,"input",35),a.Zb(62,"p",31),a.dc(),a.ec(63,"div",36),a.ec(64,"p",37),a.Sc(65,"No interest will be paid for NRE account if it is broken partially or fully within 1 year"),a.dc(),a.dc(),a.dc(),a.ec(66,"div",38),a.ec(67,"div",26),a.ec(68,"label"),a.Sc(69,"Remarks"),a.dc(),a.Zb(70,"input",39),a.Rc(71,v,2,0,"p",28),a.dc(),a.dc(),a.dc(),a.ec(72,"div",13),a.ec(73,"div",40),a.ec(74,"div",41),a.ec(75,"h5"),a.Sc(76,"Note"),a.dc(),a.ec(77,"p"),a.Sc(78,"Premature Closure amount is subject to deduction of Penalty and applicable Rate of Interest."),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(79,"div",13),a.ec(80,"div",42),a.ec(81,"div",43),a.ec(82,"div",44),a.ec(83,"label"),a.Sc(84,"I accept "),a.ec(85,"a",45),a.lc("click",(function(){return e.termsConditionPopup("closed")})),a.Sc(86,"Terms and Conditions"),a.dc(),a.ec(87,"input",46),a.lc("change",(function(t){return e.onCheckboxChecked(t)})),a.dc(),a.Zb(88,"span",47),a.dc(),a.dc(),a.ec(89,"div",48),a.Rc(90,D,2,0,"p",28),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(91,"div",19),a.ec(92,"ul",49),a.ec(93,"li"),a.ec(94,"div",50),a.ec(95,"button",51),a.lc("click",(function(){return e.onCancel()})),a.Sc(96,"Cancel"),a.dc(),a.dc(),a.ec(97,"div",50),a.ec(98,"button",52),a.lc("click",(function(){return e.openPopup("close-rd-popup")})),a.Sc(99,"Submit"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(100,"div",53),a.ec(101,"div",13),a.ec(102,"div",54),a.ec(103,"div",55),a.ec(104,"div",56),a.ec(105,"h5"),a.Sc(106,"RD Account Details"),a.dc(),a.ec(107,"a",57),a.lc("click",(function(){return e.shareFdDetails()})),a.oc(),a.ec(108,"svg",58),a.ec(109,"g"),a.Zb(110,"path",59),a.Zb(111,"path",60),a.Zb(112,"path",61),a.Zb(113,"path",62),a.Zb(114,"path",63),a.dc(),a.dc(),a.Sc(115," Share "),a.dc(),a.dc(),a.nc(),a.ec(116,"ul",64),a.ec(117,"li"),a.ec(118,"div",65),a.ec(119,"div",66),a.ec(120,"div",67),a.ec(121,"div",68),a.ec(122,"label",69),a.Zb(123,"input",70),a.Zb(124,"span",47),a.dc(),a.dc(),a.ec(125,"h6"),a.Sc(126,"RD Account Number"),a.dc(),a.ec(127,"h5"),a.Sc(128),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(129,"div",65),a.ec(130,"div",71),a.Zb(131,"p",31),a.dc(),a.dc(),a.dc(),a.ec(132,"li"),a.ec(133,"div",65),a.ec(134,"div",66),a.ec(135,"div",67),a.ec(136,"div",68),a.ec(137,"label",69),a.Zb(138,"input",70),a.Zb(139,"span",47),a.dc(),a.dc(),a.ec(140,"h6"),a.Sc(141,"Maturity Date"),a.dc(),a.ec(142,"h5"),a.Sc(143),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(144,"div",65),a.ec(145,"div",71),a.Zb(146,"p",31),a.dc(),a.dc(),a.dc(),a.ec(147,"li"),a.ec(148,"div",65),a.ec(149,"div",66),a.ec(150,"div",67),a.ec(151,"div",68),a.ec(152,"label",69),a.Zb(153,"input",70),a.Zb(154,"span",47),a.dc(),a.dc(),a.ec(155,"h6"),a.Sc(156,"Tenure"),a.dc(),a.ec(157,"h5"),a.Sc(158),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(159,"div",65),a.ec(160,"div",71),a.Zb(161,"p",31),a.dc(),a.dc(),a.dc(),a.ec(162,"li"),a.ec(163,"div",65),a.ec(164,"div",66),a.ec(165,"div",67),a.ec(166,"div",68),a.ec(167,"label",69),a.Zb(168,"input",70),a.Zb(169,"span",47),a.dc(),a.dc(),a.ec(170,"h6"),a.Sc(171,"Interest Rate "),a.dc(),a.ec(172,"h5"),a.Sc(173),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(174,"div",65),a.ec(175,"div",71),a.Zb(176,"p",31),a.dc(),a.dc(),a.dc(),a.ec(177,"li"),a.ec(178,"div",65),a.ec(179,"div",66),a.ec(180,"div",67),a.ec(181,"div",68),a.ec(182,"label",69),a.Zb(183,"input",70),a.Zb(184,"span",47),a.dc(),a.dc(),a.ec(185,"h6"),a.Sc(186,"Mode of RD Opening"),a.dc(),a.Rc(187,f,2,0,"h5",72),a.Rc(188,g,2,0,"h5",72),a.dc(),a.dc(),a.dc(),a.ec(189,"div",65),a.ec(190,"div",71),a.Zb(191,"p",31),a.dc(),a.dc(),a.dc(),a.ec(192,"li"),a.ec(193,"div",65),a.ec(194,"div",73),a.ec(195,"div",74),a.ec(196,"div",68),a.ec(197,"label",69),a.Zb(198,"input",70),a.Zb(199,"span",47),a.dc(),a.dc(),a.ec(200,"h5"),a.Sc(201,"Maturity Payout Account"),a.dc(),a.ec(202,"h6"),a.Sc(203),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(204,"div",65),a.ec(205,"div",71),a.Zb(206,"p",31),a.dc(),a.dc(),a.dc(),a.ec(207,"li",75),a.ec(208,"div",65),a.ec(209,"div",13),a.ec(210,"div",76),a.ec(211,"button",77),a.lc("click",(function(){return e.cancelShare()})),a.Sc(212,"Cancel"),a.dc(),a.dc(),a.ec(213,"div",76),a.ec(214,"button",78),a.lc("click",(function(){return e.submitShare()})),a.Sc(215,"Submit"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(216,"div",79),a.ec(217,"div",80),a.ec(218,"div",81),a.Zb(219,"img",82),a.ec(220,"h3"),a.Sc(221,"Success"),a.dc(),a.ec(222,"h5"),a.Sc(223,"Account Details shared Successfully"),a.dc(),a.dc(),a.dc(),a.ec(224,"div",83),a.ec(225,"div",84),a.ec(226,"button",85),a.Sc(227,"Ok"),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(228,"div",86),a.ec(229,"div",13),a.ec(230,"div",12),a.ec(231,"h4",87),a.Zb(232,"img",88),a.Sc(233),a.qc(234,"translate"),a.dc(),a.dc(),a.dc(),a.ec(235,"div",13),a.ec(236,"div",12),a.ec(237,"p"),a.Sc(238,"Do you want to close this RD?"),a.dc(),a.dc(),a.dc(),a.ec(239,"div",89),a.ec(240,"div",90),a.ec(241,"button",91),a.lc("click",(function(){return e.closeRdSubmit(e.closeRDForm)})),a.Sc(242),a.qc(243,"translate"),a.dc(),a.dc(),a.ec(244,"div",90),a.ec(245,"button",92),a.lc("click",(function(){return e.closePopup()})),a.Sc(246),a.qc(247,"translate"),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(248,"div",93),a.ec(249,"div",13),a.ec(250,"div",94),a.ec(251,"h4",87),a.Sc(252,"Terms and Conditions"),a.dc(),a.dc(),a.ec(253,"div",95),a.ec(254,"button",96),a.lc("click",(function(){return e.closeTerms()})),a.Zb(255,"img",97),a.dc(),a.dc(),a.dc(),a.ec(256,"div",89),a.ec(257,"div",98),a.ec(258,"div",99),a.ec(259,"div",100),a.ec(260,"ol",101),a.ec(261,"li"),a.ec(262,"ul",102),a.ec(263,"li"),a.Sc(264,"The Online Fixed Deposit in INR will be opened in the same name(s) of the account holder(s) as in account from which it is funded"),a.dc(),a.ec(265,"li"),a.Sc(266,"The Online Fixed Deposit will be opened in the same branch where the debit account belongs."),a.dc(),a.ec(267,"li"),a.Sc(268,"The interest on the Term Deposit, and the proceeds of the Term Deposit upon maturity, will be credited to the account from which the Term Deposit was funded."),a.dc(),a.ec(269,"li"),a.Sc(270,"Bank will deduct the TDS as per the law applicable and in case no tax is to be deducted, form 15H/G has to be submitted by the depositor to the branch just after opening the Term Deposit and at the beginning the Financial Year in the subsequent Financial Years."),a.dc(),a.ec(271,"li"),a.Sc(272,"Online Fixed Deposit with additional rate of interest for Senior Citizens will be issued if the age of customer is 60 years or above, on the date of creating the fixed deposit, as per date of birth recorded with the Bank. The minimum days applicable for additional rate of interest for senior citizen will be as per Bank's policy."),a.dc(),a.ec(273,"li"),a.Sc(274,"Online Fixed Deposit will be disposed of according to the Maturity Instruction given at the time of opening the deposit. In case of auto renewal, the deposit will be renewed for the same duration for which it was originally kept or maximum 12 months (whichever is lower), at the rate of interest prevailing on the date of renewal for that duration. If auto renewal instructions are given, the instructions will continue to executed till terminated by the account holder."),a.dc(),a.ec(275,"li"),a.Sc(276,"The stipulation as to the payment of interest is subject to the condition that the rate of interest agreed to be paid by the Bank will be liable to revision (up or down) in accordance with directives (if any) issued by the Reserve bank of India, in exercise of the powers conferred on it by Section\u2019s 21 & 35A of the Banking Regulations Act, 194 to such extent as may be applicable to this fixed deposit."),a.dc(),a.ec(277,"li"),a.Sc(278,"The Bank shall have the first Lien on all kinds of deposits and securities in its possession for any kind of liability in favour of or for monies due to the Bank."),a.dc(),a.ec(279,"li"),a.Sc(280,"In case deposit is not renewed interest on deposit ceases from due date."),a.dc(),a.ec(281,"li"),a.Sc(282,"Where Interest on FDR\u2019s exceeds or is likely to exceed a specific limit (fixed by I.T. Department from time to time) per depositor during a financial year, the depositor(s) is required to submit the form No. 15G/15H, as applicable invariably for non deduction of tax at source failing which bank will deduct T.D.S. as per Income Tax Rules."),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(283,"div",103),a.Zb(284,"div",104)),2&t&&(a.Mb(9),a.uc("ngForOf",e.dataService.breadcrumblist),a.Mb(14),a.uc("formGroup",e.closeRDForm),a.Mb(13),a.uc("ngIf",e.closeRDForm.controls.fdAccount.hasError("required")&&(e.closeRDForm.controls.fdAccount.dirty||e.closeRDForm.controls.fdAccount.touched)),a.Mb(35),a.uc("ngIf",e.closeRDForm.controls.remark.hasError("required")&&(e.closeRDForm.controls.remark.dirty||e.closeRDForm.controls.remark.touched)),a.Mb(19),a.uc("ngIf",e.closeRDForm.controls.termsCondition.hasError("required")&&(e.closeRDForm.controls.termsCondition.dirty||e.closeRDForm.controls.termsCondition.touched)||0==e.isTermsAndCondition),a.Mb(30),a.uc("ngClass",e.shareDetails?"active":""),a.Mb(8),a.Tc(null!=e.selectedAccData&&e.selectedAccData.account?null==e.selectedAccData?null:e.selectedAccData.account:"-"),a.Mb(7),a.uc("ngClass",e.shareDetails?"active":""),a.Mb(8),a.Tc(null!=e.rdDetailsData&&e.rdDetailsData.maturityDate?null==e.rdDetailsData?null:e.rdDetailsData.maturityDate:"-"),a.Mb(7),a.uc("ngClass",e.shareDetails?"active":""),a.Mb(8),a.Tc(null!=e.rdDetailsData&&e.rdDetailsData.depositPeriodMonthsComponent?(null==e.rdDetailsData?null:e.rdDetailsData.depositPeriodMonthsComponent)+" Months":"-"),a.Mb(7),a.uc("ngClass",e.shareDetails?"active":""),a.Mb(8),a.Uc("",null!=e.rdDetailsData&&e.rdDetailsData.interest_Rate?null==e.rdDetailsData?null:e.rdDetailsData.interest_Rate:"-"," %"),a.Mb(7),a.uc("ngClass",e.shareDetails?"active":""),a.Mb(7),a.uc("ngIf","ONLINE USE"==(null==e.rdDetailsData?null:e.rdDetailsData.account)),a.Mb(1),a.uc("ngIf","ONLINE USE"!=(null==e.rdDetailsData?null:e.rdDetailsData.account)),a.Mb(15),a.Tc(null!=e.rdDetailsData&&e.rdDetailsData.repaymentAccountNumber?null==e.rdDetailsData?null:e.rdDetailsData.repaymentAccountNumber:"-"),a.Mb(4),a.uc("ngStyle",a.yc(27,y,e.shareDetails?"flex":"none")),a.Mb(26),a.Uc(" ",a.rc(234,21,"INFORMATION")," "),a.Mb(9),a.Tc(a.rc(243,23,"YES")),a.Mb(4),a.Tc(a.rc(247,25,"NO")))},directives:[i.s,o.t,o.k,o.c,o.s,o.i,i.t,o.a,i.q,i.w],pipes:[m.a],styles:[""]}),t})()}];let A=(()=>{class t{}return t.\u0275mod=a.Wb({type:t}),t.\u0275inj=a.Vb({factory:function(e){return new(e||t)},imports:[[s.g.forChild(S)],s.g]}),t})();var R=c("PCNd");let w=(()=>{class t{}return t.\u0275mod=a.Wb({type:t}),t.\u0275inj=a.Vb({factory:function(e){return new(e||t)},imports:[[i.c,A,o.m,o.C,R.a]]}),t})()}}]);