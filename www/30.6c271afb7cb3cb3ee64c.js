(window.webpackJsonp=window.webpackJsonp||[]).push([[30,65,109,349],{Geda:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var c=n("fXoL"),i=n("3Pt+"),o=n("au7T");let r=(()=>{class t{constructor(t,e){this.control=t,this.commonMethods=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){const e=+this.limitTo;if(-1===this.specialKeys.indexOf(t.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=e){let t=this.control.value.substring(0,e);this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(i.r),c.Yb(o.a))},t.\u0275dir=c.Tb({type:t,selectors:[["","limit-to",""]],hostBindings:function(t,e){1&t&&c.lc("input",(function(t){return e.ngOnChanges(t)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[c.Kb]}),t})()},OXpz:function(t,e,n){"use strict";n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return a}));var c=n("fXoL"),i=n("3Pt+");let o=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&!/^[0-9]*$/.test(this.control.value)){let t=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(i.r))},t.\u0275dir=c.Tb({type:t,selectors:[["","numbersOnly",""]],hostBindings:function(t,e){1&t&&c.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[c.Kb]}),t})(),r=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&this.control.value){let t=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(i.r))},t.\u0275dir=c.Tb({type:t,selectors:[["","digitOnly",""]],hostBindings:function(t,e){1&t&&c.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[c.Kb]}),t})(),s=(()=>{class t{constructor(t){this.el=t,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(t){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(t.key))return;let e=this.el.nativeElement.value;const n=this.el.nativeElement.selectionStart,c=[e.slice(0,n),"Decimal"==t.key?".":t.key,e.slice(n)].join("");c&&!String(c).match(this.regex)&&t.preventDefault()}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(c.o))},t.\u0275dir=c.Tb({type:t,selectors:[["","amountOnly",""]],hostBindings:function(t,e){1&t&&c.lc("keydown",(function(t){return e.onKeyDown(t)}))}}),t})(),a=(()=>{class t{constructor(t){this._el=t}onInputChange(t){const e=this._el.nativeElement.value;this._el.nativeElement.value=e.replace(/[^0-9]*/g,""),e!==this._el.nativeElement.value&&t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(c.o))},t.\u0275dir=c.Tb({type:t,selectors:[["input","numericOnly",""]],hostBindings:function(t,e){1&t&&c.lc("input",(function(t){return e.onInputChange(t)}))}}),t})()},TaOT:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var c=n("fXoL"),i=n("fUdP");let o=(()=>{class t{constructor(t){this.customCurrencyPipe=t}markFormGroupTouched(t){Object.values(t.controls).forEach(t=>{t.markAsTouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupTouched(t))})}markFormGroupUntouched(t){Object.values(t.controls).forEach(t=>{t.markAsUntouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupUntouched(t))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:t=>{let e=t;return e=e.reduce((t,n,c)=>{let i=t;return i+=n,e.length!==c+1&&(i+=", "),i},""),"These characters are not allowed: "+e}}}validateForm(t,e,n){const c=t;for(const i in e)if(i){e[i]="";const t=c.get(i),o=this.validationMessages();if(t&&!t.valid&&(!n||t.dirty||t.touched))for(const n in t.errors)console.log("======>inside",n),e[i]=n&&"invalid_characters"!==n?e[i]||o[n]:e[i]||o[n](t.errors[n])}return e}formatCurrency(t,e,n){if("0"!=t)if(""!=t){let n=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==n.trim().replace(/[^.0-9]+/g,"")?e.contains("amount")&&e.get("amount").reset():"0"==n.trim().replace(/[^.0-9]+/g,"")?e.get("amount").reset():(console.log(n),e.patchValue({amount:n}))}else e.get("amount").reset("");else e.contains("amount")&&e.get("amount").reset()}formatTransLimit(t,e){if("0"!=t)if(""!=t){let n=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==n?e.contains("transactionLimit")&&e.get("transactionLimit").reset():"0"==n.trim()?e.get("transactionLimit").reset():(console.log(n),e.patchValue({transactionLimit:n}))}else e.get("transactionLimit").reset("");else e.contains("transactionLimit")&&e.get("transactionLimit").reset()}formatDynamicCurrency(t,e){$("#"+t).val()&&"\u20b9 0.00"!=$("#"+t).val()?e.patchValue({amount:$("#"+t).val()}):e.get("amount").reset("")}deFormatValue(t,e){e.patchValue({amount:t.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(t,e,n){if("0"!=t)if(""!=t){let c=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==c?e.contains(n)&&e.get(n).reset():"0"==c.trim()?e.get(n).reset():e.controls[n].patchValue("\u20b9"+c)}else e.get(n).reset("");else e.contains(n)&&e.get(n).reset()}}return t.\u0275fac=function(e){return new(e||t)(c.ic(i.a))},t.\u0275prov=c.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},wJqP:function(t,e,n){"use strict";n.r(e),n.d(e,"StandingInstructionModule",(function(){return N}));var c=n("3Pt+"),i=n("ofXK"),o=n("tyNb"),r=n("fXoL"),s=n("EnSQ"),a=n("H9Rt"),u=n("L7Xq"),d=n("TaOT"),l=n("hZOG"),m=n("5IsW"),g=n("z17N"),h=n("OXpz"),f=n("Geda"),p=n("Eioz");function v(t,e){if(1&t){const t=r.fc();r.ec(0,"li"),r.ec(1,"a",47),r.lc("click",(function(){r.Hc(t);const n=e.$implicit;return r.pc().dataService.breadcrumroute(n.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&t){const t=e.$implicit;r.Mb(2),r.Tc(r.rc(3,1,t.currentRoute))}}function b(t,e){if(1&t&&(r.ec(0,"option",48),r.Sc(1),r.dc()),2&t){const t=e.$implicit;r.uc("value",t.accountNo),r.Mb(1),r.Tc(t.sbAccount)}}function y(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}function I(t,e){if(1&t&&(r.ec(0,"option",48),r.Sc(1),r.dc()),2&t){const t=e.$implicit;r.uc("value",t.accountNo),r.Mb(1),r.Tc(t.sbAccount)}}function S(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}function F(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"SI not possible for same account"),r.dc())}function T(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}function A(t,e){if(1&t&&(r.ec(0,"option",48),r.Sc(1),r.dc()),2&t){const t=e.$implicit;r.uc("value",t.siFreq),r.Mb(1),r.Tc(t.frequency)}}function w(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}function k(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}function q(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"Max limit reach "),r.dc())}function D(t,e){1&t&&(r.ec(0,"p",38),r.Sc(1,"This field is required"),r.dc())}const M=[{path:"",component:(()=>{class t{constructor(t,e,n,c,i,o,r,s){this.router=t,this.dataService=e,this.storage=n,this.http=c,this.formValidation=i,this.addStandingInstructionService=o,this.constant=r,this.datePipe=s,this.totalOperativeAccount=[],this.totalBorrowingAccount=[],this.totalDepositeAccount=[],this.disable=!1,this.todayDate=new Date,this.frequencyType=[{siFreq:"D",frequency:"Daily"},{siFreq:"W",frequency:"Weekly"},{siFreq:"M",frequency:"Monthly"},{siFreq:"Q",frequency:"Quarterly"},{siFreq:"H",frequency:"Half-Yearly"},{siFreq:"Y",frequency:"Yearly"}]}ngOnInit(){this.tommorow=new Date(this.todayDate.getFullYear(),this.todayDate.getMonth(),this.todayDate.getDate()+1),this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.dataService.getBreadcrumb("STANDING_INSTRUCTION",this.router.url),this.dataService.setPageSettings("STANDING_INSTRUCTION"),this.buildForm(),this.accountSelection(),console.log(this.totalBorrowingAccount),this.userDetail=this.dataService.profiledateDetails,console.log("userDetail::::::::",this.userDetail)}goToPage(t){this.router.navigateByUrl("/"+t)}accountSelection(){this.totalOperativeAccount=this.dataService.customerOperativeAccList,console.log(this.totalOperativeAccount),this.totalBorrowingAccount=this.dataService.customerBorrowingsList,this.dataService.customerMyDepostie.forEach(t=>{"RDGEN"==t.accountType&&this.totalDepositeAccount.push(t)}),this.totalAccountList=this.totalOperativeAccount.concat(this.totalBorrowingAccount.concat(this.totalDepositeAccount)),console.log("Total Account  :: ",this.totalAccountList)}buildForm(){this.standingInstructionForm=new c.j({debitAccount:new c.g("",[c.G.required]),creditAccount:new c.g("",[c.G.required]),datepicker1:new c.g("",[c.G.required]),installmentNumber:new c.g("",[c.G.required,c.G.maxLength(9999)]),paymentFrequency:new c.g("",[c.G.required]),amount:new c.g("",[c.G.required]),remarks:new c.g("")})}validateForm(){this.standingInstructionForm.invalid&&(this.standingInstructionForm.get("debitAccount").markAsTouched(),this.standingInstructionForm.get("creditAccount").markAsTouched(),this.standingInstructionForm.get("datepicker1").markAsTouched(),this.standingInstructionForm.get("installmentNumber").markAsTouched(),this.standingInstructionForm.get("amount").markAsTouched())}standingInstructionSubmit(t){if(console.log("standingInstruction"),this.standingInstructionForm.valid&&this.standingInstructionForm.value.debitAccount!=this.standingInstructionForm.value.creditAccount){this.dataService.screenType="addStandingInstruction",this.dataService.endPoint=this.constant.serviceName_ADDSTANDINGINSTRUCTION;var e=this.dataService.activitySettingData.findIndex(t=>t.ACTIVITYNAME==this.dataService.endPoint.split("/")[1]);"Y"==this.dataService.activitySettingData[e].OTPALLOWED&&(console.log("Form :: ",t),this.dataService.standingInstructionDtl=this.standingInstructionForm.value,this.dataService.standingInstructionDtl.datepicker1=this.datePipe.transform(this.dataService.standingInstructionDtl.datepicker1,"dd-MM-yyyy"),this.dataService.request=this.addStandingInstructionService.getStandingInstructionService(this.standingInstructionForm.value,"Y"),this.dataService.otpName="OTP",this.router.navigateByUrl("/standingInstructionOverview"))}else console.log("else"),this.validateForm()}cancel(){this.router.navigateByUrl("/standingInstructionList")}onDateChange(t){}formatCurrency(t){this.formValidation.formatCurrency(t,this.standingInstructionForm)}focusAmount(t){this.amountModel=t.replace(/^\\u20b9|,|\.\d*$/gm,"")}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(o.c),r.Yb(s.a),r.Yb(a.a),r.Yb(u.a),r.Yb(d.a),r.Yb(l.a),r.Yb(m.a),r.Yb(i.f))},t.\u0275cmp=r.Sb({type:t,selectors:[["app-standing-instruction"]],decls:100,vars:20,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[3,"formGroup"],[1,"col-12","col-md-12"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom"],[1,"col-sm-12","col-md-6","col-lg-4","col-xl-4","col-12"],[1,"ux-input"],["required","","formControlName","debitAccount"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","error-message",4,"ngIf"],["required","","formControlName","creditAccount"],["type","text","placeholder","DD/MM/YYYY","readonly","","formControlName","datepicker1",3,"owlDateTime","owlDateTimeTrigger","min","ngModelChange"],[3,"pickerType"],["dt1",""],[3,"ngClass","owlDateTimeTrigger"],["required","","formControlName","paymentFrequency"],["type","text","placeholder","Enter number of Payments","numbersOnly","","formControlName","installmentNumber","limit-to","9999"],["type","text","id","amt","inputmode","decimal","placeholder","\u20b9 0","autocomplete","off","formControlName","amount","limit-to","12","data-a-sign","Rs.",3,"ngModel","blur","focus","ngModelChange"],["type","text","formControlName","remarks","placeholder","Enter Remarks"],[1,"error-message"],[1,"bottom-footer1"],[1,"btn-div"],["type","submit",1,"ux-button","secondary","sm-mob",3,"click"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[3,"value"]],template:function(t,e){if(1&t&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,v,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19,"Add Standing Instructions"),r.dc(),r.dc(),r.Zb(20,"div",18),r.dc(),r.ec(21,"form",19),r.ec(22,"div",13),r.ec(23,"div",20),r.ec(24,"div",21),r.ec(25,"div",22),r.ec(26,"div",13),r.ec(27,"div",23),r.ec(28,"div",24),r.ec(29,"label"),r.Sc(30,"From Account"),r.dc(),r.ec(31,"select",25),r.ec(32,"option",26),r.Sc(33,"Select Account"),r.dc(),r.Rc(34,b,2,2,"option",27),r.dc(),r.Rc(35,y,2,0,"p",28),r.dc(),r.dc(),r.ec(36,"div",23),r.ec(37,"div",24),r.ec(38,"label"),r.Sc(39,"Credit Account"),r.dc(),r.ec(40,"select",29),r.ec(41,"option",26),r.Sc(42,"Select Account"),r.dc(),r.Rc(43,I,2,2,"option",27),r.dc(),r.Rc(44,S,2,0,"p",28),r.Rc(45,F,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.ec(46,"div",13),r.ec(47,"div",23),r.ec(48,"div",24),r.ec(49,"label"),r.Sc(50," Next Execution Date"),r.dc(),r.ec(51,"input",30),r.lc("ngModelChange",(function(t){return e.onDateChange(t)})),r.dc(),r.Zb(52,"owl-date-time",31,32),r.Zb(54,"em",33),r.Rc(55,T,2,0,"p",28),r.dc(),r.dc(),r.ec(56,"div",23),r.ec(57,"div",24),r.ec(58,"label"),r.Sc(59,"Payment Frequency"),r.dc(),r.ec(60,"select",34),r.ec(61,"option",26),r.Sc(62,"Select Frequecy"),r.dc(),r.Rc(63,A,2,2,"option",27),r.dc(),r.Rc(64,w,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.ec(65,"div",13),r.ec(66,"div",23),r.ec(67,"div",24),r.ec(68,"label"),r.Sc(69,"Total Number of Payments"),r.dc(),r.Zb(70,"input",35),r.Rc(71,k,2,0,"p",28),r.Rc(72,q,2,0,"p",28),r.dc(),r.dc(),r.ec(73,"div",23),r.ec(74,"div",24),r.ec(75,"label"),r.Sc(76,"Amount"),r.dc(),r.ec(77,"input",36),r.lc("blur",(function(t){return e.formatCurrency(t.target.value)}))("focus",(function(){return e.focusAmount(e.amountModel)}))("ngModelChange",(function(t){return e.amountModel=t})),r.dc(),r.Rc(78,D,2,0,"p",28),r.dc(),r.dc(),r.dc(),r.ec(79,"div",13),r.ec(80,"div",23),r.ec(81,"div",24),r.ec(82,"label"),r.Sc(83,"Remarks"),r.dc(),r.Zb(84,"input",37),r.Zb(85,"p",38),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(86,"div",20),r.ec(87,"ul",39),r.ec(88,"li"),r.ec(89,"div",40),r.ec(90,"button",41),r.lc("click",(function(){return e.cancel()})),r.Sc(91,"Cancel"),r.dc(),r.dc(),r.ec(92,"div",40),r.ec(93,"button",42),r.lc("click",(function(){return e.standingInstructionSubmit(e.standingInstructionForm.value)})),r.Sc(94,"Submit"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(95,"div",43),r.ec(96,"div",44),r.ec(97,"a"),r.Zb(98,"img",45),r.dc(),r.dc(),r.Zb(99,"div",46),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&t){const t=r.Ec(53);r.Mb(9),r.uc("ngForOf",e.dataService.breadcrumblist),r.Mb(12),r.uc("formGroup",e.standingInstructionForm),r.Mb(13),r.uc("ngForOf",e.totalOperativeAccount),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.debitAccount.hasError("required")&&(e.standingInstructionForm.controls.debitAccount.dirty||e.standingInstructionForm.controls.debitAccount.touched)),r.Mb(8),r.uc("ngForOf",e.totalAccountList),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.creditAccount.hasError("required")&&(e.standingInstructionForm.controls.creditAccount.dirty||e.standingInstructionForm.controls.creditAccount.touched)),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.value.debitAccount==e.standingInstructionForm.value.creditAccount&&(e.standingInstructionForm.controls.creditAccount.dirty||e.standingInstructionForm.controls.creditAccount.touched)),r.Mb(6),r.uc("owlDateTime",t)("owlDateTimeTrigger",t)("min",e.tommorow),r.Mb(1),r.uc("pickerType","calendar"),r.Mb(2),r.uc("ngClass",1==e.disable?"calendar-disable":"calendar-enable")("owlDateTimeTrigger",t),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.datepicker1.hasError("required")&&(e.standingInstructionForm.controls.datepicker1.dirty||e.standingInstructionForm.controls.datepicker1.touched)),r.Mb(8),r.uc("ngForOf",e.frequencyType),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.paymentFrequency.hasError("required")&&(e.standingInstructionForm.controls.paymentFrequency.dirty||e.standingInstructionForm.controls.paymentFrequency.touched)),r.Mb(7),r.uc("ngIf",e.standingInstructionForm.controls.installmentNumber.hasError("required")&&(e.standingInstructionForm.controls.installmentNumber.dirty||e.standingInstructionForm.controls.installmentNumber.touched)),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.installmentNumber.hasError("maxlength")&&(e.standingInstructionForm.controls.installmentNumber.dirty||e.standingInstructionForm.controls.installmentNumber.touched)),r.Mb(5),r.uc("ngModel",e.amountModel),r.Mb(1),r.uc("ngIf",e.standingInstructionForm.controls.amount.hasError("required")&&(e.standingInstructionForm.controls.amount.dirty||e.standingInstructionForm.controls.amount.touched))}},directives:[i.s,c.I,c.t,c.k,c.E,c.D,c.s,c.i,c.x,c.H,i.t,c.c,g.c,g.e,g.b,i.q,h.d,f.a],pipes:[p.a],styles:[""]}),t})()}];let O=(()=>{class t{}return t.\u0275mod=r.Wb({type:t}),t.\u0275inj=r.Vb({factory:function(e){return new(e||t)},imports:[[o.g.forChild(M)],o.g]}),t})();var C=n("PCNd");let N=(()=>{class t{}return t.\u0275mod=r.Wb({type:t}),t.\u0275inj=r.Vb({factory:function(e){return new(e||t)},imports:[[i.c,O,c.m,c.C,C.a,g.d,g.f]]}),t})()}}]);