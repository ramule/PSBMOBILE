(window.webpackJsonp=window.webpackJsonp||[]).push([[137,349],{T4fI:function(e,c,t){"use strict";t.r(c),t.d(c,"ApyOverviewModule",(function(){return v}));var i=t("ofXK"),o=t("PCNd"),r=t("tyNb"),a=t("fXoL"),n=t("EnSQ"),s=t("fUdP"),d=t("TaOT"),l=t("Eioz");function m(e,c){if(1&e){const e=a.fc();a.ec(0,"li"),a.ec(1,"a",34),a.lc("click",(function(){a.Hc(e);const t=c.$implicit;return a.pc().DataService.breadcrumroute(t.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&e){const e=c.$implicit;a.Mb(2),a.Tc(a.rc(3,1,e.currentRoute))}}const u=[{path:"",component:(()=>{class e{constructor(e,c,t,i,o){this.router=e,this.DataService=c,this.customCurrencyPipe=t,this.formValidation=i,this.location=o}ngOnInit(){var e;this.DataService.setPageSettings("APY Overview"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("OVERVIEW",this.router.url),this.apyFormData=this.DataService.transactionReceiptObj,console.log(this.DataService.profileDetails),console.log(this.DataService.apyPensionDetails),this.profileDetailsData=this.DataService.profileDetails,this.apyPensionDetailsData=this.DataService.apyPensionDetails,e=this.DataService.isCordovaAvailable?this.DataService.socialSecFromDashboard?"mobSocialLanding":"dashboardMobile":"dashboard",history.pushState({},e,this.location.prepareExternalUrl(e)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}goToPage(e){this.router.navigateByUrl("/"+e)}}return e.\u0275fac=function(c){return new(c||e)(a.Yb(r.c),a.Yb(n.a),a.Yb(s.a),a.Yb(d.a),a.Yb(i.n))},e.\u0275cmp=a.Sb({type:e,selectors:[["app-apy-overview"]],decls:86,vars:9,consts:[[1,"main","bg-m"],[1,"nav-overlay"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"mar-t","result-container1"],[1,"info-bottom","pad-custom","pad-custom-setting"],[1,"info-details"],[1,"col-12","col-md-12"],[1,"col-md-12","col-lg-6","col-12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"]],template:function(e,c){1&e&&(a.ec(0,"div",0),a.Zb(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"div",8),a.ec(9,"ul",9),a.Rc(10,m,4,3,"li",10),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"div",18),a.ec(19,"h4"),a.Sc(20,"Overview"),a.dc(),a.dc(),a.Zb(21,"div",19),a.dc(),a.ec(22,"div",14),a.ec(23,"div",20),a.ec(24,"div",21),a.ec(25,"div",22),a.ec(26,"div",23),a.ec(27,"div",6),a.ec(28,"h6"),a.Sc(29,"Scheme"),a.dc(),a.ec(30,"h5"),a.Sc(31,"Atal Pension Yojna (APY) Scheme"),a.dc(),a.dc(),a.dc(),a.ec(32,"div",23),a.ec(33,"div",6),a.ec(34,"h6"),a.Sc(35,"Name"),a.dc(),a.ec(36,"h5"),a.Sc(37),a.dc(),a.dc(),a.dc(),a.ec(38,"div",23),a.ec(39,"div",6),a.ec(40,"h6"),a.Sc(41,"Date of Birth"),a.dc(),a.ec(42,"h5"),a.Sc(43),a.dc(),a.dc(),a.dc(),a.ec(44,"div",23),a.ec(45,"div",6),a.ec(46,"h6"),a.Sc(47,"Nominee Name"),a.dc(),a.ec(48,"h5"),a.Sc(49),a.dc(),a.dc(),a.dc(),a.ec(50,"div",23),a.ec(51,"div",6),a.ec(52,"h6"),a.Sc(53," Debit Account "),a.dc(),a.ec(54,"h5"),a.Sc(55),a.dc(),a.dc(),a.dc(),a.ec(56,"div",23),a.ec(57,"div",6),a.ec(58,"h6"),a.Sc(59,"Pension Amount "),a.dc(),a.ec(60,"h5"),a.Sc(61),a.qc(62,"customcurrency"),a.dc(),a.dc(),a.dc(),a.ec(63,"div",23),a.ec(64,"div",6),a.ec(65,"h6"),a.Sc(66," Premium Frequency "),a.dc(),a.ec(67,"h5"),a.Sc(68),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(69,"div",24),a.ec(70,"div",14),a.Zb(71,"div",25),a.ec(72,"div",25),a.ec(73,"ul",26),a.ec(74,"li"),a.ec(75,"div",27),a.ec(76,"button",28),a.lc("click",(function(){return c.goToPage("socialSecurities")})),a.Sc(77,"Cancel"),a.dc(),a.dc(),a.ec(78,"div",27),a.ec(79,"button",29),a.lc("click",(function(){return c.goToPage("otpSession")})),a.Sc(80,"Confirm"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(81,"div",30),a.ec(82,"div",31),a.ec(83,"a"),a.Zb(84,"img",32),a.dc(),a.dc(),a.Zb(85,"div",33),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&e&&(a.Mb(10),a.uc("ngForOf",c.DataService.breadcrumblist),a.Mb(27),a.Tc(c.profileDetailsData[0].custName),a.Mb(6),a.Tc(c.profileDetailsData[0].custBirthDate),a.Mb(6),a.Tc(c.apyFormData.nomineeName),a.Mb(6),a.Tc(c.apyFormData.debitAcc),a.Mb(6),a.Tc(a.rc(62,7,c.apyFormData.pensionAmt)),a.Mb(7),a.Tc(c.apyFormData.premiumFreq))},directives:[i.s],pipes:[s.a,l.a],styles:[""]}),e})()}];let h=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[r.g.forChild(u)],r.g]}),e})(),v=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[i.c,h,o.a]]}),e})()},TaOT:function(e,c,t){"use strict";t.d(c,"a",(function(){return r}));var i=t("fXoL"),o=t("fUdP");let r=(()=>{class e{constructor(e){this.customCurrencyPipe=e}markFormGroupTouched(e){Object.values(e.controls).forEach(e=>{e.markAsTouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupTouched(e))})}markFormGroupUntouched(e){Object.values(e.controls).forEach(e=>{e.markAsUntouched(),e.controls&&e.controls.forEach(e=>this.markFormGroupUntouched(e))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:e=>{let c=e;return c=c.reduce((e,t,i)=>{let o=e;return o+=t,c.length!==i+1&&(o+=", "),o},""),"These characters are not allowed: "+c}}}validateForm(e,c,t){const i=e;for(const o in c)if(o){c[o]="";const e=i.get(o),r=this.validationMessages();if(e&&!e.valid&&(!t||e.dirty||e.touched))for(const t in e.errors)console.log("======>inside",t),c[o]=t&&"invalid_characters"!==t?c[o]||r[t]:c[o]||r[t](e.errors[t])}return c}formatCurrency(e,c,t){if("0"!=e)if(""!=e){let t=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==t.trim().replace(/[^.0-9]+/g,"")?c.contains("amount")&&c.get("amount").reset():"0"==t.trim().replace(/[^.0-9]+/g,"")?c.get("amount").reset():(console.log(t),c.patchValue({amount:t}))}else c.get("amount").reset("");else c.contains("amount")&&c.get("amount").reset()}formatTransLimit(e,c){if("0"!=e)if(""!=e){let t=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==t?c.contains("transactionLimit")&&c.get("transactionLimit").reset():"0"==t.trim()?c.get("transactionLimit").reset():(console.log(t),c.patchValue({transactionLimit:t}))}else c.get("transactionLimit").reset("");else c.contains("transactionLimit")&&c.get("transactionLimit").reset()}formatDynamicCurrency(e,c){$("#"+e).val()&&"\u20b9 0.00"!=$("#"+e).val()?c.patchValue({amount:$("#"+e).val()}):c.get("amount").reset("")}deFormatValue(e,c){c.patchValue({amount:e.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(e,c,t){if("0"!=e)if(""!=e){let i=this.customCurrencyPipe.transform(e.trim(),"decimal");" 0.00"==i?c.contains(t)&&c.get(t).reset():"0"==i.trim()?c.get(t).reset():c.controls[t].patchValue("\u20b9"+i)}else c.get(t).reset("");else c.contains(t)&&c.get(t).reset()}}return e.\u0275fac=function(c){return new(c||e)(i.ic(o.a))},e.\u0275prov=i.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);