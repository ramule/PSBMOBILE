(window.webpackJsonp=window.webpackJsonp||[]).push([[35,65,109,349],{Geda:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var r=o("fXoL"),n=o("3Pt+"),i=o("au7T");let s=(()=>{class t{constructor(t,e){this.control=t,this.commonMethods=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){const e=+this.limitTo;if(-1===this.specialKeys.indexOf(t.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=e){let t=this.control.value.substring(0,e);this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(n.r),r.Yb(i.a))},t.\u0275dir=r.Tb({type:t,selectors:[["","limit-to",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[r.Kb]}),t})()},OXpz:function(t,e,o){"use strict";o.d(e,"d",(function(){return i})),o.d(e,"b",(function(){return s})),o.d(e,"a",(function(){return c})),o.d(e,"c",(function(){return a}));var r=o("fXoL"),n=o("3Pt+");let i=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&!/^[0-9]*$/.test(this.control.value)){let t=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(n.r))},t.\u0275dir=r.Tb({type:t,selectors:[["","numbersOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[r.Kb]}),t})(),s=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&this.control.value){let t=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(n.r))},t.\u0275dir=r.Tb({type:t,selectors:[["","digitOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[r.Kb]}),t})(),c=(()=>{class t{constructor(t){this.el=t,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(t){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(t.key))return;let e=this.el.nativeElement.value;const o=this.el.nativeElement.selectionStart,r=[e.slice(0,o),"Decimal"==t.key?".":t.key,e.slice(o)].join("");r&&!String(r).match(this.regex)&&t.preventDefault()}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(r.o))},t.\u0275dir=r.Tb({type:t,selectors:[["","amountOnly",""]],hostBindings:function(t,e){1&t&&r.lc("keydown",(function(t){return e.onKeyDown(t)}))}}),t})(),a=(()=>{class t{constructor(t){this._el=t}onInputChange(t){const e=this._el.nativeElement.value;this._el.nativeElement.value=e.replace(/[^0-9]*/g,""),e!==this._el.nativeElement.value&&t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(r.o))},t.\u0275dir=r.Tb({type:t,selectors:[["input","numericOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.onInputChange(t)}))}}),t})()},TaOT:function(t,e,o){"use strict";o.d(e,"a",(function(){return i}));var r=o("fXoL"),n=o("fUdP");let i=(()=>{class t{constructor(t){this.customCurrencyPipe=t}markFormGroupTouched(t){Object.values(t.controls).forEach(t=>{t.markAsTouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupTouched(t))})}markFormGroupUntouched(t){Object.values(t.controls).forEach(t=>{t.markAsUntouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupUntouched(t))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:t=>{let e=t;return e=e.reduce((t,o,r)=>{let n=t;return n+=o,e.length!==r+1&&(n+=", "),n},""),"These characters are not allowed: "+e}}}validateForm(t,e,o){const r=t;for(const n in e)if(n){e[n]="";const t=r.get(n),i=this.validationMessages();if(t&&!t.valid&&(!o||t.dirty||t.touched))for(const o in t.errors)console.log("======>inside",o),e[n]=o&&"invalid_characters"!==o?e[n]||i[o]:e[n]||i[o](t.errors[o])}return e}formatCurrency(t,e,o){if("0"!=t)if(""!=t){let o=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==o.trim().replace(/[^.0-9]+/g,"")?e.contains("amount")&&e.get("amount").reset():"0"==o.trim().replace(/[^.0-9]+/g,"")?e.get("amount").reset():(console.log(o),e.patchValue({amount:o}))}else e.get("amount").reset("");else e.contains("amount")&&e.get("amount").reset()}formatTransLimit(t,e){if("0"!=t)if(""!=t){let o=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==o?e.contains("transactionLimit")&&e.get("transactionLimit").reset():"0"==o.trim()?e.get("transactionLimit").reset():(console.log(o),e.patchValue({transactionLimit:o}))}else e.get("transactionLimit").reset("");else e.contains("transactionLimit")&&e.get("transactionLimit").reset()}formatDynamicCurrency(t,e){$("#"+t).val()&&"\u20b9 0.00"!=$("#"+t).val()?e.patchValue({amount:$("#"+t).val()}):e.get("amount").reset("")}deFormatValue(t,e){e.patchValue({amount:t.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(t,e,o){if("0"!=t)if(""!=t){let r=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==r?e.contains(o)&&e.get(o).reset():"0"==r.trim()?e.get(o).reset():e.controls[o].patchValue("\u20b9"+r)}else e.get(o).reset("");else e.contains(o)&&e.get(o).reset()}}return t.\u0275fac=function(e){return new(e||t)(r.ic(n.a))},t.\u0275prov=r.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},XAhS:function(t,e,o){"use strict";o.r(e),o.d(e,"ForgotUsernameModule",(function(){return F}));var r=o("ofXK"),n=o("3Pt+"),i=o("PCNd"),s=o("tyNb"),c=o("fXoL"),a=o("EnSQ"),l=o("4bKs"),u=o("au7T"),m=o("L7Xq"),h=o("5IsW"),d=o("fHQ/");let g=(()=>{class t{constructor(t,e,o){this.constant=t,this.encryptDecryptService=e,this.datepipe=o}getForgotUserName(t){var e=this.datepipe.transform(t.dob,"dd-MM-yyyy"),o={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.Key_customerId]:t.customerID,[this.constant.key_UserID]:t.mobile,[this.constant.key_MobileNo]:t.mobile,[this.constant.Key_dateOfBirth]:e};return console.log(JSON.stringify(o)),this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(o))}getMaskDetailsParams(){var t={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsType,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion};return console.log(JSON.stringify(t)),this.encryptDecryptService.encryptText("7038615424jrD@Mt6i",JSON.stringify(t))}}return t.\u0275fac=function(e){return new(e||t)(c.ic(h.a),c.ic(d.a),c.ic(r.f))},t.\u0275prov=c.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=o("Eioz"),f=o("H9Rt"),b=o("TaOT"),y=o("OXpz"),v=o("Geda"),k=o("z17N");function T(t,e){1&t&&(c.ec(0,"span",27),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Uc(" ",c.rc(2,1,"ENTER_CUSTOMER_ID")," "))}function U(t,e){1&t&&(c.ec(0,"span",27),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Uc(" ",c.rc(2,1,"ENTER_MOBILE")," "))}function w(t,e){1&t&&(c.ec(0,"span",27),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Uc(" ",c.rc(2,1,"INVALID_NUMBER")," "))}function D(t,e){1&t&&(c.ec(0,"span",27),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Uc(" ",c.rc(2,1,"ENTER_DATE_OF_BIRTH")," "))}const S=[{path:"",component:(()=>{class t{constructor(t,e,o,r,n,i,s,c,a,l,u,m,h,d,g){this.router=t,this.DataService=e,this.loader=o,this.commonMethod=r,this.form=n,this.http=i,this.dataService=s,this.forgotUserNameService=c,this.translate=a,this.encryptDecryptService=l,this.storage=u,this.formValidation=m,this.datePipe=h,this.location=d,this.constant=g,this.commonPageComponent={headerType:"notLoginPrelogin",sidebarNAv:!1,footer:"innerFooter",currentpageRoute:"/ForgotUsername"}}ngOnInit(){this.buildForm(),this.todayDate=this.datePipe.transform(new Date,"yyyy-MM-dd");var t="web"==this.constant.getPlatform()?"login":"loginMobile";this.dataService.changeMessage(this.commonPageComponent),history.pushState({},t,this.location.prepareExternalUrl(t)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}submitForm(){console.log("Formdata=========",this.forgotUsernameForm.value),this.forgotUsernameForm.valid?this.forgotUserName():this.validateForm()}validateForm(){if(this.forgotUsernameForm.invalid)return this.forgotUsernameForm.get("customerID").markAsTouched(),this.forgotUsernameForm.get("mobile").markAsTouched(),void this.forgotUsernameForm.get("dob").markAsTouched()}buildForm(){this.forgotUsernameForm=new n.j({customerID:new n.g("",[n.G.required,n.G.pattern("^[0-9]*$"),n.G.minLength(4)]),mobile:new n.g("",[n.G.required,n.G.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),dob:new n.g("",[n.G.required])})}onDateChange(t){}goToLogin(){"web"==this.constant.getPlatform()?this.router.navigateByUrl("/login"):this.location.back()}forgotUserName(){var t=this.forgotUserNameService.getForgotUserName(this.forgotUsernameForm.value);this.forgotUserNameApiCall(t,this.constant.deviceID)}forgotUserNameApiCall(t,e){this.http.callBankingAPIService(t,e,this.constant.serviceName_FORGOTUSERNAME).subscribe(t=>{console.log(t);var e=t.responseParameter;if("00"==e.opstatus){console.log(t.responseParameter),this.DataService.refId=t.RRN;var o=this.encryptDecryptService.decryptText(this.sessionDecryptKey,e.Session);console.log("sessionKey",o),this.router.navigateByUrl("/usernameSuccess")}})}backToPrevPage(){this.location.back()}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(s.c),c.Yb(a.a),c.Yb(l.a),c.Yb(u.a),c.Yb(n.f),c.Yb(m.a),c.Yb(a.a),c.Yb(g),c.Yb(p.a),c.Yb(d.a),c.Yb(f.a),c.Yb(b.a),c.Yb(r.f),c.Yb(r.n),c.Yb(h.a))},t.\u0275cmp=c.Sb({type:t,selectors:[["app-forgot-username"]],decls:48,vars:13,consts:[[1,"ios-nav-overlay"],[1,"prelogin-page"],[1,"registration-steps"],[1,"row"],[1,"col-12","position-static"],[1,"inner-header"],[1,"registration-container"],[1,"prev-tab",3,"click"],["src","assets/images/svg/left-arrow.svg"],[1,"closewindow"],["src","assets/images/svg/close-w.svg",3,"click"],[1,"registrationsteps-block","registration-container","acc-opening-page"],[1,"background-block",2,"background-image","url(assets/images/background/basic-background.png)"],[1,"middle-block"],[1,"pageHeader"],[3,"formGroup","ngSubmit"],[1,"ux-input"],["id","customerID","type","tel","autocomplete","off","placeholder","Enter Customer ID","formControlName","customerID","numbersOnly","","limit-to","9"],["class","errormsg",4,"ngIf"],["id","mobile","type","tel","autocomplete","off","placeholder","Enter Mobile Number","formControlName","mobile","limit-to","10","numbersOnly",""],["type","text","placeholder","Date of Birth","readonly","","formControlName","dob",3,"owlDateTime","owlDateTimeTrigger","max"],[3,"pickerType"],["dt1",""],[1,"calendar-ic","cal-top"],[1,"calendar-ic","cal-top",3,"owlDateTimeTrigger"],[1,"text-center","button-block"],["type","submit",1,"ux-button","primary"],[1,"errormsg"]],template:function(t,e){if(1&t&&(c.Zb(0,"div",0),c.ec(1,"div",1),c.ec(2,"div",2),c.ec(3,"div",3),c.ec(4,"div",4),c.ec(5,"div",5),c.ec(6,"div",6),c.ec(7,"a",7),c.lc("click",(function(){return e.backToPrevPage()})),c.Zb(8,"img",8),c.Sc(9,"Back to Login"),c.dc(),c.ec(10,"a",9),c.ec(11,"img",10),c.lc("click",(function(){return e.goToLogin()})),c.dc(),c.dc(),c.ec(12,"h4"),c.Sc(13,"FORGOT USERNAME"),c.dc(),c.dc(),c.dc(),c.ec(14,"div",11),c.ec(15,"div",3),c.Zb(16,"div",12),c.ec(17,"div",13),c.ec(18,"div",14),c.ec(19,"h3"),c.Sc(20,"Help us with your Bank details"),c.dc(),c.ec(21,"span"),c.Sc(22,"Please enter details registered in your bank account"),c.dc(),c.dc(),c.ec(23,"form",15),c.lc("ngSubmit",(function(){return e.submitForm()})),c.ec(24,"div",16),c.ec(25,"label"),c.Sc(26,"Customer ID"),c.dc(),c.Zb(27,"input",17),c.Rc(28,T,3,3,"span",18),c.dc(),c.ec(29,"div",16),c.ec(30,"label"),c.Sc(31,"Mobile Number"),c.dc(),c.Zb(32,"input",19),c.Rc(33,U,3,3,"span",18),c.Rc(34,w,3,3,"span",18),c.dc(),c.ec(35,"div",16),c.ec(36,"label"),c.Sc(37,"Date of Birth"),c.dc(),c.Zb(38,"input",20),c.Zb(39,"owl-date-time",21,22),c.Zb(41,"em",23),c.Zb(42,"em",24),c.Rc(43,D,3,3,"span",18),c.dc(),c.ec(44,"div",25),c.ec(45,"button",26),c.Sc(46),c.qc(47,"translate"),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc()),2&t){const t=c.Ec(40);c.Mb(23),c.uc("formGroup",e.forgotUsernameForm),c.Mb(5),c.uc("ngIf",e.forgotUsernameForm.controls.customerID.hasError("required")&&e.forgotUsernameForm.controls.customerID.touched),c.Mb(5),c.uc("ngIf",e.forgotUsernameForm.controls.mobile.hasError("required")&&e.forgotUsernameForm.controls.mobile.touched),c.Mb(1),c.uc("ngIf",e.forgotUsernameForm.controls.mobile.hasError("pattern")&&e.forgotUsernameForm.controls.mobile.touched),c.Mb(4),c.uc("owlDateTime",t)("owlDateTimeTrigger",t)("max",e.todayDate),c.Mb(1),c.uc("pickerType","calendar"),c.Mb(3),c.uc("owlDateTimeTrigger",t),c.Mb(1),c.uc("ngIf",e.forgotUsernameForm.controls.dob.hasError("required")&&e.forgotUsernameForm.controls.dob.touched),c.Mb(3),c.Uc(" ",c.rc(47,11,"CONTINUE"),"")}},directives:[n.I,n.t,n.k,n.c,n.s,n.i,y.d,v.a,r.t,k.c,k.e,k.b],pipes:[p.a],styles:[""]}),t})()}];let E=(()=>{class t{}return t.\u0275mod=c.Wb({type:t}),t.\u0275inj=c.Vb({factory:function(e){return new(e||t)},imports:[[s.g.forChild(S)],s.g]}),t})(),F=(()=>{class t{}return t.\u0275mod=c.Wb({type:t}),t.\u0275inj=c.Vb({factory:function(e){return new(e||t)},imports:[[r.c,n.m,n.C,i.a,E,k.d,k.f]]}),t})()}}]);