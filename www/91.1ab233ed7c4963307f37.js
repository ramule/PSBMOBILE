(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{"2G26":function(c,e,t){"use strict";t.r(e),t.d(e,"DirectTaxPaymentHistoryModule",(function(){return S}));var d=t("ofXK"),i=t("tyNb"),a=t("fXoL"),r=t("EnSQ"),n=t("fUdP"),l=t("au7T"),o=t("5IsW"),s=t("3Pt+"),b=t("3aHd"),v=t("Geda"),u=t("Eioz");function p(c,e){if(1&c){const c=a.fc();a.ec(0,"li"),a.ec(1,"a",95),a.lc("click",(function(){a.Hc(c);const t=e.$implicit;return a.pc().DataService.breadcrumroute(t.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&c){const c=e.$implicit;a.Mb(2),a.Tc(a.rc(3,1,c.currentRoute))}}function m(c,e){if(1&c&&(a.ec(0,"option",96),a.Sc(1),a.dc()),2&c){const c=e.$implicit;a.uc("value",c.accountNo),a.Mb(1),a.Tc(c.sbAccount)}}const T=[{path:"",component:(()=>{class c{constructor(c,e,t,d,i){this.router=c,this.DataService=e,this.customCurrencyPipe=t,this.commonMethod=d,this.constant=i}ngOnInit(){this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("DIRECT_TAX_PAYMENT_HISTORY",this.router.url),this.DataService.setPageSettings("DIRECT_TAX_PAYMENT_HISTORY"),this.initialization()}initialization(){this.accountList=this.DataService.customerOperativeAccList,console.log("accountListttttttt:::::::::::",this.accountList),this.totalWorth=this.customCurrencyPipe.transform((this.DataService.totalMyOperativeBalance+this.DataService.totalMyDepositBalance+this.DataService.totalMyBorrowingsBalance).toString().trim(),"decimal").replace(/(\.[0-9]*?)0+/g,""),this.totalWorthMask=this.commonMethod.maskAccNo(this.accountList),console.log("totalWorthtttttttt:::::::::::",this.totalWorth),console.log("maskkkkkkkktotalWorthtttttttt:::::::::::",this.totalWorth)}goToPage(c){this.router.navigateByUrl("/"+c)}goBack(){"web"==this.constant.getIsCordova()?this.router.navigateByUrl("/dashboard"):this.router.navigateByUrl("/dashboardMobile")}}return c.\u0275fac=function(e){return new(e||c)(a.Yb(i.c),a.Yb(r.a),a.Yb(n.a),a.Yb(l.a),a.Yb(o.a))},c.\u0275cmp=a.Sb({type:c,selectors:[["app-direct-tax-payment-history"]],decls:376,vars:135,consts:[[1,"main","bg-m"],[1,"nav-overlay"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"flex-container","pl-2","pr-2","pt-0","pb-0","dir-taxpayment"],[1,"full-info"],[1,"col-12","col-md-12","col-lg-12","col-xl-12"],[1,"ac-info","frm-lbl"],[1,"greenbg-input","ux-input"],["for","fromaccount ",1,""],[1,"ac-info","sel"],[1,"select-saving-acc"],[3,"value",4,"ngFor","ngForOf"],[1,"ac-info"],[1,"info-message2","with-bg","bl-tot"],["src","assets/images/svg/rupee.svg","alt","rupees-icon"],[1,"ac-info","hide-m"],[1,"refresh-btn"],["src","assets/images/svg/visible.svg","alt","visibleicon"],["src","assets/images/svg/refresh.svg","alt","refresh-icon"],[1,"refresh-text"],[1,"col-12","col-md-12"],[1,"tab-content","bg-transparent","mt-2"],["id","within",1,"tab-pane","active"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom"],[1,"col-md-12","col-12"],[1,"col-md-6","col-lg-4","col-xl-4","col-12"],[1,"ux-input","ux-disabled"],["type","text","placeholder","","disabled","","value","(0020)Income tax on Companies(Corparative)"],[1,"error-message"],["type","text","placeholder","","disabled","","value","(106) Tax on Distributed Profits"],["type","text","placeholder","","disabled","","value","94A-Interest other than interest securities"],["type","text","placeholder","Enter your PAN number","disabled","","value","\u20b9 110.00"],["type","text","placeholder","","disabled","","value","\u20b9 110.00"],[1,"ux-input","ux-disabled","mb-0"],["type","text","placeholder","Enter your PAN number","disabled","","value","\u20b9 110.00",1,"mb-0"],[1,"col-md-6","col-lg-6","col-xl-4","col-12"],["type","text","placeholder","Enter your PAN number","disabled","","value","CBDT Shopping Mall Payment"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob"],[1,"ux-button","primary","sm-mob"],["id","outsidebank",1,"tab-pane","fade"],[1,"ux-input"],["for","payeeName"],["type","text","name","payeeName","placeholder","Enter Payee Name"],["for","payeeaccountType"],["required",""],["value","select"],["value","Saving"],["value","Current"],["for","payeeaccountNumber"],["type","text","name","payeeaccountNumber","alphaNumericOnly","","placeholder","Enter Payee Account Number"],["for","confirmaccountNumber"],["type","text","name","confirmaccountNumber","placeholder","Enter Confirm Account Number"],["for","ifsc"],["type","text","name","ifsc","placeholder","Enter IFSC"],[1,"show-search"],[1,"info-message"],[1,"payeenickName"],["type","text","name","payeenickName","placeholder","Enter Payee Nick Name","limit-to","20"],[1,"transactionLimit"],["type","text","name","transactionLimit","placeholder","Enter Transaction Limit"],[1,"info-message","text-right"],["id","mmid",1,"tab-pane","fade"],["for","mobileNumber"],["type","text","name","mobileNumber","placeholder","Enter Mobile Number"],["for","mmid"],["type","text","name","mmid","placeholder","Enter MMID"],["id","vpa",1,"tab-pane","fade"],["for","vpa"],["type","text","name","vpa","placeholder","Enter VPA"],["href","#",1,"show-link3"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[3,"value"]],template:function(c,e){1&c&&(a.ec(0,"div",0),a.Zb(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"div",8),a.ec(9,"ul",9),a.Rc(10,p,4,3,"li",10),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"div",18),a.Zb(19,"h4"),a.dc(),a.Zb(20,"div",19),a.dc(),a.ec(21,"div",14),a.ec(22,"div",20),a.ec(23,"div",21),a.ec(24,"div",22),a.ec(25,"div",14),a.ec(26,"div",23),a.ec(27,"div",24),a.ec(28,"div",25),a.ec(29,"label",26),a.Sc(30),a.qc(31,"translate"),a.dc(),a.dc(),a.dc(),a.ec(32,"div",27),a.ec(33,"div",28),a.ec(34,"select"),a.Rc(35,m,2,2,"option",29),a.dc(),a.dc(),a.dc(),a.ec(36,"div",30),a.ec(37,"div",25),a.ec(38,"p",31),a.ec(39,"i"),a.Sc(40),a.qc(41,"translate"),a.dc(),a.ec(42,"span",32),a.Sc(43),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(44,"div",33),a.ec(45,"button",34),a.Zb(46,"img",35),a.dc(),a.dc(),a.ec(47,"div",33),a.ec(48,"button",34),a.Zb(49,"img",36),a.dc(),a.ec(50,"span",37),a.Sc(51," Last refreshed on 12th Oct 2020, 21:22"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(52,"div",38),a.ec(53,"div",39),a.ec(54,"div",40),a.ec(55,"div",14),a.ec(56,"div",20),a.ec(57,"div",41),a.ec(58,"div",42),a.ec(59,"div",14),a.ec(60,"div",43),a.ec(61,"div",14),a.ec(62,"div",44),a.ec(63,"div",45),a.ec(64,"label"),a.Sc(65),a.qc(66,"translate"),a.dc(),a.Zb(67,"input",46),a.Zb(68,"p",47),a.dc(),a.dc(),a.ec(69,"div",44),a.ec(70,"div",45),a.ec(71,"label"),a.Sc(72),a.qc(73,"translate"),a.dc(),a.Zb(74,"input",48),a.Zb(75,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(76,"div",14),a.ec(77,"div",43),a.ec(78,"div",14),a.ec(79,"div",44),a.ec(80,"div",45),a.ec(81,"label"),a.Sc(82),a.qc(83,"translate"),a.dc(),a.Zb(84,"input",49),a.Zb(85,"p",47),a.dc(),a.dc(),a.ec(86,"div",44),a.ec(87,"div",45),a.ec(88,"label"),a.Sc(89),a.qc(90,"translate"),a.dc(),a.Zb(91,"input",50),a.Zb(92,"p",47),a.dc(),a.dc(),a.ec(93,"div",44),a.ec(94,"div",45),a.ec(95,"label"),a.Sc(96),a.qc(97,"translate"),a.dc(),a.Zb(98,"input",50),a.Zb(99,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(100,"div",14),a.ec(101,"div",43),a.ec(102,"div",14),a.ec(103,"div",44),a.ec(104,"div",45),a.ec(105,"label"),a.Sc(106),a.qc(107,"translate"),a.dc(),a.Zb(108,"input",51),a.Zb(109,"p",47),a.dc(),a.dc(),a.ec(110,"div",44),a.ec(111,"div",45),a.ec(112,"label"),a.Sc(113),a.qc(114,"translate"),a.dc(),a.Zb(115,"input",50),a.Zb(116,"p",47),a.dc(),a.dc(),a.ec(117,"div",44),a.ec(118,"div",45),a.ec(119,"label"),a.Sc(120),a.qc(121,"translate"),a.dc(),a.Zb(122,"input",50),a.Zb(123,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(124,"div",14),a.ec(125,"div",43),a.ec(126,"div",14),a.ec(127,"div",44),a.ec(128,"div",45),a.ec(129,"label"),a.Sc(130),a.qc(131,"translate"),a.dc(),a.Zb(132,"input",50),a.Zb(133,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(134,"div",14),a.ec(135,"div",43),a.ec(136,"div",14),a.ec(137,"div",44),a.ec(138,"div",52),a.ec(139,"label"),a.Sc(140),a.qc(141,"translate"),a.dc(),a.Zb(142,"input",53),a.Zb(143,"p",47),a.dc(),a.ec(144,"small"),a.Sc(145),a.qc(146,"translate"),a.dc(),a.dc(),a.ec(147,"div",54),a.ec(148,"div",45),a.ec(149,"label"),a.Sc(150),a.qc(151,"translate"),a.dc(),a.Zb(152,"input",55),a.Zb(153,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(154,"div",38),a.ec(155,"ul",56),a.ec(156,"li"),a.ec(157,"div",57),a.ec(158,"button",58),a.Sc(159),a.qc(160,"translate"),a.dc(),a.dc(),a.ec(161,"div",57),a.ec(162,"button",59),a.Sc(163),a.qc(164,"translate"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(165,"div",60),a.ec(166,"div",14),a.ec(167,"div",20),a.ec(168,"div",41),a.ec(169,"div",42),a.ec(170,"div",14),a.ec(171,"div",43),a.ec(172,"div",14),a.ec(173,"div",54),a.ec(174,"div",61),a.ec(175,"label",62),a.Sc(176),a.qc(177,"translate"),a.dc(),a.Zb(178,"input",63),a.Zb(179,"p",47),a.dc(),a.dc(),a.ec(180,"div",54),a.ec(181,"div",61),a.ec(182,"label",64),a.Sc(183),a.qc(184,"translate"),a.dc(),a.ec(185,"select",65),a.ec(186,"option",66),a.Sc(187),a.qc(188,"translate"),a.dc(),a.ec(189,"option",67),a.Sc(190),a.qc(191,"translate"),a.dc(),a.ec(192,"option",68),a.Sc(193),a.qc(194,"translate"),a.dc(),a.dc(),a.Zb(195,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(196,"div",14),a.ec(197,"div",43),a.ec(198,"div",14),a.ec(199,"div",54),a.ec(200,"div",61),a.ec(201,"label",69),a.Sc(202),a.qc(203,"translate"),a.dc(),a.Zb(204,"input",70),a.Zb(205,"p",47),a.dc(),a.dc(),a.ec(206,"div",54),a.ec(207,"div",61),a.ec(208,"label",71),a.Sc(209),a.qc(210,"translate"),a.dc(),a.Zb(211,"input",72),a.Zb(212,"p",47),a.dc(),a.dc(),a.ec(213,"div",54),a.ec(214,"div",61),a.ec(215,"label",73),a.Sc(216),a.qc(217,"translate"),a.dc(),a.Zb(218,"input",74),a.Zb(219,"em",75),a.Zb(220,"p",76),a.Zb(221,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(222,"div",14),a.ec(223,"div",43),a.ec(224,"div",14),a.ec(225,"div",54),a.ec(226,"div",61),a.ec(227,"label",77),a.Sc(228),a.qc(229,"translate"),a.dc(),a.Zb(230,"input",78),a.Zb(231,"p",47),a.dc(),a.dc(),a.ec(232,"div",54),a.ec(233,"div",61),a.ec(234,"label",79),a.Sc(235),a.qc(236,"translate"),a.dc(),a.Zb(237,"input",80),a.ec(238,"p",81),a.Sc(239),a.qc(240,"translate"),a.dc(),a.Zb(241,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(242,"div",38),a.ec(243,"ul",56),a.ec(244,"li"),a.ec(245,"div",57),a.ec(246,"button",58),a.Sc(247),a.qc(248,"translate"),a.dc(),a.dc(),a.ec(249,"div",57),a.ec(250,"button",59),a.Sc(251),a.qc(252,"translate"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(253,"div",82),a.ec(254,"div",14),a.ec(255,"div",20),a.ec(256,"div",41),a.ec(257,"div",42),a.ec(258,"div",14),a.ec(259,"div",43),a.ec(260,"div",14),a.ec(261,"div",54),a.ec(262,"div",61),a.ec(263,"label",83),a.Sc(264),a.qc(265,"translate"),a.dc(),a.Zb(266,"input",84),a.Zb(267,"p",47),a.dc(),a.dc(),a.ec(268,"div",54),a.ec(269,"div",61),a.ec(270,"label",85),a.Sc(271),a.qc(272,"translate"),a.dc(),a.Zb(273,"input",86),a.Zb(274,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(275,"div",14),a.ec(276,"div",43),a.ec(277,"div",14),a.ec(278,"div",54),a.ec(279,"div",61),a.ec(280,"label",62),a.Sc(281),a.qc(282,"translate"),a.dc(),a.Zb(283,"input",63),a.Zb(284,"p",47),a.dc(),a.dc(),a.ec(285,"div",54),a.ec(286,"div",61),a.ec(287,"label",77),a.Sc(288),a.qc(289,"translate"),a.dc(),a.Zb(290,"input",78),a.Zb(291,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(292,"div",14),a.ec(293,"div",43),a.ec(294,"div",14),a.ec(295,"div",54),a.ec(296,"div",61),a.ec(297,"label",79),a.Sc(298),a.qc(299,"translate"),a.dc(),a.Zb(300,"input",80),a.ec(301,"p",81),a.Sc(302),a.qc(303,"translate"),a.dc(),a.Zb(304,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(305,"div",38),a.ec(306,"ul",56),a.ec(307,"li"),a.ec(308,"div",57),a.ec(309,"button",58),a.Sc(310),a.qc(311,"translate"),a.dc(),a.dc(),a.ec(312,"div",57),a.ec(313,"button",59),a.Sc(314),a.qc(315,"translate"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(316,"div",87),a.ec(317,"div",14),a.ec(318,"div",20),a.ec(319,"div",41),a.ec(320,"div",42),a.ec(321,"div",14),a.ec(322,"div",43),a.ec(323,"div",14),a.ec(324,"div",54),a.ec(325,"div",61),a.ec(326,"label",88),a.Sc(327),a.qc(328,"translate"),a.dc(),a.Zb(329,"input",89),a.ec(330,"a",90),a.Sc(331,"Verify"),a.dc(),a.Zb(332,"p",47),a.dc(),a.dc(),a.ec(333,"div",54),a.ec(334,"div",61),a.ec(335,"label",62),a.Sc(336),a.qc(337,"translate"),a.dc(),a.Zb(338,"input",63),a.Zb(339,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(340,"div",14),a.ec(341,"div",43),a.ec(342,"div",14),a.ec(343,"div",54),a.ec(344,"div",61),a.ec(345,"label",77),a.Sc(346),a.qc(347,"translate"),a.dc(),a.Zb(348,"input",78),a.Zb(349,"p",47),a.dc(),a.dc(),a.ec(350,"div",54),a.ec(351,"div",61),a.ec(352,"label",79),a.Sc(353),a.qc(354,"translate"),a.dc(),a.Zb(355,"input",80),a.ec(356,"p",81),a.Sc(357),a.qc(358,"translate"),a.dc(),a.Zb(359,"p",47),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(360,"div",38),a.ec(361,"ul",56),a.ec(362,"li"),a.ec(363,"div",57),a.ec(364,"button",58),a.Sc(365),a.qc(366,"translate"),a.dc(),a.dc(),a.ec(367,"div",57),a.ec(368,"button",59),a.Sc(369),a.qc(370,"translate"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(371,"div",91),a.ec(372,"div",92),a.ec(373,"a"),a.Zb(374,"img",93),a.dc(),a.dc(),a.Zb(375,"div",94),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&c&&(a.Mb(10),a.uc("ngForOf",e.DataService.breadcrumblist),a.Mb(20),a.Tc(a.rc(31,47,"FROM_ACCOUNT")),a.Mb(5),a.uc("ngForOf",e.accountList),a.Mb(5),a.Tc(a.rc(41,49,"TOTAL_AVAL_BAL")),a.Mb(3),a.Tc(e.totalWorth),a.Mb(22),a.Tc(a.rc(66,51,"MAJOR_HEAD")),a.Mb(7),a.Tc(a.rc(73,53,"MINOR_HEAD")),a.Mb(10),a.Tc(a.rc(83,55,"NATURE_OF_PAYMENT")),a.Mb(7),a.Tc(a.rc(90,57,"TAX")),a.Mb(7),a.Tc(a.rc(97,59,"SURCHARGE")),a.Mb(10),a.Tc(a.rc(107,61,"EDUCATION_CESS")),a.Mb(7),a.Tc(a.rc(114,63,"INTEREST")),a.Mb(7),a.Tc(a.rc(121,65,"PENALTY")),a.Mb(10),a.Tc(a.rc(131,67,"OTHER")),a.Mb(10),a.Tc(a.rc(141,69,"TOTAL_AMOUNT")),a.Mb(5),a.Tc(a.rc(146,71,"TOTAL_AMOUNT_MSG")),a.Mb(5),a.Tc(a.rc(151,73,"REMARKS")),a.Mb(9),a.Tc(a.rc(160,75,"CANCEL")),a.Mb(4),a.Tc(a.rc(164,77,"PROCEED")),a.Mb(13),a.Tc(a.rc(177,79,"PAYEE_NAME")),a.Mb(7),a.Tc(a.rc(184,81,"PAYEE_ACCOUNT_TYPE")),a.Mb(4),a.Uc("",a.rc(188,83,"SELECT"),"}"),a.Mb(3),a.Tc(a.rc(191,85,"SAVING")),a.Mb(3),a.Tc(a.rc(194,87,"CURRENT")),a.Mb(9),a.Tc(a.rc(203,89,"PAYEE_ACCOUNT_NUM")),a.Mb(7),a.Tc(a.rc(210,91,"CONFIRM_ACCOUNT_NUMBER")),a.Mb(7),a.Tc(a.rc(217,93,"IFSC")),a.Mb(12),a.Tc(a.rc(229,95,"PAYEE_NICK_NAME")),a.Mb(7),a.Uc("",a.rc(236,97,"TRANSACTION_LIMIT"),"( \u20b9 )"),a.Mb(4),a.Tc(a.rc(240,99,"MAX_TRANSACTION_LIMIT")),a.Mb(8),a.Tc(a.rc(248,101,"CANCEL")),a.Mb(4),a.Tc(a.rc(252,103,"SUBMIT")),a.Mb(13),a.Tc(a.rc(265,105,"MOBILE_NUMBER")),a.Mb(7),a.Tc(a.rc(272,107,"MMID")),a.Mb(10),a.Tc(a.rc(282,109,"PAYEE_NAME")),a.Mb(7),a.Tc(a.rc(289,111,"PAYEE_NICK_NAME")),a.Mb(10),a.Uc("",a.rc(299,113,"TRANSACTION_LIMIT")," ( \u20b9 )"),a.Mb(4),a.Tc(a.rc(303,115,"MAX_TRANSACTION_LIMIT")),a.Mb(8),a.Uc("",a.rc(311,117,"CANCEL"),"}"),a.Mb(4),a.Tc(a.rc(315,119,"SUBMIT")),a.Mb(13),a.Tc(a.rc(328,121,"VPA")),a.Mb(9),a.Tc(a.rc(337,123,"PAYEE_NAME")),a.Mb(10),a.Tc(a.rc(347,125,"PAYEE_NICK_NAME")),a.Mb(7),a.Uc("",a.rc(354,127,"TRANSACTION_LIMIT")," ( \u20b9 )"),a.Mb(4),a.Tc(a.rc(358,129,"MAX_TRANSACTION_LIMIT")),a.Mb(8),a.Tc(a.rc(366,131,"CANCEL")),a.Mb(4),a.Tc(a.rc(370,133,"SUBMIT")))},directives:[d.s,s.x,s.H,b.a,v.a],pipes:[u.a],styles:[""]}),c})()}];let h=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[i.g.forChild(T)],i.g]}),c})();var M=t("PCNd");let S=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[d.c,h,M.a,s.m,s.C]]}),c})()},Geda:function(c,e,t){"use strict";t.d(e,"a",(function(){return r}));var d=t("fXoL"),i=t("3Pt+"),a=t("au7T");let r=(()=>{class c{constructor(c,e){this.control=c,this.commonMethods=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(c){const e=+this.limitTo;if(-1===this.specialKeys.indexOf(c.key)&&!this.commonMethods.validateEmpty(this.control.value)&&this.control.value.length>=e){let c=this.control.value.substring(0,e);this.control.control.setValue(c)}}}return c.\u0275fac=function(e){return new(e||c)(d.Yb(i.r),d.Yb(a.a))},c.\u0275dir=d.Tb({type:c,selectors:[["","limit-to",""]],hostBindings:function(c,e){1&c&&d.lc("input",(function(c){return e.ngOnChanges(c)}))},inputs:{limitTo:["limit-to","limitTo"]},features:[d.Kb]}),c})()}}]);