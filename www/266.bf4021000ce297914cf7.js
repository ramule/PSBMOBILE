(window.webpackJsonp=window.webpackJsonp||[]).push([[266],{Q95V:function(s,e,t){"use strict";t.r(e),t.d(e,"ForgotPasswordSetPasswordModule",(function(){return f}));var o=t("ofXK"),c=t("tyNb"),r=t("3Pt+"),i=t("fXoL"),a=t("au7T"),n=t("EnSQ"),d=t("Eioz"),l=t("5IsW"),p=t("L7Xq"),m=t("H9Rt"),u=t("fHQ/");let h=(()=>{class s{constructor(s,e,t,o,c){this.constant=s,this.encryptDecryptService=e,this.localStorage=t,this.dataService=o,this.commonMethods=c}getSetForgoatPassword(s){var e={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.constant.deviceID,[this.constant.key_channelType]:this.constant.val_channelValueIB,[this.constant.key_UserID]:this.dataService.forgotPassUsername,[this.constant.key_password]:this.encryptDecryptService.createMD5Value(s.setPassword),[this.constant.key_crmReferenceNumber]:this.dataService.crmReferenceNumber,[this.constant.key_reqType]:"forgot"};return this.encryptDecryptService.encryptText(this.constant.staticKey,JSON.stringify(e))}}return s.\u0275fac=function(e){return new(e||s)(i.ic(l.a),i.ic(u.a),i.ic(m.a),i.ic(n.a),i.ic(a.a))},s.\u0275prov=i.Ub({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();function g(s,e){1&s&&(i.ec(0,"p",43),i.Sc(1," ENTER_PASSWORD "),i.dc())}function v(s,e){1&s&&(i.ec(0,"p",43),i.Sc(1," ENTER_PASSWORD "),i.dc())}const w=[{path:"",component:(()=>{class s{constructor(s,e,t,o,c,r,i,a,n,d,l){this.router=s,this.commonMethods=e,this.form=t,this.dataService=o,this.translate=c,this.constant=r,this.http=i,this.localStorage=a,this.encryptDecryptService=n,this.forgotPasswordSetPasswordService=d,this.location=l,this.commonPageComponent={headerType:"notLoginPrelogin",sidebarNAv:!1,footer:"innerFooter"}}ngOnInit(){this.constant.getPlatform(),history.pushState({},this.dataService.previousPageUrl,this.location.prepareExternalUrl(this.dataService.previousPageUrl)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.buildForm(),this.dataService.changeMessage(this.commonPageComponent)}buildForm(){this.setPasswordForm=new r.j({setPassword:new r.g("",[r.G.required]),confirmPassword:new r.g("",[r.G.required])})}submitForm(){console.log("Formdata=========",this.setPasswordForm.value),this.setPasswordForm.valid?this.setPasswordForm.value.setPassword==this.setPasswordForm.value.confirmPassword?this.setPassword():showToastMessage("New and Confirm Password does not match","error"):this.validateForm()}validateForm(){if(this.setPasswordForm.invalid)return this.setPasswordForm.get("setPassword").markAsTouched(),void this.setPasswordForm.get("confirmPassword").markAsTouched()}prevtab(){this.router.navigateByUrl("/ForgotPassword")}setPassword(){var s=this.forgotPasswordSetPasswordService.getSetForgoatPassword(this.setPasswordForm.value);this.setPasswordApiCall(s,this.constant.deviceID)}setPasswordApiCall(s,e){this.http.callBankingAPIService(s,e,this.constant.serviceName_UPDATELOGINDETAILS).subscribe(s=>{console.log(s),"00"==s.responseParameter.opstatus&&(console.log(s.responseParameter),this.router.navigateByUrl("/forgotPasswordSuccess"))})}goToLogin(){"web"==this.constant.getPlatform()?this.router.navigateByUrl("/login"):this.location.back()}passwordpolicy(){this.commonMethods.openPopup("div.password-popup")}closePopups(){this.commonMethods.closePopup("div.password-popup")}backToPrevPage(){this.location.back()}}return s.\u0275fac=function(e){return new(e||s)(i.Yb(c.c),i.Yb(a.a),i.Yb(r.f),i.Yb(n.a),i.Yb(d.a),i.Yb(l.a),i.Yb(p.a),i.Yb(m.a),i.Yb(u.a),i.Yb(h),i.Yb(o.n))},s.\u0275cmp=i.Sb({type:s,selectors:[["app-forgot-password-set-password"]],decls:89,vars:3,consts:[[1,"ios-nav-overlay"],[1,"prelogin-page"],[1,"registration-steps"],[1,"row1"],[1,"col-12","position-static"],[1,"inner-header"],[1,"registration-container"],[1,"prev-tab",3,"click"],["src","assets/images/svg/left-arrow.svg"],[1,"close-registration"],["src","assets/images/svg/close-w.svg",3,"click"],[1,"registrationsteps-block","custom-pad","registration-container"],[1,"background-block",2,"background-image","url(assets/images/banner/registration-banner1.png)"],[1,"middle-block"],[1,"pageHeader"],[3,"formGroup","ngSubmit"],[1,"col-12","col-md-12","col-xl-12","col-lg-12"],[1,"ux-input","twoicons"],["for","setPassword"],["src","assets/images/svg/password-b.svg",1,"left-img"],["href","javascript:;",3,"click"],["src","assets/images/svg/information.svg",1,"right-img"],["type","password","placeholder","Enter Password","formControlName","setPassword"],[1,"ux-input"],["class","error-message",4,"ngIf"],["for","confirmPassword"],["type","password","placeholder","Enter Password","formControlName","confirmPassword"],[1,"col-6","position-static"],[1,"text-center","button-block"],[1,"ux-button","secondary",3,"click"],["type","submit",1,"ux-button","primary",3,"click"],[1,"popup-bottom","md-popup","password-popup"],[1,"col-10"],[1,"text-left"],[1,"col-2"],[1,"ux-button-icon","close-btn",3,"click"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],[1,"col-12"],[1,"col-12","mt-2"],[1,"orderlist"],[1,"row1","mt-2"],[1,"col-12","col-md-12","text-center"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"error-message"]],template:function(s,e){1&s&&(i.Zb(0,"div",0),i.ec(1,"div",1),i.ec(2,"div",2),i.ec(3,"div",3),i.ec(4,"div",4),i.ec(5,"div",5),i.ec(6,"div",6),i.ec(7,"a",7),i.lc("click",(function(){return e.goToLogin()})),i.Zb(8,"img",8),i.Sc(9,"Back to Login"),i.dc(),i.ec(10,"h4"),i.Sc(11,"Forgot Password"),i.dc(),i.ec(12,"a",9),i.ec(13,"img",10),i.lc("click",(function(){return e.goToLogin()})),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(14,"div",11),i.ec(15,"div",3),i.Zb(16,"div",12),i.ec(17,"div",13),i.ec(18,"div",14),i.ec(19,"h4"),i.Sc(20,"Set Password"),i.dc(),i.ec(21,"h6"),i.Sc(22,"Please set your new password"),i.dc(),i.dc(),i.ec(23,"form",15),i.lc("ngSubmit",(function(){return e.submitForm()})),i.ec(24,"div",3),i.ec(25,"div",16),i.ec(26,"div",17),i.ec(27,"label",18),i.Sc(28,"Set Password"),i.dc(),i.Zb(29,"img",19),i.ec(30,"a",20),i.lc("click",(function(){return e.passwordpolicy()})),i.Zb(31,"img",21),i.dc(),i.Zb(32,"input",22),i.dc(),i.ec(33,"div",23),i.Rc(34,g,2,0,"p",24),i.dc(),i.dc(),i.ec(35,"div",16),i.ec(36,"div",17),i.ec(37,"label",25),i.Sc(38,"Confirm Password"),i.dc(),i.Zb(39,"img",19),i.Zb(40,"input",26),i.dc(),i.ec(41,"div",23),i.Rc(42,v,2,0,"p",24),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(43,"div",3),i.ec(44,"div",27),i.ec(45,"div",28),i.ec(46,"button",29),i.lc("click",(function(){return e.prevtab()})),i.Sc(47,"Cancel"),i.dc(),i.dc(),i.dc(),i.ec(48,"div",27),i.ec(49,"div",28),i.ec(50,"button",30),i.lc("click",(function(){return e.submitForm()})),i.Sc(51,"Submit"),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(52,"div",31),i.ec(53,"div",3),i.ec(54,"div",32),i.ec(55,"h4",33),i.Sc(56,"Password Policy"),i.dc(),i.dc(),i.ec(57,"div",34),i.ec(58,"button",35),i.lc("click",(function(){return e.closePopups()})),i.Zb(59,"img",36),i.dc(),i.dc(),i.dc(),i.ec(60,"div",3),i.ec(61,"div",37),i.ec(62,"h5",33),i.Sc(63,"The following rules are applicable for setting/modify the Password."),i.dc(),i.dc(),i.ec(64,"div",38),i.ec(65,"ol",39),i.ec(66,"li"),i.Sc(67," Omnichannel Digital Banking application Password shall be a minimum of 8 and a maximum of 16 characters with no spaces in-between."),i.dc(),i.ec(68,"li"),i.Sc(69," Password shall be aphanumeric and should contain atleast:"),i.dc(),i.ec(70,"ol"),i.ec(71,"li"),i.Sc(72,"One Capital Alphabet."),i.dc(),i.ec(73,"li"),i.Sc(74,"One Lower case Aplhabet."),i.dc(),i.ec(75,"li"),i.Sc(76,"One numeral."),i.dc(),i.ec(77,"li"),i.Sc(78,"one special character."),i.dc(),i.dc(),i.ec(79,"li"),i.Sc(80,"Password cannot consist of all characters of user-id."),i.dc(),i.ec(81,"li"),i.Sc(82," Modified password can not be same as any of previous 3 passwords.."),i.dc(),i.ec(83,"li"),i.Sc(84,"In case a customer does not log into Internet Banking for more than 180 days his password will expire."),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(85,"div",40),i.ec(86,"div",41),i.ec(87,"button",42),i.lc("click",(function(){return e.closePopups()})),i.Sc(88,"OK"),i.dc(),i.dc(),i.dc(),i.dc()),2&s&&(i.Mb(23),i.uc("formGroup",e.setPasswordForm),i.Mb(11),i.uc("ngIf",e.setPasswordForm.controls.setPassword.hasError("required")&&e.setPasswordForm.controls.setPassword.touched),i.Mb(8),i.uc("ngIf",e.setPasswordForm.controls.confirmPassword.hasError("required")&&e.setPasswordForm.controls.confirmPassword.touched))},directives:[r.I,r.t,r.k,r.c,r.s,r.i,o.t],styles:[""]}),s})()}];let b=(()=>{class s{}return s.\u0275mod=i.Wb({type:s}),s.\u0275inj=i.Vb({factory:function(e){return new(e||s)},imports:[[c.g.forChild(w)],c.g]}),s})();var P=t("PCNd");let f=(()=>{class s{}return s.\u0275mod=i.Wb({type:s}),s.\u0275inj=i.Vb({factory:function(e){return new(e||s)},imports:[[o.c,b,r.m,r.C,P.a]]}),s})()}}]);