(window.webpackJsonp=window.webpackJsonp||[]).push([[130,349],{Dy6I:function(c,e,t){"use strict";t.r(e),t.d(e,"GetPhysicalCardModule",(function(){return _}));var i=t("ofXK"),o=t("3Pt+"),a=t("fXoL"),s=t("tyNb"),r=t("EnSQ"),n=t("au7T"),d=t("5IsW"),l=t("fHQ/"),u=t("H9Rt");let m=(()=>{class c{constructor(c,e,t,i,o){this.constant=c,this.encryptDecryptService=e,this.storage=t,this.dataService=i,this.commonMethod=o}getPhysicalCardParam(c,e,t){var i={[this.constant.key_entityId]:this.constant.getEntityId(),[this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,[this.constant.key_RequestID]:this.commonMethod.genRandomDigit(9),[this.constant.key_debitCardNo]:c,[this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),[this.constant.key_PinMailer]:"G",[this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),[this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),[this.constant.key_CifId]:e,[this.constant.key_service_Type]:t};return console.log(" getDebitCardList ",JSON.stringify(i)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(i))}}return c.\u0275fac=function(e){return new(e||c)(a.ic(d.a),a.ic(l.a),a.ic(u.a),a.ic(r.a),a.ic(n.a))},c.\u0275prov=a.Ub({token:c,factory:c.\u0275fac,providedIn:"root"}),c})();var g=t("L7Xq"),h=t("TaOT"),p=t("Eioz");function v(c,e){if(1&c){const c=a.fc();a.ec(0,"li"),a.ec(1,"a",78),a.lc("click",(function(){a.Hc(c);const t=e.$implicit;return a.pc().DataService.breadcrumroute(t.routeName)})),a.Sc(2),a.qc(3,"translate"),a.dc(),a.dc()}if(2&c){const c=e.$implicit;a.Mb(2),a.Tc(a.rc(3,1,c.currentRoute))}}function b(c,e){1&c&&(a.ec(0,"li",79),a.Sc(1,"Select Account"),a.dc())}function f(c,e){1&c&&a.Zb(0,"img",84)}function y(c,e){1&c&&a.Zb(0,"img",85)}function S(c,e){1&c&&a.Zb(0,"img",86)}function C(c,e){1&c&&a.Zb(0,"img",87)}function k(c,e){if(1&c&&(a.ec(0,"li",79),a.Rc(1,f,1,0,"img",80),a.Rc(2,y,1,0,"img",81),a.Rc(3,S,1,0,"img",82),a.Rc(4,C,1,0,"img",83),a.Sc(5),a.dc()),2&c){const c=a.pc();a.Mb(1),a.uc("ngIf","VS"==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf",""==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf","RS"==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf","MS"==c.selCard[0].card_network),a.Mb(1),a.Uc(" ",null==c.selectedCard?null:c.selectedCard.MaskCardNumber,"")}}function D(c,e){1&c&&(a.ec(0,"span"),a.Sc(1,"Select Account "),a.dc())}function w(c,e){1&c&&a.Zb(0,"img",84)}function I(c,e){1&c&&a.Zb(0,"img",85)}function M(c,e){1&c&&a.Zb(0,"img",86)}function R(c,e){1&c&&a.Zb(0,"img",87)}function T(c,e){if(1&c&&(a.ec(0,"span"),a.Rc(1,w,1,0,"img",80),a.Rc(2,I,1,0,"img",81),a.Rc(3,M,1,0,"img",82),a.Rc(4,R,1,0,"img",83),a.Sc(5),a.dc()),2&c){const c=a.pc();a.Mb(1),a.uc("ngIf","VS"==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf",""==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf","RS"==c.selCard[0].card_network),a.Mb(1),a.uc("ngIf","MS"==c.selCard[0].card_network),a.Mb(1),a.Uc(" ",null==c.selectedCard?null:c.selectedCard.MaskCardNumber,"")}}function P(c,e){1&c&&(a.ec(0,"span",88),a.Sc(1),a.qc(2,"translate"),a.dc()),2&c&&(a.Mb(1),a.Uc(" ",a.rc(2,1,"REQUIRED_MSG")," "))}function A(c,e){if(1&c){const c=a.fc();a.ec(0,"div",89),a.lc("click",(function(){a.Hc(c);const t=e.$implicit;return a.pc().getToAccValue(t.bankImage,t.accountNo)})),a.ec(1,"div",90),a.ec(2,"label",91),a.Zb(3,"img",92),a.Sc(4),a.Zb(5,"input",93),a.Zb(6,"span",50),a.dc(),a.dc(),a.dc()}if(2&c){const c=e.$implicit;a.Mb(3),a.vc("src",c.bankImage,a.Jc),a.Mb(1),a.Uc("",c.accountNo," "),a.Mb(1),a.uc("value",c.accountNo)}}const N=[{path:"",component:(()=>{class c{constructor(c,e,t,i,o,a,s,r,n,d){this.router=c,this.DataService=e,this.commonMethod=t,this.getPhysicalService=i,this.http=o,this.storage=a,this.constant=s,this.location=r,this.formValidation=n,this.translate=d,this.accountList=[{bankImage:"assets/images/icons/icici-icon.png",accountNo:"XXXX XXXX XXXX 9876"},{bankImage:"assets/images/icons/hdfc-icon.png",accountNo:"XXXX XXXX XXXX 9676"},{bankImage:"assets/images/icons/icici-icon.png",accountNo:"XXXX XXXX XXXX 1876"}],this.accountValue="",this.bankImage="",this.bankImageSelection="",this.accountNumber="",this.openDropDown=!1,this.maskedAccNo=""}ngOnInit(){this.DataService.setPageSettings("Get Physical Card"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("GET_PHYSICAL_CARD",this.router.url),this.onInitilize()}onInitilize(){console.log("this.DataService.previousPageUrl ====>"+this.DataService.previousPageUrl),history.pushState({},this.DataService.previousPageUrl,this.location.prepareExternalUrl(this.DataService.previousPageUrl)),history.pushState({},"self",this.location.prepareExternalUrl(this.router.url)),console.log(this.DataService.cardList),console.log(this.DataService.currentCard),this.selCard=this.DataService.cardList.filter(c=>c.CardNo==this.DataService.currentCard.CardNo),this.dataSelection(this.selCard[0]),this.buildForm()}buildForm(){this.physicalCardForm=new o.j({generalConcent:new o.g("",[o.G.required])})}goToPage(c){var e,t;if("getPhysicalCardAuthorization"==c)if(this.physicalCardForm.valid){this.DataService.resetTransactionObj();var i=this.getPhysicalService.getPhysicalCardParam(null===(e=this.selectedCard)||void 0===e?void 0:e.CardNo,null===(t=this.selectedCard)||void 0===t?void 0:t.Cifid,"CHANGECARDSTATE");this.DataService.request=i,this.DataService.endPoint=this.constant.serviceName_CHANGECARDSTATE,this.DataService.cardServiceType="CHANGECARDSTATE",this.DataService.authorizeHeader="Get Physical Card",this.DataService.transactionReceiptObj=this.selectedCard,this.DataService.transactionReceiptObj.accountNumber=this.selectedCard.AccountNo,this.DataService.transactionReceiptObj.cardNo=this.selectedCard.CardNo,this.DataService.debitCardIssuedData=this.selectedCard.AccountNo+"|"+this.selectedCard.CardNo+"|N|N|VP|",this.DataService.transactionReceiptObj.cardApplyType=this.translate.transform("PHYSICAL"),this.DataService.screenType="getPhysicalCard",this.DataService.otpSessionPreviousPage="/getPhysicalCard",this.router.navigate(["/otpSession"])}else this.validateForm();else this.router.navigateByUrl("/"+c)}validateForm(){this.physicalCardForm.invalid&&this.physicalCardForm.get("generalConcent").markAsTouched()}onAccountSelectType(){window}getToAccValue(c,e){this.accountValue=e,this.bankImage=c}closePopup(){this.commonMethod.closeAllPopup()}dataSelection(c){var e;this.selectedCard=c,console.log(this.selectedCard),this.maskedAccNo=this.commonMethod.maskAccNo(null===(e=this.selectedCard)||void 0===e?void 0:e.AccountNo)}toggleOpen(){this.openDropDown=!this.openDropDown}goBack(){this.router.navigateByUrl("/debitCards")}openchargespopup(){this.commonMethod.openPopup("div.popup-bottom.chargesPopup")}_closePopup(c){this.commonMethod.closePopup(c)}}return c.\u0275fac=function(e){return new(e||c)(a.Yb(s.c),a.Yb(r.a),a.Yb(n.a),a.Yb(m),a.Yb(g.a),a.Yb(u.a),a.Yb(d.a),a.Yb(i.n),a.Yb(h.a),a.Yb(p.a))},c.\u0275cmp=a.Sb({type:c,selectors:[["app-get-physical-card"]],decls:133,vars:15,consts:[[1,"main","bg-m","frwk-changes"],[1,"nav-overlay"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","mycards"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-xl-block","d-lg-block","d-md-none","d-sm-none"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"flex-container","no-bg"],[1,"full-info"],[1,"ac-info"],[1,"greenbg-input","ux-input"],["for","debitCardt",1,"largeview-enable"],[1,"greenbg-input","ux-input",3,"click"],["id","custom-icon-selectbox",1,"list-unstyled","hide-m",3,"click"],["class","init",4,"ngIf"],[1,"custom-selectbox"],[4,"ngIf"],[1,"error-message"],[1,"ac-info","d-none"],[1,"refresh-btn","d-block","ml-auto"],["src","assets/images/svg/eye-g.svg","alt","view-icon"],[1,"col-2","d-none"],[1,"vspacer10","customize","d-block","d-xl-none","d-lg-none","d-md-none","d-sm-none"],[1,"col-12","col-sm-12","col-md-12","col-lg-12"],[1,"widget-box5"],[1,"card-info"],[1,"col-xl-12","col-12"],[1,"account-list2","custm-margin"],[1,"d-inline-block"],[1,"d-inline-block","ml-5"],[1,"row1","border-bottom","d-none","d-sm-block"],[1,"custom-p"],[1,"vspacer5","customize","d-none","d-xl-block","d-lg-block","d-md-block","d-sm-block"],[1,"user-message"],[3,"formGroup"],[1,"row1","mt-4"],[1,"ux-selection","float-none","display-block"],[1,"ux-selection1"],["href","javascript:void(0)",1,"reg-txt",3,"click"],["type","checkbox","name","radioboxdemo","formControlName","generalConcent","autocomplete","off","required",""],[1,"checkmark"],["class","errormsg","style","color: #c51523 !important;",4,"ngIf"],[1,"vspacer30","customize"],[1,"vspacer20","customize"],[1,"vspacer40","customize","d-none","d-xl-block","d-lg-block","d-md-block","d-sm-block"],[1,"col-12","col-md-12"],[1,"bottom-footer1"],[1,"btn-div"],[1,"ux-button","secondary","sm-mob",3,"click"],[1,"ux-button","primary","sm-mob",3,"click"],[1,"col-12","col-md-12","col-lg-12","col-xl-3","d-none","d-xl-block"],[1,"right-ads"],["src","assets/images/banner/my-card-banner.jpg"],[1,"popup-bottom","sel-account"],[1,"col-10"],[1,"col-2"],[1,"ux-button-icon","close-btn",3,"click"],["src","assets/images/svg/close-b.svg","alt","cross-icon",1,"img-vsmall"],["class","col-12 col-md-12",3,"click",4,"ngFor","ngForOf"],[1,"ux-input"],[1,"row","mt-2"],[1,"col-12","text-center"],[1,"ux-button","primary","submit-btn2",3,"click"],[1,"popup-bottom","md-popup","chargesPopup"],[1,"text-center"],[1,"popup-body"],[1,"row1","mt-2"],[1,"ux-button","secondary","no","md","close-btn",3,"click"],[3,"click"],[1,"init"],["src","assets/images/icons/visa-icon.svg","alt","visa-logo","style","width: 19% !important;",4,"ngIf"],["src","assets/images/svg/Rupay-01.svg","alt","rupay-logo","style","width: 19% !important;",4,"ngIf"],["src","assets/images/svg/Rupay-02.svg","alt","rupay-logo","style","width: 19% !important;",4,"ngIf"],["src","assets/images/icons/visa-icon.svg","alt","master-logo","style","width: 19% !important;",4,"ngIf"],["src","assets/images/icons/visa-icon.svg","alt","visa-logo",2,"width","19% !important"],["src","assets/images/svg/Rupay-01.svg","alt","rupay-logo",2,"width","19% !important"],["src","assets/images/svg/Rupay-02.svg","alt","rupay-logo",2,"width","19% !important"],["src","assets/images/icons/visa-icon.svg","alt","master-logo",2,"width","19% !important"],[1,"errormsg",2,"color","#c51523 !important"],[1,"col-12","col-md-12",3,"click"],[1,"ux-selection","mar-custom"],[1,"ux-selection2"],[1,"bank-icon",3,"src"],["type","radio","name","upi-account",3,"value"]],template:function(c,e){1&c&&(a.ec(0,"div",0),a.Zb(1,"div",1),a.ec(2,"div",2),a.ec(3,"div",3),a.ec(4,"div",4),a.ec(5,"div",5),a.ec(6,"div",6),a.ec(7,"div",7),a.ec(8,"div",8),a.ec(9,"ul",9),a.Rc(10,v,4,3,"li",10),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(11,"div",11),a.ec(12,"div",12),a.ec(13,"div",13),a.ec(14,"div",14),a.ec(15,"div",15),a.ec(16,"div",16),a.ec(17,"div",17),a.ec(18,"div",18),a.ec(19,"div",14),a.ec(20,"div",13),a.ec(21,"div",19),a.ec(22,"div",20),a.ec(23,"label",21),a.Sc(24,"Debit Card"),a.dc(),a.dc(),a.dc(),a.ec(25,"div",19),a.ec(26,"div",22),a.lc("click",(function(){return e.onAccountSelectType()})),a.ec(27,"ul",23),a.lc("click",(function(){return e.toggleOpen()})),a.Rc(28,b,2,0,"li",24),a.Rc(29,k,6,5,"li",24),a.dc(),a.ec(30,"div",25),a.Rc(31,D,2,0,"span",26),a.Rc(32,T,6,5,"span",26),a.dc(),a.Zb(33,"p",27),a.dc(),a.dc(),a.ec(34,"div",28),a.ec(35,"button",29),a.Zb(36,"img",30),a.dc(),a.dc(),a.dc(),a.ec(37,"div",31),a.ec(38,"div",28),a.ec(39,"button",29),a.Zb(40,"img",30),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(41,"div",32),a.ec(42,"div",14),a.ec(43,"div",33),a.ec(44,"div",34),a.ec(45,"div",35),a.ec(46,"div",14),a.ec(47,"div",36),a.ec(48,"ul",37),a.ec(49,"li"),a.ec(50,"div",38),a.Sc(51,"Linked Saving Account"),a.dc(),a.ec(52,"div",39),a.ec(53,"strong"),a.Sc(54),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(55,"div",40),a.ec(56,"div",41),a.Zb(57,"div",42),a.ec(58,"div",14),a.ec(59,"div",13),a.ec(60,"p",43),a.Sc(61," You will have to visit home branch to collect your Debit Card after 7-8 working days "),a.dc(),a.dc(),a.dc(),a.ec(62,"form",44),a.ec(63,"div",45),a.ec(64,"div",13),a.ec(65,"div",46),a.ec(66,"label",47),a.Sc(67),a.qc(68,"translate"),a.ec(69,"a",48),a.lc("click",(function(){return e.openchargespopup()})),a.Sc(70),a.qc(71,"translate"),a.dc(),a.Zb(72,"input",49),a.Zb(73,"span",50),a.Rc(74,P,3,3,"span",51),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(75,"div",52),a.Zb(76,"div",53),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.Zb(77,"div",54),a.ec(78,"div",14),a.ec(79,"div",55),a.ec(80,"ul",56),a.ec(81,"li"),a.ec(82,"div",57),a.ec(83,"button",58),a.lc("click",(function(){return e.goBack()})),a.Sc(84,"Cancel"),a.dc(),a.dc(),a.ec(85,"div",57),a.ec(86,"button",59),a.lc("click",(function(){return e.goToPage("getPhysicalCardAuthorization")})),a.Sc(87,"Submit"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(88,"div",60),a.ec(89,"div",61),a.ec(90,"a"),a.Zb(91,"img",62),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(92,"div",63),a.ec(93,"div",14),a.ec(94,"div",64),a.ec(95,"h4"),a.Sc(96,"Select From Account"),a.dc(),a.dc(),a.ec(97,"div",65),a.ec(98,"button",66),a.lc("click",(function(){return e.closePopup()})),a.Zb(99,"img",67),a.dc(),a.dc(),a.dc(),a.ec(100,"div",14),a.ec(101,"div",13),a.ec(102,"div",14),a.Rc(103,A,7,3,"div",68),a.ec(104,"div",55),a.ec(105,"div",69),a.ec(106,"p",27),a.Sc(107," Error show"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(108,"div",70),a.ec(109,"div",71),a.ec(110,"button",72),a.lc("click",(function(){return e.closePopup()})),a.Sc(111," Submit"),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(112,"div",73),a.ec(113,"div",6),a.ec(114,"div",13),a.ec(115,"h4",74),a.Sc(116,"Applicable Charges"),a.dc(),a.ec(117,"div",75),a.ec(118,"ul"),a.ec(119,"li"),a.Sc(120,"ATM/Debit card annual charges from 2nd year onwards: Rs. 100/- + Applicable taxes, per annum"),a.dc(),a.ec(121,"li"),a.Sc(122," Re-issue of ATM/Debit card: Rs. 150/- + Applicable GST, per instance "),a.dc(),a.ec(123,"li"),a.Sc(124,"Charges for Issue of Duplicate ATM/Debit Card/Replacement of ATM/Debit Card : Rs 150/- + GST"),a.dc(),a.ec(125,"li"),a.Sc(126,"Issuance charge for Rupay Platinum card is Rs. 100/- + GST"),a.dc(),a.ec(127,"li"),a.Sc(128,"Customer are advised to enable contactless flag after receiving physical card"),a.dc(),a.dc(),a.dc(),a.dc(),a.dc(),a.ec(129,"div",76),a.ec(130,"div",71),a.ec(131,"button",77),a.lc("click",(function(){return e._closePopup("div.popup-bottom.chargesPopup")})),a.Sc(132,"Cancel"),a.dc(),a.dc(),a.dc(),a.dc()),2&c&&(a.Mb(10),a.uc("ngForOf",e.DataService.breadcrumblist),a.Mb(18),a.uc("ngIf",""==e.selectedCard),a.Mb(1),a.uc("ngIf",""!=e.selectedCard),a.Mb(2),a.uc("ngIf",""==e.selectedCard),a.Mb(1),a.uc("ngIf",""!=e.selectedCard),a.Mb(22),a.Tc(e.maskedAccNo),a.Mb(8),a.uc("formGroup",e.physicalCardForm),a.Mb(5),a.Uc(" ",a.rc(68,11,"I_ACCEPT"),""),a.Mb(3),a.Uc(" ",a.rc(71,13,"TERMS_CONDITION_CHARGES"),""),a.Mb(4),a.uc("ngIf",e.physicalCardForm.controls.generalConcent.hasError("required")&&e.physicalCardForm.controls.generalConcent.touched),a.Mb(29),a.uc("ngForOf",e.accountList))},directives:[i.s,i.t,o.I,o.t,o.k,o.a,o.b,o.s,o.i],pipes:[p.a],styles:[""]}),c})()}];let X=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[s.g.forChild(N)],s.g]}),c})();var x=t("PCNd");let _=(()=>{class c{}return c.\u0275mod=a.Wb({type:c}),c.\u0275inj=a.Vb({factory:function(e){return new(e||c)},imports:[[i.c,X,o.m,o.C,x.a]]}),c})()},TaOT:function(c,e,t){"use strict";t.d(e,"a",(function(){return a}));var i=t("fXoL"),o=t("fUdP");let a=(()=>{class c{constructor(c){this.customCurrencyPipe=c}markFormGroupTouched(c){Object.values(c.controls).forEach(c=>{c.markAsTouched(),c.controls&&c.controls.forEach(c=>this.markFormGroupTouched(c))})}markFormGroupUntouched(c){Object.values(c.controls).forEach(c=>{c.markAsUntouched(),c.controls&&c.controls.forEach(c=>this.markFormGroupUntouched(c))})}validationMessages(){return{required:"* This field is required",email:"* This email address is invalid",minlength:"* Length is too short",maxlength:"* Length is too long",invalid_characters:c=>{let e=c;return e=e.reduce((c,t,i)=>{let o=c;return o+=t,e.length!==i+1&&(o+=", "),o},""),"These characters are not allowed: "+e}}}validateForm(c,e,t){const i=c;for(const o in e)if(o){e[o]="";const c=i.get(o),a=this.validationMessages();if(c&&!c.valid&&(!t||c.dirty||c.touched))for(const t in c.errors)console.log("======>inside",t),e[o]=t&&"invalid_characters"!==t?e[o]||a[t]:e[o]||a[t](c.errors[t])}return e}formatCurrency(c,e,t){if("0"!=c)if(""!=c){let t=this.customCurrencyPipe.transform(c.trim(),"decimal");" 0.00"==t.trim().replace(/[^.0-9]+/g,"")?e.contains("amount")&&e.get("amount").reset():"0"==t.trim().replace(/[^.0-9]+/g,"")?e.get("amount").reset():(console.log(t),e.patchValue({amount:t}))}else e.get("amount").reset("");else e.contains("amount")&&e.get("amount").reset()}formatTransLimit(c,e){if("0"!=c)if(""!=c){let t=this.customCurrencyPipe.transform(c.trim(),"decimal");" 0.00"==t?e.contains("transactionLimit")&&e.get("transactionLimit").reset():"0"==t.trim()?e.get("transactionLimit").reset():(console.log(t),e.patchValue({transactionLimit:t}))}else e.get("transactionLimit").reset("");else e.contains("transactionLimit")&&e.get("transactionLimit").reset()}formatDynamicCurrency(c,e){$("#"+c).val()&&"\u20b9 0.00"!=$("#"+c).val()?e.patchValue({amount:$("#"+c).val()}):e.get("amount").reset("")}deFormatValue(c,e){e.patchValue({amount:c.replace(/[^0-9.]+/g,"")})}formatAmtCurrency(c,e,t){if("0"!=c)if(""!=c){let i=this.customCurrencyPipe.transform(c.trim(),"decimal");" 0.00"==i?e.contains(t)&&e.get(t).reset():"0"==i.trim()?e.get(t).reset():e.controls[t].patchValue("\u20b9"+i)}else e.get(t).reset("");else e.contains(t)&&e.get(t).reset()}}return c.\u0275fac=function(e){return new(e||c)(i.ic(o.a))},c.\u0275prov=i.Ub({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()}}]);