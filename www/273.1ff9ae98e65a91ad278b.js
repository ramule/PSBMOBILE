(window.webpackJsonp=window.webpackJsonp||[]).push([[273],{sTfA:function(e,i,c){"use strict";c.r(i),c.d(i,"ResetNewTpinModule",(function(){return P}));var t=c("PCNd"),n=c("3Pt+"),o=c("ofXK"),r=c("fXoL"),s=c("tyNb"),a=c("EnSQ"),d=c("L7Xq"),l=c("H9Rt"),p=c("5IsW"),m=c("fHQ/"),u=c("au7T");let h=(()=>{class e{constructor(e,i,c,t,n){this.constant=e,this.encryptDecryptService=i,this.storage=c,this.dataService=t,this.common=n}getValidateTpinParam(e){var i={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_latitude]:this.dataService.latitude,[this.constant.key_longitude]:this.dataService.longitude,[this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_channelType]:this.dataService.getChannelType(),[this.constant.key_TPIN]:this.encryptDecryptService.createMD5Value(e),[this.constant.key_service_Type]:""};let c=this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo)+this.constant.mapEncryptKey,JSON.stringify(i));return console.log("getValidateMpinParam ====>"+JSON.stringify(i)),c}}return e.\u0275fac=function(i){return new(i||e)(r.ic(p.a),r.ic(m.a),r.ic(l.a),r.ic(a.a),r.ic(u.a))},e.\u0275prov=r.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var v=c("Eioz");const g=["mpinRow"],f=["reMpinRow"];function M(e,i){if(1&e){const e=r.fc();r.ec(0,"li"),r.ec(1,"a",52),r.lc("click",(function(){r.Hc(e);const c=i.$implicit;return r.pc().DataService.breadcrumroute(c.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&e){const e=i.$implicit;r.Mb(2),r.Tc(r.rc(3,1,e.currentRoute))}}function b(e,i){if(1&e){const e=r.fc();r.ec(0,"div",53),r.ec(1,"div",54),r.ec(2,"input",55,56),r.lc("keyup",(function(c){r.Hc(e);const t=i.index;return r.pc().onKeyUpEvent(t,c,"mpassword")})),r.dc(),r.dc(),r.dc()}if(2&e){const e=i.$implicit,c=i.index;r.Mb(2),r.wc("id","mpassword",c,""),r.vc("formControlName",e)}}function w(e,i){1&e&&(r.ec(0,"p",57),r.Sc(1),r.qc(2,"translate"),r.dc()),2&e&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"ENTER_6_DIGIT_TPIN_ERROR")," "))}function S(e,i){1&e&&(r.ec(0,"p",57),r.Sc(1),r.qc(2,"translate"),r.dc()),2&e&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"TPIN_SIMPLE_ERROR")," "))}function y(e,i){if(1&e){const e=r.fc();r.ec(0,"div",53),r.ec(1,"div",54),r.ec(2,"input",55,58),r.lc("keyup",(function(c){r.Hc(e);const t=i.index;return r.pc().onKeyUpEvent(t,c,"rmpassword")})),r.dc(),r.dc(),r.dc()}if(2&e){const e=i.$implicit,c=i.index;r.Mb(2),r.wc("id","rmpassword",c,""),r.vc("formControlName",e)}}function E(e,i){1&e&&(r.ec(0,"p",57),r.Sc(1),r.qc(2,"translate"),r.dc()),2&e&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"ENTER_6_DIGIT_CONFIRM_TPIN_ERROR"),""))}function I(e,i){1&e&&(r.ec(0,"p",57),r.Sc(1),r.qc(2,"translate"),r.dc()),2&e&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"TPIN_CONFIRM_MISMATCH_ERROR"),""))}function k(e,i){1&e&&(r.ec(0,"p",57),r.Sc(1),r.qc(2,"translate"),r.dc()),2&e&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"TPIN_SIMPLE_ERROR"),""))}const R=[{path:"",component:(()=>{class e{constructor(e,i,c,t,n,o,r,s,a){this.router=e,this.DataService=i,this.http=c,this.storage=t,this.constant=n,this.location=o,this.encryptDecryptService=r,this.commonMethod=s,this.resetTpinService=a,this.confMpinError="",this.mpinError="",this.validMpin=!1,this.validConfirmMpin=!1,this.mpinMatch=!0,this.mpinInput=["mpin1","mpin2","mpin3","mpin4","mpin5","mpin6"],this.reMpinInput=["reMpin1","reMpin2","reMpin3","reMpin4","reMpin5","reMpin6"]}ngOnInit(){this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("RESET_TPIN",this.router.url),this.DataService.setPageSettings("RRESET_TPIN"),this.buildForm()}buildForm(){this.mpinForm=new n.j({mpin1:new n.g("",[n.G.required,n.G.maxLength(1)]),mpin2:new n.g("",[n.G.required,n.G.maxLength(1)]),mpin3:new n.g("",[n.G.required,n.G.maxLength(1)]),mpin4:new n.g("",[n.G.required,n.G.maxLength(1)]),mpin5:new n.g("",[n.G.required,n.G.maxLength(1)]),mpin6:new n.g("",[n.G.required,n.G.maxLength(1)])}),this.reMpinForm=new n.j({reMpin1:new n.g("",[n.G.required,n.G.maxLength(1)]),reMpin2:new n.g("",[n.G.required,n.G.maxLength(1)]),reMpin3:new n.g("",[n.G.required,n.G.maxLength(1)]),reMpin4:new n.g("",[n.G.required,n.G.maxLength(1)]),reMpin5:new n.g("",[n.G.required,n.G.maxLength(1)]),reMpin6:new n.g("",[n.G.required,n.G.maxLength(1)])})}validationForm(){if(this.mpinForm.invalid){this.mpinError="",this.confMpinError="";for(const e in this.mpinForm.controls){const i=this.mpinForm.get(e);e.includes("mpin")&&i.hasError("required")?this.mpinError="* This field is required":e.includes("confirmMpin")&&i.hasError("required")&&(this.confMpinError="* This field is required")}}else this.mpinError="",this.confMpinError=""}submitTpin(){if(this.validationForm(),this.mpinForm.valid){console.log("mpin ",this.getMPINValue()),console.log("confirm mpin ",this.getConfirmMPINValue());let i=this.checkConsecutiveDigits(this.getMPINValue());console.log("validMpin1",i);let c=this.checkRepeatedDigits(this.getMPINValue());console.log("validMpin2",c),this.validMpin=i||c,console.log("this.validMpin",this.validMpin);let t=this.checkConsecutiveDigits(this.getConfirmMPINValue()),n=this.checkRepeatedDigits(this.getConfirmMPINValue());if(this.validConfirmMpin=t||n,console.log("this.validConfirmMpin",this.validConfirmMpin),this.mpinMatch=this.checkMpinMatch(this.getMPINValue(),this.getConfirmMPINValue()),console.log("this.mpinMatch",this.mpinMatch),!this.confMpinError&&this.mpinMatch&&!this.validConfirmMpin&&!this.mpinError&&!this.validMpin){var e=this.resetTpinService.getValidateTpinParam(""+this.reMpinForm.value.reMpin1+this.reMpinForm.value.reMpin2+this.reMpinForm.value.reMpin3+this.reMpinForm.value.reMpin4+this.reMpinForm.value.reMpin5+this.reMpinForm.value.reMpin6);this.setTpin(e)}}}setTpin(e){this.http.callBankingAPIService(e,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_SETUPDATEPIN).subscribe(e=>{console.log(e),"00"==e.responseParameter.opstatus&&(console.log(e.responseParameter),this.commonMethod.openPopup("div.success-popup"))})}closePopup(e){"success1"==e&&this.router.navigateByUrl("/profileDetails"),this.commonMethod.openPopup("div.popup-bottom."+e)}checkMpinMatch(e,i){return e===i}checkRepeatedDigits(e){return console.log("checkRepeatedDigits val",e),/^([0-9])\1{5}$/.test(e)?(console.log("repeated true"),!0):(console.log("repeated false"),!1)}checkConsecutiveDigits(e){return console.log("checkConsecutiveDigits val === ",e),"012345"==e||"123456"==e||"234567"==e||"345678"==e||"456789"==e||"567890"==e||"987654"==e||"876543"==e||"765432"==e||"654321"==e||"543210"==e||"098765"==e?(console.log("consecutive true"),!0):(console.log("consecutive false"),!1)}getMPINValue(){var e="";for(const i in this.mpinForm.controls){const c=this.mpinForm.get(i);i.includes("mpin")&&!c.hasError("required")&&(e+=c.value)}return e}getConfirmMPINValue(){var e="";for(const i in this.reMpinForm.controls){const c=this.reMpinForm.get(i);i.includes("reMpin")&&!c.hasError("required")&&(e+=c.value)}return e}onKeyUpEvent(e,i,c){var t,n;const o=i.which||i.keyCode;1===this.getSpasswordElement(e,c).value.length&&(7!==e?this.getSpasswordElement(e+1,c).focus():(this.getSpasswordElement(e,c).blur(),console.log("submit code "))),12===o&&1!==e&&this.getSpasswordElement(e-1,c).focus(),8!==o&&229!==o||"Unidentified"!=i.key&&("mpassword"==c?null===(t=this.mpinForm.get(this.mpinInput[e]))||void 0===t||t.setValue(""):"rmpassword"==c&&(null===(n=this.reMpinForm.get(this.reMpinInput[e]))||void 0===n||n.setValue("")),this.getSpasswordElement(e-1,c).focus())}onFocusEvent(e,i){for(let c=1;c<e;c++){const e=this.getSpasswordElement(c,i);if(!e.value){e.focus();break}}}getSpasswordElement(e,i){return"mpassword"==i?this.mpinRows._results[e].nativeElement:"rmpassword"==i?this.reMpinRows._results[e].nativeElement:void 0}goBack(){}goToPage(e){this.router.navigateByUrl("/"+e)}}return e.\u0275fac=function(i){return new(i||e)(r.Yb(s.c),r.Yb(a.a),r.Yb(d.a),r.Yb(l.a),r.Yb(p.a),r.Yb(o.n),r.Yb(m.a),r.Yb(u.a),r.Yb(h))},e.\u0275cmp=r.Sb({type:e,selectors:[["app-reset-new-tpin"]],viewQuery:function(e,i){var c;1&e&&(r.Yc(g,!0),r.Yc(f,!0)),2&e&&(r.Dc(c=r.mc())&&(i.mpinRows=c),r.Dc(c=r.mc())&&(i.reMpinRows=c))},decls:92,vars:18,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[1,"ux-input","mb-0"],[1,"col-12","col-md-10","col-lg-10","col-xl-10"],[3,"formGroup"],[1,"row3"],["class","col-sm-2 col-2 col-md-2",4,"ngFor","ngForOf"],["Class","col-12 col-md-12 col-lg-10 col-xl-10"],["class","error-message",4,"ngIf"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[1,"popup-bottom","md-popup","success-popup"],[1,"row","mt-3"],[1,"success"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"row1","mt-3"],[1,"col-12","text-center"],[1,"ux-button","primary","md","ok-btn",3,"click"],[3,"click"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["type","tel","maxlength","1","placeholder","\u25cf","pattern","\\d*",3,"id","formControlName","keyup"],["mpinRow",""],[1,"error-message"],["reMpinRow",""]],template:function(e,i){1&e&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,M,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19,"Authentication"),r.dc(),r.dc(),r.Zb(20,"div",18),r.dc(),r.ec(21,"div",13),r.ec(22,"div",19),r.ec(23,"div",20),r.ec(24,"div",13),r.ec(25,"div",21),r.ec(26,"div",13),r.ec(27,"div",22),r.ec(28,"div",23),r.ec(29,"em",24),r.Sc(30,"Reset TPIN"),r.dc(),r.dc(),r.dc(),r.ec(31,"div",25),r.ec(32,"div",5),r.ec(33,"div",26),r.ec(34,"div",13),r.ec(35,"div",12),r.ec(36,"div",27),r.ec(37,"label"),r.Sc(38,"Enter TPIN"),r.dc(),r.dc(),r.dc(),r.ec(39,"div",28),r.ec(40,"form",29),r.ec(41,"div",30),r.Rc(42,b,4,2,"div",31),r.qc(43,"slice"),r.dc(),r.dc(),r.dc(),r.ec(44,"div",32),r.ec(45,"div",23),r.Rc(46,w,3,3,"p",33),r.Rc(47,S,3,3,"p",33),r.dc(),r.dc(),r.dc(),r.ec(48,"div",13),r.ec(49,"div",12),r.ec(50,"div",27),r.ec(51,"label"),r.Sc(52,"Re-enter TPIN"),r.dc(),r.dc(),r.dc(),r.ec(53,"div",28),r.ec(54,"form",29),r.ec(55,"div",30),r.Rc(56,y,4,2,"div",31),r.qc(57,"slice"),r.dc(),r.dc(),r.dc(),r.ec(58,"div",32),r.ec(59,"div",23),r.Rc(60,E,3,3,"p",33),r.Rc(61,I,3,3,"p",33),r.Rc(62,k,3,3,"p",33),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(63,"div",34),r.ec(64,"div",35),r.Zb(65,"img",36),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(66,"div",22),r.ec(67,"ul",37),r.ec(68,"li"),r.ec(69,"div",38),r.ec(70,"button",39),r.lc("click",(function(){return i.goBack()})),r.Sc(71,"Back"),r.dc(),r.dc(),r.ec(72,"div",38),r.ec(73,"button",40),r.lc("click",(function(){return i.submitTpin()})),r.Sc(74,"Submit"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(75,"div",41),r.ec(76,"div",42),r.ec(77,"a"),r.Zb(78,"img",43),r.dc(),r.dc(),r.Zb(79,"div",44),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(80,"div",45),r.ec(81,"div",46),r.ec(82,"div",47),r.Zb(83,"img",48),r.ec(84,"h3"),r.Sc(85,"Success"),r.dc(),r.ec(86,"h5"),r.Sc(87,"TPIN changed successfully"),r.dc(),r.dc(),r.dc(),r.ec(88,"div",49),r.ec(89,"div",50),r.ec(90,"button",51),r.lc("click",(function(){return i.goToPage("profileDetails")})),r.Sc(91,"Ok"),r.dc(),r.dc(),r.dc(),r.dc()),2&e&&(r.Mb(9),r.uc("ngForOf",i.DataService.breadcrumblist),r.Mb(31),r.uc("formGroup",i.mpinForm),r.Mb(2),r.uc("ngForOf",r.tc(43,10,i.mpinInput,0,6)),r.Mb(4),r.uc("ngIf",i.mpinError),r.Mb(1),r.uc("ngIf",i.validMpin),r.Mb(7),r.uc("formGroup",i.reMpinForm),r.Mb(2),r.uc("ngForOf",r.tc(57,14,i.reMpinInput,0,6)),r.Mb(4),r.uc("ngIf",i.confMpinError),r.Mb(1),r.uc("ngIf",!i.mpinMatch),r.Mb(1),r.uc("ngIf",i.validConfirmMpin))},directives:[o.s,n.I,n.t,n.k,o.t,n.c,n.n,n.z,n.s,n.i],pipes:[o.E,v.a],styles:[""]}),e})()}];let N=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(i){return new(i||e)},imports:[[s.g.forChild(R)],s.g]}),e})(),P=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(i){return new(i||e)},imports:[[o.c,N,n.m,t.a,n.C]]}),e})()}}]);