(window.webpackJsonp=window.webpackJsonp||[]).push([[75,349],{Geda:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var c=a("fXoL"),i=a("3Pt+"),r=a("au7T");let n=(()=>{class e{constructor(e,t){this.control=e,this.commonMethods=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const t=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=t){let e=this.control.value.substring(0,t);this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(c.Yb(i.r),c.Yb(r.a))},e.\u0275dir=c.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,t){1&e&&c.lc("input",(function(e){return t.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[c.Kb]}),e})()},TaOT:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var c=a("fXoL"),i=a("fUdP");let r=(()=>{class e{constructor(e){this.customCurrencyPipe=e}markFormGroupTouched(e){Object.values(e.controls).forEach(e=>{e.markAsTouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupTouched(e))})}markFormGroupUntouched(e){Object.values(e.controls).forEach(e=>{e.markAsUntouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupUntouched(e))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:e=>{let t=e;return t=t.reduce((e,a,c)=>{let i=e;return i+=a,t.length!==c+1&&(i+=", "),i},""),"These characters are not allowed: "+t}}}validateForm(e,t,a){const c=e;for(const i in t)if(i){t[i]="";const e=c.get(i),r=this.validationMessages();if(e&&!e.valid&&(!a||e.dirty||e.touched))for(const a in e.errors)console.log("======>inside",a),t[i]=a&&"invalid_characters"!==a?t[i]||r[a]:t[i]||r[a](e.errors[a])}return t}formatCurrency(e,t,a){if("0"!=e)if(""!=e){let a=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==a.trim().replace(/[^.0-9]+/g,"")?t.contains("amount")&&t.get("amount").reset():"0"==a.trim().replace(/[^.0-9]+/g,"")?t.get("amount").reset():(console.log(a),t.patchValue({amount:a}))}else t.get("amount").reset("");else t.contains("amount")&&t.get("amount").reset()}formatTransLimit(e,t){if("0"!=e)if(""!=e){let a=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==a?t.contains("transactionLimit")&&t.get("transactionLimit").reset():"0"==a.trim()?t.get("transactionLimit").reset():(console.log(a),t.patchValue({transactionLimit:a}))}else t.get("transactionLimit").reset("");else t.contains("transactionLimit")&&t.get("transactionLimit").reset()}formatDynamicCurrency(e,t){$("#"+e).val()&&"\u20b9 0.00"!=$("#"+e).val()?t.patchValue({amount:$("#"+e).val()}):t.get("amount").reset("")}deFormatValue(e,t){t.patchValue({amount:e.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(e,t,a){if("0"!=e)if(""!=e){let c=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==c?t.contains(a)&&t.get(a).reset():"0"==c.trim()?t.get(a).reset():t.controls[a].patchValue("\u20b9"+c)}else t.get(a).reset("");else t.contains(a)&&t.get(a).reset()}}return e.\u0275fac=function(t){return new(t||e)(c.ic(i.a))},e.\u0275prov=c.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},sWN7:function(e,t,a){"use strict";a.r(t),a.d(t,"RequestMandatePaymentModule",(function(){return C}));var c=a("ofXK"),i=a("tyNb"),r=a("3Pt+"),n=a("wd/R"),s=a("dQiF"),o=a("fXoL"),d=a("EnSQ"),u=a("L7Xq"),l=a("5IsW"),m=a("H9Rt"),p=a("fUdP"),h=a("au7T"),D=a("oBZJ"),v=a("TaOT"),f=a("Geda"),b=a("Eioz"),M=a("RZqO");function g(e,t){1&e&&(o.ec(0,"p",52),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_AMOUNT_ERROR")," "))}function q(e,t){1&e&&(o.ec(0,"p",52),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_NUMBER_ERROR"),""))}function S(e,t){1&e&&(o.ec(0,"p",52),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_SPECIAL_CHARACTOR_ERROR"),""))}function y(e,t){if(1&e){const e=o.fc();o.ec(0,"span",53),o.lc("click",(function(){return o.Hc(e),o.pc().openPopup("div.popup-bottom.information1")})),o.ec(1,"a",54),o.Zb(2,"img",55),o.dc(),o.dc()}}function E(e,t){1&e&&(o.ec(0,"p",56),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_START_DATE")," "))}function O(e,t){1&e&&(o.ec(0,"p",56),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_END_DATE")," "))}function T(e,t){if(1&e&&(o.ec(0,"option",57),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e){const e=t.$implicit;o.uc("value",e.name),o.Mb(1),o.Uc(" ",o.rc(2,2,e.frequencyName)," ")}}function F(e,t){1&e&&(o.ec(0,"p",56),o.Sc(1),o.qc(2,"translate"),o.dc()),2&e&&(o.Mb(1),o.Uc(" ",o.rc(2,1,"ENTER_FREQ_ERROR")," "))}function Y(e,t){1&e&&(o.ec(0,"div",9),o.ec(1,"div",28),o.ec(2,"label"),o.Sc(3),o.qc(4,"translate"),o.dc(),o.dc(),o.dc()),2&e&&(o.Mb(3),o.Tc(o.rc(4,1,"DEBIT_DAY")))}function R(e,t){if(1&e&&(o.ec(0,"div",60),o.ec(1,"div",61),o.ec(2,"label",62),o.Sc(3),o.qc(4,"translate"),o.Zb(5,"input",63),o.Zb(6,"span",64),o.dc(),o.Zb(7,"div"),o.dc(),o.dc()),2&e){const e=t.$implicit;o.Mb(3),o.Uc("",o.rc(4,2,e.debitName)," "),o.Mb(2),o.uc("value",e.value)}}function A(e,t){if(1&e&&(o.ec(0,"div",58),o.ec(1,"div",10),o.Rc(2,R,8,4,"div",59),o.dc(),o.dc()),2&e){const e=o.pc();o.Mb(2),o.uc("ngForOf",e.debitDayList)}}function k(e,t){if(1&e){const e=o.fc();o.ec(0,"div",68),o.ec(1,"div",69),o.ec(2,"h5"),o.Sc(3),o.qc(4,"translate"),o.dc(),o.ec(5,"h6"),o.Sc(6),o.dc(),o.ec(7,"em"),o.Sc(8),o.dc(),o.Zb(9,"br"),o.dc(),o.ec(10,"div",70),o.ec(11,"div"),o.ec(12,"a",71),o.lc("click",(function(){return o.Hc(e),o.pc(4).goToPage("mandateUpiIdList")})),o.Sc(13),o.qc(14,"translate"),o.dc(),o.dc(),o.dc(),o.dc()}if(2&e){const e=t.$implicit,a=o.pc(2).$implicit;o.uc("hidden",!(null!=e&&e.isSelected)),o.Mb(3),o.Vc("",o.rc(4,7,"UPI_ID")," : ",a.paymentAddress,""),o.Mb(3),o.Vc("",e.accType," ",e.maskedAccountNumber,""),o.Mb(2),o.Tc(e.bankName),o.Mb(5),o.Tc(o.rc(14,9,"CHANGE_AC"))}}function N(e,t){if(1&e&&(o.ec(0,"div"),o.Rc(1,k,15,11,"div",67),o.dc()),2&e){const e=o.pc().$implicit;o.Mb(1),o.uc("ngForOf",e.accounts)}}function P(e,t){if(1&e&&(o.ec(0,"div",66),o.ec(1,"div",10),o.ec(2,"div",9),o.ec(3,"h4"),o.Sc(4),o.qc(5,"translate"),o.dc(),o.dc(),o.dc(),o.Rc(6,N,2,1,"div",41),o.dc()),2&e){const e=t.$implicit;o.uc("hidden",!(null!=e&&e.isSelected)),o.Mb(4),o.Tc(o.rc(5,3,"FROM_UPI_ID")),o.Mb(2),o.uc("ngIf",e.isSelected)}}function I(e,t){if(1&e&&(o.ec(0,"div"),o.Rc(1,P,7,5,"div",65),o.dc()),2&e){const e=o.pc();o.Mb(1),o.uc("ngForOf",e.DataService.upiMandateVpaList)}}const L=[{path:"",component:(()=>{class e{constructor(e,t,a,c,i,r,n,s,o,d,u,l){this.router=e,this.DataService=t,this.http=a,this.constant=c,this.localStorage=i,this.customCurrencyPipe=r,this.commonMethod=n,this.location=s,this.pluginService=o,this.formValidation=d,this.ngZone=u,this.ref=l,this.headerdata={headerType:"CloseNewHeader",titleName:"REQUEST_MANDATE",footertype:"none"},this.showDebitDay=!1,this.isAmountLimitExceeded=!1,this.upiFrequencyList=[],this.debitDayList=[],this.popupData={}}ngOnInit(){$("#amt").autoNumeric("init",{aSign:"\u20b9 "}),this.DataService.changeMessage(this.headerdata),this.buildForm(),history.pushState({},"requestMandate",this.location.prepareExternalUrl("requestMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.upiFrequencyList=this.constant.upiFrequencyList,this.debitDayList=this.constant.debitDayList,this.getVPAList(),this.DataService.selectedVpaDetailsMandate=this.getSelectedVpaAccountDetails(),this.mbebaFlag=this.DataService.selectedVpaDetailsMandate.accountDetails.mbeba}buildForm(){if(this.requestMandateForm=new r.j({amount:new r.g("",[r.G.required,r.G.pattern(/(^[0-9.\u20b9, ]*$)/)]),remarks:new r.g(this.DataService.requestMandateObj.remarks,[r.G.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),frequency:new r.g(this.DataService.requestMandateObj.frequency?this.DataService.requestMandateObj.frequency:"ONETIME",[r.G.required]),debitDay:new r.g(this.DataService.requestMandateObj.debitDay),startDate:new r.g(n(this.DataService.requestMandateObj.startDate).format("DD/MM/YYYY"),[r.G.required]),endDate:new r.g(this.DataService.requestMandateObj.endDate?n(this.DataService.requestMandateObj.endDate).format("DD/MM/YYYY"):"",[r.G.required])}),this.minDate=n().toDate(),this.maxDate=n().add(45,"days").toDate(),this.DataService.requestMandateObj.amount){let e=this.customCurrencyPipe.transform(this.DataService.requestMandateObj.amount,"decimal").replace(/[^.0-9]+/g,"");this.requestMandateForm.get("amount").setValue(e)}}initDatePicker(){var e=this;$("#datepickerStartDate").datepicker({maxDate:e.maxDate,dateFormat:"dd/mm/yy",minDate:e.minDate,onSelect:function(t){e.requestMandateForm.patchValue({startDate:t})}}),$("#datepickerEndDate").datepicker({maxDate:e.maxDate,dateFormat:"dd/mm/yy",minDate:e.minDate,onSelect:function(t){e.requestMandateForm.patchValue({endDate:t})}})}goToPage(e){this.navigatePage(e)}openDatePicker(e){let t="startDate"==e?this.DataService.requestMandateObj.startDate:this.DataService.requestMandateObj.endDate;"ONETIME"!=this.requestMandateForm.get("frequency").value?"startDate"==e?(this.minDate=n().toDate(),this.maxDate=null):(this.minDate=n(this.DataService.requestMandateObj.startDate).toDate(),this.minDate=n(this.DataService.requestMandateObj.startDate).add(this.dayLimit,"days").toDate(),this.maxDate=null):"startDate"==e?(this.minDate=n().toDate(),this.maxDate=n().add(90,"days").toDate()):(this.minDate=n(this.DataService.requestMandateObj.startDate).toDate(),this.maxDate=n(this.DataService.requestMandateObj.startDate).add(90,"days").toDate()),this.pluginService.openDatePicker("date",t,this.minDate,this.maxDate).subscribe(t=>{this.ngZone.run(()=>{"startDate"==e?(this.DataService.requestMandateObj.startDate=t,this.requestMandateForm.controls.startDate.setValue(n(t).format("DD/MM/YYYY")),this.requestMandateForm.controls.endDate.setValue(n(this.DataService.requestMandateObj.startDate).format("DD/MM/YYYY"))):(this.DataService.requestMandateObj.endDate=t,this.requestMandateForm.controls.endDate.setValue(n(t).format("DD/MM/YYYY"))),this.DataService.requestMandateObj.startDate<this.DataService.requestMandateObj.endDate&&this.requestMandateForm.get("frequency").value&&this.getStartEndDateDiff()})})}getStartEndDateDiff(){this.ngZone.run(()=>{if(this.DataService.requestMandateObj.startDate&&this.DataService.requestMandateObj.endDate){this.constant.upiFrequencyList.forEach((e,t)=>{e.name==this.requestMandateForm.get("frequency").value&&(this.dayLimit=e.dayLimit)});var e=n(this.DataService.requestMandateObj.startDate,"DD-MM-YYYY"),t=n(this.DataService.requestMandateObj.endDate,"DD-MM-YYYY");this.startEndDateDiff=t.diff(e,"days"),this.dayLimit>this.startEndDateDiff&&(this.requestMandateForm.controls.endDate.setValue(""),this.openPopup("div.popup-bottom.dayLimitValidation",this.dayLimit))}})}getVPAList(){let e=JSON.parse(JSON.stringify(this.DataService.vpaAddressList));0==this.DataService.upiMandateVpaList.length&&(this.DataService.upiMandateVpaList=e.map(e=>(e.isSelected=!(!e.isSelected&&"Y"!=e.default),e.accounts.map(e=>(e.isSelected=!(!e.isSelected&&"Y"!=e.isDefaultAccount),e)),e)))}requestMandate(){if(this.requestMandateForm.markAllAsTouched(),console.log("create Payment value ",this.requestMandateForm.value),this.requestMandateForm.valid){let e=this.DataService.getSelectedVpaAccountDetails(this.DataService.upiMandateVpaList),{amount:t,remarks:a,frequency:c,debitDay:i,startDate:r,endDate:n}=this.requestMandateForm.value;this.DataService.requestMandate=(new s.d).deserialize({requestedFromUPIId:this.DataService.validateAddressResp.validatedVpa,payerName:this.DataService.validateAddressResp.MASKNAME,depositToUPIId:e.vpaDetails.paymentAddress,amount:t.replace(/[^.0-9]+/g,""),frequency:c,validityStartDate:r,validityEndDate:n,debitDay:i,remarks:a,selectedVpa:e}),this.isAmountLimitExceeded?this.openPopup("div.popup-bottom.createMandatePaymentInfo"):this.goToPage("requestMandateConfirmation")}}formatCurrency(e){this.formValidation.formatDynamicCurrency("amt",this.requestMandateForm)}onFrequencyChange(e){"ONETIME"==e||"DAILY"==e||"ASPRESENTED"==e?("ONETIME"==e&&(this.requestMandateForm.controls.startDate.setValue(n().format("DD/MM/YYYY")),this.requestMandateForm.controls.endDate.setValue(n().format("DD/MM/YYYY")),this.DataService.createMandateObj.startDate=n().toDate(),this.DataService.createMandateObj.endDate=n().toDate()),this.DataService.createMandateObj.startDate=n().toDate(),this.DataService.createMandateObj.endDate=n().toDate(),this.DataService.requestMandateObj.showDebitDay=!1,this.requestMandateForm.get("debitDay").setValue("ON")):(this.DataService.requestMandateObj.showDebitDay=!0,this.requestMandateForm.get("debitDay").setValue("BEFORE"),this.getStartEndDateDiff())}openPopup(e,t){this.popupData=t||{},console.log("this.popupData",this.popupData),this.commonMethod.openPopup(e)}closePopup(e){this.commonMethod.closePopup(e)}navigatePage(e){let{amount:t,remarks:a,debitDay:c,frequency:i,notifyPayee:r}=this.requestMandateForm.value;this.DataService.requestMandateObj.amount=t,this.DataService.requestMandateObj.remarks=a,this.DataService.requestMandateObj.debitDay=c,this.DataService.requestMandateObj.frequency=i,this.DataService.requestMandateObj.notifyPayee=r,this.DataService.mandateTypeRouteName=this.router.url,this.router.navigateByUrl("/"+e)}getSelectedVpaAccountDetails(){let e=this.DataService.upiMandateVpaList.find(e=>1==e.isSelected);if(e)return{vpaDetails:e,accountDetails:this.DataService.getSelectedAccountNoByVpa(e.accounts)}}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(i.c),o.Yb(d.a),o.Yb(u.a),o.Yb(l.a),o.Yb(m.a),o.Yb(p.a),o.Yb(h.a),o.Yb(c.n),o.Yb(D.a),o.Yb(v.a),o.Yb(o.H),o.Yb(o.i))},e.\u0275cmp=o.Sb({type:e,selectors:[["app-request-mandate-payment"]],decls:136,vars:70,consts:[["id","request-form",3,"formGroup","ngSubmit"],[1,"main","main-bg2"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b","pb-0"],[1,"body-page-container"],[1,"vspacer5","d-sm-block","d-none"],[1,"container-fluid"],[1,"row"],[1,"bg-section2"],[1,"col-12"],[1,"row1"],[1,"col-sm-5","col-8","col-md-3","m-auto"],[1,"ux-input","white-input","mar-tb"],["type","text","inputmode","decimal","placeholder","\u20b9 0","autocomplete","off","formControlName","amount","limit-to","12","id","amt","data-a-sign","Rs.",3,"blur"],["class","text-center error-message",4,"ngIf"],[1,"col-sm-5","col-5","col-md-3","m-auto"],[1,"ux-input","dark-input","mar-tb"],["type","text","formControlName","remarks","autocomplete","off","limit-to","100",3,"placeholder"],[1,"info-bottom-container2"],[1,"col-sm-12","col-12","col-md-12","m-auto"],[1,"bottom-info"],[1,"payee-info"],[1,"info-lft"],[1,"green1"],[1,"info-rit"],["class","small-icons",3,"click",4,"ngIf"],[1,"bottom-info-inner"],[1,"col-6"],[1,"ux-input"],["type","text","formControlName","startDate","placeholder","DD/MM/YYYY","id","datepickerStartDate","readonly","",1,"datepicker1",3,"click"],["class","error-message",4,"ngIf"],[1,"calendar-ic","cal-top",3,"click"],[1,"mb0"],["type","text","formControlName","endDate","placeholder","DD/MM/YYYY","id","datepickerEndDate","readonly","",1,"datepicker1",3,"click"],["for","frequency"],["formControlName","frequency",3,"change"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],["class","col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12",4,"ngIf"],[1,"divider-line"],[4,"ngIf"],[1,"row1","mt-2"],[1,"col-12","text-center"],["type","submit",1,"ux-button","primary","submit","md",3,"disabled"],[1,"popup-bottom","information1"],[1,"text-center"],["src","./assets/images/svg/information.svg","alt","information-icon"],[1,"mb-0"],[1,"ux-button","primary","md",3,"click"],[1,"popup-bottom","requestMandatePaymentInfo"],[1,"popup-bottom","dayLimitValidation"],[1,"text-center","error-message"],[1,"small-icons",3,"click"],[1,"info-btn"],["src","assets/images/svg/question.svg","alt","question-icon"],[1,"error-message"],[3,"value"],[1,"col-12","col-xl-12","col-lg-12","col-md-12","col-sm-12"],["class","col-4 col-md-4",4,"ngFor","ngForOf"],[1,"col-4","col-md-4"],[1,"ux-selection","mar-custom"],[1,"ux-selection2"],["type","radio","formControlName","debitDay","name","debitDay",3,"value"],[1,"checkmark"],[3,"hidden",4,"ngFor","ngForOf"],[3,"hidden"],["class","row1 mt-s",3,"hidden",4,"ngFor","ngForOf"],[1,"row1","mt-s",3,"hidden"],[1,"col-12","col-md-12"],[1,"col-12","col-md-12","mt-1"],[1,"reg-txt",3,"click"]],template:function(e,t){1&e&&(o.ec(0,"form",0),o.lc("ngSubmit",(function(){return t.requestMandate()})),o.ec(1,"div",1),o.ec(2,"div",2),o.ec(3,"div",3),o.ec(4,"div",4),o.Zb(5,"div",5),o.ec(6,"div",6),o.ec(7,"div",7),o.ec(8,"div",8),o.ec(9,"div",9),o.ec(10,"div",10),o.ec(11,"div",11),o.ec(12,"div",12),o.ec(13,"input",13),o.lc("blur",(function(e){return t.formatCurrency(e.target.value)})),o.dc(),o.Rc(14,g,3,3,"p",14),o.Rc(15,q,3,3,"p",14),o.dc(),o.dc(),o.dc(),o.ec(16,"div",10),o.ec(17,"div",15),o.ec(18,"div",16),o.Zb(19,"input",17),o.qc(20,"translate"),o.Rc(21,S,3,3,"p",14),o.dc(),o.dc(),o.dc(),o.ec(22,"div",18),o.ec(23,"div",10),o.ec(24,"div",19),o.ec(25,"div",20),o.ec(26,"div",10),o.ec(27,"div",9),o.ec(28,"div",21),o.ec(29,"div",22),o.ec(30,"span",23),o.ec(31,"h6"),o.Sc(32),o.qc(33,"firstLastChar"),o.dc(),o.dc(),o.dc(),o.ec(34,"div",24),o.ec(35,"h5"),o.Sc(36),o.dc(),o.ec(37,"h6"),o.Sc(38),o.qc(39,"translate"),o.dc(),o.Rc(40,y,3,0,"span",25),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(41,"div",26),o.ec(42,"div",10),o.ec(43,"div",27),o.ec(44,"div",28),o.ec(45,"label"),o.Sc(46),o.qc(47,"translate"),o.dc(),o.ec(48,"input",29),o.lc("click",(function(){return t.openDatePicker("startDate")})),o.dc(),o.Rc(49,E,3,3,"p",30),o.ec(50,"em",31),o.lc("click",(function(){return t.openDatePicker("startDate")})),o.dc(),o.Zb(51,"p",32),o.dc(),o.dc(),o.ec(52,"div",27),o.ec(53,"div",28),o.ec(54,"label"),o.Sc(55),o.qc(56,"translate"),o.dc(),o.ec(57,"input",33),o.lc("click",(function(){return t.openDatePicker("endDate")})),o.dc(),o.Rc(58,O,3,3,"p",30),o.ec(59,"em",31),o.lc("click",(function(){return t.openDatePicker("endDate")})),o.dc(),o.Zb(60,"p",32),o.dc(),o.dc(),o.dc(),o.ec(61,"div",10),o.ec(62,"div",9),o.ec(63,"div",28),o.ec(64,"label",34),o.Sc(65),o.qc(66,"translate"),o.dc(),o.ec(67,"select",35),o.lc("change",(function(e){return t.onFrequencyChange(e.target.value)})),o.ec(68,"option",36),o.Sc(69),o.qc(70,"translate"),o.dc(),o.Rc(71,T,3,4,"option",37),o.dc(),o.Rc(72,F,3,3,"p",30),o.Zb(73,"p",32),o.dc(),o.dc(),o.Rc(74,Y,5,3,"div",38),o.Rc(75,A,3,1,"div",39),o.dc(),o.ec(76,"div"),o.Zb(77,"div",40),o.dc(),o.Rc(78,I,2,1,"div",41),o.dc(),o.ec(79,"div",42),o.ec(80,"div",43),o.ec(81,"button",44),o.Sc(82),o.qc(83,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(84,"div",45),o.ec(85,"div",7),o.ec(86,"div",9),o.ec(87,"h4",46),o.Zb(88,"img",47),o.Sc(89),o.qc(90,"translate"),o.dc(),o.dc(),o.dc(),o.ec(91,"div",7),o.ec(92,"div",9),o.ec(93,"p",48),o.Sc(94),o.qc(95,"translate"),o.dc(),o.dc(),o.dc(),o.ec(96,"div",42),o.ec(97,"div",43),o.ec(98,"button",49),o.lc("click",(function(){return t.closePopup("div.popup-bottom.information1")})),o.Sc(99),o.qc(100,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(101,"div",50),o.ec(102,"div",7),o.ec(103,"div",9),o.ec(104,"h4",46),o.Zb(105,"img",47),o.Sc(106),o.qc(107,"translate"),o.dc(),o.dc(),o.dc(),o.ec(108,"div",7),o.ec(109,"div",9),o.ec(110,"p",48),o.Sc(111),o.qc(112,"translate"),o.dc(),o.dc(),o.dc(),o.ec(113,"div",42),o.ec(114,"div",43),o.ec(115,"button",49),o.lc("click",(function(){return t.goToPage("createMandateConfirmation")})),o.Sc(116),o.qc(117,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(118,"div",51),o.ec(119,"div",7),o.ec(120,"div",9),o.ec(121,"h4",46),o.Zb(122,"img",47),o.Sc(123),o.qc(124,"translate"),o.dc(),o.dc(),o.dc(),o.ec(125,"div",7),o.ec(126,"div",9),o.ec(127,"p",48),o.Sc(128),o.qc(129,"translate"),o.qc(130,"translate"),o.dc(),o.dc(),o.dc(),o.ec(131,"div",42),o.ec(132,"div",43),o.ec(133,"button",49),o.lc("click",(function(){return t.closePopup("div.popup-bottom.dayLimitValidation")})),o.Sc(134),o.qc(135,"translate"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()),2&e&&(o.uc("formGroup",t.requestMandateForm),o.Mb(14),o.uc("ngIf",t.requestMandateForm.controls.amount.hasError("required")&&t.requestMandateForm.controls.amount.touched),o.Mb(1),o.uc("ngIf",t.requestMandateForm.controls.amount.hasError("pattern")),o.Mb(4),o.vc("placeholder",o.rc(20,34,"REMARKS")),o.Mb(2),o.uc("ngIf",t.requestMandateForm.controls.remarks.hasError("pattern")),o.Mb(11),o.Tc(o.rc(33,36,t.DataService.validateAddressResp.MASKNAME)),o.Mb(4),o.Uc("",t.DataService.validateAddressResp.MASKNAME," "),o.Mb(2),o.Vc("",o.rc(39,38,"UPI_ID")," : ",t.DataService.validateAddressResp.validatedVpa," "),o.Mb(2),o.uc("ngIf",t.isAmountLimitExceeded),o.Mb(6),o.Tc(o.rc(47,40,"START_DATE")),o.Mb(3),o.uc("ngIf",t.requestMandateForm.controls.startDate.hasError("required")),o.Mb(6),o.Tc(o.rc(56,42,"END_DATE")),o.Mb(3),o.uc("ngIf",t.requestMandateForm.controls.endDate.hasError("required")),o.Mb(7),o.Tc(o.rc(66,44,"FREQUENCY")),o.Mb(4),o.Uc("",o.rc(70,46,"SELECT")," "),o.Mb(2),o.uc("ngForOf",t.upiFrequencyList),o.Mb(1),o.uc("ngIf",t.requestMandateForm.controls.frequency.hasError("required")&&t.requestMandateForm.controls.frequency.touched),o.Mb(2),o.uc("ngIf",t.DataService.requestMandateObj.showDebitDay),o.Mb(1),o.uc("ngIf",t.DataService.requestMandateObj.showDebitDay),o.Mb(3),o.uc("ngIf",t.DataService.upiMandateVpaList.length>0),o.Mb(3),o.uc("disabled",t.requestMandateForm.invalid||"N"==t.mbebaFlag),o.Mb(1),o.Tc(o.rc(83,48,"PROCEED")),o.Mb(7),o.Tc(o.rc(90,50,"INFORMATION")),o.Mb(5),o.Uc(" ",o.rc(95,52,"MANDATE_AMOUNT_EXCEEDS_MSG")," "),o.Mb(5),o.Tc(o.rc(100,54,"OK")),o.Mb(7),o.Tc(o.rc(107,56,"INFORMATION")),o.Mb(5),o.Uc(" ",o.rc(112,58,"MANDATE_AMOUNT_EXCEEDS_MSG")," "),o.Mb(5),o.Tc(o.rc(117,60,"OK")),o.Mb(7),o.Tc(o.rc(124,62,"INFORMATION")),o.Mb(5),o.Wc(" ",o.rc(129,64,"DIFFERENCE_BETWEEN_START_END_DATE_MSG")," ",t.popupData," ",o.rc(130,66,"DAYS")," "),o.Mb(6),o.Tc(o.rc(135,68,"OK")))},directives:[r.I,r.t,r.k,r.c,r.s,r.i,f.a,c.t,r.E,r.x,r.H,c.s,r.A],pipes:[b.a,M.a],styles:[""]}),e})()}];let V=(()=>{class e{}return e.\u0275mod=o.Wb({type:e}),e.\u0275inj=o.Vb({factory:function(t){return new(t||e)},imports:[[i.g.forChild(L)],i.g]}),e})();var j=a("PCNd");let C=(()=>{class e{}return e.\u0275mod=o.Wb({type:e}),e.\u0275inj=o.Vb({factory:function(t){return new(t||e)},imports:[[c.c,j.a,r.m,r.C,V]]}),e})()}}]);