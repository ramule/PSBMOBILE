(window.webpackJsonp=window.webpackJsonp||[]).push([[312],{"+Qyf":function(e,t,c){"use strict";c.r(t),c.d(t,"ApproveMandateModule",(function(){return I}));var a=c("ofXK"),i=c("tyNb"),s=c("Z3pm"),o=c("wd/R"),n=c("fXoL"),d=c("EnSQ"),r=c("5IsW"),p=c("L7Xq"),l=c("0oYq"),v=c("H9Rt"),u=c("Eioz"),h=c("3Pt+"),m=c("fUdP");function g(e,t){1&e&&(n.ec(0,"div",20),n.ec(1,"div",21),n.Zb(2,"img",22),n.ec(3,"h6"),n.Sc(4),n.qc(5,"translate"),n.dc(),n.dc(),n.dc()),2&e&&(n.Mb(4),n.Tc(n.rc(5,1,"NO_RECORD_FOUND")))}function f(e,t){if(1&e&&(n.ec(0,"h6",44),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e){const e=n.pc(2).$implicit;n.Mb(1),n.Vc("",n.rc(2,2,"REQUESTED_BY")," ",e.payeeName,"")}}function b(e,t){if(1&e&&(n.ec(0,"h6",44),n.Sc(1),n.qc(2,"translate"),n.dc()),2&e){const e=n.pc(2).$implicit;n.Mb(1),n.Vc("",n.rc(2,2,"MODIFIED_BY")," ",e.payeeName,"")}}function M(e,t){if(1&e){const e=n.fc();n.ec(0,"ul",25),n.ec(1,"li"),n.ec(2,"div",26),n.ec(3,"div",8),n.ec(4,"div",27),n.ec(5,"div",28),n.Rc(6,f,3,4,"h6",29),n.Rc(7,b,3,4,"h6",29),n.ec(8,"h5"),n.Sc(9),n.qc(10,"translate"),n.dc(),n.dc(),n.dc(),n.ec(11,"div",30),n.ec(12,"div",31),n.ec(13,"h5"),n.Sc(14),n.qc(15,"customcurrency"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(16,"div",32),n.ec(17,"div",33),n.ec(18,"div",34),n.ec(19,"div",35),n.ec(20,"span"),n.Zb(21,"img",36),n.dc(),n.dc(),n.ec(22,"em"),n.Sc(23),n.qc(24,"translate"),n.qc(25,"translate"),n.dc(),n.ec(26,"h6"),n.Sc(27),n.dc(),n.dc(),n.dc(),n.ec(28,"div",37),n.ec(29,"div",34),n.ec(30,"div",35),n.ec(31,"span"),n.Zb(32,"img",38),n.dc(),n.dc(),n.ec(33,"em"),n.Sc(34),n.qc(35,"translate"),n.dc(),n.ec(36,"h6"),n.Sc(37),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(38,"div",32),n.ec(39,"div",37),n.ec(40,"div",28),n.ec(41,"div",39),n.Zb(42,"img",40),n.dc(),n.dc(),n.dc(),n.ec(43,"div",33),n.ec(44,"div",41),n.ec(45,"div",42),n.ec(46,"button",43),n.lc("click",(function(){n.Hc(e);const t=n.pc().$implicit;return n.pc().goToPage(t,"approveMandateViewDetails")})),n.Sc(47),n.qc(48,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()}if(2&e){const e=n.pc().$implicit;n.Mb(6),n.uc("ngIf","PENDING"==e.status),n.Mb(1),n.uc("ngIf","CREATED"==e.status),n.Mb(2),n.Vc("",n.rc(10,12,"UPI_ID")," : ",e.payeeAddress,""),n.Mb(5),n.Uc(" ",n.sc(15,14,e.amount,"symbol")," "),n.Mb(9),n.Vc("",n.rc(24,17,"START_DATE")," - ",n.rc(25,19,"END_DATE"),""),n.Mb(4),n.Vc(" ",e.validityStart," - ",e.validityEnd,""),n.Mb(7),n.Tc(n.rc(35,21,"FREQUENCY")),n.Mb(3),n.Tc(e.frequency),n.Mb(10),n.Tc(n.rc(48,23,"VIEW"))}}function y(e,t){if(1&e&&(n.ec(0,"div",23),n.Rc(1,M,49,25,"ul",24),n.dc()),2&e){const e=t.$implicit,c=n.pc();n.uc("hidden",!c.showapproveMandateList),n.Mb(1),n.uc("ngIf","MANDATE_NOTIFICATION"==e.notificationType)}}const S=[{path:"",component:(()=>{class e{constructor(e,t,c,a,i,s,o,n){this.router=e,this.DataService=t,this.location=c,this.constant=a,this.http=i,this.approveMandateService=s,this.localStorage=o,this.translate=n,this.headerdata={headerType:"CloseNewHeader",titleName:"APPROVE_MANDATE",footertype:"none"},this.approveMandateList=[],this.pendingWithPayerList=[],this.showapproveMandateList=!1}ngOnInit(){this.DataService.changeMessage(this.headerdata),history.pushState({},"upiMandate",this.location.prepareExternalUrl("upiMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.getApproveMandateList()}goToPage(e,t){this.DataService.approveMandateDetail=e,console.log("this.DataService.approveMandateDetail",this.DataService.approveMandateDetail),this.DataService.selectedFlow=this.constant.val_npci_approveMandate,this.DataService.routeWithNgZone(t)}getApproveMandateList(){var e=this.approveMandateService.approveMandateListRequest();this.UpiApiCall(e)}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if(console.log("GETMANDATETXNDETAIL =>",e.responseParameter.upiResponse),"00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_PENDINGREQUESTS:console.log("PENDINGREQUESTS ",JSON.stringify(t));let e=(new s.a).deserialize(t.responseParameter);this.approveMandateList=e.pendingWithMe;for(let t=0;t<this.approveMandateList.length;t++)this.approveMandateList[t].validityStart=o(this.approveMandateList[t].validityStart).format("DD/MM/yyyy"),this.approveMandateList[t].validityEnd=o(this.approveMandateList[t].validityEnd).format("DD/MM/yyyy"),this.approveMandateList[t].expiredDate=o(this.approveMandateList[t].expiredDate).format("DD/MM/yyyy, hh:mm A");this.showapproveMandateList=this.approveMandateList.find(e=>"MANDATE_NOTIFICATION"==e.notificationType);break;default:console.log("default ",t.subActionId)}},e=>{console.log("ERROR!",e)})}}return e.\u0275fac=function(t){return new(t||e)(n.Yb(i.c),n.Yb(d.a),n.Yb(a.n),n.Yb(r.a),n.Yb(p.a),n.Yb(l.a),n.Yb(v.a),n.Yb(u.a))},e.\u0275cmp=n.Sb({type:e,selectors:[["app-approve-mandate"]],decls:29,vars:8,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","pad-b"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],["class","white-bg1 pad-custom",4,"ngIf"],["class","white-bg1 pad-custom",3,"hidden",4,"ngFor","ngForOf"],[1,"popup-bottom","success"],["action","#","id","success-form"],[1,"row","mt-3"],[1,"success"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"row1","mt-3"],[1,"col-12","text-center"],[1,"ux-button","primary","md"],[1,"white-bg1","pad-custom"],[1,"unfound-info2","cust-p"],["src","assets/images/svg/approve-mandate-no-data.svg","alt","approve-mandate-icon"],[1,"white-bg1","pad-custom",3,"hidden"],["class","payment-list",4,"ngIf"],[1,"payment-list"],[1,"full-container","mb-0"],[1,"col-8","col-md-6"],[1,"left-info1"],["class","heading",4,"ngIf"],[1,"col-4","col-md-6"],[1,"right-info","mt-2"],[1,"row1","mt-2"],[1,"col-7","col-md-6"],[1,"left-info3"],[1,"icon-info"],["src","assets/images/svg/expiry-date.svg","alt","expiry-date-icon"],[1,"col-5","col-md-6"],["src","assets/images/svg/requested-date.svg","alt","request-date-icon"],[1,"autoplay-logo"],["src","assets/images/svg/upi-autopay-small.svg","alt","upi-autoplay"],[1,"btn-section"],[1,"text-right"],[1,"ux-button","secondary","sm5",3,"click"],[1,"heading"]],template:function(e,t){1&e&&(n.ec(0,"div",0),n.ec(1,"div",1),n.ec(2,"div",2),n.ec(3,"div",3),n.ec(4,"div",4),n.ec(5,"div",5),n.ec(6,"div",6),n.ec(7,"div",7),n.ec(8,"div",8),n.ec(9,"div",9),n.Rc(10,g,6,3,"div",10),n.Rc(11,y,2,2,"div",11),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(12,"div",12),n.ec(13,"form",13),n.ec(14,"div",14),n.ec(15,"div",15),n.Zb(16,"img",16),n.ec(17,"h3"),n.Sc(18),n.qc(19,"translate"),n.dc(),n.ec(20,"h5"),n.Sc(21,"Your complaint has been successfully escalated and reported to "),n.ec(22,"a"),n.Sc(23,"digitalsupport@psb.com"),n.dc(),n.dc(),n.dc(),n.dc(),n.ec(24,"div",17),n.ec(25,"div",18),n.ec(26,"button",19),n.Sc(27),n.qc(28,"translate"),n.dc(),n.dc(),n.dc(),n.dc(),n.dc()),2&e&&(n.Mb(10),n.uc("ngIf",!t.showapproveMandateList),n.Mb(1),n.uc("ngForOf",t.approveMandateList),n.Mb(7),n.Tc(n.rc(19,4,"SUCCESS")),n.Mb(9),n.Tc(n.rc(28,6,"OK")))},directives:[a.t,a.s,h.I,h.t,h.u],pipes:[u.a,m.a],styles:[""]}),e})()}];let E=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[i.g.forChild(S)],i.g]}),e})();var D=c("PCNd");let I=(()=>{class e{}return e.\u0275mod=n.Wb({type:e}),e.\u0275inj=n.Vb({factory:function(t){return new(t||e)},imports:[[a.c,D.a,h.m,h.C,E]]}),e})()}}]);