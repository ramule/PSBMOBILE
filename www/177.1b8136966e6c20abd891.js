(window.webpackJsonp=window.webpackJsonp||[]).push([[177],{JWzM:function(c,e,t){"use strict";t.r(e),t.d(e,"ExistingBillPaymentAuthenticationModule",(function(){return h}));var i=t("PCNd"),o=t("ofXK"),d=t("tyNb"),r=t("3Pt+"),n=t("fXoL"),s=t("EnSQ"),l=t("au7T"),a=t("Eioz");const m=["OTPFormRow"];function u(c,e){if(1&c){const c=n.fc();n.ec(0,"li"),n.ec(1,"a",63),n.lc("click",(function(){n.Hc(c);const t=e.$implicit;return n.pc().DataService.breadcrumroute(t.routeName)})),n.Sc(2),n.qc(3,"translate"),n.dc(),n.dc()}if(2&c){const c=e.$implicit;n.Mb(2),n.Tc(n.rc(3,1,c.currentRoute))}}function p(c,e){if(1&c){const c=n.fc();n.ec(0,"div",64),n.ec(1,"div",65),n.ec(2,"input",66,67),n.lc("keyup",(function(t){n.Hc(c);const i=e.index;return n.pc().onKeyUpEvent(i,t,"otp")})),n.dc(),n.dc(),n.dc()}if(2&c){const c=e.$implicit,t=e.index;n.Mb(2),n.wc("id","otppassword",t,""),n.vc("formControlName",c)}}const v=[{path:"",component:(()=>{class c{constructor(c,e,t){this.router=c,this.DataService=e,this.commonMethod=t,this.otpFormInput=["otp1","otp2","otp3","otp4","otp5","otp6"]}ngOnInit(){this.buildForm(),this.DataService.setPageSettings("AUTHENTICATION"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("AUTHENTICATION",this.router.url)}buildForm(){this.otpForm=new r.j({otp1:new r.g("",[r.G.required,r.G.maxLength(1)]),otp2:new r.g("",[r.G.required,r.G.maxLength(1)]),otp3:new r.g("",[r.G.required,r.G.maxLength(1)]),otp4:new r.g("",[r.G.required,r.G.maxLength(1)]),otp5:new r.g("",[r.G.required,r.G.maxLength(1)]),otp6:new r.g("",[r.G.required,r.G.maxLength(1)])})}validateForm(){if(this.otpForm.invalid)return this.otpForm.get("otp1").markAsTouched(),this.otpForm.get("otp2").markAsTouched(),this.otpForm.get("otp3").markAsTouched(),this.otpForm.get("otp4").markAsTouched(),this.otpForm.get("otp5").markAsTouched(),void this.otpForm.get("otp6").markAsTouched()}goToPage(c){this.router.navigateByUrl("/"+c)}otpSubmit(c){this.otpForm.valid?this.goToPage(c):this.validateForm()}onKeyUpEvent(c,e,t){var i;const o=e.which||e.keyCode;1===this.getSpasswordElement(c,t).value.length&&(7!==c?this.getSpasswordElement(c+1,t).focus():(this.getSpasswordElement(c,t).blur(),console.log("submit code "))),12===o&&1!==c&&this.getSpasswordElement(c-1,t).focus(),8!==o&&229!==o||"Unidentified"!=e.key&&("otp"==t&&(null===(i=this.otpForm.get(this.otpFormInput[c]))||void 0===i||i.setValue("")),this.getSpasswordElement(c-1,t).focus())}onFocusEvent(c,e){for(let t=1;t<c;t++){const c=this.getSpasswordElement(t,e);if(!c.value){c.focus();break}}}getSpasswordElement(c,e){if("otp"==e)return this.otpPinRows._results[c].nativeElement}}return c.\u0275fac=function(e){return new(e||c)(n.Yb(d.c),n.Yb(s.a),n.Yb(l.a))},c.\u0275cmp=n.Sb({type:c,selectors:[["app-existing-bill-payment-authentication"]],viewQuery:function(c,e){var t;1&c&&n.Yc(m,!0),2&c&&n.Dc(t=n.mc())&&(e.otpPinRows=t)},decls:132,vars:7,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","bill-wrapper"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-10","col-12"],[1,"col-md-2","col-12"],[1,"header-actions"],["src","assets/images/icons/billpay.png","alt","billpay-img",1,"small-img"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"col-12","col-md-8","col-lg-9","col-xl-9"],[1,"col-12","col-md-12"],[1,"ux-input"],[1,"info-message2"],[1,"col-12","col-md-8","col-lg-8","col-xl-7"],[1,"col-12","pl-2","pr-2"],[3,"formGroup"],[1,"row3"],["class","col-sm-2 col-2 col-md-2",4,"ngFor","ngForOf"],[1,"ux-input","password1","mt-0","mb-0"],[1,"error-message"],[1,"col-6","col-md-6"],[1,"text-left"],[1,"success-text"],[1,"text-right"],[1,"ux-linkbutton","default-underline","mt3"],[1,"col-12","col-md-4","col-lg-3","col-xl-3","text-right","hide-m"],[1,"mobile-img"],["src","assets/images/icons/mobile.svg","alt","mobile-icon"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],[1,"left-info"],[1,"biller-icon"],["src","assets/images/icons/adani.png","alt","adani-logo"],[1,"right-info"],[1,"info-details","pl-40"],[1,"info-details","d-block","d-sm-none"],[1,"biller-icon","assure-icon"],["src","assets/images/svg/b-icon1.svg","alt","adani-logo"],[1,"col-md-12","col-lg-12","col-12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[1,"col-sm-2","col-2","col-md-2"],[1,"ux-input","password1","mb-1"],["type","password","maxlength","1","placeholder","\u25cf","pattern","\\d*",3,"id","formControlName","keyup"],["OTPFormRow",""]],template:function(c,e){1&c&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"div",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"ul",8),n.Rc(9,u,4,3,"li",9),n.dc(),n.dc(),n.dc(),n.dc(),n.Zb(10,"div",10),n.ec(11,"div",11),n.ec(12,"div",12),n.ec(13,"div",13),n.ec(14,"div",14),n.ec(15,"div",15),n.ec(16,"div",16),n.ec(17,"div",17),n.ec(18,"h4"),n.Sc(19,"Enter OTP"),n.dc(),n.dc(),n.ec(20,"div",18),n.ec(21,"div",19),n.Zb(22,"img",20),n.dc(),n.dc(),n.dc(),n.ec(23,"div",13),n.ec(24,"div",21),n.ec(25,"div",22),n.ec(26,"div",13),n.ec(27,"div",23),n.ec(28,"div",13),n.ec(29,"div",24),n.ec(30,"div",25),n.ec(31,"em",26),n.Sc(32,"OTP sent on your registered Mobile number ending with ******0967"),n.dc(),n.dc(),n.dc(),n.ec(33,"div",27),n.ec(34,"div",5),n.ec(35,"div",28),n.ec(36,"form",29),n.ec(37,"div",30),n.Rc(38,p,4,2,"div",31),n.qc(39,"slice"),n.dc(),n.dc(),n.ec(40,"div",13),n.ec(41,"div",12),n.ec(42,"div",32),n.Zb(43,"p",33),n.dc(),n.dc(),n.dc(),n.ec(44,"div",30),n.ec(45,"div",34),n.ec(46,"div",35),n.ec(47,"p",35),n.ec(48,"span",36),n.Sc(49,"00:12"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(50,"div",34),n.ec(51,"div",37),n.ec(52,"button",38),n.Sc(53,"Resend"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(54,"div",39),n.ec(55,"div",40),n.Zb(56,"img",41),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(57,"div",21),n.ec(58,"div",42),n.ec(59,"div",43),n.ec(60,"div",44),n.ec(61,"div",5),n.ec(62,"h6"),n.Sc(63,"Biller ID"),n.dc(),n.ec(64,"h5"),n.Sc(65,"REL273927"),n.dc(),n.dc(),n.dc(),n.ec(66,"div",45),n.ec(67,"div",5),n.ec(68,"div",46),n.ec(69,"span",47),n.Zb(70,"img",48),n.dc(),n.dc(),n.ec(71,"div",49),n.ec(72,"h6"),n.Sc(73,"Biller Name"),n.dc(),n.ec(74,"h5"),n.Sc(75,"Adani Electricity"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(76,"div",50),n.ec(77,"div",5),n.ec(78,"h6"),n.Sc(79,"Biller Account ID"),n.dc(),n.ec(80,"h5"),n.Sc(81,"RELEN34858"),n.dc(),n.dc(),n.dc(),n.ec(82,"div",45),n.ec(83,"div",5),n.ec(84,"h6"),n.Sc(85,"Consumer Number"),n.dc(),n.ec(86,"h5"),n.Sc(87,"3646236472837"),n.dc(),n.dc(),n.dc(),n.ec(88,"div",50),n.ec(89,"div",5),n.ec(90,"h6"),n.Sc(91,"Customer Name"),n.dc(),n.ec(92,"h5"),n.Sc(93,"Rajesh Shah"),n.dc(),n.dc(),n.dc(),n.ec(94,"div",50),n.ec(95,"div",5),n.ec(96,"h6"),n.Sc(97,"Customer Mobile Number"),n.dc(),n.ec(98,"h5"),n.Sc(99,"9876543254"),n.dc(),n.dc(),n.dc(),n.ec(100,"div",45),n.ec(101,"div",5),n.ec(102,"h6"),n.Sc(103,"Short Name"),n.dc(),n.ec(104,"h5"),n.Sc(105,"Home Electricity"),n.dc(),n.dc(),n.dc(),n.ec(106,"div",51),n.ec(107,"div",5),n.ec(108,"div",46),n.ec(109,"h6"),n.Sc(110,"Reference Number"),n.dc(),n.ec(111,"h5"),n.Sc(112,"3646236472837"),n.dc(),n.dc(),n.ec(113,"div",49),n.ec(114,"span",52),n.Zb(115,"img",53),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(116,"div",24),n.ec(117,"div",13),n.ec(118,"div",54),n.ec(119,"ul",55),n.ec(120,"li"),n.ec(121,"div",56),n.ec(122,"button",57),n.lc("click",(function(){return e.goToPage("existingGetBill")})),n.Sc(123,"Cancel"),n.dc(),n.dc(),n.ec(124,"div",56),n.ec(125,"button",58),n.lc("click",(function(){return e.otpSubmit("existingBillPaymentSuccess")})),n.Sc(126,"Submit"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(127,"div",59),n.ec(128,"div",60),n.ec(129,"a"),n.Zb(130,"img",61),n.dc(),n.dc(),n.Zb(131,"div",62),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&c&&(n.Mb(9),n.uc("ngForOf",e.DataService.breadcrumblist),n.Mb(27),n.uc("formGroup",e.otpForm),n.Mb(2),n.uc("ngForOf",n.tc(39,3,e.otpFormInput,0,6)))},directives:[o.s,r.I,r.t,r.k,r.c,r.n,r.z,r.s,r.i],pipes:[o.E,a.a],styles:[""]}),c})()}];let g=(()=>{class c{}return c.\u0275mod=n.Wb({type:c}),c.\u0275inj=n.Vb({factory:function(e){return new(e||c)},imports:[[d.g.forChild(v)],d.g]}),c})(),h=(()=>{class c{}return c.\u0275mod=n.Wb({type:c}),c.\u0275inj=n.Vb({factory:function(e){return new(e||c)},imports:[[o.c,g,r.C,i.a,r.m]]}),c})()}}]);