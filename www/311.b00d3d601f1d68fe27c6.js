(window.webpackJsonp=window.webpackJsonp||[]).push([[311],{"z/68":function(e,t,c){"use strict";c.r(t),c.d(t,"ApproveMandateViewDetailsModule",(function(){return D}));var i=c("ofXK"),a=c("tyNb"),o=c("3Pt+"),n=c("wd/R"),s=c("fXoL"),d=c("EnSQ"),r=c("au7T"),l=c("5IsW"),p=c("fHQ/"),u=c("H9Rt");let v=(()=>{class e{constructor(e,t,c,i,a){this.constant=e,this.encryptDecryptService=t,this.storage=c,this.dataService=i,this.commonMethod=a}declineMandateRequest(e,t){var c={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_REJECTMANDATE,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_txnID]:e.txnId,[this.constant.key_upi_payerAddr]:e.payerAddress,[this.constant.key_upi_payeeVPA]:e.payeeAddress,[this.constant.key_upi_beneMobileNo]:e.mobileNo,[this.constant.key_upi_isSpam]:t.spam?"YES":"N",[this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi()}};return console.log("declineMandateRequest  ",JSON.stringify(c)),this.getOmniRequestObject(c)}setBlockUPIReq(e,t){var c={[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_subAction]:this.constant.upiserviceName_BLOCKNOTIFICATION,[this.constant.key_upi_inputParam]:{[this.constant.key_upi_paymentAddress]:t.payeeAddress,[this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,[this.constant.key_upi_blockPeriod]:e,[this.constant.key_upi_nickName]:t.payeeName,[this.constant.key_upi_entityID]:this.constant.val_upi_psb,[this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),[this.constant.key_upi_notificationType]:this.constant.val_upi_TRANSACTION_NOTIFICATION,[this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),[this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi(),[this.constant.key_upi_txnID]:t.txnId}};return console.log("setBlockUPIReq ",JSON.stringify(c)),this.getOmniRequestObject(c)}getOmniRequestObject(e){e=e;var t={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),[this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,[this.constant.key_upiRequest]:JSON.stringify(e)};return console.log("inputData => ",JSON.stringify(t)),this.getEncryptedOmniRequestObject(t)}getEncryptedOmniRequestObject(e){return console.log("session Key : ",this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(e))}}return e.\u0275fac=function(t){return new(t||e)(s.ic(l.a),s.ic(p.a),s.ic(u.a),s.ic(d.a),s.ic(r.a))},e.\u0275prov=s.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var h=c("L7Xq"),b=c("Eioz"),m=c("fUdP");function y(e,t){if(1&e&&(s.ec(0,"h6"),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e){const e=s.pc();s.Mb(1),s.Vc("",s.rc(2,2,"REQUESTED_BY")," ",e.approveMandateDetail.payeeName,"")}}function _(e,t){if(1&e&&(s.ec(0,"h6"),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e){const e=s.pc();s.Mb(1),s.Vc("",s.rc(2,2,"MODIFIED_BY")," ",e.approveMandateDetail.payeeName,"")}}function g(e,t){if(1&e){const e=s.fc();s.ec(0,"li"),s.ec(1,"div",12),s.ec(2,"div",8),s.ec(3,"div",53),s.ec(4,"div",54),s.ec(5,"h5"),s.ec(6,"a",55),s.lc("click",(function(){s.Hc(e);const t=s.pc();return t.viewInvoice(t.approveMandateDetail.refUrl)})),s.Zb(7,"img",56),s.Sc(8),s.qc(9,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(10,"div",53),s.ec(11,"div",57),s.ec(12,"h5"),s.ec(13,"a",58),s.lc("click",(function(){return s.Hc(e),s.pc().openPopup("blockUPI")})),s.Zb(14,"img",59),s.Sc(15),s.qc(16,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc()}2&e&&(s.Mb(8),s.Uc(" ",s.rc(9,2,"VIEW_INVOICE")," "),s.Mb(7),s.Uc("",s.rc(16,4,"BLOCK_UPI_ID")," "))}const M=[{path:"",component:(()=>{class e{constructor(e,t,c,i,a,o,n,s){this.router=e,this.DataService=t,this.commonMethod=c,this.approveMandateDetailService=i,this.http=a,this.localStorage=o,this.constant=n,this.location=s,this.headerdata={headerType:"TitleClose",titleName:"VIEW_DETAILS",footertype:"none"}}ngOnInit(){this.DataService.changeMessage(this.headerdata),history.pushState({},"approveMandate",this.location.prepareExternalUrl("approveMandate")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.approveMandateDetail=this.DataService.approveMandateDetail,this.validityStart=n(this.approveMandateDetail.validityStart).format("DD/MM/yyyy"),this.validityEnd=n(this.approveMandateDetail.validityEnd).format("DD/MM/yyyy"),this.getLinkedAccount(),this.buildForm()}buildForm(){this.blockUPIIdForm=new o.j({blockPeriod:new o.g("Forever",[o.G.required])}),this.declineMandateForm=new o.j({spam:new o.g(!1)})}goToPage(e){this.DataService.routeWithNgZone(e)}openPopup(e){this.commonMethod.openPopup("div.popup-bottom."+e)}closePopup(e){this.commonMethod.closePopup("div.popup-bottom."+e)}openRejectPopup(e){this.declineMandateForm.get("spam").reset(!1),this.commonMethod.openPopup("div.popup-bottom."+e)}declineMandate(){if(this.declineMandateForm.valid){this.closePopup("declineMandate");var e=this.approveMandateDetailService.declineMandateRequest(this.approveMandateDetail,this.declineMandateForm.value);this.UpiApiCall(e)}}blockUPI(){if(this.blockUPIIdForm.valid){console.log(this.blockUPIIdForm.value);let{blockPeriod:t}=this.blockUPIIdForm.value;this.closePopup("blockUPI");var e=this.approveMandateDetailService.setBlockUPIReq(t,this.approveMandateDetail);this.UpiApiCall(e)}}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let t=e.responseParameter.upiResponse;if("00"==t.status)switch(t.subActionId){case this.constant.upiserviceName_REJECTMANDATE:this.DataService.declineMandateResp=t,console.log("upiserviceName_REJECTMANDATE ",JSON.stringify(t)),this.DataService.declineMandateLinkedAccount=this.VPAAccountDetails,this.DataService.declineMandateLinkedVPA=this.VPADetails,this.goToPage("approveMandateDecline");break;case this.constant.upiserviceName_BLOCKNOTIFICATION:console.log("upiserviceName_BLOCKNOTIFICATION ",JSON.stringify(t)),this.DataService.pendingBlockSuccessURL="approveMandate",this.DataService.pendingReqBlockUPIResp=t,this.DataService.pendingReqBlockUPIResp.payeeAddress=this.approveMandateDetail.payeeAddress,this.DataService.pendingReqBlockUPIResp.blockPeriod=this.blockUPIIdForm.get("blockPeriod").value,this.router.navigateByUrl("/pendingUpIdBlockSuccess")}},e=>{console.log("ERROR!",e)})}viewInvoice(e){this.DataService.isCordovaAvailable?cordova.InAppBrowser.open(e,"_blank","location=no"):window.open(e)}getLinkedAccount(){this.DataService.vpaAddressList.length>0&&(this.DataService.checkIfUPIIdExists(this.approveMandateDetail.payerAddress)?(this.VPADetails=this.DataService.vpaAddressList.find(e=>e.paymentAddress==this.approveMandateDetail.payerAddress),this.VPAAccountDetails=this.VPADetails.accounts.find(e=>"Y"==e.isDefaultAccount)):(this.VPADetails=this.DataService.vpaAddressList.find(e=>"Y"==e.default),this.VPAAccountDetails=this.VPADetails.accounts.find(e=>"Y"==e.isDefaultAccount)))}}return e.\u0275fac=function(t){return new(t||e)(s.Yb(a.c),s.Yb(d.a),s.Yb(r.a),s.Yb(v),s.Yb(h.a),s.Yb(u.a),s.Yb(l.a),s.Yb(i.n))},e.\u0275cmp=s.Sb({type:e,selectors:[["app-approve-mandate-view-details"]],decls:181,vars:87,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","cust-pb"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1","pad-custom"],[1,"complaint-list"],[1,"full-container"],[1,"col-12","col-md-12"],[1,"left-info"],[4,"ngIf"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-6","col-lg-6","col-md-6","text-center"],[1,"decline-btn","ux-button","secondary",3,"click"],[1,"ux-button","primary",3,"click"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"autoplay-logo"],["src","assets/images/svg/upi-autopay-small.svg","alt","upi-autoplay-logo"],[1,"popup-bottom","declineMandate"],[1,"text-center"],["id","decline-mandate-form",3,"formGroup","ngSubmit"],[1,"text-left"],[1,"ux-selection1","mar-rcustom"],["type","checkbox","formControlName","spam"],[1,"checkmark"],[1,"row1","mt-2"],[1,"col-6","text-center"],["type","button",1,"ux-button","secondary","md","close-btn",3,"click"],["type","submit",1,"ux-button","primary","md"],[1,"popup-bottom","blockUPI"],[1,"col-10"],[1,"mb-0"],[1,"col-2"],[1,"ux-button-icon","close-btn",3,"click"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],["id","reminder-form",3,"formGroup","ngSubmit"],[1,"row1","mt-3"],[1,"col-4","col-xl-3","col-lg-4","col-md-6"],[1,"ux-selection","dis-b"],[1,"ux-selection2"],["type","radio","value","forever","formControlName","blockPeriod"],["type","radio","value","day","formControlName","blockPeriod"],["type","radio","value","week","formControlName","blockPeriod"],["type","radio","value","month","formControlName","blockPeriod"],["type","radio","value","year","formControlName","blockPeriod"],["type","button",1,"ux-button","secondary","md",3,"click"],["type","submit",1,"ux-button","primary","md",3,"disabled"],[1,"col-6"],[1,"left-info1"],[1,"reminder-btn","set",3,"click"],["src","assets/images/svg/view-invoice.svg","alt","view-invoice-icon",1,"big-img"],[1,"right-info"],[1,"block-btn","block",3,"click"],["src","assets/images/svg/block-r.svg","alt","block-icon",1,"big-img"]],template:function(e,t){1&e&&(s.ec(0,"div",0),s.ec(1,"div",1),s.ec(2,"div",2),s.ec(3,"div",3),s.ec(4,"div",4),s.ec(5,"div",5),s.ec(6,"div",6),s.ec(7,"div",7),s.ec(8,"div",8),s.ec(9,"div",9),s.ec(10,"div",10),s.ec(11,"ul",11),s.ec(12,"li"),s.ec(13,"div",12),s.ec(14,"div",8),s.ec(15,"div",13),s.ec(16,"div",14),s.Rc(17,y,3,4,"h6",15),s.Rc(18,_,3,4,"h6",15),s.ec(19,"h5"),s.Sc(20),s.qc(21,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(22,"li"),s.ec(23,"div",12),s.ec(24,"div",8),s.ec(25,"div",13),s.ec(26,"div",14),s.ec(27,"h6"),s.Sc(28),s.qc(29,"translate"),s.dc(),s.ec(30,"h5"),s.Sc(31),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(32,"li"),s.ec(33,"div",12),s.ec(34,"div",8),s.ec(35,"div",13),s.ec(36,"div",14),s.ec(37,"h6"),s.Sc(38),s.qc(39,"translate"),s.dc(),s.ec(40,"h5"),s.Sc(41),s.qc(42,"customcurrency"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(43,"li"),s.ec(44,"div",12),s.ec(45,"div",8),s.ec(46,"div",13),s.ec(47,"div",14),s.ec(48,"h6"),s.Sc(49),s.qc(50,"translate"),s.qc(51,"translate"),s.dc(),s.ec(52,"h5"),s.Sc(53),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(54,"li"),s.ec(55,"div",12),s.ec(56,"div",8),s.ec(57,"div",13),s.ec(58,"div",14),s.ec(59,"h6"),s.Sc(60),s.qc(61,"translate"),s.dc(),s.ec(62,"h5"),s.Sc(63),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(64,"li"),s.ec(65,"div",12),s.ec(66,"div",8),s.ec(67,"div",13),s.ec(68,"div",14),s.ec(69,"h6"),s.Sc(70),s.qc(71,"translate"),s.dc(),s.ec(72,"h5"),s.Sc(73),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.Rc(74,g,17,6,"li",15),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(75,"div",16),s.ec(76,"div",17),s.ec(77,"div",4),s.ec(78,"div",5),s.ec(79,"div",18),s.ec(80,"button",19),s.lc("click",(function(){return t.openRejectPopup("declineMandate")})),s.Sc(81),s.qc(82,"translate"),s.dc(),s.dc(),s.ec(83,"div",18),s.ec(84,"button",20),s.lc("click",(function(){return t.goToPage("approveMandateConfirmation")})),s.Sc(85),s.qc(86,"translate"),s.dc(),s.dc(),s.dc(),s.ec(87,"div",5),s.ec(88,"div",21),s.ec(89,"div",22),s.Zb(90,"img",23),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(91,"div",24),s.ec(92,"div",5),s.ec(93,"div",7),s.ec(94,"h4",25),s.Sc(95),s.qc(96,"translate"),s.dc(),s.dc(),s.dc(),s.ec(97,"form",26),s.lc("ngSubmit",(function(){return t.declineMandate()})),s.ec(98,"div",5),s.ec(99,"div",7),s.ec(100,"p"),s.Sc(101),s.qc(102,"translate"),s.dc(),s.dc(),s.ec(103,"div",7),s.ec(104,"div",27),s.ec(105,"div"),s.ec(106,"div",28),s.ec(107,"label"),s.Sc(108),s.qc(109,"translate"),s.Zb(110,"input",29),s.Zb(111,"span",30),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(112,"div",31),s.ec(113,"div",32),s.ec(114,"button",33),s.lc("click",(function(){return t.closePopup("declineMandate")})),s.Sc(115),s.qc(116,"translate"),s.dc(),s.dc(),s.ec(117,"div",32),s.ec(118,"button",34),s.Sc(119),s.qc(120,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(121,"div",35),s.ec(122,"div",8),s.ec(123,"div",36),s.ec(124,"h4",37),s.Sc(125),s.qc(126,"translate"),s.dc(),s.ec(127,"h6"),s.Sc(128),s.qc(129,"translate"),s.Zb(130,"br"),s.Sc(131),s.dc(),s.dc(),s.ec(132,"div",38),s.ec(133,"button",39),s.lc("click",(function(){return t.closePopup("blockUPI")})),s.Zb(134,"img",40),s.dc(),s.dc(),s.dc(),s.ec(135,"form",41),s.lc("ngSubmit",(function(){return t.blockUPI()})),s.ec(136,"div",42),s.ec(137,"div",43),s.ec(138,"div",44),s.ec(139,"label",45),s.Sc(140),s.qc(141,"translate"),s.Zb(142,"input",46),s.Zb(143,"span",30),s.dc(),s.dc(),s.dc(),s.ec(144,"div",43),s.ec(145,"div",44),s.ec(146,"label",45),s.Sc(147),s.qc(148,"translate"),s.Zb(149,"input",47),s.Zb(150,"span",30),s.dc(),s.dc(),s.dc(),s.ec(151,"div",43),s.ec(152,"div",44),s.ec(153,"label",45),s.Sc(154),s.qc(155,"translate"),s.Zb(156,"input",48),s.Zb(157,"span",30),s.dc(),s.dc(),s.dc(),s.ec(158,"div",43),s.ec(159,"div",44),s.ec(160,"label",45),s.Sc(161),s.qc(162,"translate"),s.Zb(163,"input",49),s.Zb(164,"span",30),s.dc(),s.dc(),s.dc(),s.ec(165,"div",43),s.ec(166,"div",44),s.ec(167,"label",45),s.Sc(168),s.qc(169,"translate"),s.Zb(170,"input",50),s.Zb(171,"span",30),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(172,"div",42),s.ec(173,"div",32),s.ec(174,"button",51),s.lc("click",(function(){return t.closePopup("blockUPI")})),s.Sc(175),s.qc(176,"translate"),s.dc(),s.dc(),s.ec(177,"div",32),s.ec(178,"button",52),s.Sc(179),s.qc(180,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc()),2&e&&(s.Mb(17),s.uc("ngIf","PENDING"==t.approveMandateDetail.status),s.Mb(1),s.uc("ngIf","CREATED"==t.approveMandateDetail.status),s.Mb(2),s.Vc("",s.rc(21,38,"UPI_ID")," : ",t.approveMandateDetail.payeeAddress,""),s.Mb(8),s.Tc(s.rc(29,40,"PAYEE_NAME")),s.Mb(3),s.Uc("",t.approveMandateDetail.payeeName," "),s.Mb(7),s.Tc(s.rc(39,42,"AMOUNT")),s.Mb(3),s.Uc(" ",s.sc(42,44,t.approveMandateDetail.amount,"symbol")," "),s.Mb(8),s.Vc("",s.rc(50,47,"START_DATE")," - ",s.rc(51,49,"END_DATE"),""),s.Mb(4),s.Vc(" ",t.approveMandateDetail.validityStart," - ",t.approveMandateDetail.validityEnd," "),s.Mb(7),s.Tc(s.rc(61,51,"EXPIRY_DATE_AND_TIME")),s.Mb(3),s.Uc(" ",t.approveMandateDetail.expiredDate," "),s.Mb(7),s.Tc(s.rc(71,53,"FREQUENCY")),s.Mb(3),s.Tc(t.approveMandateDetail.frequency),s.Mb(1),s.uc("ngIf","null"!=(null==t.approveMandateDetail?null:t.approveMandateDetail.payeeCode)&&"0000"!=(null==t.approveMandateDetail?null:t.approveMandateDetail.payeeCode)),s.Mb(7),s.Tc(s.rc(82,55,"DECLINE")),s.Mb(4),s.Tc(s.rc(86,57,"APPROVE")),s.Mb(10),s.Tc(s.rc(96,59,"DECLINE_MANDATE")),s.Mb(2),s.uc("formGroup",t.declineMandateForm),s.Mb(4),s.Vc(" ",s.rc(102,61,"DO_YOU_WANT_TO_DECLINE_MANDATE_REQUEST_FROM")," ",t.approveMandateDetail.payeeName," ? "),s.Mb(7),s.Uc("",s.rc(109,63,"REPORT_AS_SPAM")," "),s.Mb(7),s.Tc(s.rc(116,65,"NO")),s.Mb(4),s.Tc(s.rc(120,67,"YES")),s.Mb(6),s.Tc(s.rc(126,69,"CONFIRMATION")),s.Mb(3),s.Uc("",s.rc(129,71,"HOW_LONG_DO_YOU_WANT_TO_BLOCK")," "),s.Mb(3),s.Uc(" ",t.approveMandateDetail.payeeAddress," ?"),s.Mb(4),s.uc("formGroup",t.blockUPIIdForm),s.Mb(5),s.Uc("",s.rc(141,73,"FOREVER")," "),s.Mb(7),s.Uc("",s.rc(148,75,"1_DAY")," "),s.Mb(7),s.Uc("",s.rc(155,77,"1_WEEK")," "),s.Mb(7),s.Uc("",s.rc(162,79,"1_MONTH")," "),s.Mb(7),s.Uc("",s.rc(169,81,"1_YEAR")," "),s.Mb(7),s.Tc(s.rc(176,83,"NO")),s.Mb(3),s.uc("disabled",t.blockUPIIdForm.invalid),s.Mb(1),s.Tc(s.rc(180,85,"YES")))},directives:[i.t,o.I,o.t,o.k,o.a,o.s,o.i,o.A,o.c],pipes:[b.a,m.a],styles:[""]}),e})()}];let S=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(t){return new(t||e)},imports:[[a.g.forChild(M)],a.g]}),e})();var k=c("PCNd");let D=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(t){return new(t||e)},imports:[[i.c,k.a,o.m,o.C,S]]}),e})()}}]);