(window.webpackJsonp=window.webpackJsonp||[]).push([[77,349],{Geda:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var s=r("fXoL"),a=r("3Pt+"),i=r("au7T");let c=(()=>{class e{constructor(e,t){this.control=e,this.commonMethods=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const t=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=t){let e=this.control.value.substring(0,t);this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(s.Yb(a.r),s.Yb(i.a))},e.\u0275dir=s.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,t){1&e&&s.lc("input",(function(e){return t.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[s.Kb]}),e})()},TaOT:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var s=r("fXoL"),a=r("fUdP");let i=(()=>{class e{constructor(e){this.customCurrencyPipe=e}markFormGroupTouched(e){Object.values(e.controls).forEach(e=>{e.markAsTouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupTouched(e))})}markFormGroupUntouched(e){Object.values(e.controls).forEach(e=>{e.markAsUntouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupUntouched(e))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:e=>{let t=e;return t=t.reduce((e,r,s)=>{let a=e;return a+=r,t.length!==s+1&&(a+=", "),a},""),"These characters are not allowed: "+t}}}validateForm(e,t,r){const s=e;for(const a in t)if(a){t[a]="";const e=s.get(a),i=this.validationMessages();if(e&&!e.valid&&(!r||e.dirty||e.touched))for(const r in e.errors)console.log("======>inside",r),t[a]=r&&"invalid_characters"!==r?t[a]||i[r]:t[a]||i[r](e.errors[r])}return t}formatCurrency(e,t,r){if("0"!=e)if(""!=e){let r=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==r.trim().replace(/[^.0-9]+/g,"")?t.contains("amount")&&t.get("amount").reset():"0"==r.trim().replace(/[^.0-9]+/g,"")?t.get("amount").reset():(console.log(r),t.patchValue({amount:r}))}else t.get("amount").reset("");else t.contains("amount")&&t.get("amount").reset()}formatTransLimit(e,t){if("0"!=e)if(""!=e){let r=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==r?t.contains("transactionLimit")&&t.get("transactionLimit").reset():"0"==r.trim()?t.get("transactionLimit").reset():(console.log(r),t.patchValue({transactionLimit:r}))}else t.get("transactionLimit").reset("");else t.contains("transactionLimit")&&t.get("transactionLimit").reset()}formatDynamicCurrency(e,t){$("#"+e).val()&&"\u20b9 0.00"!=$("#"+e).val()?t.patchValue({amount:$("#"+e).val()}):t.get("amount").reset("")}deFormatValue(e,t){t.patchValue({amount:e.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(e,t,r){if("0"!=e)if(""!=e){let s=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==s?t.contains(r)&&t.get(r).reset():"0"==s.trim()?t.get(r).reset():t.controls[r].patchValue("\u20b9"+s)}else t.get(r).reset("");else t.contains(r)&&t.get(r).reset()}}return e.\u0275fac=function(t){return new(t||e)(s.ic(a.a))},e.\u0275prov=s.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},pdUo:function(e,t,r){"use strict";r.r(t),r.d(t,"SelfTransferPaymentModule",(function(){return k}));var s=r("ofXK"),a=r("tyNb"),i=r("3Pt+"),c=r("wd/R"),o=r("XNiG"),n=r("fXoL"),l=r("EnSQ"),d=r("Eioz"),m=r("fUdP"),u=r("TaOT"),f=r("oBZJ"),h=r("yYv+"),p=r("H9Rt"),v=r("5IsW"),b=r("L7Xq"),A=r("TiA8"),S=r("Ygbc"),y=r("4bKs"),T=r("Geda"),g=r("RZqO");function D(e,t){1&e&&(n.ec(0,"p",26),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_AMOUNT_ERROR")," "))}function N(e,t){1&e&&(n.ec(0,"p",26),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_AMOUNT_ERROR")," "))}function R(e,t){1&e&&(n.ec(0,"p",26),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_NUMBER_ERROR"),""))}function O(e,t){1&e&&(n.ec(0,"p",26),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_SPECIAL_CHARACTOR_ERROR"),""))}function M(e,t){1&e&&(n.ec(0,"span",41),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e&&(n.Mb(1),n.Tc(n.rc(2,1,"UPI_PIN_IS_NOT_SET_FOR_THIS_ACCOUNT")))}const w=[{path:"",component:(()=>{class e{constructor(e,t,r,s,a,i,o,n,l,d,m,u,f,h){this.DataService=e,this.router=t,this.translate=r,this.customCurrencyPipe=s,this.formValidation=a,this.pluginService=i,this.selfTransferPaymentService=o,this.localStorage=n,this.constant=l,this.http=d,this.npciAndroidService=m,this.npciIosService=u,this.loaderService=f,this.location=h,this.currentDate=c().format("YYYY-MM-DD"),this.currentTime=c.duration(c().format("HH:mm"),"minutes"),this.headerdata={headerType:"CloseNewHeader",titleName:"Self Transfer",footertype:"none"}}ngOnInit(){$("#amt").autoNumeric("init",{aSign:"\u20b9 "}),history.pushState({},"payUpi",this.location.prepareExternalUrl("payUpi")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.DataService.changeMessage(this.headerdata),createGlobalNavMore(),this.selfTransferAmtForm=new i.j({amount:new i.g("",[i.G.required,i.G.pattern(/(^[0-9.\u20b9, ]*$)/)]),remarks:new i.g("",[i.G.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)])}),this.DataService.upiPayModelObj.remark&&this.selfTransferAmtForm.get("remarks").setValue(this.DataService.upiPayModelObj.remark),this.DataService.upiPayModelObj.txnAmount&&(this.selfTransferAmtForm.get("amount").setValue(this.DataService.upiPayModelObj.txnAmount),this.formatCurrency(this.DataService.upiPayModelObj.txnAmount)),this.depositAct=this.DataService.selfTransferActList.depositAct,console.log("depositAct => ",this.depositAct),this.transferAct=this.DataService.selfTransferActList.transferAct,console.log("tansferAct => ",this.transferAct),this.mbebaFlag=this.transferAct.mbeba}formatCurrency(e){this.formValidation.formatDynamicCurrency("amt",this.selfTransferAmtForm)}onFocus(e){this.formValidation.deFormatValue(e,this.selfTransferAmtForm)}onClickTransferNow(){this.formValidation.markFormGroupTouched(this.selfTransferAmtForm),this.selfTransferAmtForm.valid&&(this.DataService.upiPayModelObj.payerAddr=this.transferAct.paymentAddress,this.DataService.upiPayModelObj.payeeAddr=this.depositAct.accNum+"@"+this.depositAct.ifsc+".ifsc.npci",this.DataService.upiPayModelObj.txnAmount=this.selfTransferAmtForm.value.amount.trim().replace(/[^.0-9]+/g,""),this.DataService.upiPayModelObj.payeeName=this.depositAct.custName?this.depositAct.custName:"",this.DataService.upiPayModelObj.payeeAccount=this.depositAct.accNum,this.DataService.upiPayModelObj.payeeIfsc=this.depositAct.ifsc?this.depositAct.ifsc:"",this.DataService.upiPayModelObj.remark=this.selfTransferAmtForm.value.remarks?this.selfTransferAmtForm.value.remarks:"",this.DataService.selectedFlow=this.constant.val_npci_upiPayVpa,this.DataService.upiBenfAccNo=this.depositAct.accNum,this.DataService.upiBenfIfsc=this.depositAct.ifsc?this.depositAct.ifsc:"",this.transferAct.ifsc.includes("PSIB")?(this.DataService.preApprovedFlowIdentifier="selfTransfer",this.DataService.preApprovedPreviousPageUrl=this.router.url,this.DataService.preApprovedBankName=this.transferAct.bankName,this.DataService.preApprovedAccNo=this.transferAct.maskedAccountNumber,this.DataService.preApprovedAmount=this.DataService.upiPayModelObj.txnAmount,this.selfTransferPaymentService.formValues=this.selfTransferAmtForm.value,this.selfTransferPaymentService.depositAccount=this.depositAct,this.selfTransferPaymentService.transferAccount=this.transferAct,this.router.navigateByUrl("/transactionPin")):this.callNpciLibrary(this.transferAct,this.DataService.selectedFlow))}callNpciLibrary(e,t){if(console.log("calling npci library..."),this.loaderService.showLoader(),window.hasOwnProperty("cordova"))if(this.DataService.platform.toLowerCase()==this.constant.val_android){console.log("Calling NPCI Android service..."),this.npciAndroidService.initData(),this.npciAndroidService.selectedFlow=t;let r=new o.a;this.npciAndroidService.getTransactionId().subscribe(e=>{this.npciAndroidService.transactionId=e,this.DataService.payReceiptTransId=e}),this.npciAndroidService.androidStartCLLibrary(e,this.constant.val_npci_flow_sendMoney_android,r).subscribe(e=>{console.log("Android StartCLLibrary Success => ",e),e.hasOwnProperty("status")&&"00"==e.status&&this.slfTrnsAmount(e)},e=>{console.log("Android StartCLLibrary error => ",e)})}else if(this.DataService.platform.toLowerCase()==this.constant.val_ios){console.log("Calling NPCI iOS service..."),this.npciIosService.initData(),this.npciIosService.selectedFlow=t;let r=new o.a;this.npciIosService.getTransactionId().subscribe(t=>{console.log("transactionId Received => ",t),this.npciIosService.txnId=t,this.npciIosService.iosStartCLLibrary(e,this.constant.val_npci_flow_sendMoney_ios,r).subscribe(e=>{console.log("iOS StartCLLibrary Success => ",e),e&&e.credkey?this.slfTrnsAmount(e):console.log("NPCI Flow cancelled...")},e=>{console.log("iOS StartCLLibrary error => ",e)})})}else console.log("unknown platform = ",this.DataService.platform);else console.log("Cordova not available... unable to start NPCI Library on web")}slfTrnsAmount(e){if(this.formValidation.markFormGroupTouched(this.selfTransferAmtForm),this.selfTransferAmtForm.valid){var t=c().format("YYYY-MM-DD"),r=c.duration(c().format("HH:mm"),"minutes"),s=c.duration(c(this.DataService.selfTransferRequest.time).format("HH:mm"),"minutes"),a=c(this.DataService.selfTransferRequest.date).format("YYYY-MM-DD"),i=c(a).diff(t,"minutes"),o=c.duration(s,"minutes").subtract(r).minutes();this.DataService.selfTransferRequest.expiryTime=(i+o).toString(),console.log("this.transferAct => ",this.transferAct);var n=this.selfTransferPaymentService.setSelfTransferRequest(this.selfTransferAmtForm.value,this.depositAct,this.transferAct,e);this.UpiApiCall(n)}}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if(this.DataService.upiCallTransactionHistoryApi=!0,"00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_FUNDSTRANSFER:this.setDetails(t),this.DataService.routeWithNgZone("selfTransferSuccess")}else this.setDetails(t),this.DataService.routeWithNgZone("selfTransferSuccess")},e=>{console.log("ERROR!",e)})}setDetails(e){this.DataService.selfTransReceiptObj=e;let{remarks:t,amount:r}=this.selfTransferAmtForm.value;this.DataService.selfTransReceiptObj.remarks=t,this.DataService.selfTransReceiptObj.amount=r,this.DataService.selfTransReceiptObj.payerName=this.transferAct.custName,this.DataService.selfTransReceiptObj.payeeName=this.depositAct.custName,this.DataService.selfTransReceiptObj.payeeAccType=this.depositAct.accType,this.DataService.selfTransReceiptObj.payeeMaskedAccountNumber=this.depositAct.maskedAccountNumber,this.DataService.selfTransReceiptObj.payeePaymentAddress=this.depositAct.paymentAddress?this.depositAct.paymentAddress:"",this.DataService.selfTransReceiptObj.payeeBankName=this.depositAct.bankName,this.DataService.selfTransReceiptObj.payeeIfsc=this.depositAct.ifsc,this.DataService.selfTransReceiptObj.payeeActNo=this.depositAct.accNum,this.DataService.selfTransReceiptObj.payerPaymentAddress=this.transferAct.paymentAddress?this.transferAct.paymentAddress:"",this.DataService.selfTransReceiptObj.payReceiptTransId=this.DataService.payReceiptTransId,this.DataService.selfTransReceiptObj.payerAccType=this.transferAct.accType,this.DataService.selfTransReceiptObj.payerMaskedAccountNumber=this.transferAct.maskedAccountNumber}getSelectedVpaAccountDetails(){let e=this.transferAct.PaymentAddress.find(e=>"Y"==e.isDefaultVpa);if(e)return e}getSelectedAccountNoByVpa(e){if(e.length>0)return e.find(e=>1==e.isSelected)}showCommonToastMsgWithKey(e,t){showToastMessage(this.translate.transform(e),t)}onTransferClick(){this.router.navigateByUrl("/payUpiSuccess")}}return e.\u0275fac=function(t){return new(t||e)(n.Yb(l.a),n.Yb(a.c),n.Yb(d.a),n.Yb(m.a),n.Yb(u.a),n.Yb(f.a),n.Yb(h.a),n.Yb(p.a),n.Yb(v.a),n.Yb(b.a),n.Yb(A.a),n.Yb(S.a),n.Yb(y.a),n.Yb(s.n))},e.\u0275cmp=n.Sb({type:e,selectors:[["app-self-transfer-payment"]],decls:77,vars:33,consts:[[1,"main","main-bg2"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"vspacer5","d-sm-block","d-none"],[1,"container-fluid"],[3,"formGroup"],[1,"row"],[1,"bg-section2"],[1,"col-12"],[1,"row1"],[1,"payee-info1"],[1,"info-inner"],[1,"info-lft"],[1,"yellow"],[1,"info-center"],["src","assets/images/svg/double-right-arrows.svg","alt","double-right-arrows-icon"],[1,"info-rit"],[1,"col-12","col-md-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"ux-input","white-input","mar-tb"],["type","text","inputmode","decimal","placeholder","\u20b9 0","autocomplete","off","formControlName","amount","limit-to","12","id","amt","data-a-sign","Rs.",3,"blur"],["class","text-center error-message",4,"ngIf"],[1,"col-sm-5","col-5","col-md-3","m-auto"],[1,"ux-input","dark-input","mar-tb"],["type","text","formControlName","remarks","autocomplete","off","limit-to","100",3,"placeholder"],[1,"text-center","error-message"],[1,"info-bottom-container"],[1,"row1","mt-5"],[1,"col-sm-12","col-12","col-md-12","m-auto"],[1,"bottom-info"],["action","#","id","payment-form"],[1,"row1","mt-4","mb-4"],[1,"col-12","col-md-12","mt-4"],["class","fs-2","style","color: red;",4,"ngIf"],[1,"row1","mt-3"],[1,"col-12","text-center"],["type","submit",1,"ux-button","primary","submit","md",3,"disabled","click"],[1,"col-12","text-center","mt-4"],[1,"powered-logo"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"fs-2",2,"color","red"]],template:function(e,t){1&e&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.Zb(4,"div",4),n.ec(5,"div",5),n.ec(6,"form",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.ec(10,"div",10),n.ec(11,"div",11),n.ec(12,"div",7),n.ec(13,"div",12),n.ec(14,"div",13),n.ec(15,"span",14),n.ec(16,"h6"),n.Sc(17),n.qc(18,"firstLastChar"),n.dc(),n.dc(),n.dc(),n.ec(19,"div",15),n.ec(20,"a"),n.Zb(21,"img",16),n.dc(),n.dc(),n.ec(22,"div",17),n.ec(23,"span",14),n.ec(24,"h6"),n.Sc(25),n.qc(26,"firstLastChar"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(27,"div",7),n.ec(28,"div",18),n.ec(29,"h5"),n.Sc(30),n.qc(31,"translate"),n.qc(32,"translate"),n.dc(),n.ec(33,"h6"),n.Sc(34),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(35,"div",10),n.ec(36,"div",19),n.ec(37,"div",20),n.ec(38,"input",21),n.lc("blur",(function(e){return t.formatCurrency(e.target.value)})),n.dc(),n.Rc(39,D,3,3,"p",22),n.Rc(40,N,3,3,"p",22),n.Rc(41,R,3,3,"p",22),n.dc(),n.dc(),n.dc(),n.ec(42,"div",10),n.ec(43,"div",23),n.ec(44,"div",24),n.Zb(45,"input",25),n.qc(46,"translate"),n.Rc(47,O,3,3,"p",22),n.Zb(48,"p",26),n.dc(),n.dc(),n.dc(),n.ec(49,"div",27),n.ec(50,"div",28),n.ec(51,"div",29),n.ec(52,"div",30),n.ec(53,"div",10),n.ec(54,"div",9),n.ec(55,"h4"),n.Sc(56),n.qc(57,"translate"),n.dc(),n.dc(),n.dc(),n.ec(58,"form",31),n.ec(59,"div",32),n.ec(60,"div",9),n.ec(61,"h5"),n.Sc(62),n.dc(),n.ec(63,"h6"),n.Sc(64),n.dc(),n.dc(),n.dc(),n.Zb(65,"div",33),n.Rc(66,M,3,3,"span",34),n.Zb(67,"br"),n.ec(68,"div",35),n.ec(69,"div",36),n.ec(70,"button",37),n.lc("click",(function(){return t.onClickTransferNow()})),n.Sc(71),n.qc(72,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(73,"div",10),n.ec(74,"div",38),n.ec(75,"div",39),n.Zb(76,"img",40),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&e&&(n.Mb(6),n.uc("formGroup",t.selfTransferAmtForm),n.Mb(11),n.Tc(n.rc(18,19,t.transferAct.custName)),n.Mb(8),n.Tc(n.rc(26,21,t.depositAct.custName)),n.Mb(5),n.Vc("",n.rc(31,23,"DEPOSIT_TO")," ",n.rc(32,25,"SELF"),""),n.Mb(4),n.Vc("",t.depositAct.accType," ",t.depositAct.maskedAccountNumber,""),n.Mb(5),n.uc("ngIf",t.selfTransferAmtForm.controls.amount.untouched&&t.selfTransferAmtForm.controls.amount.hasError("required")),n.Mb(1),n.uc("ngIf",t.selfTransferAmtForm.controls.amount.hasError("required")&&t.selfTransferAmtForm.controls.amount.touched),n.Mb(1),n.uc("ngIf",t.selfTransferAmtForm.controls.amount.hasError("pattern")),n.Mb(4),n.vc("placeholder",n.rc(46,27,"REMARKS")),n.Mb(2),n.uc("ngIf",t.selfTransferAmtForm.controls.remarks.hasError("pattern")),n.Mb(9),n.Tc(n.rc(57,29,"FROM_ACCOUNT")),n.Mb(6),n.Tc(t.transferAct.bankName),n.Mb(2),n.Vc("",t.transferAct.accType," ",t.transferAct.maskedAccountNumber," "),n.Mb(2),n.uc("ngIf","N"==t.transferAct.mbeba),n.Mb(4),n.uc("disabled",t.selfTransferAmtForm.invalid||"N"==t.mbebaFlag),n.Mb(1),n.Tc(n.rc(72,31,"PAY_NOW")))},directives:[i.I,i.t,i.k,i.c,i.s,i.i,T.a,s.t,i.u],pipes:[g.a,d.a],styles:[""]}),e})()}];let C=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[a.g.forChild(w)],a.g]}),e})();var P=r("PCNd");let k=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[s.c,C,P.a,i.m,i.C]]}),e})()}}]);