(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{OXpz:function(e,t,c){"use strict";c.d(t,"d",(function(){return n})),c.d(t,"b",(function(){return r})),c.d(t,"a",(function(){return s})),c.d(t,"c",(function(){return d}));var o=c("fXoL"),i=c("3Pt+");let n=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&!/^[0-9]*$/.test(this.control.value)){let e=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(i.r))},e.\u0275dir=o.Tb({type:e,selectors:[["","numbersOnly",""]],hostBindings:function(e,t){1&e&&o.lc("input",(function(e){return t.ngOnChanges(e)}))},features:[o.Kb]}),e})(),r=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&this.control.value){let e=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(i.r))},e.\u0275dir=o.Tb({type:e,selectors:[["","digitOnly",""]],hostBindings:function(e,t){1&e&&o.lc("input",(function(e){return t.ngOnChanges(e)}))},features:[o.Kb]}),e})(),s=(()=>{class e{constructor(e){this.el=e,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(e){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(e.key))return;let t=this.el.nativeElement.value;const c=this.el.nativeElement.selectionStart,o=[t.slice(0,c),"Decimal"==e.key?".":e.key,t.slice(c)].join("");o&&!String(o).match(this.regex)&&e.preventDefault()}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(o.o))},e.\u0275dir=o.Tb({type:e,selectors:[["","amountOnly",""]],hostBindings:function(e,t){1&e&&o.lc("keydown",(function(e){return t.onKeyDown(e)}))}}),e})(),d=(()=>{class e{constructor(e){this._el=e}onInputChange(e){const t=this._el.nativeElement.value;this._el.nativeElement.value=t.replace(/[^0-9]*/g,""),t!==this._el.nativeElement.value&&e.stopPropagation()}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(o.o))},e.\u0275dir=o.Tb({type:e,selectors:[["input","numericOnly",""]],hostBindings:function(e,t){1&e&&o.lc("input",(function(e){return t.onInputChange(e)}))}}),e})()},Zbzs:function(e,t,c){"use strict";c.r(t),c.d(t,"FormFifteenGhAuthModule",(function(){return y}));var o=c("3Pt+"),i=c("PCNd"),n=c("ofXK"),r=c("tyNb"),s=c("fXoL"),d=c("EnSQ"),l=c("+VxH"),a=c("L7Xq"),u=c("H9Rt"),m=c("5IsW"),f=c("OXpz"),h=c("Eioz");const p=["fifteenGHRow"];function v(e,t){if(1&e){const e=s.fc();s.ec(0,"li"),s.ec(1,"a",49),s.lc("click",(function(){s.Hc(e);const c=t.$implicit;return s.pc().dataService.breadcrumroute(c.routeName)})),s.Sc(2),s.qc(3,"translate"),s.dc(),s.dc()}if(2&e){const e=t.$implicit;s.Mb(2),s.Tc(s.rc(3,1,e.currentRoute))}}function g(e,t){if(1&e){const e=s.fc();s.ec(0,"div",50),s.ec(1,"div",51),s.ec(2,"input",52,53),s.lc("keyup",(function(c){s.Hc(e);const o=t.index;return s.pc().onKeyUpEvent(o,c,"otp")})),s.dc(),s.dc(),s.dc()}if(2&e){const e=t.$implicit,c=t.index;s.Mb(2),s.wc("id","otppassword",c,""),s.vc("formControlName",e)}}const b=[{path:"",component:(()=>{class e{constructor(e,t,c,o,i,n,r){this.router=e,this.dataService=t,this.otpSessionService=c,this.http=o,this.storage=i,this.constant=n,this.date=r,this.fifteenGHInput=["otp1","otp2","otp3","otp4","otp5","otp6"]}ngOnInit(){this.buildForm(),this.dataService.setPageSettings("Form 15 G/H"),this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.dataService.getBreadcrumb("AUTHORIZATION",this.router.url)}buildForm(){this.formFifteenAuth=new o.j({otp1:new o.g("",[o.G.required,o.G.maxLength(1)]),otp2:new o.g("",[o.G.required,o.G.maxLength(1)]),otp3:new o.g("",[o.G.required,o.G.maxLength(1)]),otp4:new o.g("",[o.G.required,o.G.maxLength(1)]),otp5:new o.g("",[o.G.required,o.G.maxLength(1)]),otp6:new o.g("",[o.G.required,o.G.maxLength(1)])})}validateForm(){if(this.formFifteenAuth.invalid)return this.formFifteenAuth.get("otp1").markAsTouched(),this.formFifteenAuth.get("otp2").markAsTouched(),this.formFifteenAuth.get("otp3").markAsTouched(),this.formFifteenAuth.get("otp4").markAsTouched(),this.formFifteenAuth.get("otp5").markAsTouched(),void this.formFifteenAuth.get("otp6").markAsTouched()}onKeyUpEvent(e,t,c){var o,i,n,r,s,d;const l=t.which||t.keyCode;1===(null===(o=this.getSpasswordElement(e,c))||void 0===o?void 0:o.value.length)&&(5!==e?null===(i=this.getSpasswordElement(e+1,c))||void 0===i||i.focus():(null===(n=this.getSpasswordElement(e,c))||void 0===n||n.blur(),console.log("submit code "))),12===l&&1!==e&&(null===(r=this.getSpasswordElement(e-1,c))||void 0===r||r.focus()),8!==l&&229!==l||"Unidentified"!=t.key&&"otp"==c&&(null===(s=this.formFifteenAuth.get(this.fifteenGHInput[e]))||void 0===s||s.setValue(""),null===(d=this.getSpasswordElement(e-1,c))||void 0===d||d.focus())}onFocusEvent(e,t){for(let c=1;c<e;c++){console.log("index = ",e);const o=this.getSpasswordElement(c,t);if(!o.value){o.focus();break}}}getSpasswordElement(e,t){if("otp"==t)return this.fifteenGHRows._results[e].nativeElement}goToPage(e){this.router.navigateByUrl("/"+e)}otpSubmit(){this.formFifteenAuth.valid?this.goToPage("form15GHSuccess"):this.validateForm()}}return e.\u0275fac=function(t){return new(t||e)(s.Yb(r.c),s.Yb(d.a),s.Yb(l.a),s.Yb(a.a),s.Yb(u.a),s.Yb(m.a),s.Yb(n.f))},e.\u0275cmp=s.Sb({type:e,selectors:[["app-form-fifteen-gh-auth"]],viewQuery:function(e,t){var c;1&e&&s.Yc(p,!0),2&e&&s.Dc(c=s.mc())&&(t.fifteenGHRows=c)},decls:71,vars:7,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[3,"formGroup"],[1,"row3"],["class","col-sm-2 col-2 col-md-2",4,"ngFor","ngForOf"],[1,"ux-input","password1","mt-0","mb-0"],[1,"error-message"],[1,"col-6","col-md-6"],[1,"text-left"],[1,"success-text"],[1,"text-right"],[1,"ux-linkbutton","default-underline","mt3"],[1,"vspacer40","d-block","d-md-block","d-lg-block","d-xl-block"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","pattern","\\d*",3,"id","formControlName","keyup"],["fifteenGHRow",""]],template:function(e,t){1&e&&(s.ec(0,"div",0),s.ec(1,"div",1),s.ec(2,"div",2),s.ec(3,"div",3),s.ec(4,"div",4),s.ec(5,"div",5),s.ec(6,"div",6),s.ec(7,"div",7),s.ec(8,"ul",8),s.Rc(9,v,4,3,"li",9),s.dc(),s.dc(),s.dc(),s.dc(),s.Zb(10,"div",10),s.ec(11,"div",11),s.ec(12,"div",12),s.ec(13,"div",13),s.ec(14,"div",14),s.ec(15,"div",15),s.ec(16,"div",16),s.ec(17,"div",17),s.ec(18,"h4"),s.Sc(19,"Enter OTP"),s.dc(),s.dc(),s.Zb(20,"div",18),s.dc(),s.ec(21,"div",13),s.ec(22,"div",19),s.ec(23,"div",20),s.ec(24,"div",13),s.ec(25,"div",21),s.ec(26,"div",13),s.ec(27,"div",22),s.ec(28,"div",23),s.ec(29,"em",24),s.Sc(30,"OTP sent on your registered Mobile number ending with ******0967"),s.dc(),s.dc(),s.dc(),s.ec(31,"div",25),s.ec(32,"div",5),s.ec(33,"div",26),s.ec(34,"form",27),s.ec(35,"div",28),s.Rc(36,g,4,2,"div",29),s.qc(37,"slice"),s.dc(),s.dc(),s.ec(38,"div",13),s.ec(39,"div",12),s.ec(40,"div",30),s.Zb(41,"p",31),s.dc(),s.dc(),s.dc(),s.ec(42,"div",28),s.ec(43,"div",32),s.ec(44,"div",33),s.ec(45,"p",33),s.ec(46,"span",34),s.Sc(47,"00.20"),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(48,"div",32),s.ec(49,"div",35),s.ec(50,"button",36),s.Sc(51,"Resend"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.Zb(52,"div",37),s.Zb(53,"div",37),s.dc(),s.ec(54,"div",38),s.ec(55,"div",39),s.Zb(56,"img",40),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(57,"div",22),s.ec(58,"ul",41),s.ec(59,"li"),s.ec(60,"div",42),s.ec(61,"button",43),s.Sc(62,"Cancel"),s.dc(),s.dc(),s.ec(63,"div",42),s.ec(64,"button",44),s.lc("click",(function(){return t.otpSubmit()})),s.Sc(65,"Confirm"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(66,"div",45),s.ec(67,"div",46),s.ec(68,"a"),s.Zb(69,"img",47),s.dc(),s.dc(),s.Zb(70,"div",48),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc()),2&e&&(s.Mb(9),s.uc("ngForOf",t.dataService.breadcrumblist),s.Mb(25),s.uc("formGroup",t.formFifteenAuth),s.Mb(2),s.uc("ngForOf",s.tc(37,3,t.fifteenGHInput,0,6)))},directives:[n.s,o.I,o.t,o.k,o.c,f.d,o.n,o.z,o.s,o.i],pipes:[n.E,h.a],styles:[""]}),e})()}];let w=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(t){return new(t||e)},imports:[[r.g.forChild(b)],r.g]}),e})(),y=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(t){return new(t||e)},imports:[[n.c,w,i.a,o.m,o.C]]}),e})()}}]);