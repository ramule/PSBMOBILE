(window.webpackJsonp=window.webpackJsonp||[]).push([[316],{HVWl:function(e,t,c){"use strict";c.r(t),c.d(t,"ModifyMandateConfirmationModule",(function(){return g}));var i=c("ofXK"),a=c("tyNb"),s=c("XNiG"),d=c("Q9Ys"),r=c("fXoL"),n=c("EnSQ"),o=c("L7Xq"),l=c("TiA8"),h=c("Ygbc"),v=c("5IsW"),p=c("H9Rt"),m=c("Jq9W"),u=c("4bKs"),S=c("Eioz"),D=c("fUdP"),y=c("goA9");function f(e,t){if(1&e&&(r.ec(0,"li",12),r.ec(1,"div",13),r.ec(2,"div",8),r.ec(3,"div",14),r.ec(4,"div",15),r.ec(5,"h6"),r.Sc(6),r.qc(7,"translate"),r.dc(),r.ec(8,"h5"),r.Sc(9),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&e){const e=r.pc();r.Mb(6),r.Tc(r.rc(7,2,"DEBIT_DAY")),r.Mb(3),r.Tc(e.mandateDetails.recurrenceRuleType)}}const b=[{path:"",component:(()=>{class e{constructor(e,t,c,i,a,s,d,r,n,o){this.router=e,this.DataService=t,this.location=c,this.http=i,this.npciAndroidService=a,this.npciIosService=s,this.constant=d,this.localStorage=r,this.modifyMandateService=n,this.loaderService=o,this.headerdata={headerType:"TitleClose",titleName:"CONFIRMATION",footertype:"none"}}ngOnInit(){this.mandateDetails=this.DataService.pendingMandateWithPayer,history.pushState({},"modifyMandate",this.location.prepareExternalUrl("modifyMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.DataService.changeMessage(this.headerdata),this.getVPADetails()}goToPage(e){this.router.navigateByUrl("/"+e)}getVPADetails(){this.DataService.vpaAddressList.length>0&&(this.DataService.checkIfUPIIdExists(this.mandateDetails.payerAddress)?(this.VPADetails=this.DataService.vpaAddressList.find(e=>e.paymentAddress==this.mandateDetails.payerAddress),this.VPAAccountDetails=this.VPADetails.accounts.find(e=>"Y"==e.isDefaultAccount)):(this.VPADetails=this.DataService.vpaAddressList.find(e=>"Y"==e.default),this.VPAAccountDetails=this.VPADetails.accounts.find(e=>"Y"==e.isDefaultAccount))),this.DataService.VPAAccountDetails=this.VPAAccountDetails}modifyMandate(){if("PAYEE"==this.DataService.getMandateInciatedBy(this.mandateDetails))this.DataService.platform.toLowerCase()==this.constant.val_android?this.npciAndroidService.getTransactionId().subscribe(e=>{this.DataService.payeeRevokeTransId=e;let t=this.modifyMandateService.modifyMandateRequest(null,this.mandateDetails,this.DataService.modifyMandateDetails);this.UpiApiCall(t)}):this.DataService.platform.toLowerCase()==this.constant.val_ios&&this.npciIosService.getTransactionId().subscribe(e=>{this.DataService.payeeRevokeTransId=e;let t=this.modifyMandateService.modifyMandateRequest(null,this.mandateDetails,this.DataService.modifyMandateDetails);this.UpiApiCall(t)});else{let e=(new d.a).deserialize(this.mandateDetails);console.log("MODIFY => this.mandateDetails",this.mandateDetails),console.log("accountDetails",e),this.npciAndroidService.upiCreateMandateModel.txnId=this.mandateDetails.txnId,this.mandateDetails.payerIfsc.includes("PSIB")?(this.DataService.preApprovedFlowIdentifier="modifyMandate",this.DataService.preApprovedPreviousPageUrl=this.router.url,this.DataService.preApprovedBankName=this.VPAAccountDetails.bankName,this.DataService.preApprovedAccNo=this.VPAAccountDetails.maskedAccountNumber,this.DataService.preApprovedAmount=this.DataService.modifyMandateDetails.amount.trim().replace(/[^.0-9]+/g,""),this.router.navigateByUrl("/transactionPin")):this.callNpciLibrary(e)}}callNpciLibrary(e){if(console.log("calling npci library..."),console.log("accountData",e),this.loaderService.showLoader(),window.hasOwnProperty("cordova"))if(this.DataService.platform.toLowerCase()==this.constant.val_android){console.log("Calling NPCI Android service..."),this.npciAndroidService.initData();let t=new s.a;this.npciAndroidService.getTransactionId().subscribe(c=>{this.npciAndroidService.transactionId=c,this.npciAndroidService.upiCreateMandateModel.payerVPA=this.mandateDetails.payerAddress,this.npciAndroidService.upiCreateMandateModel.payeeVPA=this.mandateDetails.payeeAddress,this.npciAndroidService.upiCreateMandateModel.txnAmount=this.DataService.modifyMandateDetails.amount,this.npciAndroidService.upiCreateMandateModel.payeeName=this.mandateDetails.payeeName,this.npciAndroidService.androidStartCLLibrary(e,this.constant.val_npci_flow_modifyMandate_android,t).subscribe(e=>{if(console.log("Android StartCLLibrary Success => ",e),e.hasOwnProperty("status")&&"00"==e.status){let t=this.modifyMandateService.modifyMandateRequest(e,this.mandateDetails,this.DataService.modifyMandateDetails);this.UpiApiCall(t)}},e=>{console.log("Android StartCLLibrary error => ",e)})})}else if(this.DataService.platform.toLowerCase()==this.constant.val_ios){console.log("Calling NPCI iOS service..."),this.npciIosService.initData();let t=new s.a;this.npciIosService.getTransactionId().subscribe(c=>{console.log("transactionId Received => ",c),this.npciIosService.txnId=c,this.npciIosService.upiCreateMandateModel.payerVPA=this.mandateDetails.payerAddress,this.npciIosService.upiCreateMandateModel.payeeVPA=this.mandateDetails.payeeAddress,this.npciIosService.upiCreateMandateModel.txnAmount=this.DataService.modifyMandateDetails.amount,this.npciIosService.upiCreateMandateModel.payeeName=this.mandateDetails.payeeName,this.npciIosService.iosStartCLLibrary(e,this.constant.val_npci_flow_modifyMandate_ios,t).subscribe(e=>{if(console.log("iOS StartCLLibrary Success => ",e),e&&e.credkey){let t=this.modifyMandateService.modifyMandateRequest(e,this.mandateDetails,this.DataService.modifyMandateDetails);this.UpiApiCall(t)}else console.log("NPCI flow cancelled...")},e=>{console.log("iOS StartCLLibrary error => ",e)})})}else console.log("unknown platform = ",this.DataService.platform);else console.log("Cordova not available... unable to start NPCI Library on web")}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if(this.DataService.modifyMandateResp=t,"00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_EDITMANDATE:console.log("upiserviceName_EDITMANDATE ",JSON.stringify(t)),this.DataService.routeWithNgZone("modifyMandateSuccess")}},e=>{console.log("ERROR!",e)})}}return e.\u0275fac=function(t){return new(t||e)(r.Yb(a.c),r.Yb(n.a),r.Yb(i.n),r.Yb(o.a),r.Yb(l.a),r.Yb(h.a),r.Yb(v.a),r.Yb(p.a),r.Yb(m.a),r.Yb(u.a))},e.\u0275cmp=r.Sb({type:e,selectors:[["app-modify-mandate-confirmation"]],decls:126,vars:55,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","cust-pb"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1","pad-custom"],[1,"complaint-list"],[1,"bor-n"],[1,"full-container"],[1,"col-12","col-md-12"],[1,"left-info"],["class","bor-n",4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"ux-button","primary","md",3,"click"],[1,"powered-logo"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"popup-bottom","success"],["action","#","id","success-form"],[1,"row","mt-3"],[1,"success"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"row1","mt-3"],[1,"col-12","text-center"],[1,"ux-button","primary","md"]],template:function(e,t){1&e&&(r.ec(0,"div",0),r.ec(1,"div",1),r.ec(2,"div",2),r.ec(3,"div",3),r.ec(4,"div",4),r.ec(5,"div",5),r.ec(6,"div",6),r.ec(7,"div",7),r.ec(8,"div",8),r.ec(9,"div",9),r.ec(10,"div",10),r.ec(11,"ul",11),r.ec(12,"li",12),r.ec(13,"div",13),r.ec(14,"div",8),r.ec(15,"div",14),r.ec(16,"div",15),r.ec(17,"h6"),r.Sc(18),r.qc(19,"translate"),r.dc(),r.ec(20,"h5"),r.Sc(21),r.qc(22,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(23,"li",12),r.ec(24,"div",13),r.ec(25,"div",8),r.ec(26,"div",14),r.ec(27,"div",15),r.ec(28,"h6"),r.Sc(29),r.qc(30,"translate"),r.dc(),r.ec(31,"h5"),r.Sc(32),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(33,"li",12),r.ec(34,"div",13),r.ec(35,"div",8),r.ec(36,"div",14),r.ec(37,"div",15),r.ec(38,"h6"),r.Sc(39),r.qc(40,"translate"),r.dc(),r.ec(41,"h5"),r.Sc(42),r.qc(43,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(44,"li",12),r.ec(45,"div",13),r.ec(46,"div",8),r.ec(47,"div",14),r.ec(48,"div",15),r.ec(49,"h6"),r.Sc(50),r.qc(51,"translate"),r.dc(),r.ec(52,"h5"),r.Sc(53),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(54,"li",12),r.ec(55,"div",13),r.ec(56,"div",8),r.ec(57,"div",14),r.ec(58,"div",15),r.ec(59,"h6"),r.Sc(60),r.qc(61,"translate"),r.dc(),r.ec(62,"h5"),r.Sc(63),r.qc(64,"customcurrency"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(65,"li",12),r.ec(66,"div",13),r.ec(67,"div",8),r.ec(68,"div",14),r.ec(69,"div",15),r.ec(70,"h6"),r.Sc(71),r.qc(72,"translate"),r.dc(),r.ec(73,"h5"),r.Sc(74),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(75,"li",12),r.ec(76,"div",13),r.ec(77,"div",8),r.ec(78,"div",14),r.ec(79,"div",15),r.ec(80,"h6"),r.Sc(81),r.qc(82,"translate"),r.dc(),r.ec(83,"h5"),r.Sc(84),r.qc(85,"formatDate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.Rc(86,f,10,4,"li",16),r.ec(87,"li",12),r.ec(88,"div",13),r.ec(89,"div",8),r.ec(90,"div",14),r.ec(91,"div",15),r.ec(92,"h6"),r.Sc(93),r.qc(94,"translate"),r.dc(),r.ec(95,"h5"),r.Sc(96),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(97,"div",17),r.ec(98,"div",18),r.ec(99,"div",4),r.ec(100,"div",5),r.ec(101,"div",19),r.ec(102,"button",20),r.lc("click",(function(){return t.modifyMandate()})),r.Sc(103),r.qc(104,"translate"),r.dc(),r.dc(),r.dc(),r.ec(105,"div",5),r.ec(106,"div",19),r.ec(107,"div",21),r.Zb(108,"img",22),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(109,"div",23),r.ec(110,"form",24),r.ec(111,"div",25),r.ec(112,"div",26),r.Zb(113,"img",27),r.ec(114,"h3"),r.Sc(115),r.qc(116,"translate"),r.dc(),r.ec(117,"h5"),r.Sc(118,"Your complaint has been successfully escalated and reported to "),r.ec(119,"a"),r.Sc(120,"digitalsupport@psb.com"),r.dc(),r.dc(),r.dc(),r.dc(),r.ec(121,"div",28),r.ec(122,"div",29),r.ec(123,"button",30),r.Sc(124),r.qc(125,"translate"),r.dc(),r.dc(),r.dc(),r.dc(),r.dc()),2&e&&(r.Mb(18),r.Tc(r.rc(19,24,"REQUEST_FROM_UPI_ID")),r.Mb(3),r.Vc("",r.rc(22,26,"UPI_ID")," : ",t.mandateDetails.payerAddress,""),r.Mb(8),r.Tc(r.rc(30,28,"LINKED_ACCOUNT")),r.Mb(3),r.Vc(" ",t.VPAAccountDetails.accType," ",t.VPAAccountDetails.maskedAccountNumber," "),r.Mb(7),r.Tc(r.rc(40,30,"PAYEE_UPI_ID")),r.Mb(3),r.Vc("",r.rc(43,32,"UPI_ID")," : ",t.mandateDetails.payeeAddress,""),r.Mb(8),r.Tc(r.rc(51,34,"PAYEE_NAME")),r.Mb(3),r.Tc(t.mandateDetails.payeeName),r.Mb(7),r.Tc(r.rc(61,36,"AMOUNT")),r.Mb(3),r.Uc(" ",r.sc(64,38,t.DataService.modifyMandateDetails.amount,"symbol")," "),r.Mb(8),r.Tc(r.rc(72,41,"FREQUENCY")),r.Mb(3),r.Tc(t.mandateDetails.frequency),r.Mb(7),r.Tc(r.rc(82,43,"VALIDITY")),r.Mb(3),r.Vc("",r.rc(85,45,t.mandateDetails.validityStart)," - ",t.DataService.modifyMandateDetails.validyEndDate," "),r.Mb(2),r.uc("ngIf","ONETIME"!=t.mandateDetails.frequency&&"DAILY"!=t.mandateDetails.frequency&&"ASPRESENTED"!=t.mandateDetails.frequency),r.Mb(7),r.Tc(r.rc(94,47,"REMARKS")),r.Mb(3),r.Tc(t.mandateDetails.remarks?t.mandateDetails.remarks:"-"),r.Mb(7),r.Uc("",r.rc(104,49,"CONFIRM")," "),r.Mb(12),r.Tc(r.rc(116,51,"SUCCESS")),r.Mb(9),r.Tc(r.rc(125,53,"OK")))},directives:[i.t],pipes:[S.a,D.a,y.b],styles:[""]}),e})()}];let A=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(t){return new(t||e)},imports:[[a.g.forChild(b)],a.g]}),e})();var M=c("PCNd");let g=(()=>{class e{}return e.\u0275mod=r.Wb({type:e}),e.\u0275inj=r.Vb({factory:function(t){return new(t||e)},imports:[[i.c,M.a,A]]}),e})()}}]);