(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{DjVX:function(e,c,t){"use strict";t.r(c),t.d(c,"SendMoneyLoanAuthModule",(function(){return v}));var n=t("PCNd"),o=t("3Pt+"),i=t("ofXK"),d=t("tyNb"),r=t("fXoL"),s=t("EnSQ"),a=t("OXpz"),l=t("Eioz");const u=["sendMoneyOtpRow"];function p(e,c){if(1&e){const e=r.fc();r.ec(0,"li"),r.ec(1,"a",61),r.lc("click",(function(){r.Hc(e);const t=c.$implicit;return r.pc().DataService.breadcrumroute(t.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&e){const e=c.$implicit;r.Mb(2),r.Tc(r.rc(3,1,e.currentRoute))}}const m=[{path:"",component:(()=>{class e{constructor(e,c){this.router=e,this.DataService=c,this.aggreePaymentOtp=["otp1","otp2","otp3","otp4","otp5","otp6"]}ngOnInit(){this.buildForm(),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("SEND_MONEY_LOAN",this.router.url),this.DataService.setPageSettings("SEND_MONEY_LOAN")}buildForm(){this.sendMoneyLoanAuthForm=new o.j({otp1:new o.g("",[o.G.required,o.G.maxLength(1)]),otp2:new o.g("",[o.G.required,o.G.maxLength(1)]),otp3:new o.g("",[o.G.required,o.G.maxLength(1)]),otp4:new o.g("",[o.G.required,o.G.maxLength(1)]),otp5:new o.g("",[o.G.required,o.G.maxLength(1)]),otp6:new o.g("",[o.G.required,o.G.maxLength(1)])})}validateForm(){if(this.sendMoneyLoanAuthForm.invalid)return this.sendMoneyLoanAuthForm.get("otp1").markAsTouched(),this.sendMoneyLoanAuthForm.get("otp2").markAsTouched(),this.sendMoneyLoanAuthForm.get("otp3").markAsTouched(),this.sendMoneyLoanAuthForm.get("otp4").markAsTouched(),this.sendMoneyLoanAuthForm.get("otp5").markAsTouched(),void this.sendMoneyLoanAuthForm.get("otp6").markAsTouched()}onKeyUpEvent(e,c,t){var n;const o=c.which||c.keyCode;1===this.getSpasswordElement(e,t).value.length&&(7!==e?this.getSpasswordElement(e+1,t).focus():(this.getSpasswordElement(e,t).blur(),console.log("submit code "))),12===o&&1!==e&&this.getSpasswordElement(e-1,t).focus(),8!==o&&229!==o||"Unidentified"!=c.key&&("otp"==t&&(null===(n=this.sendMoneyLoanAuthForm.get(this.aggreePaymentOtp[e]))||void 0===n||n.setValue("")),this.getSpasswordElement(e-1,t).focus())}onFocusEvent(e,c){for(let t=1;t<e;t++){const e=this.getSpasswordElement(t,c);if(!e.value){e.focus();break}}}getSpasswordElement(e,c){if("otp"==c)return this.sendMoneyOtpRow._results[e].nativeElement}goToPage(e){this.router.navigateByUrl("/"+e)}sendMoneyLoanAuthSubmit(){this.sendMoneyLoanAuthForm.valid?this.goToPage("sendMoneyLoanReceipt"):this.validateForm()}}return e.\u0275fac=function(c){return new(c||e)(r.Yb(d.c),r.Yb(s.a))},e.\u0275cmp=r.Sb({type:e,selectors:[["app-send-money-loan-auth"]],viewQuery:function(e,c){var t;1&e&&r.Yc(u,!0),2&e&&r.Dc(t=r.mc())&&(c.sendMoneyOtpRow=t)},decls:150,vars:5,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[3,"formGroup"],[1,"row3"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["id","otppassword1","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp1",3,"keyup"],["sendMoneyOtpRow",""],["id","otppassword2","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp2",3,"keyup"],["id","otppassword3","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp3",3,"keyup"],["id","otppassword4","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp4",3,"keyup"],["id","otppassword5","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp5",3,"keyup"],["id","otppassword6","type","password","numbersOnly","","maxlength","1","placeholder","\u25cf","formControlName","otp5",3,"keyup"],[1,"ux-input","password1","mt-0","mb-0"],[1,"error-message"],[1,"col-6","col-md-6"],[1,"text-left"],[1,"success-text"],[1,"text-right"],[1,"ux-linkbutton","default-underline","mt3"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],["src","assets/images/svg/rupee-bl.svg","alt","rupees-icon"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"]],template:function(e,c){1&e&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,p,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19,"Authentication"),r.dc(),r.dc(),r.Zb(20,"div",18),r.dc(),r.ec(21,"div",13),r.ec(22,"div",19),r.ec(23,"div",20),r.ec(24,"div",13),r.ec(25,"div",21),r.ec(26,"div",13),r.ec(27,"div",22),r.ec(28,"div",23),r.ec(29,"em",24),r.Sc(30,"OTP sent on your registered Mobile number ending with ******0967"),r.dc(),r.dc(),r.dc(),r.ec(31,"div",25),r.ec(32,"div",5),r.ec(33,"div",26),r.ec(34,"form",27),r.ec(35,"div",28),r.ec(36,"div",29),r.ec(37,"div",30),r.ec(38,"input",31,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(0,e,"otp")})),r.dc(),r.dc(),r.dc(),r.ec(40,"div",29),r.ec(41,"div",30),r.ec(42,"input",33,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(1,e,"otp")})),r.dc(),r.dc(),r.dc(),r.ec(44,"div",29),r.ec(45,"div",30),r.ec(46,"input",34,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(2,e,"otp")})),r.dc(),r.dc(),r.dc(),r.ec(48,"div",29),r.ec(49,"div",30),r.ec(50,"input",35,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(3,e,"otp")})),r.dc(),r.dc(),r.dc(),r.ec(52,"div",29),r.ec(53,"div",30),r.ec(54,"input",36,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(4,e,"otp")})),r.dc(),r.dc(),r.dc(),r.ec(56,"div",29),r.ec(57,"div",30),r.ec(58,"input",37,32),r.lc("keyup",(function(e){return c.onKeyUpEvent(5,e,"otp")})),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(60,"div",13),r.ec(61,"div",12),r.ec(62,"div",38),r.Zb(63,"p",39),r.dc(),r.dc(),r.dc(),r.ec(64,"div",28),r.ec(65,"div",40),r.ec(66,"div",41),r.ec(67,"p",41),r.ec(68,"span",42),r.Sc(69,"00.20"),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(70,"div",40),r.ec(71,"div",43),r.ec(72,"button",44),r.Sc(73),r.qc(74,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(75,"div",45),r.ec(76,"div",46),r.Zb(77,"img",47),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(78,"div",19),r.ec(79,"div",48),r.ec(80,"div",49),r.ec(81,"div",50),r.ec(82,"div",5),r.ec(83,"h6"),r.Sc(84,"From Account"),r.dc(),r.ec(85,"h5"),r.Sc(86,"34354645645654"),r.dc(),r.dc(),r.dc(),r.ec(87,"div",51),r.ec(88,"div",5),r.ec(89,"h6"),r.Sc(90,"To Account"),r.dc(),r.ec(91,"h5"),r.Sc(92,"34354645645654"),r.dc(),r.dc(),r.dc(),r.ec(93,"div",51),r.ec(94,"div",5),r.ec(95,"h6"),r.Sc(96,"To Account Name"),r.dc(),r.ec(97,"h5"),r.Sc(98,"Anand Madhvan"),r.dc(),r.dc(),r.dc(),r.ec(99,"div",51),r.ec(100,"div",5),r.ec(101,"h6"),r.Sc(102,"Loan Type"),r.dc(),r.ec(103,"h5"),r.Sc(104,"Home Loan"),r.dc(),r.dc(),r.dc(),r.ec(105,"div",51),r.ec(106,"div",5),r.ec(107,"h6"),r.Sc(108,"Branch Name"),r.dc(),r.ec(109,"h5"),r.Sc(110,"PSB"),r.dc(),r.dc(),r.dc(),r.ec(111,"div",51),r.ec(112,"div",5),r.ec(113,"h6"),r.Sc(114,"IFSC"),r.dc(),r.ec(115,"h5"),r.Sc(116,"HDFCB000005"),r.dc(),r.dc(),r.dc(),r.ec(117,"div",51),r.ec(118,"div",5),r.ec(119,"h6"),r.Sc(120,"EMI Amount"),r.dc(),r.ec(121,"h5"),r.Zb(122,"img",52),r.Sc(123," 12,000.00"),r.dc(),r.dc(),r.dc(),r.ec(124,"div",51),r.ec(125,"div",5),r.ec(126,"h6"),r.Sc(127,"Remarks"),r.dc(),r.ec(128,"h5"),r.Sc(129,"Payment 2020"),r.dc(),r.dc(),r.dc(),r.ec(130,"div",51),r.ec(131,"div",5),r.ec(132,"h6"),r.Sc(133,"Date"),r.dc(),r.ec(134,"h5"),r.Sc(135,"05 OCT 2020"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(136,"div",22),r.ec(137,"ul",53),r.ec(138,"li"),r.ec(139,"div",54),r.ec(140,"button",55),r.Sc(141,"Cancel"),r.dc(),r.dc(),r.ec(142,"div",54),r.ec(143,"button",56),r.lc("click",(function(){return c.sendMoneyLoanAuthSubmit()})),r.Sc(144,"Submit"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(145,"div",57),r.ec(146,"div",58),r.ec(147,"a"),r.Zb(148,"img",59),r.dc(),r.dc(),r.Zb(149,"div",60),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&e&&(r.Mb(9),r.uc("ngForOf",c.DataService.breadcrumblist),r.Mb(25),r.uc("formGroup",c.sendMoneyLoanAuthForm),r.Mb(39),r.Tc(r.rc(74,3,"RESEND")))},directives:[i.s,o.I,o.t,o.k,o.c,a.d,o.n,o.s,o.i],pipes:[l.a],styles:[""]}),e})()}];let h=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(c){return new(c||e)},imports:[[d.g.forChild(m)],d.g]}),e})(),v=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(c){return new(c||e)},imports:[[i.c,h,o.m,n.a,o.C]]}),e})()},OXpz:function(e,c,t){"use strict";t.d(c,"d",(function(){return i})),t.d(c,"b",(function(){return d})),t.d(c,"a",(function(){return r})),t.d(c,"c",(function(){return s}));var n=t("fXoL"),o=t("3Pt+");let i=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&!/^[0-9]*$/.test(this.control.value)){let e=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(o.r))},e.\u0275dir=n.Tb({type:e,selectors:[["","numbersOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[n.Kb]}),e})(),d=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&this.control.value){let e=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(o.r))},e.\u0275dir=n.Tb({type:e,selectors:[["","digitOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[n.Kb]}),e})(),r=(()=>{class e{constructor(e){this.el=e,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(e){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(e.key))return;let c=this.el.nativeElement.value;const t=this.el.nativeElement.selectionStart,n=[c.slice(0,t),"Decimal"==e.key?".":e.key,c.slice(t)].join("");n&&!String(n).match(this.regex)&&e.preventDefault()}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(n.o))},e.\u0275dir=n.Tb({type:e,selectors:[["","amountOnly",""]],hostBindings:function(e,c){1&e&&n.lc("keydown",(function(e){return c.onKeyDown(e)}))}}),e})(),s=(()=>{class e{constructor(e){this._el=e}onInputChange(e){const c=this._el.nativeElement.value;this._el.nativeElement.value=c.replace(/[^0-9]*/g,""),c!==this._el.nativeElement.value&&e.stopPropagation()}}return e.\u0275fac=function(c){return new(c||e)(n.Yb(n.o))},e.\u0275dir=n.Tb({type:e,selectors:[["input","numericOnly",""]],hostBindings:function(e,c){1&e&&n.lc("input",(function(e){return c.onInputChange(e)}))}}),e})()}}]);