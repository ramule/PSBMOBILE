(window.webpackJsonp=window.webpackJsonp||[]).push([[74,349],{COUL:function(t,e,c){"use strict";c.r(e),c.d(e,"ModifyMandateModule",(function(){return R}));var a=c("ofXK"),i=c("tyNb"),r=c("wd/R"),o=c("3Pt+"),n=c("fXoL"),s=c("EnSQ"),d=c("oBZJ"),l=c("goA9"),m=c("fUdP"),u=c("au7T"),p=c("TaOT"),f=c("Geda"),h=c("Eioz"),v=c("RZqO");function b(t,e){1&t&&(n.ec(0,"p",50),n.Sc(1),n.qc(2,"translate"),n.dc()),2&t&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_AMOUNT_ERROR")," "))}function g(t,e){1&t&&(n.ec(0,"p",50),n.Sc(1),n.qc(2,"translate"),n.dc()),2&t&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_NUMBER_ERROR"),""))}function y(t,e){1&t&&(n.ec(0,"p",50),n.Sc(1),n.qc(2,"translate"),n.dc()),2&t&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_SPECIAL_CHARACTOR_ERROR"),""))}function M(t,e){if(1&t){const t=n.fc();n.ec(0,"span",51),n.lc("click",(function(){return n.Hc(t),n.pc().openPopup("amount-limit-exceeded")})),n.ec(1,"a",52),n.Zb(2,"img",53),n.dc(),n.dc()}}function D(t,e){1&t&&(n.ec(0,"p",54),n.Sc(1),n.qc(2,"translate"),n.dc()),2&t&&(n.Mb(1),n.Uc(" ",n.rc(2,1,"ENTER_END_DATE")," "))}function E(t,e){if(1&t&&(n.ec(0,"li",37),n.ec(1,"div",38),n.ec(2,"div",10),n.ec(3,"div",39),n.ec(4,"div",40),n.ec(5,"h6"),n.Sc(6),n.qc(7,"translate"),n.dc(),n.ec(8,"h5"),n.Sc(9),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&t){const t=n.pc();n.Mb(6),n.Tc(n.rc(7,2,"DEBIT_DAY")),n.Mb(3),n.Tc(t.mandateDetails.recurrenceRuleType)}}const T=[{path:"",component:(()=>{class t{constructor(t,e,c,a,i,r,o,n){this.router=t,this.DataService=e,this.location=c,this.pluginService=a,this.dateFormatter=i,this.customCurrencyPipe=r,this.commonMethod=o,this.formValidation=n,this.headerdata={headerType:"CloseNewHeader",titleName:"MODIFY_MANDATE",footertype:"none"},this.isAmountLimitExceeded=!1}ngOnInit(){$("#amt").autoNumeric("init",{aSign:"\u20b9 "}),this.DataService.changeMessage(this.headerdata),this.mandateDetails=this.DataService.pendingMandateWithPayer,history.pushState({},this.DataService.upiModifyMandateCommonURL,this.location.prepareExternalUrl(this.DataService.upiModifyMandateCommonURL)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.buildForm()}buildForm(){let t=this.customCurrencyPipe.transform(this.mandateDetails.amount,"decimal").replace(/[^.0-9]+/g,"");this.modifyMandateForm=new o.j({amount:new o.g(t,[o.G.required,o.G.pattern(/(^[0-9.\u20b9, ]*$)/)]),remarks:new o.g({value:this.mandateDetails.remarks,disabled:!0},[o.G.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),startDate:new o.g({value:this.dateFormatter.transform(this.mandateDetails.validityStart),disabled:!0},[o.G.required]),endDate:new o.g(this.mandateDetails.validityEnd?this.dateFormatter.transform(this.mandateDetails.validityEnd):"",[o.G.required])}),this.minDate=r(this.dateFormatter.transform(this.mandateDetails.validityStart),"DD/MM/YYYY").toDate(),this.maxDate=r(this.dateFormatter.transform(this.mandateDetails.validityStart),"DD/MM/YYYY").add(90,"days").toDate()}goToPage(t){let{amount:e,endDate:c}=this.modifyMandateForm.value;this.DataService.modifyMandateDetails.amount=e.replace(/[^.0-9]+/g,""),this.DataService.modifyMandateDetails.validyEndDate=c,this.router.navigateByUrl("/"+t)}openDatePicker(){var t;t=this.mandateDetails.validityEnd?r(this.dateFormatter.transform(this.mandateDetails.validityEnd),"DD/MM/YYYY").toDate():new Date,this.pluginService.openDatePicker("date",t,this.minDate,this.maxDate).subscribe(t=>{this.modifyMandateForm.controls.endDate.setValue(r(t).format("DD/MM/YYYY"))})}formatCurrency(t){let e=$("#amt").val().replace(/[^.0-9]+/g,"");this.isAmountLimitExceeded=Number(e)>2e3,this.formValidation.formatDynamicCurrency("amt",this.modifyMandateForm)}openPopup(t){this.commonMethod.openPopup("div.popup-bottom."+t)}closePopup(t){this.commonMethod.closePopup("div.popup-bottom."+t)}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(i.c),n.Yb(s.a),n.Yb(a.n),n.Yb(d.a),n.Yb(l.b),n.Yb(m.a),n.Yb(u.a),n.Yb(p.a))},t.\u0275cmp=n.Sb({type:t,selectors:[["app-modify-mandate"]],decls:94,vars:41,consts:[[1,"main","main-bg2"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"vspacer5","d-sm-block","d-none"],[1,"container-fluid"],["id","request-form",3,"formGroup","ngSubmit"],[1,"row"],[1,"bg-section2"],[1,"col-12"],[1,"row1"],[1,"col-sm-5","col-8","col-md-3","m-auto"],[1,"ux-input","white-input","mar-tb"],["type","text","inputmode","decimal","placeholder","\u20b9 0","autocomplete","off","formControlName","amount","limit-to","12","id","amt","data-a-sign","Rs.",3,"blur"],["class","text-center error-message",4,"ngIf"],[1,"col-sm-5","col-5","col-md-3","m-auto"],[1,"ux-input","dark-input","mar-tb"],["type","text","formControlName","remarks","autocomplete","off","limit-to","100",3,"placeholder"],[1,"info-bottom-container"],[1,"row1","mt-5"],[1,"col-sm-12","col-12","col-md-12","m-auto"],[1,"bottom-info"],[1,"payee-info"],[1,"info-lft"],[1,"green1"],[1,"info-rit"],["class","small-icons",3,"click",4,"ngIf"],[1,"col-6","col-md-6"],[1,"ux-input","ux-disabled","pb-0"],["type","text","formControlName","startDate","placeholder","DD/MM/YYYY",1,"datepicker1"],[1,"calendar-ic","cal-top"],[1,"mb0"],[1,"ux-input","ux-readonly","pb-0"],["type","text","formControlName","endDate","placeholder","DD/MM/YYYY","readonly","",1,"datepicker1",3,"click"],["class","error-message",4,"ngIf"],[1,"calendar-ic","cal-top",3,"click"],[1,"complaint-list"],[1,"bor-n","pad-custom"],[1,"full-container"],[1,"col-12","col-md-12"],[1,"left-info"],["class","bor-n pad-custom",4,"ngIf"],[1,"row1","mt-2"],[1,"col-12","text-center"],["type","submit",1,"ux-button","primary","md",3,"disabled"],[1,"popup-bottom","amount-limit-exceeded"],[1,"text-center"],["src","./assets/images/svg/information.svg","alt","information-icon"],[1,"mb-0"],[1,"ux-button","primary","md",3,"click"],[1,"text-center","error-message"],[1,"small-icons",3,"click"],[1,"info-btn"],["src","assets/images/svg/question.svg","alt","question-icon"],[1,"error-message"]],template:function(t,e){1&t&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.Zb(4,"div",4),n.ec(5,"div",5),n.ec(6,"form",6),n.lc("ngSubmit",(function(){return e.goToPage("modifyMandateConfirmation")})),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.ec(10,"div",10),n.ec(11,"div",11),n.ec(12,"div",12),n.ec(13,"input",13),n.lc("blur",(function(t){return e.formatCurrency(t.target.value)})),n.dc(),n.Rc(14,b,3,3,"p",14),n.Rc(15,g,3,3,"p",14),n.dc(),n.dc(),n.dc(),n.ec(16,"div",10),n.ec(17,"div",15),n.ec(18,"div",16),n.Zb(19,"input",17),n.qc(20,"translate"),n.Rc(21,y,3,3,"p",14),n.dc(),n.dc(),n.dc(),n.ec(22,"div",18),n.ec(23,"div",19),n.ec(24,"div",20),n.ec(25,"div",21),n.ec(26,"div",10),n.ec(27,"div",9),n.ec(28,"div",22),n.ec(29,"div",23),n.ec(30,"span",24),n.ec(31,"h6"),n.Sc(32),n.qc(33,"firstLastChar"),n.dc(),n.dc(),n.dc(),n.ec(34,"div",25),n.ec(35,"h5"),n.Sc(36),n.dc(),n.ec(37,"h6"),n.Sc(38),n.qc(39,"translate"),n.dc(),n.Rc(40,M,3,0,"span",26),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(41,"div",10),n.ec(42,"div",27),n.ec(43,"div",28),n.ec(44,"label"),n.Sc(45),n.qc(46,"translate"),n.dc(),n.Zb(47,"input",29),n.Zb(48,"em",30),n.Zb(49,"p",31),n.dc(),n.dc(),n.ec(50,"div",27),n.ec(51,"div",32),n.ec(52,"label"),n.Sc(53),n.qc(54,"translate"),n.dc(),n.ec(55,"input",33),n.lc("click",(function(){return e.openDatePicker()})),n.dc(),n.Rc(56,D,3,3,"p",34),n.ec(57,"em",35),n.lc("click",(function(){return e.openDatePicker()})),n.dc(),n.Zb(58,"p",31),n.dc(),n.dc(),n.dc(),n.ec(59,"div",10),n.ec(60,"ul",36),n.ec(61,"li",37),n.ec(62,"div",38),n.ec(63,"div",10),n.ec(64,"div",39),n.ec(65,"div",40),n.ec(66,"h6"),n.Sc(67),n.qc(68,"translate"),n.dc(),n.ec(69,"h5"),n.Sc(70),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.Rc(71,E,10,4,"li",41),n.dc(),n.dc(),n.ec(72,"div",42),n.ec(73,"div",43),n.ec(74,"button",44),n.Sc(75),n.qc(76,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(77,"div",45),n.ec(78,"div",7),n.ec(79,"div",9),n.ec(80,"h4",46),n.Zb(81,"img",47),n.Sc(82),n.qc(83,"translate"),n.dc(),n.dc(),n.dc(),n.ec(84,"div",7),n.ec(85,"div",9),n.ec(86,"p",48),n.Sc(87),n.qc(88,"translate"),n.dc(),n.dc(),n.dc(),n.ec(89,"div",42),n.ec(90,"div",43),n.ec(91,"button",49),n.lc("click",(function(){return e.closePopup("amount-limit-exceeded")})),n.Sc(92),n.qc(93,"translate"),n.dc(),n.dc(),n.dc(),n.dc()),2&t&&(n.Mb(6),n.uc("formGroup",e.modifyMandateForm),n.Mb(8),n.uc("ngIf",e.modifyMandateForm.controls.amount.hasError("required")&&e.modifyMandateForm.controls.amount.touched),n.Mb(1),n.uc("ngIf",e.modifyMandateForm.controls.amount.hasError("pattern")),n.Mb(4),n.vc("placeholder",n.rc(20,21,"REMARKS")),n.Mb(2),n.uc("ngIf",e.modifyMandateForm.controls.remarks.hasError("pattern")),n.Mb(11),n.Tc(n.rc(33,23,e.mandateDetails.payerName)),n.Mb(4),n.Tc(e.mandateDetails.payerName),n.Mb(2),n.Vc("",n.rc(39,25,"UPI_ID")," : ",e.mandateDetails.payerAddress,""),n.Mb(2),n.uc("ngIf",e.isAmountLimitExceeded),n.Mb(5),n.Tc(n.rc(46,27,"START_DATE")),n.Mb(8),n.Tc(n.rc(54,29,"END_DATE")),n.Mb(3),n.uc("ngIf",e.modifyMandateForm.controls.endDate.hasError("required")&&e.modifyMandateForm.controls.endDate.touched),n.Mb(11),n.Tc(n.rc(68,31,"FREQUENCY")),n.Mb(3),n.Tc(e.mandateDetails.frequency),n.Mb(1),n.uc("ngIf","ONETIME"!=e.mandateDetails.frequency&&"DAILY"!=e.mandateDetails.frequency&&"ASPRESENTED"!=e.mandateDetails.frequency),n.Mb(3),n.uc("disabled",e.modifyMandateForm.invalid),n.Mb(1),n.Tc(n.rc(76,33,"PROCEED")),n.Mb(7),n.Tc(n.rc(83,35,"INFORMATION")),n.Mb(5),n.Uc(" ",n.rc(88,37,"MANDATE_AMOUNT_EXCEEDS_MSG")," "),n.Mb(5),n.Tc(n.rc(93,39,"OK")))},directives:[o.I,o.t,o.k,o.c,o.s,o.i,f.a,a.t],pipes:[h.a,v.a],styles:[""]}),t})()}];let S=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[i.g.forChild(T)],i.g]}),t})();var Y=c("PCNd");let R=(()=>{class t{}return t.\u0275mod=n.Wb({type:t}),t.\u0275inj=n.Vb({factory:function(e){return new(e||t)},imports:[[a.c,Y.a,o.m,o.C,S]]}),t})()},Geda:function(t,e,c){"use strict";c.d(e,"a",(function(){return o}));var a=c("fXoL"),i=c("3Pt+"),r=c("au7T");let o=(()=>{class t{constructor(t,e){this.control=t,this.commonMethods=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){const e=+this.limitTo;if(-1===this.specialKeys.indexOf(t.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=e){let t=this.control.value.substring(0,e);this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(a.Yb(i.r),a.Yb(r.a))},t.\u0275dir=a.Tb({type:t,selectors:[["","limit-to",""]],hostBindings:function(t,e){1&t&&a.lc("input",(function(t){return e.ngOnChanges(t)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[a.Kb]}),t})()},TaOT:function(t,e,c){"use strict";c.d(e,"a",(function(){return r}));var a=c("fXoL"),i=c("fUdP");let r=(()=>{class t{constructor(t){this.customCurrencyPipe=t}markFormGroupTouched(t){Object.values(t.controls).forEach(t=>{t.markAsTouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupTouched(t))})}markFormGroupUntouched(t){Object.values(t.controls).forEach(t=>{t.markAsUntouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupUntouched(t))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:t=>{let e=t;return e=e.reduce((t,c,a)=>{let i=t;return i+=c,e.length!==a+1&&(i+=", "),i},""),"These characters are not allowed: "+e}}}validateForm(t,e,c){const a=t;for(const i in e)if(i){e[i]="";const t=a.get(i),r=this.validationMessages();if(t&&!t.valid&&(!c||t.dirty||t.touched))for(const c in t.errors)console.log("======>inside",c),e[i]=c&&"invalid_characters"!==c?e[i]||r[c]:e[i]||r[c](t.errors[c])}return e}formatCurrency(t,e,c){if("0"!=t)if(""!=t){let c=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==c.trim().replace(/[^.0-9]+/g,"")?e.contains("amount")&&e.get("amount").reset():"0"==c.trim().replace(/[^.0-9]+/g,"")?e.get("amount").reset():(console.log(c),e.patchValue({amount:c}))}else e.get("amount").reset("");else e.contains("amount")&&e.get("amount").reset()}formatTransLimit(t,e){if("0"!=t)if(""!=t){let c=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==c?e.contains("transactionLimit")&&e.get("transactionLimit").reset():"0"==c.trim()?e.get("transactionLimit").reset():(console.log(c),e.patchValue({transactionLimit:c}))}else e.get("transactionLimit").reset("");else e.contains("transactionLimit")&&e.get("transactionLimit").reset()}formatDynamicCurrency(t,e){$("#"+t).val()&&"\u20b9 0.00"!=$("#"+t).val()?e.patchValue({amount:$("#"+t).val()}):e.get("amount").reset("")}deFormatValue(t,e){e.patchValue({amount:t.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(t,e,c){if("0"!=t)if(""!=t){let a=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==a?e.contains(c)&&e.get(c).reset():"0"==a.trim()?e.get(c).reset():e.controls[c].patchValue("\u20b9"+a)}else e.get(c).reset("");else e.contains(c)&&e.get(c).reset()}}return t.\u0275fac=function(e){return new(e||t)(a.ic(i.a))},t.\u0275prov=a.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);