(window.webpackJsonp=window.webpackJsonp||[]).push([[337],{Nm9n:function(e,c,s){"use strict";s.r(c),s.d(c,"DeleteUpiIdSuccessModule",(function(){return u}));var t=s("ofXK"),i=s("tyNb"),r=s("wd/R"),a=s("fXoL"),n=s("EnSQ"),o=s("Eioz");const d=[{path:"",component:(()=>{class e{constructor(e,c,s,t){this.DataService=e,this.router=c,this.location=s,this.headerdata={headerType:"none",titleName:"",footertype:"none"}}ngOnInit(){this.DataService.changeMessage(this.headerdata),history.pushState({},"myProfile",this.location.prepareExternalUrl("myProfile")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.successResponse=this.DataService.deleteVpaObj,this.successResponse.responseParameter.txnTime=r(this.successResponse.responseParameter.txnTime).format("DD MMM yyyy, hh:mm:ss a")}back(){this.DataService.routeWithNgZone("myProfile")}}return e.\u0275fac=function(c){return new(c||e)(a.Yb(n.a),a.Yb(i.c),a.Yb(t.n),a.Yb(o.a))},e.\u0275cmp=a.Sb({type:e,selectors:[["app-delete-upi-id-success"]],decls:50,vars:15,consts:[[1,"main","bg-section3"],[1,"global-header","success-bg","minus-nav"],[1,"in-header"],[1,"header-icons-lft"],[1,"header-actions"],[1,"ux-button-header",3,"click"],["src","assets/images/svg/close-w.svg","alt","left-arrow-icon",1,"img-vsmall"],[1,"brand-logo"],[1,"header-icons-rit"],[1,"right-main-column","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"container-fluid"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2"],[1,"row"],[1,"success"],["src","assets/images/svg/success-arrow1.svg","alt","success-icon"],[1,"mt-4"],[1,"bg-img"],["src","assets/images/svg/psb-receipt icon.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom"],[1,"info-details","mt-4"],[1,"info-details"]],template:function(e,c){1&e&&(a.ec(0,"div",0),a.ec(1,"header",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"button",5),a.lc("click",(function(){return c.back()})),a.Zb(6,"img",6),a.dc(),a.dc(),a.dc(),a.Zb(7,"div",7),a.ec(8,"div",8),a.Zb(9,"div",4),a.dc(),a.dc(),a.dc(),a.ec(10,"div",9),a.ec(11,"div",10),a.ec(12,"div",11),a.ec(13,"div",12),a.ec(14,"div",13),a.ec(15,"div",14),a.ec(16,"div",15),a.ec(17,"div",16),a.ec(18,"div",17),a.ec(19,"div",18),a.ec(20,"div",19),a.ec(21,"h5"),a.Zb(22,"img",20),a.Sc(23),a.qc(24,"translate"),a.dc(),a.ec(25,"small"),a.Sc(26),a.qc(27,"translate"),a.dc(),a.ec(28,"small",21),a.ec(29,"span"),a.Sc(30),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(31,"div",22),a.Zb(32,"img",23),a.dc(),a.dc(),a.dc(),a.ec(33,"div",16),a.ec(34,"div",24),a.ec(35,"div",25),a.ec(36,"div",26),a.ec(37,"div",18),a.ec(38,"h6"),a.Sc(39),a.qc(40,"translate"),a.dc(),a.ec(41,"h5"),a.Sc(42),a.dc(),a.dc(),a.dc(),a.ec(43,"div",27),a.ec(44,"div",18),a.ec(45,"h6"),a.Sc(46),a.qc(47,"translate"),a.dc(),a.ec(48,"h5"),a.Sc(49),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&e&&(a.Mb(23),a.Tc(a.rc(24,7,"SUCCESSFUL")),a.Mb(3),a.Uc(" ",a.rc(27,9,"DELETE_UPI_ID_SUCCESS"),""),a.Mb(4),a.Uc(" ",c.successResponse.responseParameter.txnTime," "),a.Mb(9),a.Tc(a.rc(40,11,"UPI_ID")),a.Mb(3),a.Tc(c.successResponse.responseParameter.paymentAddress),a.Mb(4),a.Tc(a.rc(47,13,"REFERENCE_ID")),a.Mb(3),a.Tc(c.successResponse.responseParameter.refId))},pipes:[o.a],styles:[""]}),e})()}];let l=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[i.g.forChild(d)],i.g]}),e})();var m=s("AvjH"),p=s("PCNd");let u=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[t.c,l,p.a,m.a]]}),e})()}}]);