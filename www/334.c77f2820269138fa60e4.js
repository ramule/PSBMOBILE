(window.webpackJsonp=window.webpackJsonp||[]).push([[334],{RSkR:function(c,e,d){"use strict";d.r(e),d.d(e,"PendingRequestPayerViewDetailsModule",(function(){return h}));var i=d("ofXK"),t=d("tyNb"),n=d("fXoL"),a=d("EnSQ"),r=d("Eioz"),s=d("fUdP");function o(c,e){if(1&c&&(n.ec(0,"h6",21),n.Sc(1),n.qc(2,"translate"),n.dc()),2&c){const c=n.pc();n.Mb(1),n.Vc(" ",n.rc(2,2,"TO_BE_RECEIVED_FROM")," ",c.pendingByPayer.payerName," ")}}function l(c,e){if(1&c&&(n.ec(0,"h6",21),n.Sc(1),n.qc(2,"translate"),n.dc()),2&c){const c=n.pc();n.Mb(1),n.Vc("",n.rc(2,2,"REQUESTED_TO")," ",c.pendingByPayer.payerName,"")}}const p=[{path:"",component:(()=>{class c{constructor(c,e,d){this.router=c,this.DataService=e,this.location=d,this.headerdata={headerType:"TitleClose",titleName:"VIEW_DETAILS",footertype:"none"}}ngOnInit(){this.DataService.changeMessage(this.headerdata),this.pendingByPayer=this.DataService.pendingByPayer,history.pushState({},"pendingRequestUpi",this.location.prepareExternalUrl("pendingRequestUpi")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),createGlobalNavMore(),this.getLinkedAccount()}goToPage(c){this.router.navigateByUrl("/"+c)}getLinkedAccount(){this.DataService.vpaAddressList.length>0&&(this.defaultVPA=this.DataService.vpaAddressList.find(c=>"Y"==c.default),this.defaultVPAAccount=this.defaultVPA.accounts.find(c=>"Y"==c.isDefaultAccount))}}return c.\u0275fac=function(e){return new(e||c)(n.Yb(t.c),n.Yb(a.a),n.Yb(i.n))},c.\u0275cmp=n.Sb({type:c,selectors:[["app-pending-request-payer-view-details"]],decls:104,vars:41,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","cust-pb"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","pad-customise"],[1,"payment-list"],[1,"full-container"],[1,"left-info1"],["class","heading",4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"powered-logo","mt-0"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"ios-nav-overlay"],[1,"heading"]],template:function(c,e){1&c&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"div",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.ec(10,"div",8),n.ec(11,"div",9),n.ec(12,"div",10),n.ec(13,"ul",11),n.ec(14,"li"),n.ec(15,"div",12),n.ec(16,"div",8),n.ec(17,"div",7),n.ec(18,"div",13),n.Rc(19,o,3,4,"h6",14),n.Rc(20,l,3,4,"h6",14),n.ec(21,"h5"),n.Sc(22),n.qc(23,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(24,"li"),n.ec(25,"div",12),n.ec(26,"div",8),n.ec(27,"div",7),n.ec(28,"div",13),n.ec(29,"h6"),n.Sc(30),n.qc(31,"translate"),n.dc(),n.ec(32,"h5"),n.Sc(33),n.qc(34,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(35,"li"),n.ec(36,"div",12),n.ec(37,"div",8),n.ec(38,"div",7),n.ec(39,"div",13),n.ec(40,"h6"),n.Sc(41),n.qc(42,"translate"),n.dc(),n.ec(43,"h5"),n.Sc(44),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(45,"li"),n.ec(46,"div",12),n.ec(47,"div",8),n.ec(48,"div",7),n.ec(49,"div",13),n.ec(50,"h6"),n.Sc(51),n.qc(52,"translate"),n.dc(),n.ec(53,"h5"),n.Sc(54),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(55,"li"),n.ec(56,"div",12),n.ec(57,"div",8),n.ec(58,"div",7),n.ec(59,"div",13),n.ec(60,"h6"),n.Sc(61),n.qc(62,"translate"),n.dc(),n.ec(63,"h5"),n.Sc(64),n.qc(65,"customcurrency"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(66,"li"),n.ec(67,"div",12),n.ec(68,"div",8),n.ec(69,"div",7),n.ec(70,"div",13),n.ec(71,"h6"),n.Sc(72),n.qc(73,"translate"),n.dc(),n.ec(74,"h5"),n.Sc(75),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(76,"li"),n.ec(77,"div",12),n.ec(78,"div",8),n.ec(79,"div",7),n.ec(80,"div",13),n.ec(81,"h6"),n.Sc(82),n.qc(83,"translate"),n.dc(),n.ec(84,"h5"),n.Sc(85),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(86,"li"),n.ec(87,"div",12),n.ec(88,"div",8),n.ec(89,"div",7),n.ec(90,"div",13),n.ec(91,"h6"),n.Sc(92),n.qc(93,"translate"),n.dc(),n.ec(94,"h5"),n.Sc(95),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(96,"div",15),n.ec(97,"div",16),n.ec(98,"div",4),n.ec(99,"div",5),n.ec(100,"div",17),n.ec(101,"div",18),n.Zb(102,"img",19),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.Zb(103,"div",20)),2&c&&(n.Mb(19),n.uc("ngIf","MANDATE_NOTIFICATION"==e.pendingByPayer.notificationType),n.Mb(1),n.uc("ngIf",!(null!=e.pendingByPayer&&e.pendingByPayer.notificationType)),n.Mb(2),n.Vc("",n.rc(23,20,"UPI_ID")," : ",e.pendingByPayer.payerAddress,""),n.Mb(8),n.Tc(n.rc(31,22,"DEPOSIT_TO_UPI_ID")),n.Mb(3),n.Vc("",n.rc(34,24,"UPI_ID")," : ",e.pendingByPayer.payeeAddress,""),n.Mb(8),n.Uc("",n.rc(42,26,"LINKED_ACCOUNT")," "),n.Mb(3),n.Vc("",e.defaultVPAAccount.accType," ",e.defaultVPAAccount.maskedAccountNumber," "),n.Mb(7),n.Tc(n.rc(52,28,"PAYER_NAME")),n.Mb(3),n.Tc(e.pendingByPayer.payerName),n.Mb(7),n.Tc(n.rc(62,30,"AMOUNT")),n.Mb(3),n.Uc(" ",n.sc(65,32,e.pendingByPayer.amount,"symbol"),""),n.Mb(8),n.Tc(n.rc(73,35,"REMARKS")),n.Mb(3),n.Tc(null!=e.pendingByPayer&&e.pendingByPayer.remarks?e.pendingByPayer.remarks:"-"),n.Mb(7),n.Tc(n.rc(83,37,"REQUESTED_DATE_TIME")),n.Mb(3),n.Tc(e.pendingByPayer.requestedDate),n.Mb(7),n.Tc(n.rc(93,39,"EXPIRY_DATE_AND_TIME")),n.Mb(3),n.Tc(e.pendingByPayer.expiredDate))},directives:[i.t],pipes:[r.a,s.a],styles:[""]}),c})()}];let v=(()=>{class c{}return c.\u0275mod=n.Wb({type:c}),c.\u0275inj=n.Vb({factory:function(e){return new(e||c)},imports:[[t.g.forChild(p)],t.g]}),c})();var u=d("3Pt+"),y=d("PCNd");let h=(()=>{class c{}return c.\u0275mod=n.Wb({type:c}),c.\u0275inj=n.Vb({factory:function(e){return new(e||c)},imports:[[i.c,u.m,u.C,y.a,v]]}),c})()}}]);