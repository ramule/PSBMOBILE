(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"3BDk":function(e,c,t){"use strict";t.r(c),t.d(c,"SendMoneyLoanModule",(function(){return x}));var n=t("PCNd"),o=t("3Pt+"),i=t("ofXK"),a=t("tyNb"),s=t("kuSH"),r=t("fXoL"),l=t("EnSQ"),d=t("au7T"),u=t("5IsW"),h=t("fHQ/"),m=t("H9Rt");let v=(()=>{class e{constructor(e,c,t,n,o,i){this.constant=e,this.encryptDecryptService=c,this.storage=t,this.dataService=n,this.common=o,this.datepipe=i}getSendMoneyLoanReq(e,c,t,n){var o,i=""+t;return o={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_referenceNumber]:this.common.genRandomDigit(9),[this.constant.key_accountNo]:e,[this.constant.key_toAccount]:c,[this.constant.key_loanCreditsData]:""==n?"-":n,[this.constant.key_amount]:i.trim().replace(/[^0-9]+/g,""),[this.constant.key_RRN]:this.common.genRandomDigit(9)},console.log("Recommended offers Req",JSON.stringify(o)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(o))}}return e.\u0275fac=function(c){return new(c||e)(r.ic(u.a),r.ic(h.a),r.ic(m.a),r.ic(l.a),r.ic(d.a),r.ic(i.f))},e.\u0275prov=r.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var p=t("4vgh"),b=t("L7Xq"),f=t("fUdP"),g=t("OXpz"),S=t("Geda"),y=t("Eioz");function D(e,c){if(1&e){const e=r.fc();r.ec(0,"li"),r.ec(1,"a",73),r.lc("click",(function(){r.Hc(e);const t=c.$implicit;return r.pc().DataService.breadcrumroute(t.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&e){const e=c.$implicit;r.Mb(2),r.Tc(r.rc(3,1,e.currentRoute))}}function A(e,c){if(1&e&&(r.cc(0),r.ec(1,"option",74),r.Sc(2),r.dc(),r.bc()),2&e){const e=c.$implicit;r.Mb(1),r.uc("value",e.accountNo),r.Mb(1),r.Vc("",e.SchemeCode," ",e.sbAccount,"")}}function M(e,c){1&e&&(r.ec(0,"span"),r.Sc(1,"Select Account "),r.dc())}function k(e,c){if(1&e&&(r.ec(0,"span"),r.Sc(1),r.dc()),2&e){const e=r.pc();r.Mb(1),r.Tc(e.accountValue)}}function C(e,c){1&e&&(r.ec(0,"p",48),r.Sc(1,"This field is required "),r.dc())}function T(e,c){1&e&&(r.ec(0,"p",48),r.Sc(1,"This field is required"),r.dc())}function O(e,c){1&e&&(r.ec(0,"p",48),r.Sc(1,"Insufficient balance"),r.dc())}const N=function(){return{standalone:!0}};function w(e,c){if(1&e){const e=r.fc();r.ec(0,"div",75),r.lc("click",(function(){r.Hc(e);const t=c.$implicit;return r.pc().getToAccValue(t.SchemeCode,t.accountNo)})),r.ec(1,"div",76),r.ec(2,"label",77),r.Sc(3),r.ec(4,"input",78),r.lc("ngModelChange",(function(c){return r.Hc(e),r.pc().selAccNo=c})),r.dc(),r.Zb(5,"span",79),r.dc(),r.dc(),r.dc()}if(2&e){const e=c.$implicit,t=r.pc();r.Mb(3),r.Vc("",e.SchemeCode," ",e.accountNo," "),r.Mb(1),r.uc("value",e.accountNo)("checked",t.selAccNo==(null==e?null:e.accountNo))("ngModel",t.selAccNo)("ngModelOptions",r.xc(6,N))}}const L=[{path:"",component:(()=>{class e{constructor(e,c,t,n,o,i,a,s,r,l){this.router=e,this.DataService=c,this.commonMethod=t,this.location=n,this.constant=o,this.sendMoneyLoanService=i,this.initiateSendMoneyService=a,this.http=s,this.storage=r,this.customCurrencyPipe=l,this.accountList=[],this.accountValue="",this.inSufficientBalance=!1}ngOnInit(){this.buildForm(),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb(this.DataService.payEMIHeader,this.router.url),this.DataService.setPageSettings("SEND_MONEY"),this.DataService.customerOperativeAccList.forEach(e=>{"CAPPI"!=e.accountType&&"Active"==e.Status&&(e.SchemeCode!=s.b.SAVING_ACCOUNT&&e.SchemeCode!=s.b.CURRENT_ACCOUNT&&e.SchemeCode!=s.b.CASH_CREDIT&&e.SchemeCode!=s.b.OVER_DRAFT_ACCOUNT||"P"==e.accountFlag&&(this.accountList[0]=e))}),this.DataService.customerOperativeAccList.forEach(e=>{"CAPPI"!=e.accountType&&"Active"==e.Status&&(e.SchemeCode!=s.b.SAVING_ACCOUNT&&e.SchemeCode!=s.b.CURRENT_ACCOUNT&&e.SchemeCode!=s.b.CASH_CREDIT&&e.SchemeCode!=s.b.OVER_DRAFT_ACCOUNT||"P"!=e.accountFlag&&this.accountList.push(e))}),console.log("loanDetails===>"+this.DataService.loanDetails),console.log("loanUserDetails===>"+this.DataService.loanUserDtl),this.initialize()}buildForm(){this.sendMoneyLoanForm=new o.j({fromAccount:new o.g("",[o.G.required]),amount:new o.g("",[o.G.required]),remark:new o.g("")})}validateForm(){this.sendMoneyLoanForm.invalid&&(this.sendMoneyLoanForm.get("fromAccount").markAsTouched(),this.sendMoneyLoanForm.get("amount").markAsTouched())}initialize(){var e=this.accountList.findIndex(e=>"P"==e.accountFlag);if(0!=e){var c=this.accountList.splice(e,1);this.accountList.unshift(c[0])}this.onAccSelect(this.accountList[0].accountNo),this.sendMoneyLoanForm.patchValue({amount:this.customCurrencyPipe.transform(this.DataService.loanAmount,"symbol","INR")}),console.log(" send loan =========>")}goToPage(e){this.router.navigateByUrl("/"+e)}onAccountSelectType(){window.innerWidth<767&&this.commonMethod.openPopup("div.popup-bottom.sel-account")}getToAccValue(e,c){this.accountValue=e.concat(" ",c),this.onAccSelect(c)}closePopup(){this.commonMethod.closeAllPopup()}sendMoneyLoanSubmit(){if(parseFloat(this.DataService.loanAmount.trim().replace(/[^0-9]+/g,""))>parseFloat(this.accBalance.trim().replace(/[^0-9]+/g,""))&&(this.inSufficientBalance=!0),this.sendMoneyLoanForm.valid&&!this.inSufficientBalance){var e=this.sendMoneyLoanService.getSendMoneyLoanReq(this.selAccNo,this.DataService.loanDetails.accountNo,this.DataService.loanAmount,this.sendMoneyLoanForm.value.remark);this.DataService.request=e,this.DataService.endPoint=this.constant.serviceName_LOANCREDITS,this.DataService.transactionReceiptObj.from_acc=this.selAccNo,this.DataService.transactionReceiptObj.to_acc=this.DataService.loanDetails.accountNo,this.DataService.transactionReceiptObj.payee_name=this.DataService.loanUserDtl.accountName,this.DataService.transactionReceiptObj.amount=this.DataService.loanAmount,this.DataService.transactionReceiptObj.ifscCode=this.DataService.loanUserDtl.ifscCode,this.DataService.transactionReceiptObj.branchName="PSB",this.DataService.transactionReceiptObj.remarks=this.sendMoneyLoanForm.value.remark,this.DataService.transactionReceiptObj.date=(new Date).toISOString(),this.DataService.transactionReceiptObj.loanType=this.DataService.loanDetails.accountType+"-"+this.DataService.loanDetails.schemeDescription,this.DataService.authorizeHeader="PAY EMI",this.DataService.screenType="payemi",this.goToPage("sendMoneyLoanOverview")}else this.validateForm()}cancle(){this.constant.getPlatform(),this.goToPage("payEmi")}onAccSelect(e){console.log(e),this.selAccNo=e,this.accountList.filter(c=>c.accountNo==e),this.sendMoneyLoanForm.patchValue({fromAccount:e}),this.getAccountBalance(this.selAccNo)}getAccountBalance(e){var c=this.initiateSendMoneyService.getAccountBalanceParam(e);this.http.callBankingAPIService(c,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BALANCEINQUIRY).subscribe(e=>{console.log(e),"00"==e.responseParameter.opstatus&&(this.accBalance=e.set.records[0].ledgerBalance,this.inSufficientBalance=!1)})}}return e.\u0275fac=function(c){return new(c||e)(r.Yb(a.c),r.Yb(l.a),r.Yb(d.a),r.Yb(i.n),r.Yb(u.a),r.Yb(v),r.Yb(p.a),r.Yb(b.a),r.Yb(m.a),r.Yb(f.a))},e.\u0275cmp=r.Sb({type:e,selectors:[["app-send-money-loan"]],decls:139,vars:25,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[3,"formGroup"],[1,"col-sm-12","col-12","col-md-12"],[1,"ux-nav-tabs",2,"margin","0"],[1,"flex-container"],[1,"full-info"],[1,"ac-info"],[1,"greenbg-input","ux-input"],["for","fromaccount"],[1,"ac-info",3,"click"],[1,"hide-m",3,"change"],[1,"custom-selectbox"],[4,"ngIf"],[1,"right-arrow"],["class","error-message",4,"ngIf"],[1,"info-message2"],[1,"ac-info","hide-m"],[1,"refresh-btn"],["src","assets/images/svg/refresh.svg","alt","refresh-icon"],[1,"refresh-text"],[1,"col-12","col-md-12"],[1,"widget-box5","overflow","mb-3","mt-2"],[1,"bg-white1","bor-rad","pad-custom"],[1,"col-md-12","col-12"],[1,"col-md-6","col-lg-4","col-xl-4","col-12"],[1,"ux-input","d-block","d-sm-block","d-md-none","d-lg-","none","d-xl-none"],["for","toaccount"],[1,"send-input","no-after"],[1,"sendDisplay",2,"display","block"],[1,"info-message","text-right"],[1,"error-message"],[1,"ux-input","hide-m"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom"],[1,"ux-input","ux-disabled"],["type","text","placeholder","Enter Amount","numbersOnly","","formControlName","amount",1,"amount-input"],[1,"ux-input"],["type","text","placeholder","Enter Remarks","value","Closure","formControlName","remark","limit-to","12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"popup-bottom","sel-account"],[1,"col-10"],[1,"col-2"],[1,"ux-button-icon","close-btn"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],["class","col-12 col-md-12",3,"click",4,"ngFor","ngForOf"],[1,"row","mt-2"],[1,"col-12","text-center"],[1,"ux-button","primary","submit-btn2",3,"click"],[1,"ios-nav-overlay"],[3,"click"],[3,"value"],[1,"col-12","col-md-12",3,"click"],[1,"ux-selection","mar-custom"],[1,"ux-selection2"],["type","radio","name","upi-account",3,"value","checked","ngModel","ngModelOptions","ngModelChange"],[1,"checkmark"]],template:function(e,c){1&e&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,D,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19),r.dc(),r.dc(),r.Zb(20,"div",18),r.dc(),r.ec(21,"form",19),r.ec(22,"div",13),r.ec(23,"div",20),r.ec(24,"div",21),r.ec(25,"div",22),r.ec(26,"div",23),r.ec(27,"div",24),r.ec(28,"div",25),r.ec(29,"label",26),r.Sc(30,"From Account"),r.dc(),r.dc(),r.dc(),r.ec(31,"div",27),r.lc("click",(function(){return c.onAccountSelectType()})),r.ec(32,"div",25),r.ec(33,"select",28),r.lc("change",(function(e){return c.onAccSelect(e.target.value)})),r.Rc(34,A,3,3,"ng-container",9),r.dc(),r.ec(35,"div",29),r.Rc(36,M,2,0,"span",30),r.Rc(37,k,2,1,"span",30),r.Zb(38,"span",31),r.dc(),r.Rc(39,C,2,0,"p",32),r.dc(),r.dc(),r.ec(40,"div",24),r.ec(41,"div",25),r.ec(42,"p",33),r.ec(43,"i"),r.Sc(44,"Total Available Balance "),r.dc(),r.ec(45,"span"),r.Sc(46),r.qc(47,"customcurrency"),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(48,"div",34),r.ec(49,"button",35),r.Zb(50,"img",36),r.dc(),r.ec(51,"span",37),r.Sc(52," Last refreshed on 12th Oct 2020, 21:22"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(53,"div",38),r.ec(54,"div",13),r.ec(55,"div",20),r.ec(56,"div",39),r.ec(57,"div",40),r.ec(58,"div",13),r.ec(59,"div",41),r.ec(60,"div",13),r.ec(61,"div",42),r.ec(62,"div",43),r.ec(63,"label",44),r.Sc(64,"To Account"),r.dc(),r.ec(65,"div",45),r.ec(66,"span",46),r.ec(67,"b"),r.Sc(68),r.Zb(69,"br"),r.Sc(70),r.dc(),r.dc(),r.dc(),r.ec(71,"p",47),r.Sc(72),r.dc(),r.Zb(73,"p",48),r.dc(),r.ec(74,"div",49),r.ec(75,"label",44),r.Sc(76,"To Account"),r.dc(),r.ec(77,"div",45),r.ec(78,"span",46),r.ec(79,"b"),r.Sc(80),r.Zb(81,"br"),r.Sc(82),r.dc(),r.dc(),r.dc(),r.ec(83,"p",47),r.Sc(84),r.dc(),r.Zb(85,"p",48),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(86,"div",20),r.ec(87,"div",50),r.ec(88,"div",51),r.ec(89,"div",13),r.ec(90,"div",41),r.ec(91,"div",13),r.ec(92,"div",42),r.ec(93,"div",52),r.ec(94,"label"),r.Sc(95,"How much amount?"),r.dc(),r.Zb(96,"input",53),r.Rc(97,T,2,0,"p",32),r.Rc(98,O,2,0,"p",32),r.dc(),r.dc(),r.ec(99,"div",42),r.ec(100,"div",54),r.ec(101,"label"),r.Sc(102,"What's this for?"),r.dc(),r.Zb(103,"input",55),r.ec(104,"p",47),r.Sc(105,"Optional"),r.dc(),r.Zb(106,"p",48),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(107,"div",38),r.ec(108,"ul",56),r.ec(109,"li"),r.ec(110,"div",57),r.ec(111,"button",58),r.lc("click",(function(){return c.cancle()})),r.Sc(112,"Cancel"),r.dc(),r.dc(),r.ec(113,"div",57),r.ec(114,"button",59),r.lc("click",(function(){return c.sendMoneyLoanSubmit()})),r.Sc(115),r.qc(116,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(117,"div",60),r.ec(118,"div",61),r.ec(119,"a"),r.Zb(120,"img",62),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(121,"div",63),r.ec(122,"div",13),r.ec(123,"div",64),r.ec(124,"h4"),r.Sc(125,"Select From Account"),r.dc(),r.dc(),r.ec(126,"div",65),r.ec(127,"button",66),r.Zb(128,"img",67),r.dc(),r.dc(),r.dc(),r.ec(129,"div",13),r.ec(130,"div",12),r.ec(131,"div",13),r.Rc(132,w,6,7,"div",68),r.dc(),r.dc(),r.dc(),r.ec(133,"div",69),r.ec(134,"div",70),r.ec(135,"button",71),r.lc("click",(function(){return c.closePopup()})),r.Sc(136),r.qc(137,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(138,"div",72)),2&e&&(r.Mb(9),r.uc("ngForOf",c.DataService.breadcrumblist),r.Mb(10),r.Tc(c.DataService.payEMIHeader),r.Mb(2),r.uc("formGroup",c.sendMoneyLoanForm),r.Mb(13),r.uc("ngForOf",c.accountList),r.Mb(2),r.uc("ngIf",""==c.accountValue),r.Mb(1),r.uc("ngIf",""!=c.accountValue),r.Mb(2),r.uc("ngIf",c.sendMoneyLoanForm.controls.fromAccount.hasError("required")&&(c.sendMoneyLoanForm.controls.fromAccount.dirty||c.sendMoneyLoanForm.controls.fromAccount.touched)),r.Mb(7),r.Tc(r.rc(47,19,c.accBalance)),r.Mb(22),r.Uc("",c.DataService.loanUserDtl.accountCategory," "),r.Mb(2),r.Uc(" ",c.DataService.loanDetails.accountNo,""),r.Mb(2),r.Uc("PSB Bank, ",c.DataService.loanDetails.ifscCode,""),r.Mb(8),r.Uc("",c.DataService.loanUserDtl.accountCategory," "),r.Mb(2),r.Uc(" ",c.DataService.loanDetails.accountNo,""),r.Mb(2),r.Uc("PSB Bank, ",c.DataService.loanDetails.ifscCode,""),r.Mb(13),r.uc("ngIf",c.sendMoneyLoanForm.controls.amount.hasError("required")&&(c.sendMoneyLoanForm.controls.amount.dirty||c.sendMoneyLoanForm.controls.amount.touched)),r.Mb(1),r.uc("ngIf",c.inSufficientBalance),r.Mb(17),r.Tc(r.rc(116,21,"SUBMIT")),r.Mb(17),r.uc("ngForOf",c.accountList),r.Mb(4),r.Tc(r.rc(137,23,"SUBMIT")))},directives:[i.s,o.I,o.t,o.k,i.t,o.c,g.d,o.s,o.i,S.a,o.x,o.H,o.A,o.v],pipes:[f.a,y.a],styles:[""]}),e})()}];let R=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(c){return new(c||e)},imports:[[a.g.forChild(L)],a.g]}),e})(),x=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(c){return new(c||e)},imports:[[i.c,R,o.m,n.a,o.C]]}),e})()},Geda:function(e,c,t){"use strict";t.d(c,"a",(function(){return a}));var n=t("fXoL"),o=t("3Pt+"),i=t("au7T");let a=(()=>{class e{constructor(e,c){this.control=e,this.commonMethods=c,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const c=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=c){let e=this.control.value.substring(0,c);this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(o.r),n.Yb(i.a))},e.\u0275dir=n.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[n.Kb]}),e})()},OXpz:function(e,c,t){"use strict";t.d(c,"d",(function(){return i})),t.d(c,"b",(function(){return a})),t.d(c,"a",(function(){return s})),t.d(c,"c",(function(){return r}));var n=t("fXoL"),o=t("3Pt+");let i=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&!/^[0-9]*$/.test(this.control.value)){let e=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(o.r))},e.\u0275dir=n.Tb({type:e,selectors:[["","numbersOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[n.Kb]}),e})(),a=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&this.control.value){let e=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(o.r))},e.\u0275dir=n.Tb({type:e,selectors:[["","digitOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[n.Kb]}),e})(),s=(()=>{class e{constructor(e){this.el=e,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(e){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(e.key))return;let c=this.el.nativeElement.value;const t=this.el.nativeElement.selectionStart,n=[c.slice(0,t),"Decimal"==e.key?".":e.key,c.slice(t)].join("");n&&!String(n).match(this.regex)&&e.preventDefault()}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(n.o))},e.\u0275dir=n.Tb({type:e,selectors:[["","amountOnly",""]],hostBindings:function(e,c){1&e&&n.lc("keydown",(function(e){return c.onKeyDown(e)}))}}),e})(),r=(()=>{class e{constructor(e){this._el=e}onInputChange(e){const c=this._el.nativeElement.value;this._el.nativeElement.value=c.replace(/[^0-9]*/g,""),c!==this._el.nativeElement.value&&e.stopPropagation()}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(n.o))},e.\u0275dir=n.Tb({type:e,selectors:[["input","numericOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.onInputChange(e)}))}}),e})()}}]);