(window.webpackJsonp=window.webpackJsonp||[]).push([[308],{MvRA:function(c,e,t){"use strict";t.r(e),t.d(e,"RemoveAccountSuccessModule",(function(){return v}));var a=t("ofXK"),s=t("wd/R"),i=t("fXoL"),n=t("EnSQ"),o=t("tyNb"),d=t("Eioz"),r=t("AIZJ");const l=[{path:"",component:(()=>{class c{constructor(c,e,t){this.dataService=c,this.router=e,this.location=t,this.headerdata={headerType:"none",titleName:"",footertype:"none"}}ngOnInit(){this.dataService.changeMessage(this.headerdata),this.accountDetails=this.dataService.deletedAccountDetails,this.accountDetails.txnTime=s(this.accountDetails.txnTime).format("DD MMM yyyy, hh:mm:ss a"),this.accountDetails.actualAccType="SOD"==this.accountDetails.accType||"UOD"==this.accountDetails.accType?"Overdraft":this.accountDetails.accType,console.log("accountDetails = ",this.accountDetails),history.pushState({},"manageAccounts",this.location.prepareExternalUrl("manageAccounts")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}goBack(){this.dataService.isSetVpaDtl=!0,this.dataService.routeWithNgZone("manageAccounts")}}return c.\u0275fac=function(e){return new(e||c)(i.Yb(n.a),i.Yb(o.c),i.Yb(a.n))},c.\u0275cmp=i.Sb({type:c,selectors:[["app-remove-account-success"]],decls:58,vars:22,consts:[[1,"main","bg-section3"],[1,"global-header","success-bg","minus-nav"],[1,"in-header"],[1,"header-icons-lft"],[1,"header-actions"],[1,"ux-button-header",3,"click"],["src","assets/images/svg/close-w.svg","alt","left-arrow-icon",1,"img-vsmall"],[1,"brand-logo"],[1,"header-icons-rit"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"container-fluid"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2"],[1,"row"],[1,"success"],["src","assets/images/svg/success-arrow1.svg","alt","success-icon"],[1,"mt-4"],[1,"bg-img"],["src","assets/images/svg/psb-receipt icon.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom"],[1,"info-details","mt-4"],[1,"info-details"]],template:function(c,e){1&c&&(i.ec(0,"div",0),i.ec(1,"header",1),i.ec(2,"div",2),i.ec(3,"div",3),i.ec(4,"div",4),i.ec(5,"button",5),i.lc("click",(function(){return e.goBack()})),i.Zb(6,"img",6),i.dc(),i.dc(),i.dc(),i.Zb(7,"div",7),i.ec(8,"div",8),i.Zb(9,"div",4),i.dc(),i.dc(),i.dc(),i.ec(10,"div",9),i.ec(11,"div",10),i.ec(12,"div",11),i.ec(13,"div",12),i.ec(14,"div",13),i.ec(15,"div",14),i.ec(16,"div",15),i.ec(17,"div",16),i.ec(18,"div",17),i.ec(19,"div",18),i.ec(20,"div",19),i.ec(21,"h5"),i.Zb(22,"img",20),i.Sc(23),i.qc(24,"translate"),i.dc(),i.ec(25,"small"),i.Sc(26),i.qc(27,"translate"),i.dc(),i.ec(28,"small",21),i.ec(29,"span"),i.Sc(30),i.dc(),i.dc(),i.dc(),i.dc(),i.ec(31,"div",22),i.Zb(32,"img",23),i.dc(),i.dc(),i.dc(),i.ec(33,"div",16),i.ec(34,"div",24),i.ec(35,"div",25),i.ec(36,"div",26),i.ec(37,"div",18),i.ec(38,"h6"),i.Sc(39),i.qc(40,"translate"),i.dc(),i.ec(41,"h5"),i.Sc(42),i.dc(),i.dc(),i.dc(),i.ec(43,"div",27),i.ec(44,"div",18),i.ec(45,"h6"),i.Sc(46),i.qc(47,"translate"),i.dc(),i.ec(48,"h5"),i.Sc(49),i.qc(50,"maskAccountNo"),i.dc(),i.dc(),i.dc(),i.ec(51,"div",27),i.ec(52,"div",18),i.ec(53,"h6"),i.Sc(54),i.qc(55,"translate"),i.dc(),i.ec(56,"h5"),i.Sc(57),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc(),i.dc()),2&c&&(i.Mb(23),i.Uc(" ",i.rc(24,10,"SUCCESSFUL")," "),i.Mb(3),i.Uc(" ",i.rc(27,12,"ACCOUNT_REMOVED_SUCCESSFULLY")," "),i.Mb(4),i.Uc(" ",e.accountDetails.txnTime," "),i.Mb(9),i.Uc(" ",i.rc(40,14,"UPI_ID")," "),i.Mb(3),i.Uc(" ",e.accountDetails.paymentAddress," "),i.Mb(4),i.Uc(" ",i.rc(47,16,"ACCOUNT")," "),i.Mb(3),i.Vc(" ",e.accountDetails.actualAccType," ",i.rc(50,18,e.accountDetails.accNum)," "),i.Mb(5),i.Uc(" ",i.rc(55,20,"REFERENCE_ID")," "),i.Mb(3),i.Uc(" ",e.accountDetails.refId," "))},pipes:[d.a,r.a],styles:[""]}),c})()}];let u=(()=>{class c{}return c.\u0275mod=i.Wb({type:c}),c.\u0275inj=i.Vb({factory:function(e){return new(e||c)},imports:[[o.g.forChild(l)],o.g]}),c})();var h=t("PCNd");let v=(()=>{class c{}return c.\u0275mod=i.Wb({type:c}),c.\u0275inj=i.Vb({factory:function(e){return new(e||c)},imports:[[a.c,u,h.a]]}),c})()}}]);