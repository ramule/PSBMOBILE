(window.webpackJsonp=window.webpackJsonp||[]).push([[263],{B1R5:function(c,t,e){"use strict";e.r(t),e.d(t,"AccountOpeningSuccessModule",(function(){return T}));var n=e("ofXK"),a=e("tyNb"),s=e("fXoL"),o=e("au7T"),i=e("EnSQ"),r=e("Eioz"),d=e("FBpr"),l=e("LzCk"),b=e("L7Xq"),u=e("5IsW"),g=e("4bKs"),p=e("H9Rt");const S=[{path:"",component:(()=>{class c{constructor(c,t,e,n,a,s,o,i,r,d){this.router=c,this.commonMethods=t,this.dataService=e,this.translate=n,this.accOpeningService=a,this.accOpeningSuccessService=s,this.http=o,this.constant=i,this.loader=r,this.storage=d}ngOnInit(){this.loader.hideLoader(),this.accountDtl=this.dataService.accountDtls,this.commonMethods.closePopup("div.popup-bottom")}gotoLogin(){"web"==this.constant.getPlatform()?this.router.navigateByUrl("/nliLanding"):this.router.navigateByUrl("/LandingPage")}}return c.\u0275fac=function(t){return new(t||c)(s.Yb(a.c),s.Yb(o.a),s.Yb(i.a),s.Yb(r.a),s.Yb(d.a),s.Yb(l.a),s.Yb(b.a),s.Yb(u.a),s.Yb(g.a),s.Yb(p.a))},c.\u0275cmp=s.Sb({type:c,selectors:[["app-account-opening-success"]],decls:65,vars:37,consts:[[1,"prelogin-page"],[1,"registration-steps"],[1,"row"],[1,"col-12","position-static"],[1,"inner-header"],[1,"registration-container"],[1,"prev-tab",3,"click"],["src","assets/images/svg/left-arrow.svg"],[1,"close-registration"],["src","assets/images/svg/close-w.svg",3,"click"],[1,"registrationsteps-block","registration-container","eq-pad"],[1,"acc-opening-success","text-center"],["src","assets/images/svg/Success-new.svg"],["disabled","",1,"ux-button","secondary"],["_ngcontent-scv-c113","",1,"errormsg","text-center",2,"color","#e82338","border-radius","50px"],[1,"accDetails","text-left"],[1,""],[1,"account-details","text-left"],[1,"col-xl-3","col-lg-3","col-md-3","col-12"],[1,"text-center"],[1,"ux-button","primary",3,"click"]],template:function(c,t){1&c&&(s.ec(0,"div",0),s.ec(1,"div",1),s.ec(2,"div",2),s.ec(3,"div",3),s.ec(4,"div",4),s.ec(5,"div",5),s.ec(6,"a",6),s.lc("click",(function(){return t.gotoLogin()})),s.Zb(7,"img",7),s.Sc(8,"Back to Login"),s.dc(),s.ec(9,"a",8),s.ec(10,"img",9),s.lc("click",(function(){return t.gotoLogin()})),s.dc(),s.dc(),s.ec(11,"h4"),s.Sc(12),s.qc(13,"translate"),s.dc(),s.dc(),s.dc(),s.ec(14,"div",10),s.ec(15,"div",11),s.Zb(16,"img",12),s.ec(17,"h3"),s.Sc(18),s.qc(19,"translate"),s.dc(),s.ec(20,"p"),s.Sc(21),s.qc(22,"translate"),s.dc(),s.ec(23,"button",13),s.Sc(24),s.qc(25,"translate"),s.ec(26,"li",14),s.Sc(27,"Coming soon"),s.dc(),s.dc(),s.ec(28,"div",15),s.ec(29,"span",16),s.Sc(30),s.qc(31,"translate"),s.dc(),s.dc(),s.ec(32,"div",17),s.ec(33,"div",2),s.ec(34,"div",18),s.ec(35,"label"),s.Sc(36),s.qc(37,"translate"),s.dc(),s.ec(38,"b"),s.Sc(39),s.dc(),s.dc(),s.ec(40,"div",18),s.ec(41,"label"),s.Sc(42),s.qc(43,"translate"),s.dc(),s.ec(44,"b"),s.Sc(45),s.dc(),s.dc(),s.ec(46,"div",18),s.ec(47,"label"),s.Sc(48),s.qc(49,"translate"),s.dc(),s.ec(50,"b"),s.Sc(51),s.dc(),s.dc(),s.ec(52,"div",18),s.ec(53,"label"),s.Sc(54),s.qc(55,"translate"),s.dc(),s.ec(56,"b"),s.Sc(57),s.dc(),s.dc(),s.dc(),s.dc(),s.ec(58,"h6"),s.Sc(59),s.qc(60,"translate"),s.dc(),s.dc(),s.ec(61,"div",19),s.ec(62,"button",20),s.lc("click",(function(){return t.gotoLogin()})),s.Sc(63),s.qc(64,"translate"),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc(),s.dc()),2&c&&(s.Mb(12),s.Tc(s.rc(13,15,"ACCOUNT_OPENING")),s.Mb(6),s.Uc("",s.rc(19,17,"CONGRATULATIONS"),"!"),s.Mb(3),s.Tc(s.rc(22,19,"ACCOUNT_OPEN_WITH_LIMITED_KYC")),s.Mb(3),s.Uc("",s.rc(25,21,"COMPLETE_VIDEO_KYC")," "),s.Mb(6),s.Tc(s.rc(31,23,"ACCOUNT_DETAILS")),s.Mb(6),s.Tc(s.rc(37,25,"CUSTOMER_ID")),s.Mb(3),s.Tc(t.accountDtl.customerID),s.Mb(3),s.Uc("",s.rc(43,27,"SAVING_ACCOUNT_NUMBER")," "),s.Mb(3),s.Tc(t.accountDtl.accountNo),s.Mb(3),s.Uc("",s.rc(49,29,"BRANCH_NAME")," "),s.Mb(3),s.Uc(" ","Not available in CBS"==t.accountDtl.branch_name?"-":t.accountDtl.branch_name,""),s.Mb(3),s.Uc("",s.rc(55,31,"UPI_ID")," "),s.Mb(3),s.Tc(t.accountDtl.UPI_ADDRESS),s.Mb(2),s.Tc(s.rc(60,33,"BANKING_DETAILS_SENT_TO_EMAIL")),s.Mb(4),s.Tc(s.rc(64,35,"START_BANKING")))},pipes:[r.a],styles:[""]}),c})()}];let v=(()=>{class c{}return c.\u0275mod=s.Wb({type:c}),c.\u0275inj=s.Vb({factory:function(t){return new(t||c)},imports:[[a.g.forChild(S)],a.g]}),c})();var h=e("3Pt+"),m=e("PCNd");let T=(()=>{class c{}return c.\u0275mod=s.Wb({type:c}),c.\u0275inj=s.Vb({factory:function(t){return new(t||c)},imports:[[n.c,v,h.m,h.C,m.a]]}),c})()}}]);