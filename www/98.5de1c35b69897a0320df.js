(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{1090:function(e,c,r){"use strict";r.r(c),r.d(c,"AddBillReminderModule",(function(){return S}));var i=r("PCNd"),t=r("3Pt+"),n=r("ofXK"),o=r("tyNb"),l=r("fXoL"),d=r("EnSQ"),a=r("OXpz"),s=r("Eioz");function m(e,c){if(1&e){const e=l.fc();l.ec(0,"li"),l.ec(1,"a",55),l.lc("click",(function(){l.Hc(e);const r=c.$implicit;return l.pc().DataService.breadcrumroute(r.routeName)})),l.Sc(2),l.qc(3,"translate"),l.dc(),l.dc()}if(2&e){const e=c.$implicit;l.Mb(2),l.Tc(l.rc(3,1,e.currentRoute))}}function u(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}function b(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}function h(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}function p(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}function g(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}function v(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1," Only Alphabets are allowed "),l.dc())}function f(e,c){1&e&&(l.ec(0,"p",56),l.Sc(1),l.qc(2,"translate"),l.dc()),2&e&&(l.Mb(1),l.Uc(" ",l.rc(2,1,"REQUIRED_MSG")," "))}const R=[{path:"",component:(()=>{class e{constructor(e,c){this.router=e,this.DataService=c}ngOnInit(){this.buildForm(),this.DataService.setPageSettings("ADD_BILL_REMINDER"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("ADD_BILL_REMINDER",this.router.url)}buildForm(){this.addBillReminderForm=new t.j({billerCategory:new t.g("",[t.G.required]),billerName:new t.g("",[t.G.required]),consumerName:new t.g("",[t.G.required]),billerMonth:new t.g("",[t.G.required]),nickName:new t.g("",[t.G.required,t.G.pattern("[a-zA-Z ]*$")]),terms:new t.g("",[t.G.required])})}validateForm(){if(this.addBillReminderForm.invalid)return this.addBillReminderForm.get("billerCategory").markAsTouched(),this.addBillReminderForm.get("billerName").markAsTouched(),this.addBillReminderForm.get("consumerName").markAsTouched(),this.addBillReminderForm.get("billerMonth").markAsTouched(),this.addBillReminderForm.get("nickName").markAsTouched(),void this.addBillReminderForm.get("terms").markAsTouched()}addBillReminderSubmit(){this.addBillReminderForm.valid?this.goToPage("retailAddBillReminderConfirmation"):this.validateForm()}goToPage(e){this.router.navigateByUrl("/"+e)}}return e.\u0275fac=function(c){return new(c||e)(l.Yb(o.c),l.Yb(d.a))},e.\u0275cmp=l.Sb({type:e,selectors:[["app-add-bill-reminder"]],decls:116,vars:9,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","bill-wrapper"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-10","col-12"],[1,"col-md-2","col-12"],[1,"header-actions"],["src","assets/images/icons/billpay.png","alt","billpay-img",1,"small-img"],[3,"formGroup"],[1,"col-sm-12","col-12","col-md-12"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom"],[1,"flex-container2"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-12","full-info"],[1,"col-12","col-md-6","col-lg-4","col-xl-4"],[1,"ux-input"],["formControlName","billerCategory"],["value",""],["value","Abc"],["value","Def"],["value","Ghi"],["class","error-message",4,"ngIf"],["formControlName","billerName"],["type","text","placeholder","Enter Consumer Number","formControlName","consumerName","numbersOnly",""],[1,"text-right"],[1,"link-txt"],["formControlName","billerMonth"],["type","text","placeholder","Enter Nick Name","formControlName","nickName"],[1,"ux-selection"],[1,"ux-selection1","mar-rcustom","pl-3"],["type","checkbox","name","terms","formControlName","terms","required",""],[1,"checkmark"],[1,"ux-input","pl-3"],[1,"col-12","col-md-12"],[1,"bottom-footer1"],[1,"btn-div","hide-m"],["type","button",1,"ux-button","secondary","sm-mob"],[1,"btn-div","w100"],["type","submit",1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[3,"click"],[1,"error-message"]],template:function(e,c){1&e&&(l.ec(0,"div",0),l.ec(1,"div",1),l.ec(2,"div",2),l.ec(3,"div",3),l.ec(4,"div",4),l.ec(5,"div",5),l.ec(6,"div",6),l.ec(7,"div",7),l.ec(8,"ul",8),l.Rc(9,m,4,3,"li",9),l.dc(),l.dc(),l.dc(),l.dc(),l.Zb(10,"div",10),l.ec(11,"div",11),l.ec(12,"div",12),l.ec(13,"div",13),l.ec(14,"div",14),l.ec(15,"div",15),l.ec(16,"div",16),l.ec(17,"div",17),l.ec(18,"h4"),l.Sc(19,"Add Bill Reminder "),l.dc(),l.dc(),l.ec(20,"div",18),l.ec(21,"div",19),l.Zb(22,"img",20),l.dc(),l.dc(),l.dc(),l.ec(23,"form",21),l.ec(24,"div",13),l.ec(25,"div",22),l.ec(26,"div",23),l.ec(27,"div",24),l.ec(28,"div",13),l.ec(29,"div",25),l.ec(30,"div",26),l.ec(31,"div",13),l.ec(32,"div",27),l.ec(33,"div",28),l.ec(34,"label"),l.Sc(35,"Biller Category"),l.dc(),l.ec(36,"select",29),l.ec(37,"option",30),l.Sc(38,"Select"),l.dc(),l.ec(39,"option",31),l.Sc(40,"Abc"),l.dc(),l.ec(41,"option",32),l.Sc(42,"Def"),l.dc(),l.ec(43,"option",33),l.Sc(44,"Ghi"),l.dc(),l.dc(),l.Rc(45,u,3,3,"p",34),l.dc(),l.dc(),l.ec(46,"div",27),l.ec(47,"div",28),l.ec(48,"label"),l.Sc(49,"Biller Name"),l.dc(),l.ec(50,"select",35),l.ec(51,"option",30),l.Sc(52,"Select"),l.dc(),l.ec(53,"option",31),l.Sc(54,"Abc"),l.dc(),l.ec(55,"option",32),l.Sc(56,"Def"),l.dc(),l.ec(57,"option",33),l.Sc(58,"Ghi"),l.dc(),l.dc(),l.Rc(59,b,3,3,"p",34),l.dc(),l.dc(),l.dc(),l.ec(60,"div",13),l.ec(61,"div",27),l.ec(62,"div",28),l.ec(63,"label"),l.Sc(64,"Consumer Number"),l.dc(),l.Zb(65,"input",36),l.ec(66,"p",37),l.ec(67,"a",38),l.Sc(68,"View Sample Bill"),l.dc(),l.dc(),l.Rc(69,h,3,3,"p",34),l.dc(),l.dc(),l.ec(70,"div",27),l.ec(71,"div",28),l.ec(72,"label"),l.Sc(73,"Biller Date for Each Month"),l.dc(),l.ec(74,"select",39),l.ec(75,"option",30),l.Sc(76,"Select"),l.dc(),l.ec(77,"option",31),l.Sc(78,"Abc"),l.dc(),l.ec(79,"option",32),l.Sc(80,"Def"),l.dc(),l.ec(81,"option",33),l.Sc(82,"Ghi"),l.dc(),l.dc(),l.Rc(83,p,3,3,"p",34),l.dc(),l.dc(),l.dc(),l.ec(84,"div",13),l.ec(85,"div",27),l.ec(86,"div",28),l.ec(87,"label"),l.Sc(88,"Nick Name for Reminder"),l.dc(),l.Zb(89,"input",40),l.Rc(90,g,3,3,"p",34),l.Rc(91,v,2,0,"p",34),l.dc(),l.dc(),l.dc(),l.ec(92,"div",13),l.ec(93,"div",41),l.ec(94,"div",42),l.ec(95,"label"),l.Sc(96,"I here by, wish to get bills generated by this biller on regular basis. I also agree to share the require details for receiving bills reminders. "),l.ec(97,"a"),l.Sc(98,"Terms and Conditions"),l.dc(),l.Zb(99,"input",43),l.Zb(100,"span",44),l.dc(),l.dc(),l.ec(101,"div",45),l.Rc(102,f,3,3,"p",34),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.ec(103,"div",46),l.ec(104,"ul",47),l.ec(105,"li"),l.ec(106,"div",48),l.ec(107,"button",49),l.Sc(108,"Cancel"),l.dc(),l.dc(),l.ec(109,"div",50),l.ec(110,"button",51),l.lc("click",(function(){return c.addBillReminderSubmit()})),l.Sc(111,"Proceed"),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.ec(112,"div",52),l.ec(113,"div",53),l.ec(114,"a"),l.Zb(115,"img",54),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc(),l.dc()),2&e&&(l.Mb(9),l.uc("ngForOf",c.DataService.breadcrumblist),l.Mb(14),l.uc("formGroup",c.addBillReminderForm),l.Mb(22),l.uc("ngIf",c.addBillReminderForm.controls.billerCategory.hasError("required")&&(c.addBillReminderForm.controls.billerCategory.dirty||c.addBillReminderForm.controls.billerCategory.touched)),l.Mb(14),l.uc("ngIf",c.addBillReminderForm.controls.billerName.hasError("required")&&(c.addBillReminderForm.controls.billerName.dirty||c.addBillReminderForm.controls.billerName.touched)),l.Mb(10),l.uc("ngIf",c.addBillReminderForm.controls.consumerName.hasError("required")&&(c.addBillReminderForm.controls.consumerName.dirty||c.addBillReminderForm.controls.consumerName.touched)),l.Mb(14),l.uc("ngIf",c.addBillReminderForm.controls.billerMonth.hasError("required")&&(c.addBillReminderForm.controls.billerMonth.dirty||c.addBillReminderForm.controls.billerMonth.touched)),l.Mb(7),l.uc("ngIf",c.addBillReminderForm.controls.nickName.hasError("required")&&(c.addBillReminderForm.controls.nickName.dirty||c.addBillReminderForm.controls.nickName.touched)),l.Mb(1),l.uc("ngIf",c.addBillReminderForm.controls.nickName.hasError("pattern")&&(c.addBillReminderForm.controls.nickName.dirty||c.addBillReminderForm.controls.nickName.touched)),l.Mb(11),l.uc("ngIf",c.addBillReminderForm.controls.terms.hasError("required")&&(c.addBillReminderForm.controls.terms.dirty||c.addBillReminderForm.controls.terms.touched)))},directives:[n.s,t.I,t.t,t.k,t.E,t.s,t.i,t.x,t.H,n.t,t.c,a.d,t.a,t.b],pipes:[s.a],styles:[""]}),e})()}];let y=(()=>{class e{}return e.\u0275mod=l.Wb({type:e}),e.\u0275inj=l.Vb({factory:function(c){return new(c||e)},imports:[[o.g.forChild(R)],o.g]}),e})(),S=(()=>{class e{}return e.\u0275mod=l.Wb({type:e}),e.\u0275inj=l.Vb({factory:function(c){return new(c||e)},imports:[[n.c,y,t.C,i.a,t.m]]}),e})()},OXpz:function(e,c,r){"use strict";r.d(c,"d",(function(){return n})),r.d(c,"b",(function(){return o})),r.d(c,"a",(function(){return l})),r.d(c,"c",(function(){return d}));var i=r("fXoL"),t=r("3Pt+");let n=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&!/^[0-9]*$/.test(this.control.value)){let e=this.control.value.replace(/[^0-9]/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(i.Yb(t.r))},e.\u0275dir=i.Tb({type:e,selectors:[["","numbersOnly",""]],hostBindings:function(e,c){1&e&&i.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[i.Kb]}),e})(),o=(()=>{class e{constructor(e){this.control=e,this.specialKeys=["Backspace","Tab"]}ngOnChanges(e){if(-1===this.specialKeys.indexOf(e.key)&&this.control.value){let e=this.control.value.replace(/[^.0-9]+/g,"");this.control.control.setValue(e)}}}return e.\u0275fac=function(c){return new(c||e)(i.Yb(t.r))},e.\u0275dir=i.Tb({type:e,selectors:[["","digitOnly",""]],hostBindings:function(e,c){1&e&&i.lc("input",(function(e){return c.ngOnChanges(e)}))},features:[i.Kb]}),e})(),l=(()=>{class e{constructor(e){this.el=e,this.regex=new RegExp(/^\d*\.?\d{0,2}$/g),this.specialKeys=["Backspace","Tab","End","Home","-","ArrowLeft","ArrowRight","Del","Delete"]}onKeyDown(e){if(console.log(this.el.nativeElement.value),-1!==this.specialKeys.indexOf(e.key))return;let c=this.el.nativeElement.value;const r=this.el.nativeElement.selectionStart,i=[c.slice(0,r),"Decimal"==e.key?".":e.key,c.slice(r)].join("");i&&!String(i).match(this.regex)&&e.preventDefault()}}return e.\u0275fac=function(c){return new(c||e)(i.Yb(i.o))},e.\u0275dir=i.Tb({type:e,selectors:[["","amountOnly",""]],hostBindings:function(e,c){1&e&&i.lc("keydown",(function(e){return c.onKeyDown(e)}))}}),e})(),d=(()=>{class e{constructor(e){this._el=e}onInputChange(e){const c=this._el.nativeElement.value;this._el.nativeElement.value=c.replace(/[^0-9]*/g,""),c!==this._el.nativeElement.value&&e.stopPropagation()}}return e.\u0275fac=function(c){return new(c||e)(i.Yb(i.o))},e.\u0275dir=i.Tb({type:e,selectors:[["input","numericOnly",""]],hostBindings:function(e,c){1&e&&i.lc("input",(function(e){return c.onInputChange(e)}))}}),e})()}}]);