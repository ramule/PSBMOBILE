(window.webpackJsonp=window.webpackJsonp||[]).push([[258],{A0qu:function(c,e,i){"use strict";i.r(e),i.d(e,"NomineeSuccessModule",(function(){return f}));var t=i("3Pt+"),d=i("PCNd"),n=i("ofXK"),o=i("tyNb"),s=i("wd/R"),a=i("fXoL"),r=i("EnSQ"),l=i("Eioz");function m(c,e){if(1&c){const c=a.fc();a.ec(0,"li"),a.ec(1,"a",37),a.lc("click",(function(){a.Hc(c);const i=e.$implicit;return a.pc().DataService.breadcrumroute(i.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&c){const c=e.$implicit;a.Mb(2),a.Tc(a.rc(3,1,c.currentRoute))}}function b(c,e){if(1&c&&(a.ec(0,"div",5),a.ec(1,"div",38),a.ec(2,"h5"),a.Zb(3,"img",39),a.Sc(4),a.dc(),a.ec(5,"small"),a.Sc(6,"Nominee details has been updated successfully"),a.dc(),a.ec(7,"small",40),a.ec(8,"span"),a.Sc(9),a.dc(),a.dc(),a.ec(10,"em",41),a.Sc(11),a.dc(),a.dc(),a.dc()),2&c){const c=a.pc();a.Mb(4),a.Tc(c.nomineeReceiptObj.response),a.Mb(5),a.Uc(" Reference ID ",c.nomineeReceiptObj.rrn," "),a.Mb(2),a.Vc("",c.dateString,", ",c.dateStringWithTime,"")}}function u(c,e){if(1&c&&(a.ec(0,"div",5),a.ec(1,"div",38),a.ec(2,"h5",42),a.Zb(3,"img",43),a.Sc(4),a.dc(),a.ec(5,"small"),a.Sc(6,"Nominee details not updated"),a.dc(),a.ec(7,"small",40),a.ec(8,"span"),a.Sc(9),a.dc(),a.dc(),a.ec(10,"em",44),a.Sc(11),a.dc(),a.dc(),a.dc()),2&c){const c=a.pc();a.Mb(4),a.Uc(" ",c.nomineeReceiptObj.response," "),a.Mb(5),a.Uc(" Reference ID ",c.nomineeReceiptObj.rrn," "),a.Mb(2),a.Vc("",c.dateString,", ",c.dateStringWithTime,"")}}function v(c,e){if(1&c&&(a.ec(0,"div",27),a.ec(1,"div",5),a.ec(2,"h6"),a.Sc(3,"Guardian Name"),a.dc(),a.ec(4,"h5"),a.Sc(5),a.dc(),a.dc(),a.dc()),2&c){const c=a.pc();a.Mb(5),a.Tc(c.nomineeReceiptObj.guardianName)}}function p(c,e){if(1&c&&(a.ec(0,"div",27),a.ec(1,"div",5),a.ec(2,"h6"),a.Sc(3,"Guardian Address"),a.dc(),a.ec(4,"h5"),a.Sc(5),a.dc(),a.dc(),a.dc()),2&c){const c=a.pc();a.Mb(5),a.Tc(c.nomineeReceiptObj.guardianAddress)}}const h=[{path:"",component:(()=>{class c{constructor(c,e,i,t){this.router=c,this.DataService=e,this.date=i,this.location=t,this.now=new Date}ngOnInit(){this.DataService.setPageSettings("Receipt"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("RECEIPT",this.router.url),this.nomineeReceiptObj=this.DataService.nomineeReceiptObj,console.log("RRN NOS :: ",this.nomineeReceiptObj);var c=this.date.transform(this.now,"d MMMM y ");console.log(c);var e=s(this.now).format("HH:MM:SS");console.log(e),history.pushState({},"myAccountsInfo",this.location.prepareExternalUrl("myAccountsInfo")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}goToPage(c){this.router.navigateByUrl("/"+c)}}return c.\u0275fac=function(e){return new(e||c)(a.Yb(o.c),a.Yb(r.a),a.Yb(n.f),a.Yb(n.n))},c.\u0275cmp=a.Sb({type:c,selectors:[["app-nominee-success"]],decls:74,vars:10,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],["class","row",4,"ngIf"],[1,"bg-img"],["src","assets/images/svg/psb-receipt icon.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],["class","info-details",4,"ngIf"],[1,"col-12","col-md-12"],[1,"bottom-footer1"],[1,"btn-div","w100"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[1,"success"],["src","assets/images/svg/success-arrow.svg","alt","success-icon"],[1,"mt-3"],[1,"date-text"],[1,"error"],["src","assets/images/svg/fail.svg","alt","success-icon"],[1,"small-text"]],template:function(c,e){1&c&&(a.ec(0,"div",0),a.ec(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"ul",8),a.Rc(9,m,4,3,"li",9),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(10,"div",10),a.ec(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"h4"),a.Sc(19,"Receipt"),a.dc(),a.dc(),a.Zb(20,"div",18),a.dc(),a.ec(21,"div",13),a.ec(22,"div",19),a.ec(23,"div",20),a.Rc(24,b,12,4,"div",21),a.Rc(25,u,12,4,"div",21),a.ec(26,"div",22),a.Zb(27,"img",23),a.dc(),a.dc(),a.dc(),a.ec(28,"div",19),a.ec(29,"div",24),a.ec(30,"div",25),a.ec(31,"div",26),a.ec(32,"div",5),a.ec(33,"h6"),a.Sc(34,"Nominee Name"),a.dc(),a.ec(35,"h5"),a.Sc(36),a.dc(),a.dc(),a.dc(),a.ec(37,"div",27),a.ec(38,"div",5),a.ec(39,"h6"),a.Sc(40,"Relationship with Nominee"),a.dc(),a.ec(41,"h5"),a.Sc(42),a.dc(),a.dc(),a.dc(),a.ec(43,"div",27),a.ec(44,"div",5),a.ec(45,"h6"),a.Sc(46,"Date of Birth"),a.dc(),a.ec(47,"h5"),a.Sc(48),a.dc(),a.dc(),a.dc(),a.Rc(49,v,6,1,"div",28),a.Rc(50,p,6,1,"div",28),a.ec(51,"div",27),a.ec(52,"div",5),a.ec(53,"h6"),a.Sc(54,"Address Line 1"),a.dc(),a.ec(55,"h5"),a.Sc(56),a.dc(),a.dc(),a.dc(),a.ec(57,"div",27),a.ec(58,"div",5),a.ec(59,"h6"),a.Sc(60,"Address Line 2"),a.dc(),a.ec(61,"h5"),a.Sc(62),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(63,"div",29),a.ec(64,"ul",30),a.ec(65,"li"),a.ec(66,"div",31),a.ec(67,"button",32),a.lc("click",(function(){return e.goToPage("myAccountsInfo")})),a.Sc(68,"Back to My Accounts"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(69,"div",33),a.ec(70,"div",34),a.ec(71,"a"),a.Zb(72,"img",35),a.dc(),a.dc(),a.Zb(73,"div",36),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&c&&(a.Mb(9),a.uc("ngForOf",e.DataService.breadcrumblist),a.Mb(15),a.uc("ngIf","Successful"===e.nomineeReceiptObj.response),a.Mb(1),a.uc("ngIf","Successful"!==e.nomineeReceiptObj.response),a.Mb(11),a.Tc(e.nomineeReceiptObj.nomineeName),a.Mb(6),a.Tc(e.nomineeReceiptObj.nomineeRelationship),a.Mb(6),a.Tc(e.nomineeReceiptObj.dateOfBirth),a.Mb(1),a.uc("ngIf","Y"==e.DataService.minorFlagNominee),a.Mb(1),a.uc("ngIf","Y"==e.DataService.minorFlagNominee),a.Mb(6),a.Tc(e.nomineeReceiptObj.address1),a.Mb(6),a.Tc(e.nomineeReceiptObj.address2))},directives:[n.s,n.t],pipes:[l.a],styles:[""]}),c})()}];let g=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[o.g.forChild(h)],o.g]}),c})(),f=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[n.c,g,d.a,t.C,t.m]]}),c})()}}]);