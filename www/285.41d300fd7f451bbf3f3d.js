(window.webpackJsonp=window.webpackJsonp||[]).push([[285],{cqgE:function(e,c,t){"use strict";t.r(c),t.d(c,"PmjjbySuccessModule",(function(){return b}));var i=t("ofXK"),s=t("tyNb"),a=t("fXoL"),r=t("EnSQ"),o=t("5IsW"),d=t("au7T"),n=t("fUdP"),l=t("Eioz");function p(e,c){if(1&e){const e=a.fc();a.ec(0,"li"),a.ec(1,"a",34),a.lc("click",(function(){a.Hc(e);const t=c.$implicit;return a.pc().DataService.breadcrumroute(t.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&e){const e=c.$implicit;a.Mb(2),a.Tc(a.rc(3,1,e.currentRoute))}}const m=function(e,c){return{success:e,error:c}},u=[{path:"",component:(()=>{class e{constructor(e,c,t,i,s,a){this.router=e,this.DataService=c,this.constant=t,this.commonMethod=i,this.datepipe=s,this.location=a,this.totalAccountList=[],this.receiptPMJJBYJson=[{key:"Scheme Name",value:""},{key:"Name",value:""},{key:"Date Of Birth",value:""},{key:"Premium Amount",value:""},{key:"Nominee Name",value:""},{key:"Debit Account",value:""},{key:"Date Of Enrollment",value:""}],this.refTransJson=[{key:"Transaction ID",value:""}]}ngOnInit(){this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("RECEIPT",this.router.url),this.DataService.setPageSettings("Receipt"),this.todayDateTime=this.datepipe.transform(new Date,"ddMMyyyyhhmmss"),this.totalAccountList=this.DataService.customerOperativeAccList,this.receiptType=this.DataService.receiptType,this.receipdRefID=this.DataService.receipdRefID,this.receiptResp=this.DataService.pmjjbyDetailsOverviewObj,this.receiptMsg=this.DataService.receiptmsg,this.refTransJson[0].value=this.DataService.receipdRefID,history.pushState({},"pmjjby",this.location.prepareExternalUrl("pmjjby")),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url))}goToPage(e){this.router.navigateByUrl("/"+e)}shareDetails(){this.shareViaMail()}shareViaMail(){let e=this.getValuesToSend();window.open("mailto:?subject=Receipt&body="+e)}getValuesToSend(){let e="";return e+="Scheme :"+this.receiptResp.scheme+", ",e+="Name :"+this.receiptResp.name+", ",e+="Date Of Birth :"+this.receiptResp.dob+", ",e+="Nominee Name :"+this.receiptResp.nomineeName+", ",e+="Debit Account :"+this.receiptResp.debitAccount+", ",e+="Premium Amount :"+this.receiptResp.premiumAmount+", ",e+="Date Of Enrollment :"+this.receiptResp.dateOfEnrollment+", ",e.replace(/,\s*$/,"")}downloadPdfReceipt(e){if(console.log(this.DataService.receiptType),this.DataService.receiptType==this.constant.val_Successful)var c="success";else c="failed";var t=this.totalAccountList.filter(e=>e.accountNo==this.receiptResp.debitAccount);console.log("selected account details : ",t),this.receiptPMJJBYJson[0].value=this.receiptResp.scheme?this.receiptResp.scheme:"-",this.receiptPMJJBYJson[1].value=this.receiptResp.name?this.receiptResp.name:"-",this.receiptPMJJBYJson[2].value=this.receiptResp.dob?this.receiptResp.dob:"-",this.receiptPMJJBYJson[3].value=this.receiptResp.premiumAmount?this.receiptResp.premiumAmount:"-",this.receiptPMJJBYJson[4].value=this.receiptResp.nomineeName?this.receiptResp.nomineeName:"-",this.receiptPMJJBYJson[5].value=this.receiptResp.debitAccount?this.receiptResp.debitAccount:"-",this.receiptPMJJBYJson[6].value=this.receiptResp.dateOfEnrollment?this.receiptResp.dateOfEnrollment:"-",this.commonMethod.generatePDF(c,this.receiptType,this.DataService.receiptmsg,this.refTransJson,this.receiptPMJJBYJson,"PMJJBY_Receipt",[{key:"Branch Name",value:t[0].branch_name},{key:"Branch Code",value:t[0].branchCode},{key:"Branch Address",value:t[0].BRANCHADDRESS},{key:"Branch Contact",value:t[0].phone_number},{key:"IFSC",value:t[0].ifscCode}],e,t[0].accountNo,this.todayDateTime)}onHomeClick(){this.router.navigateByUrl("/pmjjby")}}return e.\u0275fac=function(c){return new(c||e)(a.Yb(s.c),a.Yb(r.a),a.Yb(o.a),a.Yb(d.a),a.Yb(i.f),a.Yb(i.n))},e.\u0275cmp=a.Sb({type:e,selectors:[["app-pmjjby-success"]],decls:110,vars:18,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-8","col-12"],[1,"col-md-4","col-12"],[1,"col-sm-12","col-12","col-md-12"],[1,"white-box2","mar-t","pad-custom","custom-bor"],[1,"success"],[1,"pl-0",3,"ngClass"],["alt","success-icon",3,"src"],[1,"mt-3"],[1,"bg-img"],["src","assets/images/svg/success-bg.svg","alt","success-bg"],[1,"result-container1","mar-top"],[1,"info-bottom","pad-custom"],[1,"info-details","mt-3"],[1,"info-details"],[1,"col-12","col-md-12"],[1,"col-md-12","col-lg-6","col-12"],[1,"link-list","hide-m"],[3,"click"],["src","assets/images/svg/share.svg","alt","share-icon"],["src","assets/images/svg/download.svg","alt","download-icon"],["src","assets/images/svg/print.svg","alt","print-icon"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"]],template:function(e,c){1&e&&(a.ec(0,"div",0),a.ec(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"ul",8),a.Rc(9,p,4,3,"li",9),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(10,"div",10),a.ec(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"h4"),a.Sc(19,"Receipt"),a.dc(),a.dc(),a.Zb(20,"div",18),a.dc(),a.ec(21,"div",13),a.ec(22,"div",19),a.ec(23,"div",20),a.ec(24,"div",5),a.ec(25,"div",21),a.ec(26,"h5",22),a.Zb(27,"img",23),a.Sc(28),a.dc(),a.ec(29,"small"),a.Sc(30),a.dc(),a.ec(31,"small",24),a.ec(32,"span"),a.Sc(33),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(34,"div",25),a.Zb(35,"img",26),a.dc(),a.dc(),a.dc(),a.Zb(36,"div",12),a.ec(37,"div",19),a.ec(38,"div",27),a.ec(39,"div",28),a.ec(40,"div",29),a.ec(41,"div",5),a.ec(42,"h6"),a.Sc(43,"Scheme"),a.dc(),a.ec(44,"h5"),a.Sc(45),a.dc(),a.dc(),a.dc(),a.ec(46,"div",30),a.ec(47,"div",5),a.ec(48,"h6"),a.Sc(49,"Name "),a.dc(),a.ec(50,"h5"),a.Sc(51),a.dc(),a.dc(),a.dc(),a.ec(52,"div",30),a.ec(53,"div",5),a.ec(54,"h6"),a.Sc(55,"Date of Birth"),a.dc(),a.ec(56,"h5"),a.Sc(57),a.dc(),a.dc(),a.dc(),a.ec(58,"div",30),a.ec(59,"div",5),a.ec(60,"h6"),a.Sc(61,"Nominee Name"),a.dc(),a.ec(62,"h5"),a.Sc(63),a.dc(),a.dc(),a.dc(),a.ec(64,"div",30),a.ec(65,"div",5),a.ec(66,"h6"),a.Sc(67," Debit Account "),a.dc(),a.ec(68,"h5"),a.Sc(69),a.dc(),a.dc(),a.dc(),a.ec(70,"div",30),a.ec(71,"div",5),a.ec(72,"h6"),a.Sc(73,"Premium Amount "),a.dc(),a.ec(74,"h5"),a.Sc(75),a.qc(76,"customcurrency"),a.dc(),a.dc(),a.dc(),a.ec(77,"div",30),a.ec(78,"div",5),a.ec(79,"h6"),a.Sc(80," Date of Enrollment "),a.dc(),a.ec(81,"h5"),a.Sc(82),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(83,"div",31),a.ec(84,"div",13),a.ec(85,"div",32),a.ec(86,"ul",33),a.ec(87,"li",34),a.lc("click",(function(){return c.shareDetails()})),a.ec(88,"a"),a.Zb(89,"img",35),a.Sc(90,"Share"),a.dc(),a.dc(),a.ec(91,"li",34),a.lc("click",(function(){return c.downloadPdfReceipt("N")})),a.ec(92,"a"),a.Zb(93,"img",36),a.Sc(94,"Download"),a.dc(),a.dc(),a.ec(95,"li",34),a.lc("click",(function(){return c.downloadPdfReceipt("Y")})),a.ec(96,"a"),a.Zb(97,"img",37),a.Sc(98,"Print"),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(99,"div",32),a.ec(100,"ul",38),a.ec(101,"li"),a.ec(102,"div",39),a.ec(103,"button",40),a.lc("click",(function(){return c.onHomeClick()})),a.Sc(104,"Back to Home"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(105,"div",41),a.ec(106,"div",42),a.ec(107,"a"),a.Zb(108,"img",43),a.dc(),a.dc(),a.Zb(109,"div",44),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&e&&(a.Mb(9),a.uc("ngForOf",c.DataService.breadcrumblist),a.Mb(17),a.uc("ngClass",a.zc(15,m,c.receiptType===c.constant.val_Successful,c.receiptType!=c.constant.val_Successful)),a.Mb(1),a.uc("src",c.receiptType==c.constant.val_Successful?"assets/images/svg/success-arrow.svg":"assets/images/svg/fail.svg",a.Jc),a.Mb(1),a.Uc(" ",c.receiptType,""),a.Mb(2),a.Tc(c.receiptMsg),a.Mb(3),a.Uc(" Transaction ID ",c.receipdRefID," "),a.Mb(12),a.Tc(c.receiptResp.scheme),a.Mb(6),a.Tc(c.receiptResp.name),a.Mb(6),a.Tc(c.receiptResp.dob),a.Mb(6),a.Tc(c.receiptResp.nomineeName),a.Mb(6),a.Tc(c.receiptResp.debitAccount),a.Mb(6),a.Tc(a.rc(76,13,c.receiptResp.premiumAmount)),a.Mb(7),a.Tc(c.receiptResp.dateOfEnrollment))},directives:[i.s,i.q],pipes:[n.a,l.a],styles:[""]}),e})()}];let h=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[s.g.forChild(u)],s.g]}),e})();var v=t("PCNd");let b=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[i.c,v.a,h]]}),e})()}}]);