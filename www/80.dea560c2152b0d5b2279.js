(window.webpackJsonp=window.webpackJsonp||[]).push([[80,109,349],{OXpz:function(t,e,i){"use strict";i.d(e,"d",(function(){return o})),i.d(e,"b",(function(){return r})),i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return a}));var n=i("fXoL"),c=i("3Pt+");let o=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&!/^[0-9]*$/.test(this.control.value)){let t=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(c.r))},t.\u0275dir=n.Tb({type:t,selectors:[["","numbersOnly",""]],hostBindings:function(t,e){1&t&&n.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[n.Kb]}),t})(),r=(()=>{class t{constructor(t){this.control=t,this.specialKeys=["Backspace","Tab"]}ngOnChanges(t){if(-1===this.specialKeys.indexOf(t.key)&&this.control.value){let t=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(t)}}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(c.r))},t.\u0275dir=n.Tb({type:t,selectors:[["","digitOnly",""]],hostBindings:function(t,e){1&t&&n.lc("input",(function(t){return e.ngOnChanges(t)}))},features:[n.Kb]}),t})(),s=(()=>{class t{constructor(t){this.el=t,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(t){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(t.key))return;let e=this.el.nativeElement.value;const i=this.el.nativeElement.selectionStart,n=[e.slice(0,i),"Decimal"==t.key?".":t.key,e.slice(i)].join("");n&&!String(n).match(this.regex)&&t.preventDefault()}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(n.o))},t.\u0275dir=n.Tb({type:t,selectors:[["","amountOnly",""]],hostBindings:function(t,e){1&t&&n.lc("keydown",(function(t){return e.onKeyDown(t)}))}}),t})(),a=(()=>{class t{constructor(t){this._el=t}onInputChange(t){const e=this._el.nativeElement.value;this._el.nativeElement.value=e.replace(/[^0-9]*/g,""),e!==this._el.nativeElement.value&&t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(n.o))},t.\u0275dir=n.Tb({type:t,selectors:[["input","numericOnly",""]],hostBindings:function(t,e){1&t&&n.lc("input",(function(t){return e.onInputChange(t)}))}}),t})()},QqKF:function(t,e,i){"use strict";i.r(e),i.d(e,"SetNewMpinModule",(function(){return _}));var n=i("ofXK"),c=i("tyNb"),o=i("3Pt+"),r=i("fXoL"),s=i("EnSQ"),a=i("TaOT"),l=i("H9Rt"),u=i("5IsW"),m=i("L7Xq"),p=i("fHQ/");let d=(()=>{class t{constructor(t,e,i,n){this.constant=t,this.encryptDecryptService=e,this.storage=i,this.dataService=n}getSetNewMPINParam(t){var e={[this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_MPIN]:this.encryptDecryptService.createMD5Value(t)};return console.log("UPI SetNEWMPIN API",JSON.stringify(e)),this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo)+this.constant.mapEncryptKey,JSON.stringify(e))}}return t.\u0275fac=function(e){return new(e||t)(r.ic(u.a),r.ic(p.a),r.ic(l.a),r.ic(s.a))},t.\u0275prov=r.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var h=i("au7T"),f=i("OXpz"),g=i("Eioz");const v=["mPINformRow"],M=["confirmMPINformRow"];function I(t,e){if(1&t){const t=r.fc();r.ec(0,"div",34),r.ec(1,"div",19),r.ec(2,"input",35,36),r.lc("keyup",(function(i){r.Hc(t);const n=e.index;return r.pc().keyUpEvent("mpin",i,n)})),r.dc(),r.dc(),r.dc()}if(2&t){const t=e.$implicit;r.Mb(2),r.vc("formControlName",t)}}function b(t,e){1&t&&(r.ec(0,"p"),r.Sc(1),r.qc(2,"translate"),r.dc()),2&t&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"ENTER_6_DIGIT_MPIN_ERROR")," "))}function y(t,e){1&t&&(r.ec(0,"p"),r.Sc(1),r.qc(2,"translate"),r.dc()),2&t&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"MPIN_SIMPLE_ERROR")," "))}function P(t,e){if(1&t){const t=r.fc();r.ec(0,"div",34),r.ec(1,"div",19),r.ec(2,"input",35,37),r.lc("keyup",(function(i){r.Hc(t);const n=e.index;return r.pc().keyUpEvent("confirmMpin",i,n)})),r.dc(),r.dc(),r.dc()}if(2&t){const t=e.$implicit;r.Mb(2),r.vc("formControlName",t)}}function N(t,e){1&t&&(r.ec(0,"p"),r.Sc(1),r.qc(2,"translate"),r.dc()),2&t&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"ENTER_6_DIGIT_CONFIRM_MPIN_ERROR")," "))}function S(t,e){1&t&&(r.ec(0,"p"),r.Sc(1),r.qc(2,"translate"),r.dc()),2&t&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"MPIN_CONFIRM_MISMATCH_ERROR")," "))}function E(t,e){1&t&&(r.ec(0,"p"),r.Sc(1),r.qc(2,"translate"),r.dc()),2&t&&(r.Mb(1),r.Uc(" ",r.rc(2,1,"MPIN_SIMPLE_ERROR")," "))}const w=[{path:"",component:(()=>{class t{constructor(t,e,i,n,c,o,r,s,a,l,u,m){this.fb=t,this.router=e,this.dataService=i,this.formValidation=n,this.localStorage=c,this.constant=o,this.http=r,this.setNewMpinService=s,this.storage=a,this.commonMethod=l,this.encryptDecryptService=u,this.location=m,this.headerdata={headerType:"CloseNewHeader",titleName:"Set New Mpin",footertype:"none"},this.oldMpinValues=[],this.validMpin=!1,this.validConfirmMpin=!1,this.mpinMatch=!0,this.formInput=["mpinInput1","mpinInput2","mpinInput3","mpinInput4","mpinInput5","mpinInput6","confirmMpinInput1","confirmMpinInput2","confirmMpinInput3","confirmMpinInput4","confirmMpinInput5","confirmMpinInput6"],this.confMpinError="",this.mpinError=""}ngOnInit(){this.dataService.changeMessage(this.headerdata),this.mpinForm=this.toFormGroup(this.formInput),this.dataService.changeMessage(this.headerdata)}goToPage(t){this.router.navigateByUrl("/"+t)}toFormGroup(t){const e={};return t.forEach(t=>{e[t]=new o.g("",o.G.required)}),new o.j(e)}keyUpEvent(t,e,i){let n=i;8===(e.keyCode||e.which)?(n=0,"mpin"==t?(this.mpinForm.patchValue({mpinInput1:"",mpinInput2:"",mpinInput3:"",mpinInput4:"",mpinInput5:"",mpinInput6:""}),this.mPinRows._results[0].nativeElement.focus()):(this.mpinForm.patchValue({confirmMpinInput1:"",confirmMpinInput2:"",confirmMpinInput3:"",confirmMpinInput4:"",confirmMpinInput5:"",confirmMpinInput6:""}),this.confirmMPinRows._results[0].nativeElement.focus())):n=i+1,"mpin"==t?n>-1&&n<6&&this.mPinRows._results[n].nativeElement.focus():n>-1&&n<6&&this.confirmMPinRows._results[n].nativeElement.focus()}checkRepeatedDigits(t){return console.log("checkRepeatedDigits val",t),/^([0-9])\1{5}$/.test(t)?(console.log("repeated true"),!0):(console.log("repeated false"),!1)}checkConsecutiveDigits(t){return console.log("checkConsecutiveDigits val === ",t),"012345"==t||"123456"==t||"234567"==t||"345678"==t||"456789"==t||"567890"==t||"987654"==t||"876543"==t||"765432"==t||"654321"==t||"543210"==t||"098765"==t?(console.log("consecutive true"),!0):(console.log("consecutive false"),!1)}callMpinAPI(){}validateForm(){if(this.mpinForm.invalid){this.mpinError="",this.confMpinError="",this.formValidation.markFormGroupTouched(this.mpinForm);for(const t in this.mpinForm.controls){const e=this.mpinForm.get(t);t.includes("mpin")&&e.hasError("required")?this.mpinError="* This field is required":t.includes("confirmMpin")&&e.hasError("required")&&(this.confMpinError="* This field is required")}}else this.mpinError="",this.confMpinError=""}checkMpinMatch(t,e){return t===e}submitForm(){if(this.validateForm(),this.mpinForm.valid){console.log("mpin ",this.getMPINValue()),console.log("confirm mpin ",this.getConfirmMPINValue());let t=this.checkConsecutiveDigits(this.getMPINValue());console.log("validMpin1",t);let e=this.checkRepeatedDigits(this.getMPINValue());console.log("validMpin2",e),this.validMpin=t||e,console.log("this.validMpin",this.validMpin);let i=this.checkConsecutiveDigits(this.getConfirmMPINValue()),n=this.checkRepeatedDigits(this.getConfirmMPINValue());this.validConfirmMpin=i||n,console.log("this.validConfirmMpin",this.validConfirmMpin),this.mpinMatch=this.checkMpinMatch(this.getMPINValue(),this.getConfirmMPINValue()),console.log("this.mpinMatch",this.mpinMatch),this.confMpinError||!this.mpinMatch||this.validConfirmMpin||this.mpinError||this.validMpin||this.callBankingService()}}getMPINValue(){var t="";for(const e in this.mpinForm.controls){const i=this.mpinForm.get(e);e.includes("mpin")&&!i.hasError("required")&&(t+=i.value)}return t}getConfirmMPINValue(){var t="";for(const e in this.mpinForm.controls){const i=this.mpinForm.get(e);e.includes("confirmMpin")&&!i.hasError("required")&&(t+=i.value)}return t}callBankingService(){var t=this.setNewMpinService.getSetNewMPINParam(this.getMPINValue());let e=this.localStorage.getLocalStorage(this.constant.storage_deviceId);this.setUPINEWMpinAPIcall(t,e)}setUPINEWMpinAPIcall(t,e){this.http.callBankingAPIService(t,e,this.constant.upiserviceName_UPISETMPIN,!0).subscribe(t=>{console.log(t);var e=t.responseParameter;"00"==e.opstatus?(console.log(t.responseParameter),this.showMPINSuccessModal()):this.errorCallBack(t.subActionId,e)})}showMPINSuccessModal(){showMPINSuccessModal()}hideMPINSuccessModal(){hideMPINSuccessModal(),this.router.navigate(["/upiLogin"])}errorCallBack(t,e){"02"!=e.opstatus&&"03"!=e.opstatus||showToastMessage(e.Result,"error")}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(o.f),r.Yb(c.c),r.Yb(s.a),r.Yb(a.a),r.Yb(l.a),r.Yb(u.a),r.Yb(m.a),r.Yb(d),r.Yb(l.a),r.Yb(h.a),r.Yb(p.a),r.Yb(n.n))},t.\u0275cmp=r.Sb({type:t,selectors:[["app-set-new-mpin"]],viewQuery:function(t,e){var i;1&t&&(r.Yc(v,!0),r.Yc(M,!0)),2&t&&(r.Dc(i=r.mc())&&(e.mPinRows=i),r.Dc(i=r.mc())&&(e.confirmMPinRows=i))},decls:72,vars:23,consts:[[3,"formGroup","ngSubmit"],[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1"],[1,"ux-input","password1","p1","mt-0","mb-0"],["for","sapassword",1,"mb0"],[1,"row3"],["class","col-sm-2 col-2 col-md-2",4,"ngFor","ngForOf"],[1,"ux-input","input-error","password1","p1","mt-0","mb-0"],[4,"ngIf"],[1,"col-sm-12","col-12","col-md-12","mt-2"],[1,"ux-input","password1","p1","mb-0"],["for","capassword",1,"mb0"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","mt-2"],[1,"orderlist2","mar-b"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"mpin-submit","ux-button","primary","md",3,"disabled"],[1,"sticky-actions-spacer"],[1,"popup-bottom","mpin-success"],["action","#","id","success-form"],[1,"row1","mt-3"],[1,"success"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"col-12","text-center"],[1,"ux-button","primary","md",3,"click"],[1,"col-sm-2","col-2","col-md-2"],["placeholder","\u25cf","type","tel","autocomplete","off","numbersOnly","","maxlength","1",3,"formControlName","keyup"],["mPINformRow",""],["confirmMPINformRow",""]],template:function(t,e){1&t&&(r.ec(0,"form",0),r.lc("ngSubmit",(function(){return e.submitForm()})),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"div",8),r.ec(9,"div",9),r.ec(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",6),r.ec(13,"div",10),r.ec(14,"div",6),r.ec(15,"div",8),r.ec(16,"div",12),r.ec(17,"label",13),r.Sc(18,"Enter MPIN"),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(19,"div",14),r.Rc(20,I,4,1,"div",15),r.qc(21,"slice"),r.dc(),r.ec(22,"div",6),r.ec(23,"div",8),r.ec(24,"div",16),r.Rc(25,b,3,3,"p",17),r.Rc(26,y,3,3,"p",17),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(27,"div",18),r.ec(28,"div",6),r.ec(29,"div",8),r.ec(30,"div",19),r.ec(31,"label",20),r.Sc(32,"Confirm MPIN"),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(33,"div",14),r.Rc(34,P,4,1,"div",15),r.qc(35,"slice"),r.dc(),r.ec(36,"div",6),r.ec(37,"div",8),r.ec(38,"div",16),r.Rc(39,N,3,3,"p",17),r.Rc(40,S,3,3,"p",17),r.Rc(41,E,3,3,"p",17),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(42,"div",21),r.ec(43,"h4"),r.Sc(44," Note "),r.dc(),r.ec(45,"ol",22),r.ec(46,"li"),r.Sc(47,"Login MPIN should be minimum 6 digit numeric only."),r.dc(),r.ec(48,"li"),r.Sc(49,"No special characters allowed."),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(50,"div",23),r.ec(51,"div",24),r.ec(52,"div",5),r.ec(53,"div",6),r.ec(54,"button",25),r.Sc(55,"Submit"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(56,"div",26),r.dc(),r.ec(57,"div",27),r.ec(58,"form",28),r.ec(59,"div",29),r.ec(60,"div",30),r.Zb(61,"img",31),r.ec(62,"h3"),r.Sc(63),r.qc(64,"translate"),r.dc(),r.ec(65,"h5"),r.Sc(66),r.qc(67,"translate"),r.dc(),r.dc(),r.dc(),r.ec(68,"div",29),r.ec(69,"div",32),r.ec(70,"button",33),r.lc("click",(function(){return e.hideMPINSuccessModal()})),r.Sc(71,"Ok"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&t&&(r.uc("formGroup",e.mpinForm),r.Mb(20),r.uc("ngForOf",r.tc(21,11,e.formInput,0,6)),r.Mb(5),r.uc("ngIf",e.mpinError),r.Mb(1),r.uc("ngIf",e.validMpin),r.Mb(8),r.uc("ngForOf",r.tc(35,15,e.formInput,6,12)),r.Mb(5),r.uc("ngIf",e.confMpinError),r.Mb(1),r.uc("ngIf",!e.mpinMatch),r.Mb(1),r.uc("ngIf",e.validConfirmMpin),r.Mb(13),r.uc("disabled",e.mpinForm.invalid),r.Mb(9),r.Uc(" ",r.rc(64,19,"SUCCESS")," "),r.Mb(3),r.Uc(" ",r.rc(67,21,"LOGIN_MPIN_RESET_SUCCESS")," "))},directives:[o.I,o.t,o.k,n.s,n.t,o.u,o.c,f.d,o.n,o.s,o.i],pipes:[n.E,g.a],styles:[""]}),t})()}];let k=(()=>{class t{}return t.\u0275mod=r.Wb({type:t}),t.\u0275inj=r.Vb({factory:function(e){return new(e||t)},imports:[[c.g.forChild(w)],c.g]}),t})();var C=i("PCNd"),R=i("AvjH");let _=(()=>{class t{}return t.\u0275mod=r.Wb({type:t}),t.\u0275inj=r.Vb({factory:function(e){return new(e||t)},imports:[[n.c,k,o.m,o.C,C.a,R.a]]}),t})()},TaOT:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var n=i("fXoL"),c=i("fUdP");let o=(()=>{class t{constructor(t){this.customCurrencyPipe=t}markFormGroupTouched(t){Object.values(t.controls).forEach(t=>{t.markAsTouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupTouched(t))})}markFormGroupUntouched(t){Object.values(t.controls).forEach(t=>{t.markAsUntouched(),t.controls&&t.controls.forEach(t=>this.markFormGroupUntouched(t))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:t=>{let e=t;return e=e.reduce((t,i,n)=>{let c=t;return c+=i,e.length!==n+1&&(c+=", "),c},""),"These characters are not allowed: "+e}}}validateForm(t,e,i){const n=t;for(const c in e)if(c){e[c]="";const t=n.get(c),o=this.validationMessages();if(t&&!t.valid&&(!i||t.dirty||t.touched))for(const i in t.errors)console.log("======>inside",i),e[c]=i&&"invalid_characters"!==i?e[c]||o[i]:e[c]||o[i](t.errors[i])}return e}formatCurrency(t,e,i){if("0"!=t)if(""!=t){let i=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==i.trim().replace(/[^.0-9]+/g,"")?e.contains("amount")&&e.get("amount").reset():"0"==i.trim().replace(/[^.0-9]+/g,"")?e.get("amount").reset():(console.log(i),e.patchValue({amount:i}))}else e.get("amount").reset("");else e.contains("amount")&&e.get("amount").reset()}formatTransLimit(t,e){if("0"!=t)if(""!=t){let i=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==i?e.contains("transactionLimit")&&e.get("transactionLimit").reset():"0"==i.trim()?e.get("transactionLimit").reset():(console.log(i),e.patchValue({transactionLimit:i}))}else e.get("transactionLimit").reset("");else e.contains("transactionLimit")&&e.get("transactionLimit").reset()}formatDynamicCurrency(t,e){$("#"+t).val()&&"\u20b9 0.00"!=$("#"+t).val()?e.patchValue({amount:$("#"+t).val()}):e.get("amount").reset("")}deFormatValue(t,e){e.patchValue({amount:t.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(t,e,i){if("0"!=t)if(""!=t){let n=this.customCurrencyPipe.transform(t.trim(),"decimal");" 0.00"==n?e.contains(i)&&e.get(i).reset():"0"==n.trim()?e.get(i).reset():e.controls[i].patchValue("\u20b9"+n)}else e.get(i).reset("");else e.contains(i)&&e.get(i).reset()}}return t.\u0275fac=function(e){return new(e||t)(n.ic(c.a))},t.\u0275prov=n.Ub({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);