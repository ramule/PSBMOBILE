(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{"7Y/L":function(e,t,c){"use strict";c.r(t),c.d(t,"BillPaymentModule",(function(){return O}));var i=c("ofXK"),l=c("3Pt+"),a=c("PCNd"),s=c("tyNb"),o=c("fXoL"),n=c("EnSQ"),r=c("au7T"),d=c("5IsW"),m=c("fHQ/"),b=c("H9Rt");let h=(()=>{class e{constructor(e,t,c,i,l,a){this.constant=e,this.encryptDecryptService=t,this.localStorage=c,this.dataService=i,this.commonMethod=l,this.storage=a}fetchbill(e,t){var c={[this.constant.key_entityId]:"PSB",[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage("deviceId"),[this.constant.key_service_name]:"RetrieveBillService"};return console.log("getbillerlist ==>"+JSON.stringify(c)),console.log("this.storage.getSessionStorage(this.constant.val_sessionKey)",this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(c))}getBillDetails(e,t,c){var i={[this.constant.key_entityId]:"PSB",[this.constant.key_mobPlatform]:this.constant.val_mobPlatform,[this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_clientAppVersion]:this.constant.val_mobileAppVersion,[this.constant.key_deviceId]:this.storage.getLocalStorage("deviceId"),[this.constant.key_service_name]:c,[this.constant.key_biller_customerid]:e,[this.constant.key_billerid]:t};return console.log("getbillerlist ==>"+JSON.stringify(i)),console.log("this.storage.getSessionStorage(this.constant.val_sessionKey)",this.storage.getSessionStorage(this.constant.val_sessionKey)),this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(i))}}return e.\u0275fac=function(t){return new(t||e)(o.ic(d.a),o.ic(m.a),o.ic(b.a),o.ic(n.a),o.ic(r.a),o.ic(b.a))},e.\u0275prov=o.Ub({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var u=c("L7Xq"),v=c("Qco3"),g=c("tk/3"),p=c("Eioz");function S(e,t){if(1&e){const e=o.fc();o.ec(0,"li"),o.ec(1,"a",102),o.lc("click",(function(){o.Hc(e);const c=t.$implicit;return o.pc().DataService.breadcrumroute(c.routeName)})),o.Sc(2),o.qc(3,"translate"),o.dc(),o.dc()}if(2&e){const e=t.$implicit;o.Mb(2),o.Tc(o.rc(3,1,e.currentRoute))}}function f(e,t){if(1&e&&(o.ec(0,"option",103),o.Sc(1),o.dc()),2&e){const e=t.$implicit;o.uc("value",e),o.Mb(1),o.Tc(e)}}function y(e,t){1&e&&(o.ec(0,"p",104),o.Sc(1," Please select state "),o.dc())}function P(e,t){if(1&e&&o.Zb(0,"img",105),2&e){const e=o.pc();o.vc("src",e.selectedBoard.biller_logo,o.Jc)}}function _(e,t){if(1&e){const e=o.fc();o.ec(0,"li",106),o.lc("click",(function(){o.Hc(e);const c=t.$implicit;return o.pc().boardTypeSelection(c)})),o.Zb(1,"img",105),o.ec(2,"span",107),o.Sc(3),o.dc(),o.Zb(4,"img",108),o.dc()}if(2&e){const e=t.$implicit;o.Mb(1),o.vc("src",e.biller_logo,o.Jc),o.Mb(2),o.Uc(" ",e.biller_name," ")}}function N(e,t){1&e&&(o.ec(0,"div",109),o.ec(1,"div",110),o.Zb(2,"img",111),o.dc(),o.dc())}function B(e,t){if(1&e&&(o.ec(0,"span",104),o.Sc(1),o.dc()),2&e){const e=o.pc();o.Mb(1),o.Uc("Please enter ",e.consumerLabel," ")}}function k(e,t){if(1&e&&(o.ec(0,"span",104),o.Sc(1),o.dc()),2&e){const e=o.pc();o.Mb(1),o.Uc(" ",e.errorMsg," ")}}function w(e,t){if(1&e&&(o.ec(0,"h5",140),o.Zb(1,"img",141),o.Sc(2),o.dc()),2&e){const e=o.pc(2);o.Mb(2),o.Uc(" ",e.billerdetailsDataPass.billamt,"")}}function F(e,t){if(1&e&&o.Zb(0,"input",142),2&e){const e=o.pc(2);o.uc("value",e.billerdetailsDataPass.billamt)}}function x(e,t){if(1&e&&(o.ec(0,"div",143),o.ec(1,"div",5),o.ec(2,"h6"),o.Sc(3),o.dc(),o.ec(4,"h5"),o.Sc(5),o.qc(6,"titlecase"),o.dc(),o.dc(),o.dc()),2&e){const e=t.$implicit;o.Mb(3),o.Tc(e.label),o.Mb(2),o.Uc("",o.rc(6,2,e.field)," ")}}function R(e,t){if(1&e){const e=o.fc();o.ec(0,"div",112),o.ec(1,"div",21),o.ec(2,"div",113),o.ec(3,"div",114),o.ec(4,"ul",115),o.ec(5,"li"),o.ec(6,"div",116),o.ec(7,"div",117),o.ec(8,"h6"),o.Sc(9,"Total Bill Amount"),o.dc(),o.ec(10,"div",118),o.Rc(11,w,3,1,"h5",119),o.Rc(12,F,1,1,"input",120),o.Zb(13,"p",121),o.dc(),o.dc(),o.dc(),o.ec(14,"div",122),o.ec(15,"div",117),o.ec(16,"h5"),o.Sc(17),o.dc(),o.ec(18,"h6",123),o.Sc(19),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(20,"div",21),o.ec(21,"div",124),o.ec(22,"div",125),o.ec(23,"div",13),o.ec(24,"div",126),o.ec(25,"div",127),o.ec(26,"div",128),o.ec(27,"a",129),o.ec(28,"div",130),o.ec(29,"div",131),o.ec(30,"h6",132),o.Sc(31,"Consumer Details"),o.dc(),o.dc(),o.Zb(32,"em"),o.dc(),o.dc(),o.ec(33,"div",133),o.ec(34,"div",134),o.ec(35,"div",135),o.Rc(36,x,7,4,"div",136),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(37,"div",21),o.ec(38,"div",13),o.ec(39,"div",86),o.ec(40,"ul",137),o.ec(41,"li"),o.ec(42,"div",138),o.ec(43,"button",139),o.lc("click",(function(){return o.Hc(e),o.pc().existingGetBillSubmit()})),o.Sc(44,"Proceed to Pay"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()}if(2&e){const e=o.pc();o.Mb(11),o.uc("ngIf","N"==e.partialPay),o.Mb(1),o.uc("ngIf","Y"==e.partialPay),o.Mb(5),o.Tc(e.billerdetailsDataPass.billerName),o.Mb(2),o.Uc("Due Date : ",e.billerdetailsDataPass.dueDate," "),o.Mb(17),o.uc("ngForOf",e.billerdetailsDataPass.displayData)}}function L(e,t){if(1&e){const e=o.fc();o.ec(0,"div",144),o.ec(1,"ul",137),o.ec(2,"li"),o.ec(3,"div",145),o.ec(4,"button",146),o.lc("click",(function(){return o.Hc(e),o.pc().goToPage("retailRechargeBillPay")})),o.Sc(5,"Cancel"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc()}}const D=function(e){return{"d-none":e}},M=[{path:"",component:(()=>{class e{constructor(e,t,c,i,l,a,s,o,n){this.router=e,this.DataService=t,this.commonMethod=c,this.billPaymnetService=i,this.http=l,this.constant=a,this.storage=s,this.bbpsService=o,this.httpp=n,this.billPaymentBoardName=[{imagName:"assets/images/icons/mahavitran.png",boardName:"Adani Electicity - Mumbai"},{imagName:"assets/images/icons/aasam-power.png",boardName:"Assam Power - RAPDR"},{imagName:"assets/images/icons/best-mumbai.png",boardName:"BEST - Mumbai"}],this.stateList=[],this.boardNameToggle=!1,this.boardNameValue="",this.billerList=[],this.boardNameValueChildParent="",this.billpayType=this.DataService.billtype,this.selectedBoard={biller_legal_name:"Select Board",billerid:"",biller_logo:""},this.showFetchBill=!1,this.finalBillerList=[],this.consumerLabel="",this.errorMsg="",this.authenticators=[{}],this.cou_conv_fee="0.00",this.bou_conv_fee="0.00"}ngOnInit(){this.buildForm(),this.DataService.setPageSettings("BILL_PAYMENT"),this.DataService.setShowThemeObservable(!0),this.DataService.setShowsideNavObservable(!0),this.DataService.setShowNotificationObservable(!0),this.DataService.getBreadcrumb("BILL_PAYMENT",this.router.url),this.getState()}goToPage(e){this.router.navigateByUrl("/"+e)}buildForm(){this.billPaymentForm=new l.j({state:new l.g("Select State",[l.G.required]),consumerNumber:new l.g("",[l.G.required]),boardname:new l.g("",[l.G.required])}),this.paymentTypeForm=new l.j({paymentMode:new l.g("",[l.G.required])})}validateForm(){if(this.billPaymentForm.invalid)return this.billPaymentForm.get("state").markAsTouched(),this.billPaymentForm.get("boardname").markAsTouched(),void this.billPaymentForm.get("consumerNumber").markAsTouched()}validatepaymentForm(){this.paymentTypeForm.invalid&&this.paymentTypeForm.get("paymentMode").markAsTouched()}billPaymentSubmit(){this.authenticators[0].parameter_name=this.consumerLabel,this.authenticators[0].value=this.billPaymentForm.value.consumerNumber;let e={billerName:this.selectedBillerName,billerId:this.billPaymentForm.value.boardname,customerid:this.DataService.customerID,authenticators:this.authenticators};console.log(JSON.stringify(e)),this.billPaymentForm.valid?(this.DataService.electricBillObj.billername=this.selectedBillerName,this.DataService.electricBillObj.custID=this.billPaymentForm.value.consumerNumber,this.DataService.electricBillObj.billerID=this.billPaymentForm.value.boardname,this.getBillDetails(this.billPaymentForm.value.consumerNumber,this.billPaymentForm.value.boardname),this.validatePaymentDetails(e)):this.validateForm()}onSelectOption(){this.boardNameToggle=!this.boardNameToggle,$("#board-name").slideToggle(),$("#board-name").parent().toggleClass("active")}boardTypeSelection(e){var t;console.log("item ==> "+JSON.stringify(e)),this.onSelectOption(),this.selectedBoard=e,this.billPaymentForm.get("boardname").setValue(e.billerid),this.billPaymentForm.get("consumerNumber").setValue(""),this.selectedBillerName=e.billerName,$("#board-name").slideUp(),$("#board-name").parent().removeClass("active"),this.consumerLabel=e.authenticators[0].parameter_name,this.billPaymentForm.get("consumerNumber").setValidators([l.G.required,l.G.pattern(e.authenticators[0].regex)]),this.errorMsg=e.authenticators[0].error_message,this.logoUrl=e.biller_logo,this.billSampleURL=e.biller_bill_copy,this.billPaymentForm.get("consumerNumber").updateValueAndValidity(),this.billPaymentForm.get("boardname").updateValueAndValidity(),this.partialPay=e.partial_pay,this.validatePay=e.online_validation,(null===(t=e.customer_conv_fee)||void 0===t?void 0:t.length)>0?(e.customer_conv_fee.forEach(e=>{"Internet"==e.payment_channel&&(this.cou_conv_fee=e.cou_conv_fee,this.bou_conv_fee=e.bou_conv_fee,console.log("this.cou_conv_fee"+this.cou_conv_fee),console.log("this.bou_conv_fee"+this.bou_conv_fee))}),console.log("outside"+this.cou_conv_fee)):(this.cou_conv_fee="0.00",this.bou_conv_fee="0.00"),this.totalHandlingCharge=(parseFloat(this.cou_conv_fee)+parseFloat(this.bou_conv_fee)).toFixed(2)}getState(){let e=this.bbpsService.getLocationList(this.DataService.billcategory);this.http.callBankingAPIService(e,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BBPSSERVICES).subscribe(e=>{console.log(JSON.parse(e.responseParameter.bbpsResponse));var t=e.responseParameter;"00"==t.opstatus?(console.log(e.responseParameter),this.stateList=JSON.parse(e.responseParameter.bbpsResponse).responseParameter.billerLocationList,console.log("State List: ",this.stateList),1==this.stateList.length&&"National"==this.stateList[0]&&this.onStateSelect(this.stateList[0])):this.errorCallBack(e.subActionId,t)})}onStateSelect(e){this.selectedBoard={biller_legal_name:"Select Board",billerid:"",biller_logo:""},console.log("selected state ===> "+e),this.consumerLabel="";var t=this.bbpsService.getbillerlist(e,this.DataService.billcategory);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BBPSSERVICES).subscribe(e=>{console.log(e);var t=e.responseParameter;if("00"==t.opstatus&&(this.finalBillerList=[],console.log(e.responseParameter),this.boardNameValue=JSON.parse(e.responseParameter.bbpsResponse).responseParameter.billerList,console.log("billerList: ",this.boardNameValue)),"00"==t.opstatus){console.log(e.responseParameter),this.boardNameValue=JSON.parse(e.responseParameter.bbpsResponse).responseParameter.billerList,console.log("billerList: "+JSON.stringify(this.boardNameValue)),console.log("billerListlength: "+this.boardNameValue[0].billerData);for(var c=0;c<this.boardNameValue.length;c++)this.finalBillerList.push(JSON.parse(this.boardNameValue[c].billerData));console.log("this.finalBillerList: "+JSON.stringify(this.finalBillerList))}else this.errorCallBack(e.subActionId,t)})}validatePaymentDetails(e){var t=this.bbpsService.ValidatePaymentParam(e);this.http.callBankingAPIService(t,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BBPSSERVICES).subscribe(e=>{console.log(e);var t=e.responseParameter;console.log("ValidatePaymentService ===> "+JSON.stringify(t)),"00"==t.opstatus?(this.validatedillerRes=JSON.parse(t.bbpsResponse).responseParameter.result,this.validatedillerRes=JSON.parse(this.validatedillerRes),console.log("this.validatedillerRes ===> "+JSON.stringify(this.validatedillerRes)),console.log(typeof this.validatedillerRes),this.billerdetailsDataPass={billerName:this.validatedillerRes.biller_name,billamt:(parseFloat(this.validatedillerRes.billlist[0].billamount)+parseFloat(this.totalHandlingCharge)).toFixed(2),billCategory:this.validatedillerRes.biller_category,logourl:this.logoUrl,billerId:this.validatedillerRes.billlist[0].billerid,validationid:this.validatedillerRes.validationid,dueDate:this.validatedillerRes.billlist[0].billduedate,paymentType:"instapay",cou_conv_fee:this.cou_conv_fee,bou_conv_fee:this.bou_conv_fee,displayData:[{label:"Customer Name",field:this.validatedillerRes.billlist[0].customer_name},{label:this.validatedillerRes.authenticators[0].parameter_name,field:this.validatedillerRes.authenticators[0].value},{label:"Bill Amount",field:"\u20b9"+this.validatedillerRes.billlist[0].billamount},{label:"Handling Fees",field:"\u20b9"+this.totalHandlingCharge},{label:"Bill Date",field:this.validatedillerRes.billlist[0].billdate},{label:"Bill Status",field:this.validatedillerRes.billlist[0].billstatus}]},this.showFetchBill=!0,console.log("this.billerdetailsDataPass ==>"+this.billerdetailsDataPass)):this.errorCallBack(e.subActionId,t)})}errorCallBack(e,t){}existingGetBillSubmit(){this.goToPage("existingBillPayment"),this.DataService.billerdata=this.billerdetailsDataPass}getBillDetails(e,t){let c=this.billPaymnetService.getBillDetails(e,t,"RetrieveBillService");this.http.callBankingAPIService(c,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_BBPSSERVICES).subscribe(e=>{"00"==e.responseParameter.opstatus&&(console.log(e.responseParameter),this.billdetails=JSON.parse(e.responseParameter.bbpsResponse).responseParameter.result,this.billdetails=JSON.parse(this.billdetails),console.log("billdetails billdetails : ",JSON.stringify(this.billdetails)))})}}return e.\u0275fac=function(t){return new(t||e)(o.Yb(s.c),o.Yb(n.a),o.Yb(r.a),o.Yb(h),o.Yb(u.a),o.Yb(d.a),o.Yb(b.a),o.Yb(v.a),o.Yb(g.a))},e.\u0275cmp=o.Sb({type:e,selectors:[["app-bill-payment"]],decls:263,vars:26,consts:[[1,"main","bg-m"],[1,"right-main-column"],[1,"right-col-container","pad-b","full-width"],[1,"body-page-container","main-dashborad","bill-wrapper"],[1,"container-fluid"],[1,"row"],[1,"col-12","p-0"],[1,"breadcrumb"],[1,"lst-breadcrumb"],[4,"ngFor","ngForOf"],[1,"vspacer15","customize","d-none","d-md-block","d-lg-block","d-xl-block"],[1,"row","no-gutters"],[1,"col-12"],[1,"row1"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-9"],[1,"greencard2"],[1,"row1","hide-m"],[1,"col-md-10","col-12"],[1,"col-md-2","col-12"],[1,"header-actions"],["src","assets/images/icons/billpay.png","alt","billpay-img",1,"small-img"],[1,"col-sm-12","col-12","col-md-12"],[1,"ux-nav-tabs",2,"margin","0"],[1,"responsive3"],["role","tablist",1,"nav","nav-tabs","nav-justified","bor-n","d-flex","d-sm-none","mt-0"],[1,"nav-item"],["data-toggle","tab","href","#pay-bill","data-target","#pay-bill, #bill-pay1",1,"nav-link","active"],["data-toggle","tab","href","#recent-pay",1,"nav-link"],[1,"tab-content","custom-tab-content1","mb-0","row1"],["id","pay-bill",1,"tab-pane","active","show","col-12","p-0"],[1,"widget-box5","mb-3","overflow-inherit","min-height"],[1,"bg-white1","pad-custom","rounded-8"],[3,"formGroup","ngSubmit"],[1,"flex-container2"],[1,"col-12","col-sm-12","col-md-12","col-lg-12","col-xl-12","full-info"],[1,"col-12","col-md-6","col-lg-4","col-xl-4",3,"ngClass"],[1,"ux-input"],["formControlName","state",3,"change"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","errormsg",4,"ngIf"],[1,"col-12","col-md-6","col-lg-8","col-xl-8",3,"ngClass"],[1,"col-12","col-md-8","col-lg-6","col-xl-6"],[1,"ux-input","biller-custom-selectbox"],[1,"custom-dropdown-dummy"],[1,"dispayblock",3,"click"],["class","boardlogo","alt","",3,"src",4,"ngIf"],["type","hidden","formControlName","boardname",3,"value"],["id","board-name",1,"list"],["class","init",3,"click",4,"ngFor","ngForOf"],["class","col-12 col-md-4 col-lg-6 col-xl-6 d-none d-sm-block",4,"ngIf"],["type","text","formControlName","consumerNumber",3,"placeholder","input"],[1,"text-right"],[1,"link-txt",3,"click"],[1,"text-right","col-6"],["type","submit",1,"ux-button","primary","sm5","float-right","fetchBtn",3,"click"],[1,"vspacer30","d-none","d-sm-block"],["class","row1 fetch-bill-info",4,"ngIf"],["id","recent-pay",1,"tab-pane","fade","d-sm-none"],[1,"widget-box7"],[1,"component-title6"],[1,"col-8","col-md-5","d-none","d-sm-block"],[1,"col-4","col-md-7","d-none","d-sm-block","pl-0","text-right"],["href","#",1,"link-txt"],["href","#",1,"link-txt","ml-3"],[1,"component-box"],[1,"pay-list"],[1,"white-container"],[1,"list-full","mb-1"],[1,"list-info"],[1,"icon1"],["src","assets/images/icons/adani.png","alt","adani-logo"],[1,"list-full2"],[1,"list-day-info"],[1,"text-pass"],[1,"mob-amount","d-sm-none","d-block"],[1,"text-reject","m-0","mb-2"],[1,"list-btn"],[1,"ux-button","primary","sm5","float-right","ml-2"],[1,"ux-button","secondary","sm5","float-right"],["src","assets/images/icons/aasam-power.png","alt","aasam-logo"],[1,"text-reject"],[1,"text-del","m-0","mb-2"],["class","col-12 col-md-12 d-none d-sm-block",4,"ngIf"],[1,"vspacer5","d-block","d-sm-none"],["id","bill-pay1",1,"col-12","col-md-12","col-lg-12","col-xl-3"],[1,"col-12","col-md-12"],[1,"pay-list","pendig-due-wrapper"],[1,"list-amount","text-right"],[1,"text-reject","my-3"],["src","assets/images/icons/airtel.png","alt","airtel-logo"],[1,"text-available"],["src","assets/images/icons/mahanagar-gas.png","alt","mahanagar-logo"],[1,"text-del","my-3"],[1,"popup-bottom","sm-popup","sampleBill"],[1,"text-center"],["src","./assets/images/svg/information.svg","alt","error-icon"],[1,"col-12","mb-4"],["alt","Sample Bill",2,"display","block","margin","0 auto","max-width","100%",3,"src"],[1,"row1","mt-2"],[1,"col-12","text-center"],[1,"ux-button","primary","submit-btn",3,"click"],[3,"click"],[3,"value"],[1,"errormsg"],["alt","",1,"boardlogo",3,"src"],[1,"init",3,"click"],[1,"board-display"],["src","assets/images/svg/BBPS_Logo.svg","alt","",2,"display","none"],[1,"col-12","col-md-4","col-lg-6","col-xl-6","d-none","d-sm-block"],[1,"biller-selected-logo"],["src","assets/images/svg/BBPS_Logo.svg","alt",""],[1,"row1","fetch-bill-info"],[1,"white-box2","mb-3","mt-0","p-0"],[1,"bill-info-card","green-light","m-0","new-bill-card"],[1,"comp-info2"],[1,"grid-info"],[1,"full-info"],[1,"ux-input","col-8","col-sm-11","col-md-8","col-lg-8","col-xl-8","m-0","p-0"],["class","p-0 m-0 h-auto",4,"ngIf"],["type","text","placeholder","Enter Amount","class","p-0 m-0 h-auto",3,"value",4,"ngIf"],[1,"error-message"],[1,"grid-info","d-block"],[1,"my-2"],[1,"widget-box5","mb-3"],[1,"bg-white1","pad-custom","py-2"],[1,"col-md-12","col-12"],["id","accordion1",1,"accordion-container","parent-accordion"],[1,"card4"],["data-toggle","collapse","href","#consumer","aria-expanded","false",1,"card-link","collapsed"],[1,"card-header3"],[1,"panel-title3"],[1,"detail-heading"],["id","consumer","data-parent","#accordion1",1,"collapse"],[1,"white-box2","m-0","p-0","shadow-none"],[1,"info-bottom","pad-custom","swap-div-mob","p-0"],["class","info-details pr-35",4,"ngFor","ngForOf"],[1,"bottom-footer1"],[1,"btn-div","w100"],["type","button",1,"ux-button","primary","sm-mob",3,"click"],[1,"p-0","m-0","h-auto"],["src","assets/images/svg/rupee-g2.svg","alt","rupees-icon"],["type","text","placeholder","Enter Amount",1,"p-0","m-0","h-auto",3,"value"],[1,"info-details","pr-35"],[1,"col-12","col-md-12","d-none","d-sm-block"],[1,"btn-div","hide-m"],[1,"ux-button","secondary","sm-mob",3,"click"]],template:function(e,t){1&e&&(o.ec(0,"div",0),o.ec(1,"div",1),o.ec(2,"div",2),o.ec(3,"div",3),o.ec(4,"div",4),o.ec(5,"div",5),o.ec(6,"div",6),o.ec(7,"div",7),o.ec(8,"ul",8),o.Rc(9,S,4,3,"li",9),o.dc(),o.dc(),o.dc(),o.dc(),o.Zb(10,"div",10),o.ec(11,"div",11),o.ec(12,"div",12),o.ec(13,"div",13),o.ec(14,"div",14),o.ec(15,"div",15),o.ec(16,"div",16),o.ec(17,"div",17),o.ec(18,"h4"),o.Sc(19),o.dc(),o.dc(),o.ec(20,"div",18),o.ec(21,"div",19),o.Zb(22,"img",20),o.dc(),o.dc(),o.dc(),o.ec(23,"div",13),o.ec(24,"div",21),o.ec(25,"div",22),o.ec(26,"div",23),o.ec(27,"ul",24),o.ec(28,"li",25),o.ec(29,"a",26),o.Sc(30,"Pay Bill"),o.dc(),o.dc(),o.ec(31,"li",25),o.ec(32,"a",27),o.Sc(33,"Recent Payments"),o.dc(),o.dc(),o.dc(),o.ec(34,"div",28),o.ec(35,"div",29),o.ec(36,"div",30),o.ec(37,"div",31),o.ec(38,"form",32),o.lc("ngSubmit",(function(){return t.billPaymentSubmit()})),o.ec(39,"div",13),o.ec(40,"div",33),o.ec(41,"div",34),o.ec(42,"div",13),o.ec(43,"div",35),o.ec(44,"div",36),o.ec(45,"label"),o.Sc(46,"Location"),o.dc(),o.ec(47,"select",37),o.lc("change",(function(e){return t.onStateSelect(e.target.value)})),o.ec(48,"option",38),o.Sc(49,"Select Location"),o.dc(),o.Rc(50,f,2,2,"option",39),o.dc(),o.Rc(51,y,2,0,"p",40),o.dc(),o.dc(),o.ec(52,"div",41),o.ec(53,"div",13),o.ec(54,"div",42),o.ec(55,"div",43),o.ec(56,"label"),o.Sc(57,"Billers"),o.dc(),o.ec(58,"div",44),o.ec(59,"span",45),o.lc("click",(function(){return t.onSelectOption()})),o.Rc(60,P,1,1,"img",46),o.Sc(61),o.dc(),o.Zb(62,"input",47),o.ec(63,"ul",48),o.Rc(64,_,5,2,"li",49),o.dc(),o.dc(),o.dc(),o.dc(),o.Rc(65,N,3,0,"div",50),o.dc(),o.dc(),o.dc(),o.ec(66,"div",13),o.ec(67,"div",35),o.ec(68,"div",36),o.ec(69,"label"),o.Sc(70),o.dc(),o.ec(71,"input",51),o.lc("input",(function(){return t.showFetchBill=!1})),o.dc(),o.Rc(72,B,2,1,"span",40),o.Rc(73,k,2,1,"span",40),o.ec(74,"div",5),o.ec(75,"p",52),o.ec(76,"a",53),o.lc("click",(function(){return t.commonMethod.openPopup(".sampleBill")})),o.Sc(77,"View Sample Bill"),o.dc(),o.dc(),o.ec(78,"p",54),o.ec(79,"button",55),o.lc("click",(function(){return t.billPaymentSubmit()})),o.Sc(80,"Fetch Bill"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.Zb(81,"div",56),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.Rc(82,R,45,5,"div",57),o.dc(),o.ec(83,"div",58),o.ec(84,"div",13),o.ec(85,"div",21),o.ec(86,"div",59),o.ec(87,"div",60),o.ec(88,"div",13),o.ec(89,"div",61),o.ec(90,"h3"),o.Sc(91,"Registered Pay"),o.dc(),o.dc(),o.ec(92,"div",62),o.ec(93,"a",63),o.Sc(94,"Register New Biller"),o.dc(),o.ec(95,"a",64),o.Sc(96,"View All"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(97,"div",65),o.ec(98,"ul",66),o.ec(99,"li"),o.ec(100,"div",67),o.ec(101,"div",68),o.ec(102,"div",69),o.ec(103,"div",70),o.Zb(104,"img",71),o.dc(),o.ec(105,"h5"),o.Sc(106,"Adani Electricity Mumbai"),o.dc(),o.ec(107,"h6"),o.ec(108,"span"),o.Sc(109,"20 Oct 2020"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(110,"div",72),o.ec(111,"div",73),o.ec(112,"em",74),o.Sc(113,"Payment Successful"),o.dc(),o.ec(114,"div",75),o.ec(115,"h4",76),o.Sc(116," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(117,"div",77),o.ec(118,"button",78),o.Sc(119,"Repeat"),o.dc(),o.ec(120,"button",79),o.Sc(121,"Details"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(122,"li"),o.ec(123,"div",67),o.ec(124,"div",68),o.ec(125,"div",69),o.ec(126,"div",70),o.Zb(127,"img",80),o.dc(),o.ec(128,"h5"),o.Sc(129,"Aasam Power - RAPDR"),o.dc(),o.ec(130,"h6"),o.ec(131,"span"),o.Sc(132,"20 Oct 2020"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(133,"div",72),o.ec(134,"div",73),o.ec(135,"em",81),o.Sc(136,"Payment Failed"),o.dc(),o.ec(137,"div",75),o.ec(138,"h4",82),o.Sc(139," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(140,"div",77),o.ec(141,"button",78),o.Sc(142,"Repeat"),o.dc(),o.ec(143,"button",79),o.Sc(144,"Details"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(145,"li"),o.ec(146,"div",67),o.ec(147,"div",68),o.ec(148,"div",69),o.ec(149,"div",70),o.Zb(150,"img",71),o.dc(),o.ec(151,"h5"),o.Sc(152,"Adani Electricity Mumbai"),o.dc(),o.ec(153,"h6"),o.ec(154,"span"),o.Sc(155,"20 Oct 2020"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(156,"div",72),o.ec(157,"div",73),o.ec(158,"em",74),o.Sc(159,"Payment Successful"),o.dc(),o.ec(160,"div",75),o.ec(161,"h4",76),o.Sc(162," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(163,"div",77),o.ec(164,"button",78),o.Sc(165,"Repeat"),o.dc(),o.ec(166,"button",79),o.Sc(167,"Details"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.Rc(168,L,6,0,"div",83),o.dc(),o.dc(),o.dc(),o.Zb(169,"div",84),o.ec(170,"div",85),o.ec(171,"div",13),o.ec(172,"div",21),o.ec(173,"div",59),o.ec(174,"div",60),o.ec(175,"div",13),o.ec(176,"div",86),o.ec(177,"h6"),o.Sc(178,"Pending Dues"),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(179,"div",65),o.ec(180,"ul",87),o.ec(181,"li"),o.ec(182,"div",67),o.ec(183,"div",68),o.ec(184,"div",69),o.ec(185,"div",70),o.Zb(186,"img",71),o.dc(),o.ec(187,"h5"),o.Sc(188,"Adani Electricity"),o.dc(),o.ec(189,"h6"),o.Sc(190,"Last Paid "),o.ec(191,"span"),o.Sc(192,"20 Oct 2020"),o.dc(),o.Sc(193," 12:18 "),o.dc(),o.dc(),o.ec(194,"div",88),o.ec(195,"h4",89),o.Sc(196," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(197,"div",72),o.ec(198,"div",73),o.ec(199,"em",81),o.Sc(200,"4 days left"),o.dc(),o.dc(),o.ec(201,"div",77),o.ec(202,"button",78),o.Sc(203,"Pay Now"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(204,"li"),o.ec(205,"div",67),o.ec(206,"div",68),o.ec(207,"div",69),o.ec(208,"div",70),o.Zb(209,"img",90),o.dc(),o.ec(210,"h5"),o.Sc(211,"Mobile Bill"),o.dc(),o.ec(212,"h6"),o.Sc(213,"Last Paid "),o.ec(214,"span"),o.Sc(215,"20 Oct 2020"),o.dc(),o.Sc(216," 12:18 "),o.dc(),o.dc(),o.ec(217,"div",88),o.ec(218,"h4",89),o.Sc(219," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(220,"div",72),o.ec(221,"div",73),o.ec(222,"em",91),o.Sc(223,"14 days left"),o.dc(),o.dc(),o.ec(224,"div",77),o.ec(225,"button",78),o.Sc(226,"Pay Now"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(227,"li"),o.ec(228,"div",67),o.ec(229,"div",68),o.ec(230,"div",69),o.ec(231,"div",70),o.Zb(232,"img",92),o.dc(),o.ec(233,"h5"),o.Sc(234,"Mahanagar Gas"),o.dc(),o.ec(235,"h6"),o.Sc(236,"Last Paid "),o.ec(237,"span"),o.Sc(238,"20 Oct 2020"),o.dc(),o.Sc(239," 12:18"),o.dc(),o.dc(),o.ec(240,"div",88),o.ec(241,"h4",93),o.Sc(242," \u20b9 900.00 "),o.dc(),o.dc(),o.dc(),o.ec(243,"div",72),o.ec(244,"div",73),o.ec(245,"em",91),o.Sc(246,"12 days left"),o.dc(),o.dc(),o.ec(247,"div",77),o.ec(248,"button",78),o.Sc(249,"Pay Now"),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.dc(),o.ec(250,"div",94),o.ec(251,"div",13),o.ec(252,"div",12),o.ec(253,"h4",95),o.Zb(254,"img",96),o.Sc(255," Sample Bill "),o.dc(),o.dc(),o.dc(),o.ec(256,"div",13),o.ec(257,"div",97),o.Zb(258,"img",98),o.dc(),o.dc(),o.ec(259,"div",99),o.ec(260,"div",100),o.ec(261,"button",101),o.lc("click",(function(){return t.commonMethod.closeAllPopup()})),o.Sc(262,"Close"),o.dc(),o.dc(),o.dc(),o.dc()),2&e&&(o.Mb(9),o.uc("ngForOf",t.DataService.breadcrumblist),o.Mb(10),o.Tc(t.DataService.billtype),o.Mb(19),o.uc("formGroup",t.billPaymentForm),o.Mb(5),o.uc("ngClass",o.yc(20,D,1==t.stateList.length&&"National"==t.stateList[0])),o.Mb(7),o.uc("ngForOf",t.stateList),o.Mb(1),o.uc("ngIf",t.billPaymentForm.controls.state.hasError("required")&&(t.billPaymentForm.controls.state.dirty||t.billPaymentForm.controls.state.touched)),o.Mb(1),o.uc("ngClass",o.yc(22,D,0==t.finalBillerList.length)),o.Mb(8),o.uc("ngIf",""!=t.selectedBoard.biller_logo),o.Mb(1),o.Uc(" ",t.selectedBoard.biller_legal_name,""),o.Mb(1),o.uc("value",t.selectedBoard.billerid),o.Mb(2),o.uc("ngForOf",t.finalBillerList),o.Mb(1),o.uc("ngIf",""!=t.boardNameValue),o.Mb(2),o.uc("ngClass",o.yc(24,D,""==t.consumerLabel)),o.Mb(3),o.Tc(t.consumerLabel),o.Mb(1),o.wc("placeholder","Enter ",t.consumerLabel,""),o.Mb(1),o.uc("ngIf",t.billPaymentForm.controls.consumerNumber.hasError("required")&&(t.billPaymentForm.controls.consumerNumber.dirty||t.billPaymentForm.controls.consumerNumber.touched)),o.Mb(1),o.uc("ngIf",t.billPaymentForm.controls.consumerNumber.hasError("pattern")&&(t.billPaymentForm.controls.consumerNumber.dirty||t.billPaymentForm.controls.consumerNumber.touched)),o.Mb(9),o.uc("ngIf",t.showFetchBill),o.Mb(86),o.uc("ngIf",!t.showFetchBill),o.Mb(90),o.vc("src",t.billSampleURL,o.Jc))},directives:[i.s,l.I,l.t,l.k,i.q,l.E,l.s,l.i,l.x,l.H,i.t,l.c],pipes:[p.a,i.F],styles:[""]}),e})()}];let I=(()=>{class e{}return e.\u0275mod=o.Wb({type:e}),e.\u0275inj=o.Vb({factory:function(t){return new(t||e)},imports:[[s.g.forChild(M)],s.g]}),e})(),O=(()=>{class e{}return e.\u0275mod=o.Wb({type:e}),e.\u0275inj=o.Vb({factory:function(t){return new(t||e)},imports:[[i.c,I,a.a,l.C,l.m]]}),e})()}}]);