(window.webpackJsonp=window.webpackJsonp||[]).push([[297],{"GOh/":function(c,e,t){"use strict";t.r(e),t.d(e,"StateTaxModule",(function(){return p}));var i=t("PCNd"),d=t("3Pt+"),o=t("ofXK"),a=t("fXoL"),r=t("tyNb"),n=t("EnSQ"),s=t("5IsW"),l=t("Eioz");function m(c,e){if(1&c){const c=a.fc();a.ec(0,"li"),a.ec(1,"a",45),a.lc("click",(function(){a.Hc(c);const t=e.$implicit;return a.pc().dataService.breadcrumroute(t.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&c){const c=e.$implicit;a.Mb(2),a.Tc(a.rc(3,1,c.currentRoute))}}function b(c,e){1&c&&(a.ec(0,"p",46),a.Sc(1," This field is required "),a.dc())}const u=[{path:"",component:(()=>{class c{constructor(c,e,t){this.router=c,this.dataService=e,this.constant=t}ngOnInit(){this.buildForm(),this.dataService.setShowThemeObservable(!0),this.dataService.setShowsideNavObservable(!0),this.dataService.setShowNotificationObservable(!0),this.dataService.getBreadcrumb("STATE_TAX",this.router.url),this.dataService.setPageSettings("STATE_TAX")}buildForm(){this.stateTaxForm=new d.j({termsCondition:new d.g("",[d.G.required])})}validateForm(){this.stateTaxForm.invalid&&this.stateTaxForm.get("termsCondition").markAsTouched()}stateTaxSubmit(){this.stateTaxForm.valid?console.log("state tax"):this.validateForm()}}return c.\u0275fac=function(e){return new(e||c)(a.Yb(r.c),a.Yb(n.a),a.Yb(s.a))},c.\u0275cmp=a.Sb({type:c,selectors:[["app-state-tax"]],decls:74,vars:3,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","manage-payee"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-sm-12","col-12","col-md-12"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom","tax-wrapper","py-2"],[1,"col-md-12","col-12"],["id","accordion2",1,"accordion-container","parent-accordion"],[1,"card4","overflow-inherit"],["data-toggle","collapse","href","#dvat","aria-expanded","false",1,"card-link"],[1,"card-header3"],[1,"panel-title3"],[1,"black-h4"],["id","dvat","data-parent","#accordion2",1,"collapse","show"],[1,"col-12","col-md-12"],[1,"order-list"],[3,"formGroup"],[1,"ux-selection"],[1,"ux-selection1","p-0"],["type","checkbox","name","termsCondition","formControlName","termsCondition","required",""],[1,"checkmark"],[1,"ux-input","mt-0"],["class","error-message",4,"ngIf"],[1,"border-top-container"],[1,"bottom-footer1"],[1,"btn-div","w100"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"vspacer30"],[3,"click"],[1,"error-message"]],template:function(c,e){1&c&&(a.ec(0,"div",0),a.ec(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"ul",8),a.Rc(9,m,4,3,"li",9),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(10,"div",10),a.ec(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",12),a.ec(18,"h4"),a.Sc(19,"State Tax"),a.dc(),a.dc(),a.dc(),a.ec(20,"div",13),a.ec(21,"div",17),a.ec(22,"div",18),a.ec(23,"div",19),a.ec(24,"div",13),a.ec(25,"div",20),a.ec(26,"div",21),a.ec(27,"div",22),a.ec(28,"a",23),a.ec(29,"div",24),a.ec(30,"div",25),a.ec(31,"h4",26),a.Sc(32,"DVAT"),a.dc(),a.dc(),a.Zb(33,"em"),a.dc(),a.dc(),a.ec(34,"div",27),a.ec(35,"div",13),a.ec(36,"div",28),a.ec(37,"p"),a.Sc(38,"To pay Direct Taxes through internet, do the following "),a.Zb(39,"br"),a.dc(),a.ec(40,"ol",29),a.ec(41,"li"),a.Sc(42,"After clicking \u201cProceed\u201d button, you will be leaving PSB Digital banking and will be redirected to a third party website, which is not controlled by the Bank. Bank will not be responsible/ liable for any action, dispute etc which arises at the third party website."),a.dc(),a.ec(43,"li"),a.Sc(44,"On the Income Tax website, click on the challan Number that is applicable for your payment and enter all the relevant details."),a.dc(),a.ec(45,"li"),a.Sc(46,"On Payment page, select Punjab and Sind Bank and login with your PSB Digital Banking User ID and Password. You can download the receipt on successful processing of your transaction."),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(47,"form",30),a.ec(48,"div",13),a.ec(49,"div",28),a.ec(50,"div",31),a.ec(51,"div",32),a.ec(52,"label"),a.Sc(53,"I accept "),a.ec(54,"a"),a.Sc(55," Terms and Conditions"),a.dc(),a.Zb(56,"input",33),a.Zb(57,"span",34),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(58,"div",28),a.ec(59,"div",35),a.Rc(60,b,2,0,"p",36),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(61,"div",37),a.ec(62,"div",13),a.ec(63,"div",28),a.ec(64,"ul",38),a.ec(65,"li"),a.ec(66,"div",39),a.ec(67,"button",40),a.lc("click",(function(){return e.stateTaxSubmit()})),a.Sc(68,"Proceed"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(69,"div",41),a.ec(70,"div",42),a.ec(71,"a"),a.Zb(72,"img",43),a.dc(),a.dc(),a.Zb(73,"div",44),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc()),2&c&&(a.Mb(9),a.uc("ngForOf",e.dataService.breadcrumblist),a.Mb(38),a.uc("formGroup",e.stateTaxForm),a.Mb(13),a.uc("ngIf",e.stateTaxForm.controls.termsCondition.hasError("required")&&(e.stateTaxForm.controls.termsCondition.dirty||e.stateTaxForm.controls.termsCondition.touched)))},directives:[o.s,d.I,d.t,d.k,d.a,d.b,d.s,d.i,o.t],pipes:[l.a],styles:[""]}),c})()}];let v=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[r.g.forChild(u)],r.g]}),c})(),p=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[o.c,v,d.m,i.a,d.C]]}),c})()}}]);