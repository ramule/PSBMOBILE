(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{Geda:function(t,e,o){"use strict";o.d(e,"a",(function(){return c}));var r=o("fXoL"),s=o("3Pt+"),n=o("au7T");let c=(()=>{class t{constructor(t,e){this.control=t,this.commonMethods=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){const e=+this.limitTo;if(-1===this.specialKeys.indexOf(t.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=e){let t=this.control.value.substring(0,e);this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(s.r),r.Yb(n.a))},t.\u0275dir=r.Tb({type:t,selectors:[["","limit-to",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[r.Kb]}),t})()},OXpz:function(t,e,o){"use strict";o.d(e,"d",(function(){return n})),o.d(e,"b",(function(){return c})),o.d(e,"a",(function(){return i})),o.d(e,"c",(function(){return a}));var r=o("fXoL"),s=o("3Pt+");let n=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&!/^[0-9]*$/.test(this.control.value)){let t=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(s.r))},t.\u0275dir=r.Tb({type:t,selectors:[["","numbersOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[r.Kb]}),t})(),c=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&this.control.value){let t=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(s.r))},t.\u0275dir=r.Tb({type:t,selectors:[["","digitOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[r.Kb]}),t})(),i=(()=>{class t{constructor(t){this.el=t,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(t){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(t.key))return;let e=this.el.nativeElement.value;const o=this.el.nativeElement.selectionStart,r=[e.slice(0,o),"Decimal"==t.key?".":t.key,e.slice(o)].join("");r&&!String(r).match(this.regex)&&t.preventDefault()}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(r.o))},t.\u0275dir=r.Tb({type:t,selectors:[["","amountOnly",""]],hostBindings:function(t,e){1&t&&r.lc("keydown",(function(t){return e.onKeyDown(t)}))}}),t})(),a=(()=>{class t{constructor(t){this._el=t}onInputChange(t){const e=this._el.nativeElement.value;this._el.nativeElement.value=e.replace(/[^0-9]*/g,""),e!==this._el.nativeElement.value&&t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(r.o))},t.\u0275dir=r.Tb({type:t,selectors:[["input","numericOnly",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.onInputChange(t)}))}}),t})()},WOX1:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var r=o("fXoL"),s=o("3Pt+");let n=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&!/^[a-zA-Z0-9_.]*$/.test(this.control.value)){let t=this.control.value.replace(/[^a-zA-Z0-9_.]/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(s.r))},t.\u0275dir=r.Tb({type:t,selectors:[["","username",""]],hostBindings:function(t,e){1&t&&r.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[r.Kb]}),t})()},"oGG/":function(t,e,o){"use strict";o.r(e),o.d(e,"ForgotPasswordModule",(function(){return N}));var r=o("ofXK"),s=o("tyNb"),n=o("3Pt+"),c=o("fXoL"),i=o("au7T"),a=o("EnSQ"),l=o("Eioz"),u=o("5IsW"),d=o("L7Xq"),h=o("fHQ/"),p=o("H9Rt");let g=(()=>{class t{constructor(t,e,o,r){this.constant=t,this.encryptDecryptService=e,this.localStorage=o,this.dataService=r}getForgotPassowrd(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.Key_username]:t.username.toLowerCase(),[this.constant.key_accountNo]:t.accNo,[this.constant.key_cifNumber]:t.custId};return this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(e))}}return t.\u0275fac=function(e){return new(e||t)(c.ic(u.a),c.ic(h.a),c.ic(p.a),c.ic(a.a))},t.\u0275prov=c.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var f=o("Geda"),m=o("WOX1"),b=o("OXpz");function v(t,e){1&t&&(c.ec(0,"p",25),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Uc(" ",c.rc(2,1,"ENTER_USERNAME")," "))}function y(t,e){1&t&&(c.ec(0,"p",25),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Tc(c.rc(2,1,"PLEASE_ENTER_CUST_ID")))}function w(t,e){1&t&&(c.ec(0,"p",25),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Tc(c.rc(2,1,"PLEASE_ENTER_VALID_CUST_ID")))}function S(t,e){1&t&&(c.ec(0,"p",25),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Tc(c.rc(2,1,"PLEASE_ENTER_ACC")))}function E(t,e){1&t&&(c.ec(0,"p",25),c.Sc(1),c.qc(2,"translate"),c.dc()),2&t&&(c.Mb(1),c.Tc(c.rc(2,1,"PLEASE_ENTER_VALID_ACC")))}const P=[{path:"",component:(()=>{class t{constructor(t,e,o,r,s,n,c,i,a,l,u){this.router=t,this.commonMethods=e,this.form=o,this.dataService=r,this.translate=s,this.constant=n,this.http=c,this.encryptDecryptService=i,this.forgotPasswordService=a,this.localStorage=l,this.location=u,this.isFromForgotMPIN=!1,this.commonPageComponent={headerType:"notLoginPrelogin",sidebarNAv:!1,footer:"innerFooter"}}ngOnInit(){this.isFromForgotMPIN=this.dataService.fromForgotMPIN;var t="web"==this.constant.getPlatform()?"login":"loginMobile";history.pushState({},t,this.location.prepareExternalUrl(t)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.buildForm(),this.dataService.changeMessage(this.commonPageComponent)}submitForm(){console.log("Formdata=========",this.forgotpassword.value),this.validateForm(),this.forgotpassword.valid&&(this.dataService.forgotPassUsername=this.forgotpassword.value.username,console.log("forgot password username: ",this.dataService.forgotPassUsername),this.forgotPassword())}buildForm(){this.forgotpassword=new n.j({username:new n.g("",[n.G.required]),custId:new n.g("",[n.G.required,n.G.pattern(/^(?!0{9})[0-9][0-9]{8}$/)]),accNo:new n.g("",[n.G.required,n.G.pattern(/^(?!0{14})[0-9][0-9]{13}$/)])})}validateForm(){this.forgotpassword.invalid&&this.forgotpassword.get("username").markAsTouched()}goToLogin(){"web"==this.constant.getPlatform()?this.router.navigateByUrl("/login"):this.location.back()}forgotPassword(){var t=this.forgotPasswordService.getForgotPassowrd(this.forgotpassword.value);this.forgotPasswordApiCall(t,this.constant.deviceID)}forgotPasswordApiCall(t,e){this.http.callBankingAPIService(t,e,this.constant.serviceName_FORGOTPASSWORD).subscribe(t=>{console.log(t);var e=t.responseParameter;if("00"==e.opstatus){console.log(t.responseParameter);var o=this.encryptDecryptService.decryptText(this.sessionDecryptKey,e.Session);console.log("sessionKey",o),this.isFromForgotMPIN?(this.dataService.forgotPassUsername=this.forgotpassword.value.username,this.router.navigateByUrl("/forgotMpinMob")):(this.dataService.forgotPassDtl=this.forgotpassword.value,this.router.navigateByUrl("/forgotPasswordAuth"))}})}backToPrevPage(){this.location.back()}}return t.\u0275fac=function(e){return new(e||t)(c.Yb(s.c),c.Yb(i.a),c.Yb(n.f),c.Yb(a.a),c.Yb(l.a),c.Yb(u.a),c.Yb(d.a),c.Yb(h.a),c.Yb(g),c.Yb(p.a),c.Yb(r.n))},t.\u0275cmp=c.Sb({type:t,selectors:[["app-forgot-password"]],decls:57,vars:22,consts:[[1,"ios-nav-overlay"],[1,"prelogin-page"],[1,"registration-steps"],[1,"row1"],[1,"col-12","position-static"],[1,"inner-header"],[1,"registration-container"],[1,"prev-tab",3,"click"],["src","assets/images/svg/left-arrow.svg"],[1,"close-registration"],["src","assets/images/svg/close-w.svg",3,"click"],[1,"registrationsteps-block","custom-pad","registration-container"],[1,"background-block",2,"background-image","url(assets/images/background/basic-background.png)"],[1,"middle-block"],[1,"pageHeader"],[3,"formGroup","ngSubmit"],[1,"col-12","col-md-12","col-xl-12","col-lg-12"],[1,"ux-input"],["for","userName"],["type","text","limit-to","20","username","","name","userName","placeholder","Enter User Name","formControlName","username","autocomplete","off"],["class","error-message",4,"ngIf"],["limit-to","9","type","tel","formControlName","custId","numbersOnly","",3,"placeholder"],["limit-to","14","type","tel","formControlName","accNo","numbersOnly","",3,"placeholder"],[1,"text-center","button-block"],["type","submit",1,"ux-button","primary"],[1,"error-message"]],template:function(t,e){1&t&&(c.Zb(0,"div",0),c.ec(1,"div",1),c.ec(2,"div",2),c.ec(3,"div",3),c.ec(4,"div",4),c.ec(5,"div",5),c.ec(6,"div",6),c.ec(7,"a",7),c.lc("click",(function(){return e.backToPrevPage()})),c.Zb(8,"img",8),c.Sc(9,"Back to Login"),c.dc(),c.ec(10,"h4"),c.Sc(11),c.dc(),c.ec(12,"a",9),c.ec(13,"img",10),c.lc("click",(function(){return e.goToLogin()})),c.dc(),c.dc(),c.dc(),c.dc(),c.ec(14,"div",11),c.ec(15,"div",3),c.Zb(16,"div",12),c.ec(17,"div",13),c.ec(18,"div",14),c.ec(19,"h4"),c.Sc(20,"Provide Banking Details"),c.dc(),c.ec(21,"h6"),c.Sc(22,"Please enter details registered in your bank account"),c.dc(),c.dc(),c.ec(23,"form",15),c.lc("ngSubmit",(function(){return e.submitForm()})),c.ec(24,"div",3),c.ec(25,"div",16),c.ec(26,"div",17),c.ec(27,"label",18),c.Sc(28,"User Name"),c.dc(),c.Zb(29,"input",19),c.Rc(30,v,3,3,"p",20),c.dc(),c.dc(),c.dc(),c.ec(31,"div",3),c.ec(32,"div",16),c.ec(33,"div",17),c.ec(34,"label"),c.Sc(35),c.qc(36,"translate"),c.dc(),c.Zb(37,"input",21),c.qc(38,"translate"),c.Rc(39,y,3,3,"p",20),c.Rc(40,w,3,3,"p",20),c.dc(),c.dc(),c.dc(),c.ec(41,"div",3),c.ec(42,"div",16),c.ec(43,"div",17),c.ec(44,"label"),c.Sc(45),c.qc(46,"translate"),c.dc(),c.Zb(47,"input",22),c.qc(48,"translate"),c.Rc(49,S,3,3,"p",20),c.Rc(50,E,3,3,"p",20),c.dc(),c.dc(),c.dc(),c.ec(51,"div",3),c.ec(52,"div",4),c.ec(53,"div",23),c.ec(54,"button",24),c.Sc(55),c.qc(56,"translate"),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc(),c.dc()),2&t&&(c.Mb(11),c.Tc(e.isFromForgotMPIN?"Forgot MPIN":"FORGOT PASSWORD"),c.Mb(12),c.uc("formGroup",e.forgotpassword),c.Mb(7),c.uc("ngIf",e.forgotpassword.controls.username.hasError("required")&&e.forgotpassword.controls.username.touched),c.Mb(5),c.Tc(c.rc(36,12,"CUST_ID")),c.Mb(2),c.vc("placeholder",c.rc(38,14,"ENTER_CUST_ID")),c.Mb(2),c.uc("ngIf",e.forgotpassword.controls.custId.touched&&e.forgotpassword.controls.custId.hasError("required")),c.Mb(1),c.uc("ngIf",!e.forgotpassword.controls.custId.hasError("required")&&e.forgotpassword.controls.custId.hasError("pattern")),c.Mb(5),c.Tc(c.rc(46,16,"ACCOUNT_NUMBER")),c.Mb(2),c.vc("placeholder",c.rc(48,18,"ENTER_ACCOUNT_NUMBER")),c.Mb(2),c.uc("ngIf",e.forgotpassword.controls.accNo.touched&&e.forgotpassword.controls.accNo.hasError("required")),c.Mb(1),c.uc("ngIf",!e.forgotpassword.controls.accNo.hasError("required")&&e.forgotpassword.controls.accNo.hasError("pattern")),c.Mb(5),c.Tc(c.rc(56,20,"CONTINUE")))},directives:[n.I,n.t,n.k,n.c,f.a,m.a,n.s,n.i,r.t,b.d],pipes:[l.a],styles:[""]}),t})()}];let T=(()=>{class t{}return t.\u0275mod=c.Wb({type:t}),t.\u0275inj=c.Vb({factory:function(e){return new(e||t)},imports:[[s.g.forChild(P)],s.g]}),t})();var k=o("PCNd");let N=(()=>{class t{}return t.\u0275mod=c.Wb({type:t}),t.\u0275inj=c.Vb({factory:function(e){return new(e||t)},imports:[[n.m,n.C,k.a,r.c,T]]}),t})()}}]);