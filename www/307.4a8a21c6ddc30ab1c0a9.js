(window.webpackJsonp=window.webpackJsonp||[]).push([[307],{oqi7:function(c,e,s){"use strict";s.r(e),s.d(e,"LinkAccountSuccessModule",(function(){return v}));var t=s("ofXK"),i=s("tyNb"),a=s("wd/R"),o=s("fXoL"),r=s("EnSQ"),n=s("Eioz"),d=s("fUdP");const l=[{path:"",component:(()=>{class c{constructor(c,e,s){this.DataService=c,this.router=e,this.location=s,this.headerdata={headerType:"none",titleName:"",footertype:"none"}}ngOnInit(){this.prevPageUrl=this.DataService.prevUrlForCreateVpaSuccess,console.log("Link Account Previous URL  => ",this.prevPageUrl),history.pushState({},this.prevPageUrl,this.location.prepareExternalUrl(this.prevPageUrl)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.DataService.changeMessage(this.headerdata),this.successResponse=this.DataService.linkedAccountDetails,this.successResponse.responseParameter.txnTime=a(this.successResponse.responseParameter.txnTime).format("DD MMM yyyy, hh:mm:ss a"),console.log("this.successResponse"),console.log(this.successResponse)}goBack(){"manageAccounts"==this.prevPageUrl&&(this.DataService.isSetVpaDtl=!0,this.DataService.vpaDtls=this.DataService.linkAccSelectedVpaDetails),this.DataService.routeWithNgZone(this.prevPageUrl)}}return c.\u0275fac=function(e){return new(e||c)(o.Yb(r.a),o.Yb(i.c),o.Yb(t.n))},c.\u0275cmp=o.Sb({type:c,selectors:[["app-link-account-success"]],decls:75,vars:27,consts:[[1,"main","bg-section3"],[1,"global-header","success-bg","minus-nav"],[1,"in-header"],[1,"header-icons-lft"],[1,"header-actions"],[1,"ux-button-header",3,"click"],["src","assets/images/svg/close-w.svg","alt","left-arrow-icon",1,"img-vsmall"],[1,"brand-logo"],[1,"header-icons-rit"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"container-fluid"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2"],[1,"row"],[1,"success"],["src","assets/images/svg/success-arrow1.svg","alt","success-icon"],[1,"mt-3"],[1,"bg-img"],["src","assets/images/svg/psb-receipt icon.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom"],[1,"info-details","mt-3"],[1,"info-details"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],["id","select-account",1,"ux-button","primary","md",3,"click"],[1,"powered-logo"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"]],template:function(c,e){1&c&&(o.ec(0,"div",0),o.ec(1,"header",1),o.ec(2,"div",2),o.ec(3,"div",3),o.ec(4,"div",4),o.ec(5,"button",5),o.lc("click",(function(){return e.goBack()})),o.Zb(6,"img",6),o.dc(),o.dc(),o.dc(),o.Zb(7,"div",7),o.ec(8,"div",8),o.Zb(9,"div",4),o.dc(),o.dc(),o.dc(),o.ec(10,"div",9),o.ec(11,"div",10),o.ec(12,"div",11),o.ec(13,"div",12),o.ec(14,"div",13),o.ec(15,"div",14),o.ec(16,"div",15),o.ec(17,"div",16),o.ec(18,"div",17),o.ec(19,"div",18),o.ec(20,"div",19),o.ec(21,"h5"),o.Zb(22,"img",20),o.Sc(23),o.qc(24,"translate"),o.dc(),o.ec(25,"small"),o.Sc(26),o.dc(),o.ec(27,"small",21),o.ec(28,"span"),o.Sc(29),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(30,"div",22),o.Zb(31,"img",23),o.dc(),o.dc(),o.dc(),o.ec(32,"div",16),o.ec(33,"div",24),o.ec(34,"div",25),o.ec(35,"div",26),o.ec(36,"div",18),o.ec(37,"h6"),o.Sc(38),o.qc(39,"translate"),o.dc(),o.ec(40,"h5"),o.Sc(41),o.dc(),o.dc(),o.dc(),o.ec(42,"div",27),o.ec(43,"div",18),o.ec(44,"h6"),o.Sc(45),o.qc(46,"translate"),o.dc(),o.ec(47,"h5"),o.Sc(48),o.dc(),o.dc(),o.dc(),o.ec(49,"div",27),o.ec(50,"div",18),o.ec(51,"h6"),o.Sc(52),o.qc(53,"translate"),o.dc(),o.ec(54,"h5"),o.Sc(55),o.dc(),o.dc(),o.dc(),o.ec(56,"div",27),o.ec(57,"div",18),o.ec(58,"h6"),o.Sc(59),o.qc(60,"translate"),o.dc(),o.ec(61,"h5"),o.Sc(62),o.qc(63,"customcurrency"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(64,"div",28),o.ec(65,"div",29),o.ec(66,"div",12),o.ec(67,"div",18),o.ec(68,"div",30),o.ec(69,"button",31),o.lc("click",(function(){return e.goBack()})),o.Sc(70),o.qc(71,"translate"),o.dc(),o.dc(),o.ec(72,"div",30),o.ec(73,"div",32),o.Zb(74,"img",33),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()),2&c&&(o.Mb(23),o.Uc(" ",o.rc(24,13,"SUCCESSFUL"),""),o.Mb(3),o.Tc(e.successResponse.msg),o.Mb(3),o.Uc(" ",e.successResponse.responseParameter.txnTime," "),o.Mb(9),o.Tc(o.rc(39,15,"UPI_ID")),o.Mb(3),o.Tc(e.successResponse.responseParameter.paymentAddress),o.Mb(4),o.Tc(o.rc(46,17,"LINKED_ACCOUNT")),o.Mb(3),o.Tc(e.successResponse.bankName),o.Mb(4),o.Tc(o.rc(53,19,"ACCOUNT")),o.Mb(3),o.Vc("",e.successResponse.actualAccType," ",e.successResponse.maskedAccNo,""),o.Mb(4),o.Tc(o.rc(60,21,"CURRENT_LIMIT")),o.Mb(3),o.Uc(" ",o.rc(63,23,e.successResponse.responseParameter.limit)," "),o.Mb(8),o.Tc(o.rc(71,25,"PROCEED")))},pipes:[n.a,d.a],styles:[""]}),c})()}];let u=(()=>{class c{}return c.\u0275mod=o.Wb({type:c}),c.\u0275inj=o.Vb({factory:function(e){return new(e||c)},imports:[[i.g.forChild(l)],i.g]}),c})();var p=s("PCNd");let v=(()=>{class c{}return c.\u0275mod=o.Wb({type:c}),c.\u0275inj=o.Vb({factory:function(e){return new(e||c)},imports:[[t.c,p.a,u]]}),c})()}}]);