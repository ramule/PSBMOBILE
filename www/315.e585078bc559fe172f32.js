(window.webpackJsonp=window.webpackJsonp||[]).push([[315],{Stan:function(e,c,t){"use strict";t.r(c),t.d(c,"MandateUpiIdListModule",(function(){return h}));var i=t("ofXK"),a=t("fXoL"),d=t("tyNb"),o=t("EnSQ"),n=t("Eioz");function s(e,c){if(1&e){const e=a.fc();a.ec(0,"li"),a.ec(1,"div",29),a.ec(2,"label",30),a.ec(3,"span",31),a.Sc(4),a.dc(),a.Zb(5,"br"),a.ec(6,"span"),a.Sc(7),a.dc(),a.Zb(8,"br"),a.ec(9,"span",32),a.Sc(10),a.dc(),a.ec(11,"input",33),a.lc("change",(function(){a.Hc(e);const t=c.index,i=a.pc().index;return a.pc().getSelectedAccount(i,t)})),a.dc(),a.Zb(12,"span",26),a.dc(),a.dc(),a.dc()}if(2&e){const e=c.$implicit,t=a.pc().$implicit;a.Mb(4),a.Uc("",e.custName," "),a.Mb(3),a.Vc("",e.accType," ",e.maskedAccountNumber,""),a.Mb(3),a.Tc(e.bankName),a.Mb(1),a.uc("checked",t.isSelected&&e.isSelected)}}function r(e,c){if(1&e&&(a.ec(0,"div",18),a.ec(1,"div",19),a.ec(2,"div",20),a.ec(3,"div",21),a.ec(4,"div",22),a.ec(5,"label",23),a.ec(6,"h4",24),a.Sc(7),a.qc(8,"translate"),a.dc(),a.Zb(9,"input",25),a.Zb(10,"span",26),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(11,"div",19),a.ec(12,"ul",27),a.Rc(13,s,13,5,"li",28),a.dc(),a.dc(),a.dc()),2&e){const e=c.$implicit;a.Mb(7),a.Vc("",a.rc(8,4,"UPI_ID")," : ",e.paymentAddress,""),a.Mb(2),a.uc("checked",e.isSelected),a.Mb(4),a.uc("ngForOf",e.accounts)}}const l=[{path:"",component:(()=>{class e{constructor(e,c,t){this.router=e,this.DataService=c,this.location=t,this.vpaAddressList=[],this.headerdata={headerType:"TitleCloseHeader",titleName:"SELECT_ACCOUNT",footertype:"none"}}ngOnInit(){this.DataService.changeMessage(this.headerdata),history.pushState({},this.DataService.mandateTypeRouteName,this.location.prepareExternalUrl(this.DataService.mandateTypeRouteName)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),this.vpaAddressList=this.DataService.upiMandateVpaList}getSelectedAccount(e,c){this.DataService.upiMandateVpaList.map((t,i)=>(i==e?(t.isSelected=!0,t.accounts.map((e,t)=>(e.isSelected=t==c,e))):(t.isSelected=!1,t.accounts.map(e=>(e.isSelected=!1,e))),t)),this.location.back()}}return e.\u0275fac=function(c){return new(c||e)(a.Yb(d.c),a.Yb(o.a),a.Yb(i.n))},e.\u0275cmp=a.Sb({type:e,selectors:[["app-mandate-upi-id-list"]],decls:23,vars:1,consts:[[1,"main"],[1,"right-main-column","minus-rt-col"],[1,"right-col-container"],[1,"body-page-container"],["class","container-fluid",4,"ngFor","ngForOf"],["id","termsModal","role","dialog",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],[1,"mh-bottom"],[1,"row1"],[1,"col-10"],[1,"col-2"],["href","javascript:;","data-dismiss","modal"],[1,"mh-cross"],[1,"modal-body"],[1,"modal-footer"],["type","button","onclick"," location.href='#'","data-dismiss","modal",1,"ux-button","sm","primary"],[1,"container-fluid"],[1,"row"],[1,"col-12","col-sm-12","col-md-12"],[1,"grey-bg","mar-customise","bor1","mt-0","mb-0"],[1,"ux-selection","mar-4"],[1,"ux-selection2"],[1,"mt-0"],["type","radio","name","radioboxdemo1",3,"checked"],[1,"checkmark"],[1,"list2"],[4,"ngFor","ngForOf"],[1,"ux-selection","mar-4","w-100"],[1,"pad-custom","mar-custom","ux-selection4"],[1,"fs-1"],[1,"fs-2"],["type","radio","name","radioboxdemo",3,"checked","change"]],template:function(e,c){1&e&&(a.ec(0,"div",0),a.ec(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.Rc(4,r,14,6,"div",4),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"div",8),a.ec(9,"div",9),a.ec(10,"div",10),a.ec(11,"div",11),a.ec(12,"h6"),a.Sc(13,"Information"),a.dc(),a.dc(),a.ec(14,"div",12),a.ec(15,"a",13),a.Zb(16,"span",14),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(17,"div",15),a.ec(18,"p"),a.Sc(19,"Please accept the terms and conditions to proceed with registration"),a.dc(),a.dc(),a.ec(20,"div",16),a.ec(21,"button",17),a.Sc(22,"Ok"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&e&&(a.Mb(4),a.uc("ngForOf",c.vpaAddressList))},directives:[i.s],pipes:[n.a],styles:[""]}),e})()}];let p=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[d.g.forChild(l)],d.g]}),e})();var m=t("PCNd"),u=t("3Pt+");let h=(()=>{class e{}return e.\u0275mod=a.Wb({type:e}),e.\u0275inj=a.Vb({factory:function(c){return new(c||e)},imports:[[i.c,m.a,u.m,u.C,p]]}),e})()}}]);