(window.webpackJsonp=window.webpackJsonp||[]).push([[174],{fbGN:function(c,e,i){"use strict";i.r(e),i.d(e,"EditBillReminderConfirmationModule",(function(){return u}));var d=i("PCNd"),t=i("3Pt+"),o=i("ofXK"),n=i("tyNb"),r=i("fXoL"),a=i("EnSQ"),l=i("au7T"),s=i("Eioz");function m(c,e){if(1&c){const c=r.fc();r.ec(0,"li"),r.ec(1,"a",43),r.lc("click",(function(){r.Hc(c);const i=e.$implicit;return r.pc().DataService.breadcrumroute(i.routeName)})),r.Sc(2),r.qc(3,"translate"),r.dc(),r.dc()}if(2&c){const c=e.$implicit;r.Mb(2),r.Tc(r.rc(3,1,c.currentRoute))}}const b=[{path:"",component:(()=>{class c{constructor(c,e,i){this.router=c,this.DataService=e,this.commonMethod=i}ngOnInit(){this.DataService.setPageSettings("CONFIRMATION"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("CONFIRMATION",this.router.url)}goToPage(c){this.router.navigateByUrl("/"+c)}}return c.\u0275fac=function(e){return new(e||c)(r.Yb(n.c),r.Yb(a.a),r.Yb(l.a))},c.\u0275cmp=r.Sb({type:c,selectors:[["app-edit-bill-reminder-confirmation"]],decls:80,vars:1,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","mycards","bill-wrapper"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-xl-block","d-lg-block","d-md-none","d-sm-none"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2","tracklist"],[1,"row1","hide-m"],[1,"col-md-10","col-12"],[1,"col-md-2","col-12"],[1,"header-actions"],["src","assets/images/icons/billpay.png","alt","billpay-img",1,"small-img"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mb-3","mt-0","p-0"],[1,"info-bottom","pad-custom"],[1,"info-details","pr-35"],[1,"left-info"],[1,"right-info","d-block","d-sm-none"],[1,"assure-icon"],["src","assets/images/svg/b-icon1.svg","alt","adani-logo"],[1,"info-details"],[1,"biller-icon"],["src","assets/images/icons/airtel.png","alt","adani-logo"],[1,"right-info"],[1,"vspacer40","d-none","d-sm-block"],[1,"col-md-12","col-lg-12","col-12"],[1,"bottom-footer1"],[1,"btn-div","hide-m"],[1,"ux-button","secondary","sm-mob","delete-btn"],[1,"btn-div","w100"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[3,"click"]],template:function(c,e){1&c&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"ul",8),r.Rc(9,m,4,3,"li",9),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(10,"div",10),r.ec(11,"div",11),r.ec(12,"div",12),r.ec(13,"div",13),r.ec(14,"div",14),r.ec(15,"div",15),r.ec(16,"div",16),r.ec(17,"div",17),r.ec(18,"h4"),r.Sc(19,"Confirmation"),r.dc(),r.dc(),r.ec(20,"div",18),r.ec(21,"div",19),r.Zb(22,"img",20),r.dc(),r.dc(),r.dc(),r.ec(23,"div",13),r.ec(24,"div",21),r.ec(25,"div",22),r.ec(26,"div",23),r.ec(27,"div",24),r.ec(28,"div",5),r.ec(29,"div",25),r.ec(30,"h6"),r.Sc(31,"Biller Category"),r.dc(),r.ec(32,"h5"),r.Sc(33,"Mobile Bill"),r.dc(),r.dc(),r.ec(34,"div",26),r.ec(35,"span",27),r.Zb(36,"img",28),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(37,"div",29),r.ec(38,"div",5),r.ec(39,"div",25),r.ec(40,"span",30),r.Zb(41,"img",31),r.dc(),r.ec(42,"div",32),r.ec(43,"h6"),r.Sc(44,"Biller Name"),r.dc(),r.ec(45,"h5"),r.Sc(46,"Airtel"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(47,"div",29),r.ec(48,"div",5),r.ec(49,"h6"),r.Sc(50,"MICR"),r.dc(),r.ec(51,"h5"),r.Sc(52,"986587867"),r.dc(),r.dc(),r.dc(),r.ec(53,"div",29),r.ec(54,"div",5),r.ec(55,"h6"),r.Sc(56,"Nick Name for Reminder"),r.dc(),r.ec(57,"h5"),r.Sc(58,"Monthly Mobile Bill"),r.dc(),r.dc(),r.dc(),r.ec(59,"div",29),r.ec(60,"div",5),r.ec(61,"h6"),r.Sc(62,"Reminder Date for Each Month"),r.dc(),r.ec(63,"h5"),r.Sc(64,"26"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.Zb(65,"div",33),r.ec(66,"div",13),r.ec(67,"div",34),r.ec(68,"ul",35),r.ec(69,"li"),r.ec(70,"div",36),r.ec(71,"button",37),r.Sc(72,"Cancel"),r.dc(),r.dc(),r.ec(73,"div",38),r.ec(74,"button",39),r.lc("click",(function(){return e.goToPage("editBillReminderSuccess")})),r.Sc(75,"Submit"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(76,"div",40),r.ec(77,"div",41),r.ec(78,"a"),r.Zb(79,"img",42),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&c&&(r.Mb(9),r.uc("ngForOf",e.DataService.breadcrumblist))},directives:[o.s],pipes:[s.a],styles:[""]}),c})()}];let v=(()=>{class c{}return c.\u0275mod=r.Wb({type:c}),c.\u0275inj=r.Vb({factory:function(e){return new(e||c)},imports:[[n.g.forChild(b)],n.g]}),c})(),u=(()=>{class c{}return c.\u0275mod=r.Wb({type:c}),c.\u0275inj=r.Vb({factory:function(e){return new(e||c)},imports:[[o.c,v,t.C,d.a,t.m]]}),c})()}}]);