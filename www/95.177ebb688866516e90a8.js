(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{Geda:function(e,c,t){"use strict";t.d(c,"a",(function(){return n}));var i=t("fXoL"),o=t("3Pt+"),r=t("au7T");let n=(()=>{class e{constructor(e,c){this.control=e,this.commonMethods=c,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){const c=+this.limitTo;if(-1===this.specialKeys.indexOf(e.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=c){let e=this.control.value.substring(0,c);this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(i.Yb(o.r),i.Yb(r.a))},e.\u0275dir=i.Tb({type:e,selectors:[["","limit-to",""]],hostBindings:function(e,c){1&e&&i.lc("input",(function(e){return c.ngOnChanges(e)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[i.Kb]}),e})()},OLmP:function(e,c,t){"use strict";t.r(c),t.d(c,"PendingRequestViewDetailsModule",(function(){return O}));var i=t("ofXK"),o=t("tyNb"),r=t("3Pt+"),n=t("wd/R"),s=t("fXoL"),d=t("EnSQ"),a=t("8vSS"),l=t("L7Xq"),p=t("H9Rt"),m=t("5IsW"),u=t("oBZJ"),h=t("au7T"),b=t("Eioz"),v=t("Geda"),g=t("fUdP");function R(e,c){if(1&e&&(s.ec(0,"h6"),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e){const e=s.pc();s.Mb(1),s.Vc("",s.rc(2,2,"TO_BE_SENT_TO")," ",e.pendingWithMe.payeeName,"")}}function S(e,c){if(1&e&&(s.ec(0,"h6"),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e){const e=s.pc();s.Mb(1),s.Vc("",s.rc(2,2,"REQUESTED_BY")," ",e.pendingWithMe.payeeName,"")}}function M(e,c){1&e&&(s.ec(0,"p",72),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Uc(" ",s.rc(2,1,"ENTER_REASON_ERROR")," "))}function f(e,c){1&e&&(s.ec(0,"p",73),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Tc(s.rc(2,1,"ENTER_ALPHABET_NUMBER_ERROR")))}function T(e,c){1&e&&(s.ec(0,"p",72),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Uc(" ",s.rc(2,1,"ENTER_DATE_ERROR")," "))}function E(e,c){1&e&&(s.ec(0,"p",72),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Uc(" ",s.rc(2,1,"ENTER_TIME_ERROR")," "))}function I(e,c){1&e&&(s.ec(0,"p",72),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Uc(" ",s.rc(2,1,"ENTER_VALID_EXPIRY_TIME")," "))}function k(e,c){1&e&&(s.ec(0,"p",72),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Uc(" ",s.rc(2,1,"ENTER_REASON_ERROR")," "))}function P(e,c){1&e&&(s.ec(0,"p",73),s.Sc(1),s.qc(2,"translate"),s.dc()),2&e&&(s.Mb(1),s.Tc(s.rc(2,1,"ENTER_ALPHABET_NUMBER_ERROR")))}const N=[{path:"",component:(()=>{class e{constructor(e,c,t,i,o,r,s,d,a,l,p){this.router=e,this.DataService=c,this.pendingReqService=t,this.http=i,this.localStorage=o,this.constant=r,this.pluginService=s,this.commonMethods=d,this.location=a,this.translatePipe=l,this.ngZone=p,this.currentDate=n().toDate(),this.headerdata={headerType:"TitleClose",titleName:"VIEW_DETAILS",footertype:"none"},this.timeError=!1}ngOnInit(){this.DataService.changeMessage(this.headerdata),this.pendingWithMe=this.DataService.pendingWithMe,this.minDate=n().toDate(),this.maxDate=n(this.pendingWithMe.expiredDateTimeStamp).toDate(),createGlobalNavMore(),this.buildForm(),history.pushState({},"pendingRequestUpi",this.location.prepareExternalUrl("pendingRequestUpi")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.checkFlowPendingReq()}goToPage(e){"pendingConfirmation"==e&&(this.DataService.upiCollectVpaList=[],this.router.navigateByUrl("/"+e)),this.router.navigateByUrl("/"+e)}buildForm(){this.setReminderForm=new r.j({date:new r.g("",[r.G.required]),time:new r.g("",[r.G.required])}),this.blockUPIIdForm=new r.j({blockPeriod:new r.g("forever",[r.G.required]),reason:new r.g("",[r.G.required,r.G.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),spam:new r.g(!1)}),this.rejectForm=new r.j({reason:new r.g("",[r.G.required,r.G.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),spam:new r.g(!1)}),this.setReminderForm.valueChanges.subscribe(e=>{console.log("Changed data => ",e),console.log("setReminderForm Valid = ",this.setReminderForm.valid)})}setSnoozeNotification(){if(this.setReminderForm.markAllAsTouched(),this.setReminderForm.valid){var e=n(this.selectedDate).format("DD/MM/YYYY")+" "+n(this.selectedTime).format("hh:mm a");this.closePopup("div.popup-bottom.snoozeReminder");var c=this.pendingReqService.snoozeNotificationReq(e,this.pendingWithMe);this.UpiApiCall(c)}}blockUPI(){if(this.blockUPIIdForm.valid){console.log(this.blockUPIIdForm.value),this.closePopup("div.popup-bottom.blockUPI");var e=this.pendingReqService.setBlockUPIReq(this.blockUPIIdForm.value,this.pendingWithMe);this.UpiApiCall(e)}}rejectReq(){if(this.rejectForm.markAllAsTouched(),this.rejectForm.valid){console.log(this.rejectForm.value),this.closePopup("div.popup-bottom.rejectPendingReq");var e=this.pendingReqService.setRejectCollectReq(this.rejectForm.value,this.pendingWithMe);this.UpiApiCall(e)}}UpiApiCall(e){this.http.callBankingAPIService(e,this.localStorage.getLocalStorage(this.constant.storage_deviceId),this.constant.upiserviceName_PROCESSUPISERVICESESSION,!0).subscribe(e=>{let c=e.responseParameter.upiResponse;if("00"==c.status)switch(c.subActionId){case this.constant.upiserviceName_SNOOZENOTIFICATION:console.log("upiserviceName_SNOOZENOTIFICATION ",JSON.stringify(c)),this.setReminderResp=c,this.showSuccessPopupReminder();break;case this.constant.upiserviceName_BLOCKNOTIFICATION:console.log("upiserviceName_BLOCKNOTIFICATION ",JSON.stringify(c)),this.DataService.pendingBlockSuccessURL="pendingRequestUpi",this.DataService.pendingReqBlockUPIResp=c,this.DataService.pendingReqBlockUPIResp.payeeAddress=this.pendingWithMe.payeeAddress,this.DataService.pendingReqBlockUPIResp.blockPeriod=this.blockUPIIdForm.get("blockPeriod").value,this.router.navigateByUrl("/pendingUpIdBlockSuccess");break;case this.constant.upiserviceName_REJECTNOTIFICATION:this.DataService.pendingReqRejectResp=c,this.DataService.reportSpam=this.rejectForm.value.spam,this.router.navigateByUrl("/pendingRejected"),console.log("upiserviceName_REJECTNOTIFICATION ",JSON.stringify(c))}},e=>{console.log("ERROR!",e)})}openDatePicker(){this.pluginService.openDatePicker("date",this.maxDate,this.minDate,this.maxDate).subscribe(e=>{console.log("date from plugin => ",e),this.ngZone.run(()=>{this.selectedDate=e,this.setReminderForm.controls.date.setValue(n(e).format("DD/MM/YYYY")),this.validateTime()})})}openTimePicker(){this.pluginService.openDatePicker("time",this.maxDate).subscribe(e=>{console.log("time from plugin =>",e),this.ngZone.run(()=>{this.selectedTime=e,this.setReminderForm.controls.time.setValue(n(e).format("hh:mm A")),this.validateTime()})})}validateTime(){this.setReminderForm.get("time").markAsTouched();var e=new Date,c=n(this.selectedDate).format("YYYY-MM-DD"),t=n(this.pendingWithMe.expiredDate).format("YYYY-MM-DD");this.timeError=c<t?this.minutesOfDay(n(this.selectedTime))<this.minutesOfDay(n(e.getTime())):this.minutesOfDay(n(this.selectedTime))>this.minutesOfDay(n(this.pendingWithMe.expiredDate))}minutesOfDay(e){return e.minutes()+60*e.hours()}openSetReminderPopup(){this.setReminderForm.get("date").reset(""),this.setReminderForm.get("time").reset(""),this.commonMethods.openPopup("div.popup-bottom.snoozeReminder")}showSuccessPopupReminder(){$("div.popup-bottom.snoozeReminder").removeClass("popup-active"),this.commonMethods.openPopup("div.popup-bottom.successReminder")}openBlockUPIPopup(){this.blockUPIIdForm.patchValue({blockPeriod:"Forever"}),this.commonMethods.openPopup("div.popup-bottom.blockUPI")}openRejectPopup(){this.rejectForm.get("reason").reset(""),this.rejectForm.get("spam").reset(!1),this.commonMethods.openPopup("div.popup-bottom.rejectPendingReq")}closePopup(e){this.commonMethods.closePopup(e)}viewInvoice(){cordova.InAppBrowser.open(this.pendingWithMe.refUrl,"_blank","location=no")}checkFlowPendingReq(){this.DataService.isSetReminderClicked?this.openSetReminderPopup():this.DataService.isBlockUPIIdClicked?this.openBlockUPIPopup():this.DataService.isRejectClicked&&this.openRejectPopup()}ngOnDestroy(){this.DataService.isSetReminderClicked=!1,this.DataService.isRejectClicked=!1,this.DataService.isAcceptClicked=!1,this.DataService.isBlockUPIIdClicked=!1}}return e.\u0275fac=function(c){return new(c||e)(s.Yb(o.c),s.Yb(d.a),s.Yb(a.a),s.Yb(l.a),s.Yb(p.a),s.Yb(m.a),s.Yb(u.a),s.Yb(h.a),s.Yb(i.n),s.Yb(b.a),s.Yb(s.H))},e.\u0275cmp=s.Sb({type:e,selectors:[["app-pending-request-view-details"]],decls:273,vars:129,consts:[[1,"main"],[1,"right-main-column","minus-rt-col","mar-custom"],[1,"right-col-container","cust-pb"],[1,"body-page-container"],[1,"container-fluid"],[1,"row"],[1,"bg-section"],[1,"col-12"],[1,"row1"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-bg1","pad-custom"],[1,"complaint-list"],[1,"full-container"],[1,"left-info1"],[4,"ngIf"],[3,"click"],[1,"col-6"],[1,"reminder-btn","set",3,"click"],["src","assets/images/svg/reminder-g.svg","alt","reminder-icon",1,"big-img"],[1,"right-info",3,"click"],[1,"block-btn","block"],["src","assets/images/svg/block-r.svg","alt","block-icon",1,"big-img"],[1,"footer-container","sticky-actions"],[1,"footer-inactions","minus-rt-col"],[1,"col-6","text-center"],[1,"ux-button","secondary","md","reject-btn",3,"click"],[1,"ux-button","primary","md",3,"click"],[1,"col-12","col-md-12","col-lg-12","text-center"],[1,"powered-logo"],["src","assets/images/logo/powered-upi-logo.svg","alt","powered-upi-logo"],[1,"popup-bottom","rejectPendingReq"],[1,"col-10"],[1,"mb-0"],[1,"col-2"],[1,"ux-button-icon","close-btn"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],["id","reject-form",3,"formGroup","ngSubmit"],[1,"row1","mt-3"],[1,"col-12","col-md-12"],[1,"ux-input"],["type","text","rows","3","placeholder","","formControlName","reason","limit-to","200",1,"ios-collect-reject-css"],["class","error-message",4,"ngIf"],["class","text-center error-message",4,"ngIf"],[1,"small-message","text-right"],[1,"ux-selection1"],["type","checkbox","formControlName","spam"],[1,"checkmark"],[1,"col-12","text-center"],["type","submit",1,"ux-button","primary","md",3,"disabled"],[1,"popup-bottom","snoozeReminder"],["id","reminder-form",3,"formGroup","ngSubmit"],["type","text","formControlName","date","placeholder","DD/MM/YYYY","readonly","",1,"datepicker1",3,"click"],[1,"calendar-ic","cal-top",3,"click"],["type","text","name","time","formControlName","time","readonly","",1,"timepicker1",3,"placeholder","click"],[1,"clock-ic","cal-top",3,"click"],["type","submit",1,"set-btn-reminder","ux-button","primary","md",3,"disabled"],[1,"popup-bottom","successReminder"],[1,"success"],["src","assets/images/svg/check.svg","alt","success-icon"],[1,"col-12","text-center",3,"click"],[1,"ux-button","primary","md"],[1,"popup-bottom","blockUPI"],[1,"ux-button-icon","close-btn",3,"click"],[1,"col-4","col-xl-3","col-lg-4","col-md-6"],[1,"ux-selection","dis-b"],[1,"ux-selection2"],["type","radio","value","forever","formControlName","blockPeriod"],["type","radio","value","day","formControlName","blockPeriod"],["type","radio","value","week","formControlName","blockPeriod"],["type","radio","value","month","formControlName","blockPeriod"],["type","radio","value","year","formControlName","blockPeriod"],["type","button",1,"ux-button","secondary","md",3,"click"],[1,"error-message"],[1,"text-center","error-message"]],template:function(e,c){1&e&&(s.ec(0,"div",0),s.ec(1,"div",1),s.ec(2,"div",2),s.ec(3,"div",3),s.ec(4,"div",4),s.ec(5,"div",5),s.ec(6,"div",6),s.ec(7,"div",7),s.ec(8,"div",8),s.ec(9,"div",9),s.ec(10,"div",10),s.ec(11,"ul",11),s.ec(12,"li"),s.ec(13,"div",12),s.ec(14,"div",8),s.ec(15,"div",7),s.ec(16,"div",13),s.Rc(17,R,3,4,"h6",14),s.Rc(18,S,3,4,"h6",14),s.ec(19,"h5"),s.Sc(20),s.qc(21,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(22,"li"),s.ec(23,"div",12),s.ec(24,"div",8),s.ec(25,"div",7),s.ec(26,"div",13),s.ec(27,"h6"),s.Sc(28),s.qc(29,"translate"),s.dc(),s.ec(30,"h5"),s.Sc(31),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(32,"li"),s.ec(33,"div",12),s.ec(34,"div",8),s.ec(35,"div",7),s.ec(36,"div",13),s.ec(37,"h6"),s.Sc(38),s.qc(39,"translate"),s.dc(),s.ec(40,"h5"),s.Sc(41),s.qc(42,"customcurrency"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(43,"li"),s.ec(44,"div",12),s.ec(45,"div",8),s.ec(46,"div",7),s.ec(47,"div",13),s.ec(48,"h6"),s.Sc(49),s.qc(50,"translate"),s.dc(),s.ec(51,"h5"),s.Sc(52),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(53,"li"),s.ec(54,"div",12),s.ec(55,"div",8),s.ec(56,"div",7),s.ec(57,"div",13),s.ec(58,"h6"),s.Sc(59),s.qc(60,"translate"),s.dc(),s.ec(61,"h5"),s.Sc(62),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(63,"li"),s.ec(64,"div",12),s.ec(65,"div",8),s.ec(66,"div",7),s.ec(67,"div",13),s.ec(68,"h6"),s.Sc(69),s.qc(70,"translate"),s.dc(),s.ec(71,"h5",15),s.lc("click",(function(){return c.viewInvoice()})),s.Sc(72),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(73,"li"),s.ec(74,"div",12),s.ec(75,"div",8),s.ec(76,"div",16),s.ec(77,"div",13),s.ec(78,"h5"),s.ec(79,"a",17),s.lc("click",(function(){return c.openSetReminderPopup()})),s.Zb(80,"img",18),s.Sc(81),s.qc(82,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(83,"div",16),s.ec(84,"div",19),s.lc("click",(function(){return c.openBlockUPIPopup()})),s.ec(85,"h5"),s.ec(86,"a",20),s.Zb(87,"img",21),s.Sc(88),s.qc(89,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(90,"div",22),s.ec(91,"div",23),s.ec(92,"div",4),s.ec(93,"div",5),s.ec(94,"div",24),s.ec(95,"button",25),s.lc("click",(function(){return c.openRejectPopup()})),s.Sc(96),s.qc(97,"translate"),s.dc(),s.dc(),s.ec(98,"div",24),s.ec(99,"button",26),s.lc("click",(function(){return c.goToPage("pendingConfirmation")})),s.Sc(100),s.qc(101,"translate"),s.qc(102,"translate"),s.dc(),s.dc(),s.dc(),s.ec(103,"div",5),s.ec(104,"div",27),s.ec(105,"div",28),s.Zb(106,"img",29),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(107,"div",30),s.ec(108,"div",8),s.ec(109,"div",31),s.ec(110,"h4",32),s.Sc(111),s.qc(112,"translate"),s.dc(),s.ec(113,"h6"),s.Sc(114),s.qc(115,"translate"),s.dc(),s.dc(),s.ec(116,"div",33),s.ec(117,"button",34),s.Zb(118,"img",35),s.dc(),s.dc(),s.dc(),s.ec(119,"form",36),s.lc("ngSubmit",(function(){return c.rejectReq()})),s.ec(120,"div",37),s.ec(121,"div",38),s.ec(122,"div",39),s.ec(123,"label"),s.Sc(124),s.qc(125,"translate"),s.dc(),s.ec(126,"textarea",40),s.Sc(127," "),s.dc(),s.Rc(128,M,3,3,"p",41),s.Rc(129,f,3,3,"p",42),s.ec(130,"em",43),s.Sc(131),s.dc(),s.Zb(132,"p",32),s.dc(),s.dc(),s.ec(133,"div",7),s.ec(134,"div",44),s.ec(135,"label"),s.Sc(136),s.qc(137,"translate"),s.Zb(138,"input",45),s.Zb(139,"span",46),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(140,"div",37),s.ec(141,"div",47),s.ec(142,"button",48),s.Sc(143),s.qc(144,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(145,"div",49),s.ec(146,"div",8),s.ec(147,"div",31),s.ec(148,"h4",32),s.Sc(149),s.qc(150,"translate"),s.dc(),s.dc(),s.ec(151,"div",33),s.ec(152,"button",34),s.Zb(153,"img",35),s.dc(),s.dc(),s.dc(),s.ec(154,"form",50),s.lc("ngSubmit",(function(){return c.setSnoozeNotification()})),s.ec(155,"div",37),s.ec(156,"div",16),s.ec(157,"div",39),s.ec(158,"label"),s.Sc(159),s.qc(160,"translate"),s.dc(),s.ec(161,"input",51),s.lc("click",(function(){return c.openDatePicker()})),s.dc(),s.Rc(162,T,3,3,"p",41),s.ec(163,"em",52),s.lc("click",(function(){return c.openDatePicker()})),s.dc(),s.dc(),s.dc(),s.ec(164,"div",16),s.ec(165,"div",39),s.ec(166,"label"),s.Sc(167),s.qc(168,"translate"),s.dc(),s.ec(169,"input",53),s.lc("click",(function(){return c.openTimePicker()})),s.qc(170,"translate"),s.dc(),s.Rc(171,E,3,3,"p",41),s.Rc(172,I,3,3,"p",41),s.ec(173,"em",54),s.lc("click",(function(){return c.openTimePicker()})),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(174,"div",37),s.ec(175,"div",47),s.ec(176,"button",55),s.Sc(177),s.qc(178,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(179,"div",56),s.ec(180,"div",37),s.ec(181,"div",57),s.Zb(182,"img",58),s.ec(183,"h3"),s.Sc(184),s.qc(185,"translate"),s.dc(),s.ec(186,"h5"),s.Sc(187),s.dc(),s.dc(),s.dc(),s.ec(188,"div",37),s.ec(189,"div",59),s.lc("click",(function(){return c.closePopup("div.popup-bottom.successReminder")})),s.ec(190,"button",60),s.Sc(191),s.qc(192,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(193,"div",61),s.ec(194,"div",8),s.ec(195,"div",31),s.ec(196,"h4",32),s.Sc(197),s.qc(198,"translate"),s.dc(),s.ec(199,"h6"),s.Sc(200),s.qc(201,"translate"),s.Zb(202,"br"),s.Sc(203),s.dc(),s.dc(),s.ec(204,"div",33),s.ec(205,"button",62),s.lc("click",(function(){return c.closePopup("div.popup-bottom.blockUPI")})),s.Zb(206,"img",35),s.dc(),s.dc(),s.dc(),s.ec(207,"form",50),s.lc("ngSubmit",(function(){return c.blockUPI()})),s.ec(208,"div",37),s.ec(209,"div",63),s.ec(210,"div",64),s.ec(211,"label",65),s.Sc(212),s.qc(213,"translate"),s.Zb(214,"input",66),s.Zb(215,"span",46),s.dc(),s.dc(),s.dc(),s.ec(216,"div",63),s.ec(217,"div",64),s.ec(218,"label",65),s.Sc(219),s.qc(220,"translate"),s.Zb(221,"input",67),s.Zb(222,"span",46),s.dc(),s.dc(),s.dc(),s.ec(223,"div",63),s.ec(224,"div",64),s.ec(225,"label",65),s.Sc(226),s.qc(227,"translate"),s.Zb(228,"input",68),s.Zb(229,"span",46),s.dc(),s.dc(),s.dc(),s.ec(230,"div",63),s.ec(231,"div",64),s.ec(232,"label",65),s.Sc(233),s.qc(234,"translate"),s.Zb(235,"input",69),s.Zb(236,"span",46),s.dc(),s.dc(),s.dc(),s.ec(237,"div",63),s.ec(238,"div",64),s.ec(239,"label",65),s.Sc(240),s.qc(241,"translate"),s.Zb(242,"input",70),s.Zb(243,"span",46),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(244,"div",37),s.ec(245,"div",38),s.ec(246,"div",39),s.ec(247,"label"),s.Sc(248),s.qc(249,"translate"),s.dc(),s.ec(250,"textarea",40),s.Sc(251," "),s.dc(),s.Rc(252,k,3,3,"p",41),s.Rc(253,P,3,3,"p",42),s.ec(254,"em",43),s.Sc(255),s.dc(),s.Zb(256,"p",32),s.dc(),s.dc(),s.ec(257,"div",7),s.ec(258,"div",44),s.ec(259,"label"),s.Sc(260),s.qc(261,"translate"),s.Zb(262,"input",45),s.Zb(263,"span",46),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(264,"div",37),s.ec(265,"div",24),s.ec(266,"button",71),s.lc("click",(function(){return c.closePopup("div.popup-bottom.blockUPI")})),s.Sc(267),s.qc(268,"translate"),s.dc(),s.dc(),s.ec(269,"div",24),s.ec(270,"button",48),s.Sc(271),s.qc(272,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc()),2&e&&(s.Mb(17),s.uc("ngIf","MANDATE_NOTIFICATION"==c.pendingWithMe.notificationType),s.Mb(1),s.uc("ngIf","MANDATE_NOTIFICATION"!=c.pendingWithMe.notificationType),s.Mb(2),s.Vc("",s.rc(21,58,"UPI_ID")," : ",c.pendingWithMe.payeeAddress,""),s.Mb(8),s.Tc(s.rc(29,60,"PAYEE_NAME")),s.Mb(3),s.Tc(c.pendingWithMe.payeeName),s.Mb(7),s.Tc(s.rc(39,62,"AMOUNT")),s.Mb(3),s.Uc(" ",s.sc(42,64,c.pendingWithMe.amount,"symbol"),""),s.Mb(8),s.Tc(s.rc(50,67,"REQUESTED_DATE_TIME")),s.Mb(3),s.Tc(c.pendingWithMe.requestedDate),s.Mb(7),s.Tc(s.rc(60,69,"EXPIRY_DATE_AND_TIME")),s.Mb(3),s.Tc(c.pendingWithMe.expiredDate),s.Mb(7),s.Tc(s.rc(70,71,"INVOICE_URL")),s.Mb(3),s.Tc(c.pendingWithMe.refUrl),s.Mb(9),s.Uc(" ",s.rc(82,73,"SET_REMINDER")," "),s.Mb(7),s.Uc(" ",s.rc(89,75,"BLOCK_UPI_ID"),""),s.Mb(8),s.Tc(s.rc(97,77,"REJECT")),s.Mb(4),s.Tc("MANDATE_NOTIFICATION"==c.pendingWithMe.notificationType?s.rc(101,79,"EXECUTE"):s.rc(102,81,"ACCEPT")),s.Mb(11),s.Tc(s.rc(112,83,"CONFIRMATION")),s.Mb(3),s.Tc(s.rc(115,85,"REJECT_REASON")),s.Mb(5),s.uc("formGroup",c.rejectForm),s.Mb(5),s.Tc(s.rc(125,87,"REASON")),s.Mb(4),s.uc("ngIf",c.rejectForm.controls.reason.hasError("required")&&c.rejectForm.controls.reason.touched),s.Mb(1),s.uc("ngIf",c.rejectForm.controls.reason.hasError("pattern")),s.Mb(2),s.Uc("",c.rejectForm.controls.reason.value.length,"/200"),s.Mb(5),s.Uc("",s.rc(137,89,"REPORT_AS_SPAM")," "),s.Mb(6),s.uc("disabled",c.rejectForm.invalid),s.Mb(1),s.Tc(s.rc(144,91,"CONFIRM")),s.Mb(6),s.Tc(s.rc(150,93,"SET_REMINDER")),s.Mb(5),s.uc("formGroup",c.setReminderForm),s.Mb(5),s.Tc(s.rc(160,95,"DATE")),s.Mb(3),s.uc("ngIf",c.setReminderForm.controls.date.hasError("required")&&c.setReminderForm.controls.date.touched),s.Mb(5),s.Tc(s.rc(168,97,"TIME")),s.Mb(2),s.vc("placeholder",s.rc(170,99,"SELECT_A_TIME")),s.Mb(2),s.uc("ngIf",c.setReminderForm.controls.time.hasError("required")&&c.setReminderForm.controls.time.touched),s.Mb(1),s.uc("ngIf",!c.setReminderForm.controls.time.hasError("required")&&c.setReminderForm.controls.time.touched&&c.timeError),s.Mb(4),s.uc("disabled",c.timeError||c.setReminderForm.invalid),s.Mb(1),s.Tc(s.rc(178,101,"SET_REMINDER")),s.Mb(7),s.Tc(s.rc(185,103,"SUCCESS")),s.Mb(3),s.Tc(null==c.setReminderResp?null:c.setReminderResp.msg),s.Mb(4),s.Tc(s.rc(192,105,"OK")),s.Mb(6),s.Tc(s.rc(198,107,"CONFIRMATION")),s.Mb(3),s.Uc("",s.rc(201,109,"HOW_LONG_DO_YOU_WANT_TO_BLOCK")," "),s.Mb(3),s.Uc(" ",c.pendingWithMe.payeeAddress," ?"),s.Mb(4),s.uc("formGroup",c.blockUPIIdForm),s.Mb(5),s.Uc("",s.rc(213,111,"FOREVER")," "),s.Mb(7),s.Uc("",s.rc(220,113,"1_DAY")," "),s.Mb(7),s.Uc("",s.rc(227,115,"1_WEEK")," "),s.Mb(7),s.Uc("",s.rc(234,117,"1_MONTH")," "),s.Mb(7),s.Uc("",s.rc(241,119,"1_YEAR")," "),s.Mb(8),s.Tc(s.rc(249,121,"REASON")),s.Mb(4),s.uc("ngIf",c.rejectForm.controls.reason.hasError("required")&&c.rejectForm.controls.reason.touched),s.Mb(1),s.uc("ngIf",c.rejectForm.controls.reason.hasError("pattern")),s.Mb(2),s.Uc("",c.rejectForm.controls.reason.value.length,"/200"),s.Mb(5),s.Uc("",s.rc(261,123,"REPORT_AS_SPAM")," "),s.Mb(7),s.Tc(s.rc(268,125,"NO")),s.Mb(3),s.uc("disabled",c.blockUPIIdForm.invalid),s.Mb(1),s.Tc(s.rc(272,127,"YES")))},directives:[i.t,r.I,r.t,r.k,r.c,r.s,r.i,v.a,r.a,r.A],pipes:[b.a,g.a],styles:[""]}),e})()}];let q=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(c){return new(c||e)},imports:[[o.g.forChild(N)],o.g]}),e})();var D=t("PCNd");let O=(()=>{class e{}return e.\u0275mod=s.Wb({type:e}),e.\u0275inj=s.Vb({factory:function(c){return new(c||e)},imports:[[i.c,r.m,r.C,D.a,q]]}),e})()}}]);