(window.webpackJsonp=window.webpackJsonp||[]).push([[70,349],{Geda:function(e,t,c){"use strict";c.d(t,"a",(function(){return n}));var a=c("fXoL"),o=c("3Pt+"),i=c("au7T");let n=(()=>{class e{constructor(e,t){this.control=e,this.commonMethods=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const t=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=t){let e=this.control.value.substring(0,t);this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(a.Yb(o.r),a.Yb(i.a))},e.\u0275dir=a.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,t){1&e&&a.lc("input",(function(e){return t.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[a.Kb]}),e})()},TaOT:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));var a=c("fXoL"),o=c("fUdP");let i=(()=>{class e{constructor(e){this.customCurrencyPipe=e}markFormGroupTouched(e){Object.values(e.controls).forEach(e=>{e.markAsTouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupTouched(e))})}markFormGroupUntouched(e){Object.values(e.controls).forEach(e=>{e.markAsUntouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupUntouched(e))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:e=>{let t=e;return t=t.reduce((e,c,a)=>{let o=e;return o+=c,t.length!==a+1&&(o+=", "),o},""),"These characters are not allowed: "+t}}}validateForm(e,t,c){const a=e;for(const o in t)if(o){t[o]="";const e=a.get(o),i=this.validationMessages();if(e&&!e.valid&&(!c||e.dirty||e.touched))for(const c in e.errors)console.log("======>inside",c),t[o]=c&&"invalid_characters"!==c?t[o]||i[c]:t[o]||i[c](e.errors[c])}return t}formatCurrency(e,t,c){if("0"!=e)if(""!=e){let c=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==c.trim().replace(/[^.0-9]+/g,"")?t.contains("amount")&&t.get("amount").reset():"0"==c.trim().replace(/[^.0-9]+/g,"")?t.get("amount").reset():(console.log(c),t.patchValue({amount:c}))}else t.get("amount").reset("");else t.contains("amount")&&t.get("amount").reset()}formatTransLimit(e,t){if("0"!=e)if(""!=e){let c=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==c?t.contains("transactionLimit")&&t.get("transactionLimit").reset():"0"==c.trim()?t.get("transactionLimit").reset():(console.log(c),t.patchValue({transactionLimit:c}))}else t.get("transactionLimit").reset("");else t.contains("transactionLimit")&&t.get("transactionLimit").reset()}formatDynamicCurrency(e,t){$("#"+e).val()&&"\u20b9 0.00"!=$("#"+e).val()?t.patchValue({amount:$("#"+e).val()}):t.get("amount").reset("")}deFormatValue(e,t){t.patchValue({amount:e.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(e,t,c){if("0"!=e)if(""!=e){let a=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==a?t.contains(c)&&t.get(c).reset():"0"==a.trim()?t.get(c).reset():t.controls[c].patchValue("\u20b9"+a)}else t.get(c).reset("");else t.contains(c)&&t.get(c).reset()}}return e.\u0275fac=function(t){return new(t||e)(a.ic(o.a))},e.\u0275prov=a.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"j/pJ":function(e,t,c){"use strict";c.r(t),c.d(t,"PayEmiModule",(function(){return C}));var a=c("ofXK"),o=c("3Pt+"),i=c("fXoL"),n=c("tyNb"),r=c("EnSQ"),s=c("L7Xq"),d=c("4H2G"),l=c("H9Rt"),m=c("5IsW"),u=c("TaOT"),h=c("au7T"),v=c("Geda"),g=c("fUdP"),p=c("Eioz");function y(e,t){if(1&e){const e=i.fc();i.ec(0,"li"),i.ec(1,"a",46),i.lc("click",(function(){i.Hc(e);const c=t.$implicit;return i.pc().DataService.breadcrumroute(c.routeName)})),i.Sc(2),i.qc(3,"translate"),i.dc(),i.dc()}if(2&e){const e=t.$implicit;i.Mb(2),i.Tc(i.rc(3,1,e.currentRoute))}}function b(e,t){1&e&&(i.ec(0,"p",31),i.Sc(1),i.qc(2,"translate"),i.dc()),2&e&&(i.Mb(1),i.Uc(" ",i.rc(2,1,"REQUIRED_MSG")," "))}const f=function(e){return{active:e}},M=[{path:"",component:(()=>{class e{constructor(e,t,c,a,o,i,n,r,s){this.router=e,this.DataService=t,this.http=c,this.myBorrowingService=a,this.storage=o,this.constant=i,this.dataService=n,this.formValidation=r,this.commonMethod=s,this.totalAccountList=[],this.payMethod="overdue"}ngOnInit(){this.buildForm(),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("PAY_EMI",this.router.url),this.DataService.setPageSettings("PAY_EMI"),this.payAmt={mode:"overDue"},this.totalAccountList=[],this.totalAccountList=this.dataService.customerBorrowingsList,this.dataService.otpSessionPreviousPage="/payEmi",this.selAccDtl=this.totalAccountList.filter(e=>e.accountNo==this.dataService.loanDetails.accountNo)[0],this.getLoanEnq(this.dataService.loanDetails.accountNo),this.getLoanRepaymentSchedule()}buildForm(){this.advanceEmiForm=new o.j({amount:new o.g("")})}validateForm(){this.advanceEmiForm.invalid&&this.advanceEmiForm.get("amount").markAsTouched()}getLoanRepaymentSchedule(){var e=this.myBorrowingService.getLoanRepaymentSchedule(this.dataService.loanDetails.accountNo);this.http.callBankingAPIService(e,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_LOANREPAYMENTSCHEDULE).subscribe(e=>{console.log("loan enq resp===>",e),"00"==e.responseParameter.opstatus&&e.hasOwnProperty("set")&&(this.emiDtl=e.set.records[0],console.log(this.emiDtl))})}advanceEmiValidators(){"advEmi"==this.payAmt.mode?(this.advanceEmiForm.get("amount").setValidators([o.G.required]),this.advanceEmiForm.get("amount").updateValueAndValidity()):(this.advanceEmiForm.get("amount").clearValidators(),this.advanceEmiForm.get("amount").updateValueAndValidity())}getLoanEnq(e){var t=this.myBorrowingService.getMyLoansInquiry(e,this.selAccDtl.branchCode);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_LOANACCOUNTINQUIRY).subscribe(e=>{if(console.log("loan enq resp===>",e),"00"==e.responseParameter.opstatus&&e.hasOwnProperty("set")){var t=e.set.records[0];this.dataService.loanUserDtl=t,this.overDueAmt=parseFloat(null==t?void 0:t.pricipalDemandArrears)+parseFloat(null==t?void 0:t.interestDemandsArrears)+parseFloat(null==t?void 0:t.chargesDemandArrears)+parseFloat(null==t?void 0:t.otherChargesDemand),console.log(this.overDueAmt),0==this.overDueAmt&&(this.payAmt={mode:"emidue"},this.payMethod="emidue",this.onTypeChange("emidue"))}})}onTypeChange(e){this.payMethod=e}goToPage(e){if("sendMoneyLoan"==e){if(this.advanceEmiValidators(),console.log(this.payAmt.mode),"overDue"==this.payAmt.mode){if(this.dataService.payEMIHeader="Pay Overdue Amount",this.dataService.loanAmount=""+this.overDueAmt,0==parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g,"")))return;this.router.navigateByUrl("/"+e)}else if("emiDue"==this.payAmt.mode){if(this.dataService.payEMIHeader="Pay EMI",this.dataService.loanAmount=this.emiDtl.flowAmount,0==parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g,"")))return;this.router.navigateByUrl("/"+e)}else if("advEmi"==this.payAmt.mode)if(this.advanceEmiForm.valid){if(this.dataService.payEMIHeader="Pay Advance EMI",this.dataService.loanAmount=this.payAdvEmi.trim().replace(/[^.0-9]+/g,""),0==parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g,"")))return;this.router.navigateByUrl("/"+e)}else this.validateForm()}else"myBorrowings"==e&&"web"!=this.constant.getPlatform()?this.router.navigateByUrl("/myAccountMobile"):this.router.navigateByUrl("/"+e)}formatCurrency(e){this.formValidation.formatCurrency(e,this.advanceEmiForm)}OnInput(e){var t=new RegExp("(\\.\\d{2})\\d+","g");e=e.replace(t,"$1"),this.advanceEmiForm.patchValue({amount:e})}closePopup(e){this.commonMethod.closePopup(e)}}return e.\u0275fac=function(t){return new(t||e)(i.Yb(n.c),i.Yb(r.a),i.Yb(s.a),i.Yb(d.a),i.Yb(l.a),i.Yb(m.a),i.Yb(r.a),i.Yb(u.a),i.Yb(h.a))},e.\u0275cmp=i.Sb({type:e,selectors:[["app-pay-emi"]],decls:94,vars:30,consts:[["lang","en"],[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mb-3","mt-0","pad-custom2"],[1,"col-12","emi-row",3,"ngClass"],[1,"col-8"],[1,"emi-selection"],[1,"ux-selection"],[1,"ux-selection2"],["type","radio","name","pay-emi-radio","value","overDue",3,"checked","ngModel","change","ngModelChange"],[1,"checkmark"],[1,"col-4"],[1,"ux-input","mt-1","mb-3"],[1,"error-message"],["type","radio","name","pay-emi-radio","value","emiDue",3,"checked","ngModel","change","ngModelChange"],["type","radio","name","pay-emi-radio","value","advEmi",3,"ngModel","checked","ngModelChange","change"],[3,"formGroup"],["type","text","placeholder","\u20b9 0.00","formControlName","amount","limit-to","12","id","amt","data-a-sign","Rs.",3,"ngClass","ngModel","ngModelChange","blur","input"],[1,"ux-input","mt-1"],["class","error-message",4,"ngIf"],[1,"col-12","col-md-12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[3,"click"]],template:function(e,t){1&e&&(i.ec(0,"html",0),i.ec(1,"div",1),i.ec(2,"div",2),i.ec(3,"div",3),i.ec(4,"div",4),i.ec(5,"div",5),i.ec(6,"div",6),i.ec(7,"div",7),i.ec(8,"div",8),i.ec(9,"ul",9),i.Rc(10,y,4,3,"li",10),i.dc(),i.dc(),i.dc(),i.dc(),i.Zb(11,"div",11),i.ec(12,"div",12),i.ec(13,"div",13),i.ec(14,"div",14),i.ec(15,"div",15),i.ec(16,"div",16),i.ec(17,"div",17),i.ec(18,"div",18),i.ec(19,"h4"),i.Sc(20,"Pay EMI"),i.dc(),i.dc(),i.Zb(21,"div",19),i.dc(),i.ec(22,"div",14),i.ec(23,"div",20),i.ec(24,"div",21),i.ec(25,"div",13),i.ec(26,"div",14),i.ec(27,"div",22),i.ec(28,"div",14),i.ec(29,"div",23),i.ec(30,"div",24),i.ec(31,"div",25),i.ec(32,"label",26),i.Sc(33," Pay Overdue Amount "),i.ec(34,"input",27),i.lc("change",(function(){return t.onTypeChange("overdue")}))("ngModelChange",(function(e){return t.payAmt.mode=e})),i.dc(),i.Zb(35,"span",28),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(36,"div",29),i.ec(37,"div",24),i.ec(38,"p"),i.Sc(39),i.qc(40,"customcurrency"),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(41,"div",7),i.ec(42,"div",30),i.Zb(43,"p",31),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(44,"div",13),i.ec(45,"div",14),i.ec(46,"div",22),i.ec(47,"div",14),i.ec(48,"div",23),i.ec(49,"div",24),i.ec(50,"div",25),i.ec(51,"label",26),i.Sc(52," Pay EMI "),i.ec(53,"input",32),i.lc("change",(function(){return t.onTypeChange("emidue")}))("ngModelChange",(function(e){return t.payAmt.mode=e})),i.dc(),i.Zb(54,"span",28),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(55,"div",29),i.ec(56,"div",24),i.ec(57,"p"),i.Sc(58),i.qc(59,"customcurrency"),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(60,"div",7),i.ec(61,"div",30),i.Zb(62,"p",31),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(63,"div",13),i.ec(64,"div",14),i.ec(65,"div",22),i.ec(66,"div",14),i.ec(67,"div",23),i.ec(68,"div",24),i.ec(69,"div",25),i.ec(70,"label",26),i.Sc(71," Pay Advance Amount "),i.ec(72,"input",33),i.lc("ngModelChange",(function(e){return t.payAmt.mode=e}))("change",(function(){return t.onTypeChange("advance")})),i.dc(),i.Zb(73,"span",28),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(74,"div",29),i.ec(75,"form",34),i.ec(76,"div",24),i.ec(77,"input",35),i.lc("ngModelChange",(function(e){return t.payAdvEmi=e}))("blur",(function(e){return t.formatCurrency(e.target.value)}))("input",(function(e){return t.OnInput(e.target.value)})),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(78,"div",7),i.ec(79,"div",36),i.Rc(80,b,3,3,"p",37),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(81,"div",38),i.ec(82,"ul",39),i.ec(83,"li"),i.ec(84,"div",40),i.ec(85,"button",41),i.lc("click",(function(){return t.goToPage("myBorrowings")})),i.Sc(86,"Cancel"),i.dc(),i.dc(),i.ec(87,"div",40),i.ec(88,"button",42),i.lc("click",(function(){return t.goToPage("sendMoneyLoan")})),i.Sc(89,"Pay Now"),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(90,"div",43),i.ec(91,"div",44),i.ec(92,"a"),i.Zb(93,"img",45),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc()),2&e&&(i.Mb(10),i.uc("ngForOf",t.DataService.breadcrumblist),i.Mb(17),i.uc("ngClass",i.yc(24,f,"overdue"==t.payMethod)),i.Mb(4),i.Qb("disablePointer",0==t.overDueAmt),i.Mb(3),i.uc("checked","overdue"==t.payMethod)("ngModel",t.payAmt.mode),i.Mb(5),i.Tc(i.rc(40,20,t.overDueAmt)),i.Mb(7),i.uc("ngClass",i.yc(26,f,"emidue"==t.payMethod)),i.Mb(7),i.uc("checked","emidue"==t.payMethod)("ngModel",t.payAmt.mode),i.Mb(5),i.Tc(i.rc(59,22,t.emiDtl.flowAmount)),i.Mb(7),i.uc("ngClass",i.yc(28,f,"advance"==t.payMethod)),i.Mb(7),i.uc("ngModel",t.payAmt.mode)("checked","advance"==t.payMethod),i.Mb(3),i.uc("formGroup",t.advanceEmiForm),i.Mb(1),i.Qb("disablePointer","advance"!=t.payMethod),i.Mb(1),i.uc("ngClass",t.advanceEmiForm.invalid?"error":"")("ngModel",t.payAdvEmi),i.Mb(3),i.uc("ngIf",t.advanceEmiForm.controls.amount.hasError("required")&&(t.advanceEmiForm.controls.amount.dirty||t.advanceEmiForm.controls.amount.touched)))},directives:[a.s,a.q,o.A,o.c,o.s,o.v,o.I,o.t,o.k,o.i,v.a,a.t],pipes:[g.a,p.a],styles:[".error[_ngcontent-%COMP%]{border-bottom:2px solid red!important}.disablePointer[_ngcontent-%COMP%]{pointer-events:none}"]}),e})()}];let A=(()=>{class e{}return e.\u0275mod=i.Wb({type:e}),e.\u0275inj=i.Vb({factory:function(t){return new(t||e)},imports:[[n.g.forChild(M)],n.g]}),e})();var S=c("PCNd"),E=c("bhfF");let C=(()=>{class e{}return e.\u0275mod=i.Wb({type:e}),e.\u0275inj=i.Vb({factory:function(t){return new(t||e)},imports:[[a.c,A,o.m,E.b,S.a,o.C]]}),e})()}}]);