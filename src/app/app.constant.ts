import { Injectable } from '@angular/core';
declare var device: any;

@Injectable()

export class AppConstants {

  /** public URL Api configuration */



  publicURL = {

  serviceURL: 'https://psbuatappendssl.onlinepsb.co.in/OMNI/rest/', //omni UAT
     //  serviceURL: 'http://172.25.2.137:8080/PNSMiddleware/rest/', // manish
   //  serviceURL: 'http://172.20.3.30:8087/PNSMiddleware/rest/', // Nalini
  //  serviceURL: 'http://172.21.1.145:8080/PNSMiddleware/rest/', // Mahendra
  // serviceURL: 'http://172.21.1.51:8080/PNSMiddleware/rest/', // Mahendra
   // serviceURL: 'https://infrabotsdev.infrasofttech.com/PNSMiddleware/rest/',
   // serviceURL : 'https://psbomnigateway.onlinepsb.co.in/OMNI/rest/', //Omni Prod
   // serviceURL : 'https://psbdev.onlinepsb.co.in/OMNI/rest/', /// OMNI Dev
    // crmURL: 'https://psbuatappendssl.onlinepsb.co.in/psbwebapi/api/LeadWebApi/',// UAT
    crmURL :'https://crm.onlinepsb.co.in/psbwebapi/api/LeadWebApi/', // PROD
   // crmURL: 'https://psbdev.onlinepsb.co.in/psbwebapi/api/LeadWebApi/',// UAT
    billpayUrl:'https://psbuatappendssl.onlinepsb.co.in/bbps/services/request'
   // billpayUrl:'http://172.25.2.137:8080/bbps/services/request'
  };

  nliLandingPageURL = {
    corporateRegistrationURL:'https://psbuatappendssl.onlinepsb.co.in/PSBCORPORATE/#/soleProprietorRegistration',
    corporateLoginURL:'https://psbuatappendssl.onlinepsb.co.in/PSBCORPORATE/#/login',
    aboutUsURL:'https://punjabandsindbank.co.in/content/ccharter',
  }

  apiURL = this.publicURL;
  //"CAiUpawe7eSBv4ZIw5E5lw=="
  /************************************************************* Omni Constants Starts******************************************************************************/
  mobileId = '';
  val_entityId_UMOB = "UMOB";
  val_entityIDMob = 'RMOB';
  val_entityIDDesk = 'RIB';
  val_maxVpaCount = 3;
  // key_MOBILE ="RMOB";
  // key_DESKTOP = "RIB";
  val_android = "android";
  val_ios = "ios";
  val_cbsType = 'flexcube';
  val_cbsTypeTcs = 'TCS';
  // val_cbsType_TCS = 'TCS';
  val_cbsTypeFinacle = 'Finacle';
  val_mobPlatform = 'android';
  // val_mobPlatform = 'iOS';
  val_channelValueIB = 'IB';
  val_channelValueMOB = 'MOB';
  /* UPI stand alone versions start, to be uncommented only for UPI stand-alone builds */
  // val_mobileAppVersion = '1.20.8';
  // val_mobileAppVersion_android = '1.20.8';
  // val_mobileAppVersion_ios = '0.1.33';
  /* UPI stand alone versions end */
  /* Omni stand alone versions start, to be uncommented only for Combined functionality builds from Omni devs */
  val_mobileAppVersion = '2.4.23';
  val_mobileAppVersion_android = '2.4.23'; //prod- 2.3.0 //uat-2.4.19
  val_mobileAppVersion_ios = '0.1.50'; //prod-1.1.0 //uat-0.1.50
  /* Omni stand alone versions end */
  val_clientAppVersion = '1.0.0';
  val_afterLoginPinSet = "AFERLOGINPINSET";
  defaultLanguageCode = 'en';
  defaultTheme = 'Blue';
  deviceID = "1";
  val_assessmentYear = "TDS_ASSESMENT_YEAR";
  val_period = "TDS_PERIOD";
  val_quarter = "QUARTERS";
 storage_isCheckBiometric:any = "false";

 val_Timer = 10;
// deviceID = "1";//"1"
 val_sessionKey = "sessionKey";
  val_statusID = "3";
  val_AppID = "4"
  val_coolingPeriodCheckN = 'N';
  val_coolingPeriodCheckY = 'Y';
  val_latitude = '19.4437422';
  val_longitude = '72.805889';
  val_bankToken = 'bankToken';
  val_telecom = "TELECOM";
  val_billAmount = "billAmount";
  val_DTH = "DTH";
  val_MPIN="MPIN";
  val_TPIN="TPIN";
  val_CardProgram="DEFCL";
  val_DELINK = 'DELINK';
  val_LINK = 'LINK';
  val_HOSTLISTCARD = 'HOSTLISTCARD';
  val_REISSUECARD = 'REISSUECARD';
  val_ADDPAYEE = 'ADDPAYEE';
  val_DELETEPAYEE = 'DELETEPAYEE';
  val_FUNDTRANSFER = 'FUNDTRANSFER';
  val_SCHEDULARTRANSMASTER = 'SCHEDULARTRANSMASTER';
  val_STOPCHEQUE = 'STOPCHEQUE';
  val_CHEQUEBOOKREQUEST = 'CHEQUEBOOKREQUEST';
  val_DTHBILLPAY = 'DTHBILLPAY';
  val_WATERBILLPAY = 'WATERBILLPAY';
  val_GASBILLPAY = 'GASBILLPAY';
  val_MOBILERECHARGE = 'MOBILERECHARGE';
  val_ELECTRICITYBILLPAY = 'ELECTRICITYBILLPAY';
  val_LANDLINEBILLPAY = 'LANDLINEBILLPAY';
  val_TAXBILLPAY = 'TAXBILLPAY';
  val_DONATIONBILLPAY = 'DONATIONBILLPAY';
  val_ADDBILLER = 'ADDBILLER';
  val_POSITIVEPAY = 'POSITIVEPAY';
  val_FREEZEACCOUNT = 'FREEZEACCOUNT';
  val_PROFILEDETAILS = 'PROFILEDETAILS';
  val_DONATIONTRANSFER = 'DONATIONTRANSFER';
  val_PROFILEUPDATE = 'PROFILEUPDATE';
  val_CARDDETAILS = 'CARDDETAILS';
  val_FORGOTMPINUSER = 'FORGOTMPINUSER';
  val_REGISTRATION = 'REGISTRATION';
  val_ACCOUNTOPENING = 'ACCOUNTOPENING';
  val_FORGOTPASSWORD = 'FORGOTPASSWORD';
  val_GETPHYSICALCARD = 'GETPHYSICALCARD';
  val_ADDNOMINEEDATA = 'ADDNOMINEEDATA';
  val_UPDATETRANSATIONLIMIT = 'UPDATETRANSATIONLIMIT';
  val_CHANGEPASSWORD = 'CHANGEPASSWORD';
  val_CHANGEMPIN = 'CHANGEMPIN';
  val_CHANGETPIN = 'CHANGETPIN';
  val_UPDATECARDLIMIT = 'UPDATECARDLIMIT';
  val_ADDSTANDINGINSTRUCTION = 'ADDSTANDINGINSTRUCTION'
  val_MODIFYSTANDINGINSTRUCTIONS = 'MODIFYSTANDINGINSTRUCTIONS'
  val_DELETESTANDINGINSTRUCTION = 'DELETESTANDINGINSTRUCTION'
  val_BILLPAYMENT = 'BILLPAYMENT'
  val_OPENFD = 'OPENFD';
  val_OPENRD = 'OPENRD';


  // val_PinMailer="P";
  //val_CardType="P";
  val_clientNoForSms = "9920313010"; // VMN Number for SMS sending while sim binding. UAT
  // val_clientNoForSms = "8108060160";  // VMN Number for SMS sending while sim binding. production
  // val_clientNoForSms = "8291566356"; // VMN Number for SMS sending while sim binding.
  // val_fingerPrint ="6F 6D AB B1 66 5A 60 9C 14 BE BE 11 3C 31 46 D1 91 63 5C D4 F8 5C B0 19 46 0C C0 AE DA E7 47 D1";
  val_fingerPrint ="24 13 6E 8F 59 19 70 E8 9C 3D ED D3 8E BF C8 AF 54 BE FE BA 94 9C 47 DB BA 12 73 0B 04 51 20 7B"; // UAT
  // val_fingerPrint ="31 8A 61 21 23 F3 86 E1 AD 89 C0 2B 4D 64 D6 AF E0 51 89 F9 82 F9 C4 DD 60 57 0D 70 32 2C 18 1F"; // production
  /** Below are the key names mapping required for the different api's */
  key_entityId = 'entityId';

  key_cbsType = 'cbsType';
  key_channelType = 'channelType';
  key_mobileAppVersion = 'mobileAppVersion';
  key_deviceId = 'deviceId';
  key_dataType = "dataType";
  key_subtype = "subtype";
  key_displayName = "displayName";
  key_data = 'map';
  key_mobPlatform = 'mobPlatform';
  key_clientAppVersion = 'clientAppVer';
  key_mobileNumber: string = "MobileNo";
  key_OTP = 'otpCode';
  key_accountno = 'accountno';
  key_mpin = 'mpin';
  key_MPIN = 'MPIN';
  key_RRN = "RRN";
  key_acntTypeFlag = "acntTypeFlag";
  key_panNumber = "panNumber";
  key_aadharNumber = "aadharNumber";
  key_ServiceType = 'service_Type';
  key_latitude = 'latitude';
  key_longitude = 'longitute';
  key_Status = 'Status';
  key_referenceNumber = 'referenceNumber';
  key_otpRequired = 'otpRequired';
  key_TPIN = 'TPIN';
  key_statusID = "statusId";
  key_DebitCardNo = "DEBITCARDNUMBER";
  key_credentialType = "credentialType";
  key_cardPin = "cardpin";
  key_amount = "amount";
  key_operator = "operator";
  key_sender = "sender";
  key_receiver = "recevier";
  key_senderAccount = "senderAccount";
  key_beneficiaryAccount = "beneficiaryAccount";
  key_beneficiary_account_no = "beneficiary_account_no";
  key_ifsc_code = "ifsc_code";
  key_sender_ifsc_code = "ifscCode"
  key_remarks = "remarks";
  key_swiftCode = "swiftCode";
  key_reqData = "reqData";
  key_accountNumber = "accountNumber";
  key_service_Type = "service_Type";
  key_pendingat = "pendingat";
  key_channelAction = "channelAction";
  Key_ID = "ID";
  Key_SISETID= "SISetId";
  key_transactionLimit = "transactionLimit";
  key_secQuesId1 = "secquestionid1";
  key_secQuesAns1 = "secquestionans1";
  key_secQuesId2 = "secquestionid2";
  key_secQuesAns2 = "secquestionans2";
  key_secQuesId3 = "secquestionid3";
  key_secQuesAns3 = "secquestionans3";
  Key_customerName = "customerName";
  Key_customerId = "customerId";
  key_customerAddress = "cust_address";
  key_numberOfPages = "numberOfPages";
  key_token = "token";
  key_benefName = "benefName";
  key_city = 'city';
  key_benificiaryType = 'beneficiaryType';
  key_benficiaryBankName = 'beneficiary_bank_name';
  key_benificiaryNickName = 'beneficiary_nick_name';
  key_bankCode = 'bankCode';
  key_coolingPeriodCheck = 'coolingPeriodCheck';
  key_EXPIRYDATE = 'EXPIRYDATE';
  key_ExpiryDate = 'ExpiryDate';
  key_AppID = "appId";
  key_StateId = "stateId";
  key_CountryCode = "COUNTRYCODE";
  Key_chequeNo = "chequeNo";
  key_startChequeNo = "startChequeNo";
  key_stopChequeNo = "stopChequeNo";
  key_reasonForStoppingCheques = "reasonForStoppingCheques";
  key_deviceModel = "deviceModel";
  key_isBiometric = "isBiometric";
  key_imei = "imei";
  key_imsi = "imsi";
  key_OSVERSION = "OSVERSION";
  key_OS = "OS";
  key_MACADDRESS = "MACADDRESS";
  key_thirdPartyRefNo = "thirdPartyRefNo";
  key_type = "type";
  key_date = "date";
  key_transType = "TransactionType";
  key_actionType = "actionType";
  key_fromAmount = "fromAmount";
  key_toAmount = "toAmount";
  key_fromdate = "fromdate";
  key_todate = "todate";
  key_period = "period";
  key_category = "category";
  key_requestType = "requestType";
  key_numberToPayBill = "numberToPayBill";
  key_billerName = "billerName";
  key_billerNickName = "billerNickName";
  key_billerType = "billerType";
  key_billerId = "billerId";
  key_SERVICEPROVIDER = "SERVICEPROVIDER";
  key_circles = "circles";
  key_numberToRecharge = "numberToRecharge";
  key_board_type = "boardType";
  key_operatorType = "operatorType";
  key_loanAccountNumber = "loanAccountNumber";
  key_user_acc_no = "user_accNo";
  key_boardName = "boardName";
  key_ServiceTypeOffer = 'servicetype';
  key_emailId = "email_id";
  key_base64Image = "base64Image";
  key_BENQR = "BENQR";
  key_toAccountNumber = "toAccountNumber";
  key_toAccount = "toAccount";
  key_sourceIp = "sourceIp";
  key_swiftNo = "SWIFT_NO";
  key_currency = "currency";
  key_otpCode = "otpCode";
  key_typeOfPin = "typeOfPin";
  key_address = "address";
  key_txnAmt = "txn_amount";
  key_payerName = "payerName";
  key_payerMobile = "payerMobile";
  key_payerAccount = "payerAccount";
  key_payeeAccount = "payeeAccount";
  key_payeeIfsc = "payeeIfsc";
  key_payeeMMID = "payeeMMID";
  key_paymentMode = "paymentMode";
  key_beneficiaryMobileNo = "beneficiaryMobileNo";
  key_limitName = "limitName";
  key_langCode = "langCode";
  key_MMID = "MMID";
  key_maxAmount = "maxAmount";
  key_beneficiary_account_type="beneficiary_account_type";
  key_positivePayData = "positivePayData";
  key_rating = "ratings";
  key_transactionID="TransactionId";
  key_inputParam="inputParam";
  key_beneficiary_id="beneficiary_id";
  key_txn_Type="txn_Type";
  key_TransactionId="TransactionId";
  key_lienInquiryData ="lienInquiryData";
  key_year = "year"
  key_month = "month"
  key_fromAccountNo = "fromAccountNo "
  key_toAccNumber = "oAccNumber "
  key_paymentStartDate = "paymentStartDate"
  key_paymentEndDate = "paymentEndDate "
  key_paymentFrequency = "paymentFrequency"
  key_paymentFreqType = "paymentFreqType"
  key_emiAmount = "emiAmount"
  key_numOfInstallment = "numOfInstallment"
  key_standingInstructionType = "standingInstructionType"
  key_rtgsTransferData = "rtgsTransferData"
  key_subCode ="subCode";
  key_aadharUpdateData = "aadharUpdateData"
  key_panUpdateData = "panUpdateData"
  key_originalChannelRefNo="originalChannelRefNo";
  key_loanInterestCertData="loanInterestCertData";
  key_Email= "emailId"
  key_standingInstructionData = "standingInstructionData";
  key_deleteSIData = "deleteSIData";
  val_Successful = "Successful"
  val_success = 'success';
  val_Failure = "Failure";
  val_Failed = "Failed";
  key_VPA="VPA";
  key_issunaceOfchqbookData = "issunaceOfchqbookData";
  key_changeType="changeType";
  key_typeOfRequest="typeOfRequest"
  key_activityId="activityId"
  key_corporateId="corporateId";
  key_loanCreditsData="loanCreditsData";
  key_debitCardIssuedData="debitCardIssuedData";
  key_channelRefNo = "channelRefNo";
  key_apyRegInqData = "apyRegInqData";
  key_noofdays = "noofdays";
  key_frequency="frequency"
  key_minValue="minValue"
  key_maxValue="maxValue"
  key_LIMITTYPE_G_C="LIMITTYPE_G_C"
  key_SET_LIMIT="SET_LIMIT";
  key_toAccountNo= "toAccountNo";
  key_customerId = "customerId";
  key_nomineeMinor = "nomineeMinor"

  key_productFetchDetailsData = "productFetchDetailsData";
  key_tdAccountOpeningData = "tdAccountOpeningData";
  key_provisionalIntrestcertData="provisionalIntrestcertData"



  // Response Keys

  val_Success = "00"
  val_InvalidOTP = "01"
  val_InvalidCredentials = "02"
  val_MaxAttempts = "03"
  val_InvalidSession = "92"
  val_PROFILE = "PROFILE";
  email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


 // key_ExpiryDate="ExpiryDate";
  //key_MOBILE ="MOBILE";
  key_alg = "alg";
  key_certFactory = "certFactory";
  key_certificateString = "certificateString";
  key_plainValue = "plainValue";
  key_pushNotificationToken = "PUSHNOTIFICATIONTOKEN";
  key_emailOtp = "emailOtp";
  key_linkDelinkData = "linkDelinkData";
  key_accountNo = "accountNo";
  key_txn_amount ="txn_amount" ;
  key_cifNumber = "cifNumber";
  key_mobileOtp = "mobileOtp";
  key_ConfirmPassword="ConfirmPassword";
  key_omni_accountNo="accountNo";
  MobileNo
  key_omniDashData = "omniDashData";
  key_oldPassword="oldPassword"
  key_newPassword="newPassword";
  key_OLDPIN="OLD_PIN";
  key_NEWPIN="NEW_PIN";
  key_Expiry= "Expiry";
  key_typeofPin="typeofPin";
  key_tdsCertificateData = "tdsCertificateData";
  key_configType = "configType";
  key_cheque_Number = "cheque_Number"
  key_existingMobileNumber = "existingMobileNumber";
  key_linkingMobileNumber = "linkingMobileNumber";
  key_debitBranchCode = "debitBranchCode";
  key_creditBranchCode = "creditBranchCode";
  key_checkVersionAuthKey = "checkVersionAuthKey";
  /** UPI Below are the key names mapping required for the different api's */
  // key_verificatioCode = "verificatioCode";
  key_verificationCode = "verificationCode";
  key_mobileDeviceId = "mobileDeviceId";
  key_dateOfBirth = "dateOfBirth";
  key_gender = "gender";
  key_isBIOMETRICEnable = "isBIOMETRICEnable";
  key_prefered_Language = "prefered_Language";
  key_upiRequest = "upiRequest";
  key_methodName = "methodName";
  key_customerID = "customerID";
  key_TransactionType = "TransactionType";
  key_TransactionDate = "TransactionDate";

  key_RequestID="RequestID";
  key_CardProgram="CardProgram";
  key_PinMailer="PinMailer";
  key_CardType="CardType";
  key_BinPrefix="BinPrefix";
  key_CustomerName="CustomerName";
  key_NameOnCard="NameOnCard";
  key_CifCreationDate="CifCreationDate";
  key_AccountType="AccountType";
  key_AccountNo="AccountNo";
  key_accountOpeningDate="accountOpeningDate";
  key_Address1="Address1";
  key_Address2="Address2";
  key_City="City";
  key_State="State";
  key_Pincode="Pincode";
  key_Country="Country";
  key_MothersMaidenName="MothersMaidenName";
  key_DateOfBirth="DateOfBirth";
  key_CountryCode1="CountryCode";
  key_EmailID="EmailID";
  key_BranchCode="BranchCode";
  key_PanNumber="PanNumber";
  key_chequeHistoryData="chequeHistoryData";
  key_CifId="CifId";
  key_City1="City1";
  key_MobileNoOrg="MobileNoOrg";
  key_cardTypeData="cardTypeData";
  key_noOfLeaves = "noOfLeaves";
  key_reasonCode = "reasonCode";
  key_crmReferenceNumber="crmReferenceNumber";
  key_cardStatus="cardStatus";
  key_productType = "productType";
  key_RequestFor="RequestFor";
  key_loanMiniStatementData="loanMiniStatementData";
  key_reqType = 'reqType';

  key_Omni_data = 'data';
  key_stateId = 'stateId'
  key_CityId='CityId'
/** key name for all BBPS Serives */

key_service_name = 'serviceName';
key_biller_category = 'category';
key_biller_location = 'location';
key_billerid = 'billerid';
key_biller_customerid = 'customerid';
key_biller_authenticators = 'authenticators';
key_cust_firstName = 'firstName';
key_cust_lastName = 'lastName';
key_cust_mobile = 'mobile';
key_cust_email = 'email';
key_cust_device = 'device';
Key_recharge_mobNumber ='mobile';
Key_circle_name ="circle_name"
Key_participation_type ="participation_type";



  /****** Below are the key for omnichannel*********/
  key_omni_ownTransfer = "ownTransfer";
  key_omni_neftTransfer = "neftTransfer";
  key_omni_internationalTransfer = "internationalTransfer";
  key_omni_rtgsTransfer = "rtgsTransfer";
  key_omni_mmidTransfer = "mmidTransfer";
  key_omni_addPayee = "omniAddPayee";
  key_omni_chequeBookReq = "omniChequeBookrequest";
  key_omni_bulkCheque = "bulkCheque";
  key_omni_singleCheque = "singleCheque";
  key_omni_DTHBillpay = "DTHBillPay";
  key_omni_WaterBillpay = "WaterBillPay";
  key_omni_mobileBillPay = "mobileBillPay";
  key_omni_ElectricBillPay = "ElectricBillPay";
  key_omni_pageName = "pageName";
  key_omni_value = "value";
  key_omni_methodName = "methodName";

  key_omni_termsCondition = "termsCondition";
  key_omni_authbankToComm = "authbankToComm";
  key_omni_aadharBasedAcc = "aadharBasedAcc";
  key_omni_dbtBenefitNew = "dbtBenefitNew";
  key_omni_dbtBenefitAcc = "dbtBenefitAcc";
  key_omni_dbtBenefitAccReplace = "dbtBenefitAccReplace";
  key_omni_refRecType = "ref_rec_type";
  key_omni_refCode = "rec_code";

  key_omni_FirstName = "FirstName";
  key_omni_LastName = "LastName";
  key_omni_MiddleName = "MiddleName";
  key_omni_emailId = "emailId";
  key_omni_permanentAddrL1 = "permanentAddrL1";
  key_omni_permanentAddrL2 = "permanentAddrL2";
  key_omni_permanentAddrState = "permanentAddrState";
  key_omni_permanentAddrCity = "permanentAddrCity";
  key_omni_permanentAddrPin = "permanentAddrPin";
  key_omni_nationality = "nationality";
  key_omni_maritalStatus = "maritalStatus";
  key_omni_community = "community";
  key_omni_fatherName = "fatherName";
  key_omni_motherName = "motherName";
  key_omni_communicationAddrL1 = "communicationAddrL1";
  key_omni_communicationAddrL2 = "communicationAddrL2";
  key_omni_communicationAddrCity = "communicationAddrCity";
  key_omni_communicationAddrState = "communicationAddrState";
  key_omni_communicationAddrPin = "communicationAddrPin";
  key_omni_occupation = "occupation";
  key_omni_annualIncome = "annualIncome";
  key_omni_nomineeName = "nomineeName";
  key_omni_nomineeAddrL1 = "nomineeAddrL1";
  key_omni_nomineeAddrL2 = "nomineeAddrL2";
  key_omni_nomineeAddrCity = "nomineeAddrCity";
  key_omni_nomineeAddrState = "nomineeAddrState";
  key_omni_nomineeAddrPin = "nomineeAddrPin";
  key_omni_nomineeDOB = "nomineeDOB";
  key_omni_nomineeRelationship = "nomineeRelationship";
  key_omni_guardianAddrL1 = "guardianAddrL1";
  key_omni_guardianAddrL2 = "guardianAddrL2";
  key_omni_guardianAddrCity = "guardianAddrCity";
  key_omni_guardianAddrState = "guardianAddrState";
  key_omni_guardianAddrPin = "guardianAddrPin";
  key_omni_guardian = "guardian";
  key_omni_guardianType = "guardianType";
  key_omni_UPI_ADDRESS = "UPI_ADDRESS";
  key_omni_ACCOUNTTYPE = "ACCOUNTTYPE";
  key_omni_lastDraftPage = "lastDraftPage";
  key_omni_cif = "cif";
  key_omni_amountPaid = "amountPaid";
  key_omni_videoKYCFlag = "videoKYCFlag";
  key_omni_adharAddress = "adharAddress";
  key_omni_maritialStatus = "maritialStatus";
  key_omni_defaultVpayn = "defaultVpayn";
  key_omni_grossIncome = "grossIncome";
  key_omni_cbsResonseStatus = "cbsResonseStatus";
  key_omni_relationshipName = "relationshipName";
  key_omni_confirmationAddharAccountyn = "confirmationAddharAccountyn";
  key_omni_paymentOn = "paymentOn";
  key_omni_aadhaarcard = "aadhaarcard";
  key_omni_panStatusId = "panStatusId";
  key_omni_nomineeUpdated = "nomineeUpdated";
  key_omni_fatcaCompliance = "fatcaCompliance";
  key_omni_paymentStatus = "paymentStatus";
  key_omni_aadharStatusId = "aadharStatusId";
  key_omni_vpaAddress = "vpaAddress";
  key_omni_primaryAccount = "primaryAccount";
  key_omni_communicationAddress = "communicationAddress";
  key_omni_district = "district";
  key_omni_cbsPanAadharStatus = "cbsPanAadharStatus";
  key_omni_PAN = "PAN";
  key_omni_cbsRefNumAccope = "cbsRefNumAccope";
  key_omni_state = "state";
  key_omni_action = "action";
  key_omni_branchState = "branchState";
  key_omni_donNotWantNominee = "donNotWantNominee";
  key_omni_smsEmailPermission = "smsEmailPermission";
  key_omni_bankTearmCondition = "bankTearmCondition";
  key_omni_fatcaDeclaration = "fatcaDeclaration";
  key_omni_nomineeAddSameAsPermanent = "nomineeAddSameAsPermanent";
  key_omni_commAddSameAsPermanent = "commAddSameAsPermanent";
  key_omni_addharLinkDBT1 = "addharLinkDBT1";
  key_omni_addharLinkDBT2 = "addharLinkDBT2";
  key_omni_branchPinCode = "branchPinCode";
  key_omni_branchSearchType = "branchSearchType";
  key_omni_accountType = "accountType";
  key_omni_PanNumber = "PanNumber";
  key_omni_AADHAARNUMBER = "AADHAARNUMBER";
  key_omni15ghData = "omni15ghData";
  key_IBLIMIT="IBLIMIT";
  key_MOBILELIMIT="MOBILELIMIT";
  key_WATCHLIMIT="WATCHLIMIT"
  key_UPILIMIT="UPILIMIT";
  key_jbyAccountData = "jbyAccountData";
  key_jbyPremiumAmountData = "jbyPremiumAmountData";
  key_sbyAccountInquiryData = "sbyAccountInquiryData";
  key_channel = "channel";
  key_senderName = "senderName";
  key_receiverName = "receiverName";
  key_tdClosureValidationdata = "tdClosureValidationdata";
  key_rdClosureValidationData = "rdClosureValidationData";

//  key_omni_customerID="customerID";
//   key_omni_custAccountData="custAccountData";
  //key_omni_accountNo = "accountNo";
  key_omni_customerID = "customerID";
  key_omni_custAccountData = "custAccountData";
  key_omni_cbsMiniStatement = "cbsMiniStatement";
  key_donationId = "donationId";
  key_cvv = "cvv";
  key_inquiryNomineeData ="inquiryNomineeData"
  key_addNomineeData = "addNomineeData"
  key_standingInstructionDataInquiry = "standingInstructionData"
  // Key for Cheque
  val_inputParam:any;

  /**Below are the static messages */
  SERVICE_UNAVAILABLE_MSG = "Service unavailable. Please try after sometime.";
  SERVICE_TIMEOUT_MSG = "Unable to connect to server. Please try after sometime..";
  SERVICE_SERVER_ERROR_MSG = "Internal Server Error";
  SERVICE_UNAUTHORIZED_MSG = "Not Authorized";
  SERVICE_BAD_REQ_MSG = "Bad Request";
  SERVICE_NOT_FOUND_MSG = "Not Found";
  SERVICE_METHOD_NOT_ALLOWED_MSG = "Method not allowed";
  SERVICE_METHOD_UNKNOWN_ERR_MSG = "Unknown Error. Please try after sometime..";

  /** Below are the constants for http status success and error code */
  Status = {
    SUCCESS: 200,
    ERR_CODE_BAD_REQUEST: 401,
    ERR_CODE_UNAUTHORIZED: 401,
    ERR_CODE_FORBIDDEN: 403,
    ERR_CODE_NOT_FOUND: 404,
    ERR_CODE_METHOD_NOT_ALLOWED: 405,
    ERR_CODE_SERVER_ERROR: 500,
    ERR_CODE_SERVER_UNAVAILABLE: 503,
    ERR_CODE_TIMEOUT: 408,
    ERR_CODE_UNKNOWN: 0,
  }
/** Services name for all CRM Serives */
serviceName_CALLBACK = 'CallBackReq'
serviceName_INSTACCLEAD = 'InstantAcctLead'
serviceName_NRIACCTLEAD = 'NRIAcctLead'

//CRM TOKEN
crm_TOKEN = "PSB2346543"




  /** Services name all constants */
  serviceName_CHECKFORNEWVERSIONONSTORE = 'Version/CHECKFORNEWVERSIONONSTORE';
  serviceName_LANGUAGEJSON = 'GENERICINFO/GETLANGUAGEDATA';//DATA
  serviceName_Login = 'LOGIN/OMNILOGIN';
  serviceName_VALIDATEOTP = "OTP/VALIDATEOTP";
  serviceName_RESENDOTP = "OTP/RESENDOTP";
  serviceName_BALANCEENQUIRY = "Balance/BALANCEENQUIRY";
  serviceName_TRANSACTIONHISTORY = "ACCTINFO/TRANSACTIONHISTORY";
  serviceName_CUSTOMIZEMENU = "MENU/USERCUSTOMIZEMENU";
  serviceName_GETCARDSLIST = "CARDINFO/GETCARDSLIST"
  serviceName_FREQUENTTRANS = "TRANSACTION/FREQUENTTRANS";
  serviceName_MOBILENOCHECK = 'PRELOGIN/MOBILENOCHECK';
  serviceName_SETUPADATEPIN = 'Auth/SETUPDATEPIN';
  serviceName_UPDATELOGINDETAILS = "Auth/UPDATELOGINDETAILS";
  serviceName_UPDATEREGISTRATIONSTATUS = "PRELOGIN/UPDATEREGISTRATIONSTATUS";
  serviceName_VERIFYPIN = "Auth/VERIFYPIN";
  serviceName_VERFYCREDNTIALS = "PRELOGIN/VERFYCREDNTIALS";
  serviceName_VALIDATEBANKTOKEN = "PRELOGIN/VALIDATEBANKTOKEN";
  serviceName_BENIFICIARYLIST = "TRANSACTION/BENEFICIARYLIST";
  serviceName_RTGSFUNDTRANSFER = "TRANSACTION/RTGSFUNDTRANSFER";
  serviceName_NEFTFUNDTRANSFER = "TRANSACTION/NEFTFUNDTRANSFER";
  serviceName_RESENDOTPSESSION = "OTP/RESENDOTPSESSION";
  serviceName_RESENDOTPSESSIONFORCARD = "OTP/RESENDOTPSESSIONFORCARD";
  serviceName_VALIDATEOTPSESSION = "OTP/VALIDATEOTPSESSION";
  serviceName_OWNFUNDTRANSFER = "TRANSACTION/INTERNALTRANSFER";
  serviceName_IFSCSEARCH = "CUSTREQINFO/IFSCSEARCH";
  serviceName_DELETEBENEFICIARY = "TRANSACTION/DELETEBENEFICIARY";
  serviceName_DELETESCHEDULAR = "STANDINGINSTRUCTION/DELETESCHEDULARTDETAILS";
  serviceName_MODIFYSCHEDULAR = "STANDINGINSTRUCTION/MODIFYSCHEDULARTDETAILS";
  serviceName_UPDATECUSTOMERTHEME = "CUSTOTHERINFO/UPDATECUSTOMERTHEME";
  serviceName_ADDBENEFICIARY = "TRANSACTION/ADDBENEFICIARY";
  serviceName_GETINFOBYIFSC = "GENERICINFO/GETINFOBYIFSC";
  serviceName_GETINFOBYSWIFT = "GENERICINFO/GETINFOBYSWIFT";
  serviceName_ADDOMNICHANNELREQ = "TRANSACTION/ADDOMNICHANNELREQ";
  serviceName_GETOMNICHANNELREQ = "TRANSACTION/GETOMNICHANNELREQ";
  serviceName_GETSECQUESTIONLIST = "LOGINENQUIRY/GETSECQUESTIONLIST";
  serviceName_INSERTSECURITYANSWER = "PRELOGIN/INSERTSECURITYANSWER";
  serviceName_SETUPDATEPIN = "Auth/SETUPDATEPIN";
  serviceName_UPDATECUSTDEATILS = "PRELOGIN/UPDATECUSTDEATILS";
  serviceName_VALIDATETOKEN = "PRELOGIN/VALIDATETOKEN";
  serviceName_LOGINVALIDATETOKEN = "LOGINENQUIRY/VALIDATETOKEN";
  serviceName_CORPVALIDATETOKEN = "PRELOGIN/VALIDATETOKEN";
  serviceName_ISSUECHEQUEBOOK = "CUSTREQINFO/ISSUECHEQUEBOOK";
  serviceName_GETSTATES = "PRELOGIN/GETSTATES";
  serviceName_GETCONTACTUSLIST = "PRELOGIN/GETCONTACTUSLIST";
  serviceName_GETCITIES = "PRELOGIN/GETCITIES";
  serviceName_ACTVITYSETTINGS = "GENERICINFO/ACTVITYSETTINGS";
  serviceName_STOPBULKCHEQUEPAYMENT = "CUSTREQINFO/STOPBULKCHEQUEPAYMENT";
  serviceName_STOPCHEQUEPAYMENT = "CUSTREQINFO/STOPCHEQUEPAYMENT";
  serviceName_CHEQUESTATUSINQUIRY = "CUSTREQINFO/CHEQUESTATUSINQUIRY";
  serviceName_BULKCHEQUEINQUIRY= "CUSTREQINFO/BULKCHEQUEINQUIRY";
  serviceName_SINGLECHEQUEINQUIRY= "CUSTREQINFO/SINGLECHEQUEINQUIRY";
  serviceName_BULKCHEQUESTOPPAYMENT = "CUSTREQINFO/BULKCHEQUESTOPPAYMENT";
  serviceName_GETBRANCHESFORCITIES = "PRELOGIN/GETBRANCHESFORCITIES";
  serviceName_GETSTATEFORLOCATIONS = "PRELOGIN/GETSTATEFORLOCATIONS";
  serviceName_GETCITIESFORLOCATIONS = "PRELOGIN/GETCITIESFORLOCATIONS";
  serviceName_GETLOCATIONBYSTATECITYBRANCH = "PRELOGIN/GETLOCATIONBYSTATECITYBRANCH";
  serviceName_GETLOCATIONBYBRANCHCODE = "PRELOGIN/GETLOCATIONBYBRANCHCODE";
  serviceName_LOCATEUS = "PRELOGIN/LOCATEUS";
  serviceName_LOGOUT = "Auth/LOGOUT";
  serviceName_SESSIONEXTEND = "MENU/SESSIONEXTEND";
  serviceName_BILLERINFORMATION = "BillerInformation/BILLERINFORMATION";
  serviceName_PAYMOBILEBILL = "BillerInformation/PAYUTILITYMOBILEPOSTPAIDBILL";
  serviceName_DELETEBILLER = "BillerInformation/DELETEBILLER";
  serviceName_GETLISTOFPASTPAYMENTS = "BillerInformation/GETLISTOFPASTPAYMENTS";
  serviceName_ADDBILLER = "BillerInformation/ADDBILLER";
  serviceName_GETOPERATORLIST = "BillerInformation/GETOPERATORLIST";
  serviceName_GETRECHARGEPLANS = "BillerInformation/GETRECHARGEPLANS";
  serviceName_WATERBILLPAYMENT = "TRANSACTION/WATERBILLPAYMENT";
  serviceName_RECHARGEMOBILEDTHDATACARD = "BillerInformation/RECHARGEMOBILEDTHDATACARD";
  serviceName_GETSELECTPERIOD = "ACCTINFO/GETSELECTPERIOD";
  serviceName_GETRECOMMENDEDOFFERS = "Loan/GETRECOMMENDEDOFFERS";
  serviceName_GETREPAYMENTSTATUS = "Loan/GETREPAYMENTSTATUS";
  serviceName_CUSTPROFILEUPDATE = "LOGINENQUIRY/CUSTPROFILEUPDATE";
  serviceName_CUSTPROFILEIMGUPDATE = "LOGINENQUIRY/CUSTPROFILEIMGUPDATE";
  serviceName_CUSTPROFILEDETAILS = "LOGINENQUIRY/CUSTPROFILEDETAILS";
  serviceName_GETHOLIDAYLIST = "LOGINENQUIRY/GETHOLIDAYLIST";
  serviceName_GETOFFERS = "CONFIG/GETOFFERS";
  serviceName_GENERATEQRIMAGE = "QR/GENERATEQRIMAGE";
  serviceName_CREATEQRCODE = "QR/CREATEQRCODE";
  serviceName_QRPAYMENT = "QR/MAKEPAYMENTFROMQRCODE";
  serviceName_INTERNATIONALTRANSFER = "TRANSACTION/INTERNATIONALTRANSFER";
  serviceName_RECOMMENDEDCARDS = "CONFIG/RECOMMENDEDCARDS";
  serviceName_INVESTMENTPRODUCT = "CONFIG/GETINVESTMENTPRODUCTS";
  serviceName_MMID = "IMPSService/PAYERTOPAYEEUSINGMMIDANDMOBILE";
  serviceName_GETPAYMENTMETHOD = "TRANSACTION/GETPAYMENTMETHOD";
  serviceName_OFFERONCARDS = "CARDINFO/OFFERONCARDS";
  serviceName_SCHEDULEPAYMENT = "TRANSACTION/SCHEDULEPAYMENT";
  serviceName_GETSCHEDULEPAYMENTPARAMETER = "TRANSACTION/GETSCHEDULEPAYMENTPARAMETER";
  serviceName_GETREFCODE = "BRANCHDATAMASTER/GETREFCODE";
  serviceName_GETCODE = "BRANCHDATAMASTER/GETCODE";
  serviceName_PANVALIDATION = "REGISTRATION/PANVALIDATION";
  serivceName_AAADHARCVALIDATION = "REGISTRATION/AAADHARCVALIDATION";
  serivceName_SAVEACCOUNTOPENINGDATA = "ACCOUNTS/SAVEACCOUNTOPENINGDATA";
  serivceName_GETLOCATIONSONPINCODE = "PRELOGIN/GETLOCATIONSONPINCODE";
  serviceName_VALIDATELEADSOTP = "OTP/VALIDATELEADSOTP";
  serviceName_RESENDLEADSOTP ="OTP/RESENDLEADSOTP";
  serviceName_VALIDATECHANNELOTPSESSION = "OTP/VALIDATECHANNELOTPSESSION";
  serviceName_RESENDCHANNELOTPSESSION ="OTP/RESENDCHANNELOTPSESSION";
  serviceName_ADDUSERACCOUNTLEADSDETAILS = "ACCOUNTS/ADDUSERACCOUNTLEADSDETAILS";
  serviceName_BALANCEINQUIRY = "TRANSACTION/BALANCEINQUIRY";
  serviceName_LINKDELINKACCOUNTS = "ACCTINFO/LINKDELINKACCOUNTS"
  serviceName_LINKDELINKFETCHACCOUNT  = "ACCTINFO/LINKDELINKFETCHACCOUNT";
  serviceName_GETLOCATIONS = "PRELOGIN/GETLOCATIONS";
  serviceName_GETACTIVITYSETTINGDATA = "PRELOGIN/GETACTIVITYSETTINGDATA";
  serviceName_FORGOTUSERNAME = "PRELOGIN/FORGOTUSERNAME";
  serviceName_FORGOTPASSWORD="PRELOGIN/FORGOTPASSWORD";
  serviceName_VALIDATECHANNELSOTP="OTP/VALIDATECHANNELSOTP";
  // serviceName_CUSTACCOUNTVALIDATION="";
  // serviceName_FORGOTUSERNAME = "PRELOGIN/FORGOTUSERNAME";
  serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER ="IMPSService/PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER";
  serviceName_CUSTACCOUNTVALIDATION = "ACCTINFO/CUSTACCOUNTVALIDATION";
  serviceName_CIFACCOUNTMOBILECHECK = "PRELOGIN/CIFACCOUNTMOBILECHECK";
  serviceName_GETMASKFORMATTEDDETAILS="PRELOGIN/GETMASKFORMATTEDDETAILS";
  serviceName_VALIDATEUSERNAMEPWD="PRELOGIN/VALIDATEUSERNAMEPWD";
  serviceName_VALIDATECHANNELSPRELOGINOTP = "OTP/VALIDATECHANNELSPRELOGINOTP";
  serviceName_FREQUENTTRANSACTIONS = "ACCTINFO/FREQUENTTRANSACTIONS";
  serviceName_OMNIFAQ = "PRELOGIN/FAQ";
  serviceName_POSITIVEPAY = "TRANSACTION/POSITIVEPAY"
  serviceName_INTERNETBANKPASSCHANGE="CUSTREQINFO/INTERNETBANKPASSCHANGE";
  serviceName_CHANGEPINS="LOGIN/CHANGEPINS";
  serviceName_UPDATEBENEFICIARY = "TRANSACTION/UPDATEBENEFICIARY";
  serviceName_VERIFYUPIPAYMENTADDRESS = "UPIService/VerifyPaymentAddress";
  serviceName_FETCHUPIACCOUNTLIST = "UPIService/FetchDistinctAccountList";
  serviceName_ADDUPIPAYMENTADDRESS = "UPIService/AddPaymentAddress";
  serviceName_OMNIDASHBOARD ="CONFIG/OMNIDASHBOARD";
  serviceName_FreezeAccount = "CONFIG/FREEZACCOUNT";
  serviceName_FREEZACCOUNTCIF = "CONFIG/FREEZACCOUNTCIF";
  serviceName_Feedback = "CONFIG/LEAVEFEEDBACK";
  serviceName_ISSUETDSCERTIFICATE = "TAXINFO/ISSUETDSCERTIFICATE";
  serviceName_CERTIFICATECONFIGS = "CERTIFICATES/CERTIFICATECONFIGS";
  serviceName_MINISTATEMENT = "TRANSACTION/MINISTATEMENT";
  serviceName_ACCOUNTINQUIRY = "CONFIG/ACCOUNTINQUIRY";
  serviceName_GETCARDTYPELIST="CARDINFO/GETCARDTYPELIST";
  serviceName_DONATIONLIST = "LOGINENQUIRY/DONATIONLIST";
  serviceName_VerifyPaymentAddress = "UPIService/VerifyPaymentAddress";
  serviceNmae_CHEQUESTOPPAYMENT = "CUSTREQINFO/CHEQUESTOPPAYMENT";
  serviceName_LIENACCOUNTENQUIRY = "Loan/LIENACCOUNTENQUIRY";
  serviceName_DETAILEDSTATEMENT = "CUSTREQINFO/DETAILEDSTATEMENT";
  serviceNmae_ADDFAVORITETRANSACTIONS = "TRANSACTION/ADDFAVORITETRANSACTIONS";
  serviceNmae_GETFAVORITETRANSACTIONS = "TRANSACTION/GETFAVORITETRANSACTIONS"
  serviceName_NOTIFICATIONS="Notification/NOTIFICATIONS";
  serviceName_TRANSFERTRANSACTION="TRANSACTION/TRANSFERTRANSACTION";
  serviceName_DEPOSITACCOUNTINQUIRY="DEPOSITEINFO/DEPOSITACCOUNTINQUIRY";
  serviceName_PANUPDATE="REGISTRATION/PANUPDATE";
  serviceName_AADHARUPDATE="REGISTRATION/AADHARUPDATE";
  serviceName_GETIMPSSUCCESSTRANSACTION="IMPSService/GETIMPSSUCCESSTRANSACTION";
  serviceName_GETIMPSDEEMEDTRANSACTION="IMPSService/GETIMPSDEEMEDTRANSACTION";
  serviceName_NAMEINQUIRYACCOUNTIFSC = "IMPSService/NAMEINQUIRYACCOUNTIFSC";
  serviceName_NAMEINQUIRYMMID = "IMPSService/NAMEINQUIRYMMID";
  serviceName_TRANSACTIONSTATUS="IMPSService/TRANSACTIONSTATUS";
  serviceName_LOANINTERESTCERTIFICATE="Loan/LOANINTERESTCERTIFICATE";
  serviceName_EMAILREGISTRATIONCUSTOMER ="REGISTRATION/EMAILREGISTRATIONCUSTOMER"
  serviceName_ISSUEBALANCECERTIFICATE = "CERTIFICATES/ISSUEBALANCECERTIFICATE";
  serviceName_CUSTPROFILEUPDATEKEY = "CUSTPROFILEUPDATE";
  serviceNmae_DELETEFAVORITETRANSACTIONS = "TRANSACTION/DELETEFAVORITETRANSACTIONS";
  serviceName_INWARDCHEQUEINQUIRY = "CUSTREQINFO/CHEQUEINWARTINQUIRY";
  serviceName_ISSUEDEBITCARD="CARDINFO/ISSUEDEBITCARD";
  serviceName_DEBITCARDISSUEFORACCOPEN="CARDINFO/DEBITCARDISSUEFORACCOPEN";
  serviceName_ISSUEDEBITCARDFORACCOPEN="CARDINFO/ISSUEDEBITCARDFORACCOPEN";
  serviceName_CHEQUEHISTORYDETAILS="CUSTREQINFO/CHEQUEHISTORYDETAILS";
  serviceName_CHECKOMNIUSERNAME = "CUSTOTHERINFO/CHECKUSERNAME";
  serviceName_ADDSTANDINGINSTRUCTION = "ACCTINFO/ADDSTANDINGINSTRUCTION";
  serviceName_MODIFYSTANDINGINSTRUCTIONS = "ACCTINFO/MODIFYSTANDINGINSTRUCTIONS";
  serviceName_INQUIRYSTANDINGINSTRUCTION = "ACCTINFO/INQUIRYSTANDINGINSTRUCTION";
  serviceName_DEBITCARDCVV = 'CARDINFO/DEBITCARDCVV';
  serviceName_DOMINTLIMIT = 'CARDINFO/SETDEBITCARDLIMIT';
  serviceName_GETBRANCHLISTBYBRANCHBANK = 'IMPSService/GETBRANCHLISTBYBRANCHBANK';
  serviceName_LOANACCOUNTINQUIRY = "Loan/LOANACCOUNTINQUIRY";
  serviceName_LOANDEMANDDETAILS = "Loan/LOANDEMANDDETAILS";
  serviceName_LOANREPAYMENTSCHEDULE = "Loan/LOANREPAYMENTSCHEDULE";
  serviceName_AUTOLINKACCOUNTS = 'ACCTINFO/AUTOLINKACCOUNTS';
  serviceName_GETIFSCCODES ='IMPSService/GETIFSCCODES';
  serviceName_GETIMPSMASTERBYIFSC = 'IMPSService/GETIMPSMASTERBYIFSC';
  serviceName_DASHBOARDHEADER = 'CONFIG/DASHBOARDHEADER';
  serviceName_UIDAIOTPGENERATE = 'REGISTRATION/UIDAIOTPGENERATE';
  serviceName_GetAccountList =  'UPIService/GetAccountList';
  serviceName_BLOCKCARD="CARDINFO/BLOCKCARD";
  serviceName_CARDDETAILSBYACCOUNTNO="CARDINFO/CARDDETAILSBYACCOUNTNO";
  serviceName_PRODUCTLIST  = 'ServiceReq/PRODUCTLIST';
  serviceName_UIDAIKYCDETAILS = "REGISTRATION/UIDAIKYCDETAILS";
  serviceName_REISSUEDEBITCARD ="CARDINFO/REISSUEDEBITCARD";
  serviceName_GETADDRESSOFCHQBOOK= "CUSTREQINFO/GETADDRESSOFCHQBOOK";
  serviceName_ADDLIMITMASTERDETAILS= "LimitMaster/ADDLIMITMASTERDETAILS";
  serviceName_LOANMINISTATEMENT = "Loan/LOANMINISTATEMENT";
  serviceName_GetPaymentAddressListDetails = "UPIService/GetPaymentAddressListDetails";
  serviceName_LienEnquiry = "Loan/LIENINQUIRYDETAILS";
  serviceName_AddAccountToVpa ="UPIService/AddAccountToVpa";
  serviceName_SCHEDULARTRANSMASTER = "STANDINGINSTRUCTION/SCHEDULARTRANSMASTER"
  serviceName_InquiryNomineeValidation = "CONFIG/INQUIRYNOMINEEVALIDATION";
  serviceName_ADDNOMINEEDATA = "CUSTREQINFO/ADDNOMINEEDATA" ;
  serviceName_BLOCKCARDANDREISSUE = "CARDINFO/BLOCKCARDANDREISSUE";
  serviceName_UPDATETOKENFORCUSTOMER = "CONFIG/UPDATETOKENFORCUSTOMER";
  // serviceName_ADDNOMINEEDATA = "CARDINFO/CARDDETAILSBYCARDNO";
  // serviceName_ADDNOMINEEDATA = "CARDINFO/DEBITCARDCVV";
  serviceName_CARDSERVICEONOFF = "CARDINFO/CARDSERVICEONOFF";
  serviceName_CHANGECARDSTATE = "CARDINFO/CHANGECARDSTATE";
  // serviceName_ADDNOMINEEDATA = "CARDINFO/ISSUEDEBITCARD";
  serviceName_SCHEDULARTLIST="STANDINGINSTRUCTION/SCHEDULARTLIST";
  serviceName_SCHEDULARTLISTDETAILS="STANDINGINSTRUCTION/SCHEDULARTLISTDETAILS";
   serviceName_SCHEDULARCOMPLETEDLIST="STANDINGINSTRUCTION/SCHEDULETMONTHLYLIST";
   serviceName_APYDetails = 'TRANSACTION/APYENROLLMENTTRANSACTION';
   service_CalculatePremium = 'CONFIG/APYACCOUNTDETAILS';
  // FD RD
  serviceName_TDACCOUNTOPENING = "ACCOUNTS/TDACCOUNTOPENING";
  serviceName_RDCLOSUREVALIDATION = "DEPOSITEINFO/RDCLOSUREVALIDATION";
  serviceName_TDCLOSUREVALIDATION = "DEPOSITEINFO/TDCLOSUREVALIDATION";
  serviceName_JOINTACCOUNTHOLDERDETAILS ="ACCTINFO/JOINTACCOUNTHOLDERDETAILS";
  serviceName_ACCOUNTNAME = "ACCOUNTS/ACCOUNTNAME";
  serviceName_OUTSIDEACCOUNTNAME = "IMPSService/NAMEINQUIRYACCOUNTIFSC";
  serviceName_IMPSACCOUNTNAME = "IMPSService/NAMEINQUIRYMMID";
  serviceName_VALIDATELEADSOTPSESSION = "OTP/VALIDATELEADSOTPSESSION";
  serviceName_RESENDLEADSOTPSESSION = "OTP/RESENDLEADSOTPSESSION";
  serviceName_PRODUCTFETCHDETAILS = "ACCOUNTS/PRODUCTFETCHDETAILS";
  serviceName_SUBMITFORM15G15H = "TAXINFO/SUBMITFORM15G15H";
  serviceName_JBYACCOUNTDETAILS = "CONFIG/JBYACCOUNTDETAILS";
  serviceName_LOANCREDITS = "Loan/LOANCREDITS";
  serviceName_ADDLIMITS="LimitMaster/ADDLIMITS";
  serviceName_PKIENROLLMENT = 'EMURDA/PKIENROLLMENT';
  serviceName_DEBITCARDISSUE = "CARDINFO/DEBITCARDISSUE";
  serviceName_DEBITCARDMODIFY = "CARDINFO/DEBITCARDMODIFY";
  serviceName_DEBITCARDREISSUE = "CARDINFO/DEBITCARDREISSUE";
  serviceName_JBYPREMIUMACCOUNT = "CONFIG/JBYPREMIUMACCOUNT";
  serviceName_JBYENROLLMENTTRANSACTION = "TRANSACTION/JBYENROLLMENTTRANSACTION";
  serviceName_GENERATESIGNATURE = "Efiling/GENERATESIGNATURE";
  serviceName_APYREGINQUIRY = "TRANSACTION/APYREGINQUIRY";
  serviceName_SBYENROLLMENTDETAILS = "CONFIG/SBYENROLLMENTDETAILS";
  serviceName_MOBILELIST = "ACCOUNTS/MOBILELIST";
  serviceName_SBYACCOUNTINQUIRY = "CONFIG/SBYACCOUNTINQUIRY";
  serviceName_UPDATEBENEFICIARYTRANSACTIONLIMIT = "TRANSACTION/UPDATEBENEFICIARYTRANSACTIONLIMIT";
  serviceName_LAIRACCOUNTINQUIRY="Loan/LAIRACCOUNTINQUIRY";
  serviceName_GETFDRDMATURITYRATES = "CBSDBDATAINOMNI/GETFDRDMATURITYRATES";
  serviceName_STANDINGINSTRUCTIONCHECKDETAILS = "STANDINGINSTRUCTION/STANDINGINSTRUCTIONCHECKDETAILS";
  serviceName_VALIDATEDEBITCARD = 'CARDINFO/VALIDATEDEBITCARD';
  serviceName_DEBITCARDPINCHANGE = 'CARDINFO/DEBITCARDPINCHANGE';
  serviceName_CASHCREDITACCOUNTINQUIRY = "ACCTINFO/CASHCREDITACCOUNTINQUIRY";
  serviceName_GENERATEMMID = "IMPSService/GENERATEMMID";
  serviceName_CANCLEMMID = "IMPSService/CANCLEMMID";
  serviceName_VERIFYBANKTOKEN = "PRELOGIN/VERFYCYBANKTOKEN";
  serviceName_PROVISIONALINTERESTCERT = "CERTIFICATES/PROVISIONALINTERESTCERT"
  serviceName_INTERESTCERTFORDEPOSITEDETAILS = "Loan/INTERESTCERTFORDEPOSITEDETAILS";
  serviceName_INTERESTCERTFORDEPOSITANDSAVING = "CERTIFICATES/INTERESTCERTFORDEPOSITANDSAVING";
  serviceName_RESENDUSERACCOUNTLEADSOTP = "OTP/RESENDUSERACCOUNTLEADSOTP"
  serviceName_VALIDATEUSERACCOUNTLEADSOTP = "OTP/VALIDATEUSERACCOUNTLEADSOTP"

  serviceName_FUTURESTANDINGINSTRUCTIONINQUIRY = "STANDINGINSTRUCTION/FUTURESTANDINGINSTRUCTIONINQUIRY"
  serviceName_DELETESTANDINGINSTRUCTION = "ACCTINFO/DELETESTANDINGINSTRUCTION"
  serviceName_NOTIFICATIONSTATUSUPDATE = "Notification/NOTIFICATIONSTATUSUPDATE"


////////////////////////////////BBPS SERVICES////////////////////////////////////
serviceName_BBPSSERVICES = "BBPSDetails/GETBBPSDATA"
serviceName_RetrieveBillService ="RetrieveBillsListService"
serviceName_RetrieveOneViewService ="RetrieveOneViewService"
serviceName_GetBillersByIdsService ="GetBillersByIdsService"
serviceName_GetBillerListService ="GetBillerListService"
serviceName_ValidatePaymentService ="ValidatePaymentService"
serviceName_GetBillerLocationService ="GetBillerLocationService"
serviceName_RetrieveOperatorDetails ="RetrieveOperatorDetails"
serviceName_RetrieveRechargePlans ="RetrieveRechargePlans"
serviceName_CreateBillerAccountWithoutAutopayService = "CreateBillerAccountWithoutAutopayService"
serviceName_GetComplaintType = "GetComplaintType"
serviceName_GetParticipationType = "GetParticipationType"
serviceName_GetCategories= "GetCategories"
serviceName_GetComplaintReasons = "GetComplaintReasons"
serviceName_RetrieveRecentTransactions ="RetrieveRecentTransactions"
serviceName_SearchBillerListService ="SearchBillerListService"




  /* UPI Services name constants */
  upiserviceName_CHECKSIMBINDINGSTATUS = "SIM/CHECKSIMBINDINGSTATUS";
  upiserviceName_UPIREG = "UPI/UPIREG";
  upiserviceName_UPILOGIN = "UPI/UPILOGIN";
  upiserviceName_PROCESSUPISERVICE = "UPI/PROCESSUPISERVICE";
  upiserviceName_PROCESSUPISERVICESESSION = "UPI/PROCESSUPISERVICESESSION";
  upiserviceName_GETPAYMENTADDRESS = "GetPaymentAddress";
  upiserviceName_GETPAYMENTADDRESSLIST = "GetPaymentAddressList";
  upiserviceName_VERIFYPAYMENTADDRESS = "VerifyPaymentAddress";
  upiserviceName_GETACCOUNTPROVIDERLIST = "GetAccountProviderList";
  upiserviceName_GETACCOUNTLIST = "GetAccountList";
  upiserviceName_ADDPAYMENTADDRESS = "AddPaymentAddress";
  upiserviceName_GETPAYMENTADDRESSLISTDETAILS = "GetPaymentAddressListDetails";
  upiserviceName_VALIDATEADDRESS = "ValidateAddress";
  upiserviceName_FUNDSTRANSFER = "FundsTransfer";
  upiserviceName_GETFAVOURITES = "GetFavourites";
  upiserviceName_GETBENIFICIARYLIST = "GetBeneficiaryList";
  upiserviceName_ADDFAVOURITES = "AddFavourites";
  upiserviceName_GETDEFAULTVPA = "GetDefaultVpa";
  upiserviceName_REGMOBILE = "RegMobile";
  upiserviceName_REQUESTOTP = "RequestOTP";
  upiserviceName_GETBANKDETAILLIST = "GetBankDetailList";
  upiserviceName_ADDACCOUNTTOVPA = "AddAccountToVPA";
  upiserviceName_CHANGECREDENTIALS = "ChangeCredentials";
  upiserviceName_BALANCEENQUIRY = "BalanceEnquiry";
  upiserviceName_GETFORGOTMPINDEFAULTACCOUNT = "GetForgotMpinDefaultAccount";
  upiserviceName_VALIDATEFORGOTMPINDETAILS = "ValidateForgotMPINDetails";
  upiserviceName_UPISETMPIN = "UPI/UPISETMPIN";
  upiserviceName_PENDINGREQUESTS = "PendingRequests";
  upiserviceName_DELETEACCOUNTTOVPA = "DeleteAccountToVPA";
  upiserviceName_CHANGEDEFAULTACCMAPPING = "ChangeDefaultAccMapping";
  upiserviceName_DELETEPAYMENTADDRESS = "DeletePaymentAddress";
  upiserviceName_SNOOZENOTIFICATION = "SnoozeNotification";
  upiserviceName_COLLECTACCEPTSERVICE = "CollectAcceptService";
  upiserviceName_BLOCKNOTIFICATION = "BlockNotification";
  upiserviceName_UNBLOCKNOTIFICATION = "UnBlockNotification";
  upiserviceName_REJECTNOTIFICATION = "RejectNotification";
  upiserviceName_ACCEPTNOTIFICATION = "AcceptNotification";
  upiserviceName_SYNCACCOUNT = "SyncAccount";
  upiserviceName_SETDEFAULTVPA = "SetDefaultVpa";
  upiserviceName_FETCHDISTINCTACCOUNTLIST = "FetchDistinctAccountList";
  upiserviceName_GETCOMPLAINTSFORMOBILE = "GetComplaintsForMobile";
  upiserviceName_RAISECOMPLAINT = "RaiseComplaint";
  upiserviceName_ESCALATECOMPLAINT = "EscalateComplaint";
  upiserviceName_DEREGISTERMOBILE = "DeRegisterMobile";
  upiserviceName_UPIVALIDATEMPIN = "UPI/UPIVALIDATEMPIN"; //omni MW API
  upiserviceName_UPIDEACTIVATE = "UPI/UPIDEACTIVATE"; //omni MW API
  upiserviceName_EDITACCOUNTCURRENTLIMIT = "EditAccountCurrentLimit";
  upiserviceName_GETFAQ = "GetFAQ";
  upiserviceName_TransactionHistory = "TransactionHistory";
  upiserviceName_GetFAQ = "GetFAQ";
  upiserviceName_GetDefaultVpa = "GetDefaultVpa";
  upiserviceName_GetListKeysString = "GetListKeysString";
  upiserviceName_GetToken = "GetToken";
  upiserviceName_UPIBalanceCheck = "UPIBalanceCheck";
  upiserviceName_GETMANDATETXNDETAIL = "getMandateTxnDetail";
  upiserviceName_ADDBENIFICIARY = "AddBeneficiary";
  upiserviceName_PAYMANDATE = "payMandate";
  upiserviceName_COLLECTMANDATE = "collectMandate";
  upiserviceName_ACCEPTMANDATE = "acceptMandate";
  upiserviceName_REJECTMANDATE = "rejectMandate";
  upiserviceName_REVOKEMANDATE = "revokeMandate";
  upiserviceName_EDITMANDATE = "editMandate";
  upiserviceName_VALIDATEQRSIGNATURE = "ValidateQRSignature";
  upiserviceName_UPIUPDATEMPIN = "UPI/UPIUPDATEMPIN";
  upiserviceName_GETSYSTEMCONFIRGURATION = "GetSystemConfiguration";
  upiserviceName_UPIFORGOTMPINSENDOTP = "UPI/UPIFORGOTMPINSENDOTP";
  upiserviceName_UPIFORGOTMPINVALIDATEOTP = "UPI/UPIFORGOTMPINVALIDATEOTP";
  upiserviceName_PAUSEMANDATE = "pauseMandate";
  upiserviceName_UNPAUSEMANDATE = "unpauseMandate";
  upiserviceName_VALIDATEQR = "validateQR";
  upiserviceName_GLOBALQRACTIVATION = "GlobalQrActivation";
  upiserviceName_GLOBALQRQUERY = "GlobalQrQuery";
  upiserviceName_VALIDATEGLOBALQR = "ValidateGlobalQr";
  upiserviceName_VALIDATEMANDATE = "validateMandate";
  upiserviceName_FETCHBANKNAME = "FetchBankName";
  upiserviceName_GETBLOCKNOTIFICATIONLIST = "GetBlockNotificationList";
  upiserviceName_UNBLOCKPAYMENTADDRESS = "UnblockPaymentAddress";
  upiserviceName_VALIDATEMIGRATEDUSERDETAIL = "ValidateMigratedUserDetail";
  upiserviceName_GENERATEQRSIGNATURE = "GenerateQRSign";
  upicheck_CHECKSIMBINDINGSTATUS = "CHECKSIMBINDINGSTATUS";
  upicheck_UPDATEPAYMENTADDRESS = "UpdatePaymentAddress";
  upiserviceName_GETAPPNOTIFICATION = "GetAppNotification";
  upiserviceName_CONTACTSYNC = "ContactSync";
  upiserviceName_GETNOTIFICATIONCOUNT = "GetNotificationCount";
  upiserviceName_GETMANDATEHISTORY = "getMandateHistory";
  upiserviceName_GETMANDATEHISTORYONMOBILE = "GetMandateHistoryOnMobile";
  upiserviceName_TRACKSTATUS = "TrackStatus";
  /** Value names */
  val_statementYear = '';
  val_forceUpdate = '';
  val_loginip = '115.248.230.162';
  val_loginType = 'credentials';
  val_loginTypeMPIN = 'mpin';
  val_isCorporate = "N";
  val_faceId = "faceId";
  val_bioMetric = "bioMetric";
  val_Desktop = "DESKTOP";
  val_UPIMOBILE = "UPIMOBILE";
  val_DeviceID = "1";
  val_debitCard = "debitCard"
  val_accountNumberLength: number = 14;
  val_NoOfPages = "50";
  val_credentialType = "credential";
  val_ATM = "ATM";
  val_BRANCH = "BRANCH";
  val_offer = "offer";
  val_BENQR = "Y";
  val_localStorage_Y = "Y";
  val_localStorage_N = "N";
  val_default_lang = "en";
  val_default_lang_UPI = "en_US";
  val_PSB = "PSB";
  val_upi_benListType_RECENT = "RECENT";
  val_upi_benListType_ALL = "ALL";
  val_upi_benListMode_ALL = "ALL";
  val_upi_benListMode_ACCOUNT = "AACCOUNT";
  val_upi_benListMode_VPA = "VPA";
  val_upi_benListMode_MMID = "MMID";
  val_upi_benListMode_COLLECT = "COLLECT";
  val_upi_benListMode_PAY = "PAY";
  val_upi_MBANKING = 'MBANKING';
  val_bankName_PSB = "Punjab & Sind Bank";
  val_type_COLLECT = "COLLECT";
  val_rsa = "RSA/ECB/PKCS1Padding";
  val_X509 = "X509";
  val_Country="India";
  val_StopCheque = "StopCheque";
  val_typeOfRequest="view";
  val_legacySystem = "legacySystem";
  val_CHANGEMAILID = 'CHANGEMAILID';
  val_prefered_Language = 'en';
  val_Retail = "Retail";

  /** praram name used in api call */
  key_chequeInwardInqDetailsData= "chequeInwardInqDetailsData"
  key_MobileNo = 'MobileNo';
  key_loginType = 'loginType';
  key_UserID = 'UserID';
  key_loginip = 'loginip';
  key_authFlag = 'authFlag';
  key_isCorporate = 'isCorporate';
  key_password = 'password';
  key_localStorage_MobileNo = "mobileNo";
  key_localStorage_biometricRegistered = "biometricRegistered";
  key_localStorage_biometricChanged = "biometricChanged";
  key_bankName = "bankName";
  key_branch_name = "branch_name";
  key_branchCode = "branchCode";
  key_branchID = "branchID";
  key_themeName = "themeName";
  key_themeSideBarColor = "themeSideColor";
  key_themeSideBackground = "themeSideBackground";
  key_themeMenuOption = "themeMenuOption";
  key_payeeAddress = "payeeAddress";
  key_payeeName = "payeeName";
  key_trxNo = "trxNo";
  key_trxRef = "trxRef";
  key_purpose = "purpose";
  key_MobileNo_Org = "MobileNoOrg";
  key_localStorage_isBiometric = "isBiometric";
  key_payeeMobile = "payeeMobile";
  key_payerMMID = "payerMMID";
  key_cardtype = "cardtype";
  key_paymentType = "paymentType";
  key_numberOfInstallment = "numberOfInstallment";
  Key_dateOfBirth="dateOfBirth";
  Key_username="username";
  Key_type="type";
  key_DEBITCARDNUMBER="DEBITCARDNUMBER";
  key_confirmPassword="ConfirmPassword";
  key_detailedStatementData = "detailedStatementData";
  key_requestID = "RequestID";
  key_debitCardNo = "debitCardNo";
  key_expiryDate = "ExpiryDate";
  key_expirtDate = 'expirtDate';
  key_cardPin1= 'cardPin';
  key_atmdom = "atm_dom";
  key_poscontdom = "pos_cont_dom";
  key_ecmdom = "ecm_dom";
  key_atmint = "atm_int";
  key_poscontint = "pos_cont_int";
  key_ecmint = "ecm_int";
  key_cont_cw_dom_da = "cont_cw_dom_da";
  key_cont_cw_int_da = "cont_cw_int_da";
  key_contactless = "contactless";
  key_crdtype = "cardtype";
  key_loanDemandDetailsData = "loanDemandDetailsData";
  key_bulkChequeInquiryData = "bulkChequeInquiryData";
  key_dashboardHeaderData = "dashboardHeaderData";
  key_NotificationID="NotificationID"



  /** params used for UPI API calls */
  key_upi_entityID = "entityID";
  key_upi_mobileNo = "mobileNo";
  key_upi_subAction = "subAction";
  key_upi_language = "language";
  key_upi_paymentAddress = "paymentAddress";
  key_upi_linkType = "linkType";
  key_upi_linkValue = "linkValue";
  key_upi_txnNote = "txnNote";
  key_upi_RefID = "RefID";
  key_upi_refID = "refID";
  key_upi_payerName = "payerName";
  key_upi_payerAddr = "payerAddr";
  key_upi_refUrl = "refUrl";
  key_upi_txnID = "txnID";
  key_upi_transactionId = "transactionId";
  key_upi_ifsc = "ifsc";
  key_upi_device = "device";
  key_upi_credDtype = "credDtype"; //cred => OTP Received from NPCI screen
  key_upi_credDType = "credDType";
  key_upi_credType = "credType";
  key_upi_credCode = "credCode";
  key_upi_credKi = "credKi";
  key_upi_credData = "credData";
  key_upi_credSubType = "credSubType";
  key_upi_credDlength = "credDlength";
  key_upi_credDLength = "credDLength";
  key_upi_credDataForJson = "credDataForJson";
  key_upi_credId = "credId";
  key_upi_credkey = "credkey";
  key_upi_atmDLength = "atmDLength"; //atmCred => ATM Pin Details
  key_upi_atmCredType = "atmCredType";
  key_upi_atmDType = "atmDType";
  key_upi_atmCredSubType = "atmCredSubType";
  key_upi_atmCredCode = "atmCredCode";
  key_upi_atmCredKi = "atmCredKi";
  key_upi_atmCredData = "atmCredData";
  key_upi_newCredType = "newCredType"; //newCred => UPI Pin Details
  key_upi_newCredSubType = "newCredSubType";
  key_upi_newCredData = "newCredData";
  key_upi_newCredKi = "newCredKi";
  key_upi_newCredCode = "newCredCode";
  key_upi_otpCredType = "otpCredType";
  key_upi_otpCredDLength = "otpCredDLength";
  key_upi_otpCredDType = "otpCredDType";
  key_upi_otpCredSubType = "otpCredSubType";
  key_upi_cardNum = "cardNum";
  key_upi_addressType = "addressType";
  key_upi_accNum = "accNum";
  key_upi_accountType = "accountType";
  key_upi_accType = "accType";
  key_upi_defaultAccFlag = "defaultAccFlag";
  key_upi_isWithFrequency = "isWithFrequency";
  key_upi_frequency = "frequency";
  key_upi_frequencyLimit = "frequencyLimit";
  key_upi_dailyAmountLimit = "dailyAmountLimit";
  key_upi_expDate = "expDate";
  key_upi_inputParam = "inputParam";
  key_upi_appVersion = "appVersion";
  key_upi_app = "app";
  key_upi_capability = "capability";
  key_upi_os = "os";
  key_upi_lat = "lat";
  key_upi_lng = "lng";
  key_upi_ip = "ip";
  key_upi_location = "location";
  key_upi_deviceID = "deviceID";
  key_upi_defaultVpaFlag = "defaultVpaFlag";
  key_upi_isValid = "isValid";
  key_upi_isOneTime = "isOneTime";
  key_upi_mmid = "mmid";
  key_upi_payeeDetails = "payeeDetails";
  key_upi_payeeName = "payeeName";
  key_upi_payeeAddr = "payeeAddr";
  key_upi_txnType = "txnType";
  key_upi_beneListType = "beneListType";
  key_upi_beneListMode = "beneListMode";
  key_upi_payeeCode = "payeeCode";
  key_upi_txnAmount = "txnAmount";
  key_upi_payMode = "payMode";
  key_upi_minAmountRule = "minAmountRule";
  key_upi_expreAfterRule = "expreAfterRule";
  key_upi_payType = "payType";
  key_upi_remarks = "remarks";
  key_upi_nickName = "nickName";
  key_upi_beneMobileNo = "beneMobileNo";
  key_upi_simSerialNumber = "simSerialNumber";
  key_upi_imsi = "imsi";
  key_upi_uuid = "uuid";
  key_upi_imei1 = "imei1";
  key_upi_imei2 = "imei2";
  key_upi_ipv4 = "ipv4";
  key_upi_ipv6 = "ipv6";
  key_upi_notificationReceiverID = "notificationReceiverID";
  key_keyType = "keyType";
  key_upi_snoozeTime = "snoozeTime";
  key_upi_expireAfter = "expireAfter";
  key_upi_notificationType = "notificationType";
  key_upi_blockPeriod = "blockPeriod";
  key_upi_reason = "reason";
  key_upi_payeeVPA = "payeeVPA";
  key_upi_isSpam = "isSpam";
  key_upi_subject = "subject";
  key_upi_complaintType = "complaintType";
  key_upi_customerEmail = "customerEmail";
  key_upi_customerId = "customerId";
  key_upi_description = "description";
  key_upi_transactionID = "transactionID";
  key_upi_rrn = "rrn";
  key_upi_accountCurrentLimit = "accountCurrentLimit";
  key_upi_amountLimit = "amountLimit";
  key_upi_is_Favourite = "isFavourite";
  key_upi_appID = "appID";
  key_upi_mandateName = "mandateName";
  key_upi_channel = "channel";
  key_upi_blockFund = "blockFund";
  key_upi_shareToPayee = "shareToPayee";
  key_upi_mandateRuleType = "mandateRuleType";
  key_upi_mandateValidityEnd = "mandateValidityEnd";
  key_upi_mandatePattern = "mandatePattern";
  key_upi_applicationFormNo = "applicationFormNo";
  key_upi_initiationMode = "initiationMode";
  key_upi_version = "version";
  key_upi_amountRule = "amountRule";
  key_upi_mandateValidityStart = "mandateValidityStart";
  key_upi_mandateRuleValue = "mandateRuleValue";
  key_upi_ipoNo = "ipoNo";
  key_upi_payerIFSC = "payerIFSC";
  key_upi_payerAccountNo = "payerAccountNo";
  key_upi_orgTxnID = "orgTxnID";
  key_upi_purpose = "purpose";
  key_upi_initiatedChange = "initiatedChange";
  key_upi_umn = "umn";
  key_upi_initiatedBy = "initiatedBy";
  key_upi_qrData = "qrData";
  key_upi_mbeba = "mbeba";
  key_upi_oldMpin = "OLD_MPIN";
  key_upi_newMpin = "NEW_MPIN";
  key_upi_qrDetail = "qrDetail";
  key_upi_splitAmount = "splitAmount";
  key_upi_invoiceDetail = "invoiceDetail";
  key_upi_qrExpire = "qrExpire";
  key_upi_qrMedium = "qrMedium";
  key_upi_qrTs = "qrTs";
  key_upi_qVer = "qVer";
  key_upi_invoiceDate = "invoiceDate";
  key_upi_invoiceName = "invoiceName";
  key_upi_invoiceNo = "invoiceNo";
  key_upi_cess = "cess";
  key_upi_cgst = "cgst";
  key_upi_gst = "gst";
  key_upi_gstincentive = "gstIncentive";
  key_upi_gstpct = "gstPct";
  key_upi_igst = "igst";
  key_upi_sgst = "sgst";
  key_upi_enTip = "enTip";
  key_upi_consentFlag = "consentFlag";
  key_upi_gstBreakUp = "gstBreakUp";
  key_upi_gstIn = "gstIn";
  key_upi_tier = "tier";
  key_upi_globalActivationType = "globalActivationType";
  key_upi_globalActivationAction = "globalActivationAction";
  key_upi_globalActivationValidityStart = "globalActivationValidityStart";
  key_upi_globalActivationValidityEnd = "globalActivationValidityEnd";
  key_upi_migrationcheck = "migrationcheck";
  key_upi_vpaQrFlag = "vpaQrFlag";
  key_upi_merchantCode = "merchantCode";
  key_upi_terminalId = "terminalId";
  key_upi_msid = "msid";
  key_upi_pincode = "pincode";
  key_upi_contactSyncList = "contactSyncList";
  key_upi_otpFlag = "otpFlag";
  key_upi_isSelfTransfer = "isSelfTransfer";
  key_upi_qrtr = "qrtr";
  key_upi_qrcu = "qrcu";
  key_upi_qrorgid = "qrorgid";
  key_upi_transactionDate = "transactionDate";
  key_upi_orgID = "orgID";
  key_upi_payerAccType = "payerAccType";
  key_otpType = "otpType";
  key_jbyEnrollmentData = "jbyEnrollmentData";
  key_sbyEnrollmentData = "sbyEnrollmentData";
  key_upi_txnDateTime = "txnDateTime";
  key_upi_refCategory = "refCategory";
  key_upi_transactionType = "transactionType";
  key_upi_txnStatus = "txnStatus";
  key_upi_responseCode = "responseCode";
  key_upi_upiVersion = "upiVersion";
  key_upi_orgRRN = "orgRRN";
  key_apyEnrollmentData = "apyEnrollmentData";
  key_apyAccountData = "apyAccountData";

  /* Values for UPI Services */
  val_upi_psb = "psb";
  val_upi_en_US = "en_US";
  val_upi_payee_details = "payeeDetails";
  val_upi_refUrl = "http:\/\/www.psb.co.in";
  // val_app_pakage_name = "com.infrasofttech.psbupiuat";
 val_app_pakage_name = "com.infrasofttech.psbuat"; //UAT OMNI
  //  val_app_pakage_name = "com.psb.omniretail"; // PROD OMNI
  // val_app_pakage_name = "com.infra.psbuat"; //for iOS testing
  val_upi_upiDesktop = "UPIDESKTOP";
  val_upi_Collect = "Collect";
  val_upi_upiMobile = "UPIMOBILE";
  val_upi_All = "All";
  val_upi_ALL = "ALL";
  val_upi_BRANCH ="BRANCH";
  val_upi_ATM = "ATM"
  val_upi_ANY = "ANY";
  val_upi_ZONAL = "ZONAL";
  val_upi_HO = "HO";
  val_upi_capability = "5200000200010004000639292929292";
  val_upi_app_version = "0.0.2";
  val_upi_CollectReq = "Collect request";
  val_upi_txnNote = "Req Pay";
  val_upi_MPIN = "MPIN";
  val_upi_PIN = "PIN";
  val_upi_NPCI = "NPCI";
  val_upi_ATMPIN = "ATMPIN";
  val_upi_SMS = "SMS";
  val_upi_OTP = "OTP";
  val_upi_SAVINGS = "SAVINGS";
  val_upi_DEFAULT = "DEFAULT";
  val_upi_CURRENT = "CURRENT";
  val_upi_NRE = "NRE";
  val_upi_NRO = "NRO";
  val_upi_PPIWALLET = "PPIWALLET";
  val_upi_BANKWALLET = "BANKWALLET";
  val_upi_CREDIT = "CREDIT";
  val_upi_SOD = "SOD";
  val_upi_UOD = "UOD";
  val_upi_PAYMENTADDRESS = "PAYMENTADDRESS";
  val_upi_ACCOUNT = "ACCOUNT";
  val_upi_MinAmountRole = "0.00";
  val_upi_NUM = "NUM";
  val_upi_credTypeChallenge = "CHALLENGE";
  val_upi_initial = "initial";
  val_upi_GET_TOKEN = "GET_TOKEN";
  val_upi_TRANSACTION_NOTIFICATION = "TRANSACTION_NOTIFICATION";
  val_upi_PAY = "PAY";
  val_upi_MANDATE = "MANDATE";
  val_upi_credSubType = "MPIN";
  val_upi_channel = "upi";
  val_upi_blockFund = 'Y';
  val_upi_mandateTxnType = 'CREATE';
  val_upi_mandate_initiationMode = "00";
  val_upi_amountRuleEXACT = "EXACT";
  val_upi_COLLECT = 'COLLECT';
  val_upi_VPA = 'VPA';
  val_upi_CreateMandate = "Create mandate";
  val_upi_MOBILE = "MOBILE";
  val_upi_blockFund_N = 'N';
  val_upi_revoke_txnType = "REVOKE";
  val_upi_Y = "Y";
  val_upi_N = "N";
  val_upi_initialMode = "11";
  val_upi_payMode_PaymentAddress = "PAYMENTADDRESS";
  val_upi_PayReq = "Pay request";
  val_upi_mandateUpdateTxnType = 'UPDATE';
  val_upi_mandatePauseTxnType = 'PAUSE';
  val_upi_mandateUnpauseTxnType = 'UNPAUSE';
  val_upi_Activation = "Activation";
  val_upi_Deactivation = "Deactivation";
  val_upi_Query = "Query";
  val_upi_Validation = "Validation";
  val_upi_International = "International";
  val_VALIDATEMAILID = "VALIDATEMAILID";
  val_upi_CHKTXN = "ChkTxn";
  val_upi_UDIR_RE_NA = "NA";
  val_upi_COMPLAINT = "COMPLAINT";
  val_upi_UPIVERSION = "2.0";
  val_upi_CustRef = "CustRef";

  /** storage key */
  storage_language = "language";
  storage_languageJson = "languageJson";
  storage_languageVersion = "languageVersion";
  storage_activityVersion = "activityVersion";
  storage_activityJson = "activityJson";
  storage_deviceId = "deviceId";
  storage_isLoggedIn = "isLoggedIn";
  storage_omniRegisteredUser = "omniRegisteredUser";
  storage_mobileNo = "mobileNo";
  storage_isTpinAvl = "isTpinAvl";
  storage_isMBUser = "isMBUser";
  storage_MPIN = "MPIN";
  storage_isIBUser = "isIBUser";
  storage_isBiomertric = "isBiomertric";
  storage_username = "username";
  storage_simBindingSuccess = "simBindingSuccess";
  storage_mobileStaticEncrypyKey = "mobileStaticEncrypyKey";
  storage_languageList = "languageList"
  storage_profileImage = "profileImage"
  storage_profImgUploadFlag = "profImgFlag"


  /** storage key UPI */
  storage_isUPIUser = "isUPIUser";
  //storage_MobileNo = "MobileNo";
  storage_isMPINEnable = "isMPINEnable";
  storage_isUpiRegistrationSuccess = "isUpiRegistrationSuccess";

  /* Constant Values for NPCI Handler Start */
  //flow identifier without platform start
  val_npci_flow_setUpiPin = "SETUPIPIN";
  val_npci_flow_balanceEnquiry = "BALANCEENQUIRY";
  val_npci_flow_sendMoney = "SENDMONEY";
  val_npci_flow_acceptMandate = "ACCEPTMANDATE";
  val_npci_flow_changeUpiPin = "CHANGEUPIPIN";
  val_npci_flow_createMandate = "CREATEMANDATE";
  val_npci_flow_updateMandateEnquiry = "UPDATEMANDATEENQUIRY";
  val_npci_flow_mandateBalanceEnquiry = "MANDATEBALANCEENQUIRY";
  val_npci_flow_revokeMandate = "REVOKEMANDATE";
  val_npci_flow_executeMandate = "EXECUTEMANDATE";
  val_npci_flow_acceptPendingRequest = "ACCEPTPENDINGREQUEST";
  val_npci_flow_globalUpi = "GLOBALUPI";
  val_npci_flow_debitBlock = "DEBITBLOCK";
  val_npci_flow_pauseUnpauseMandate = "PAUSEUNPAUSEMANDATE";
  //flow identifier without platform values end

  //Android Flow Identifiers Start
  val_npci_flow_setUpiPin_android = "SETUPIPIN";
  val_npci_flow_balanceEnquiry_android = "BALANCEENQUIRY";
  val_npci_flow_sendMoney_android = "SENDMONEY";
  val_npci_flow_acceptMandate_android = "ACCEPTMANDATE";
  val_npci_flow_changeUpiPin_android = "CHANGEUPIPIN";
  val_npci_flow_createMandate_android = "CREATEMANDATE";
  val_npci_flow_updateMandateEnquiry_android = "UPDATEMANDATEENQUIRY";
  val_npci_flow_mandateBalanceEnquiry_android = "MANDATEBALANCEENQUIRY";
  val_npci_flow_revokeMandate_android = "REVOKEMANDATE";
  val_npci_flow_executeMandate_android = "EXECUTEMANDATE";
  val_npci_flow_acceptPendingRequest_android = "ACCEPTPENDINGREQUEST";
  val_npci_flow_modifyMandate_android = "MODIFYMANDATE";
  val_npci_flow_pauseUnpauseMandate_android = "PAUSEUNPAUSEMANDATE";
  val_npci_flow_globalUpi_android = "GLOBALUPI";
  val_npci_flow_debitBlock_android = "DEBITBLOCK";
  //Android Flow identifier values end

  //iOS Flow identifier values start
  val_npci_flow_setUpiPin_ios = "UPIPIN";
  val_npci_flow_balanceEnquiry_ios = "BALANCE";
  val_npci_flow_sendMoney_ios = "SENDMONEY";
  val_npci_flow_acceptMandate_ios = "ACCEPTMANDATE";
  val_npci_flow_changeUpiPin_ios = "CHANGEUPIPIN";
  val_npci_flow_createMandate_ios = "CREATEMANDATE";
  val_npci_flow_updateMandateEnquiry_ios = "UADATEMANDATE";
  val_npci_flow_mandateBalanceEnquiry_ios = "MANDATEBALANCECHECK";
  val_npci_flow_revokeMandate_ios = "REVOKEMANDATE";
  val_npci_flow_executeMandate_ios = "EXECUTEMANDATE";
  val_npci_flow_acceptPendingRequest_ios = "ACCEPTPENDINGREQUEST";
  val_npci_flow_modifyMandate_ios = "MODIFYMANDATE";
  val_npci_flow_globalUpi_ios = "GLOBALUPI";
  val_npci_flow_debitBlock_ios = "DEBITBLOCK";
  val_npci_flow_pauseUnpauseMandate_ios = "PAUSEUNPAUSEMANDATE";
  //iOS Flow Identifier Values end

  //Cred Type values start
  val_npci_credTypeSetUPIPinWithATM = "OTPMPINATM";
  val_npci_credTypeUpiPin = "MPIN";
  val_npci_credTypeChangeUpiPin = "MPINNPIN";
  val_npci_credTypeSetUpiPin = "OTPMPIN";
  val_npci_credTypeOnlyOtp = "OTP";
  //Cred Type values end

  //Keys for NPCI Services start
  key_npci_entityId = "entityId";
  key_npci_txnId = "txnId";
  key_npci_txnNote = "txnNote";
  key_npci_mobileNo = "mobileNo";
  key_npci_keyType = "keyType";
  key_npci_credData = "credData";
  key_npci_credSubType = "credSubType";
  key_npci_credType = "credType";
  key_npci_refUrl = "refUrl";
  key_npci_refId = "refId";
  key_npci_language = "language";
  key_npci_action = "action";
  key_npci_subAction = "subAction";
  key_npci_inputParam = "inputParam";
  key_npci_longitude = "longitude";
  key_npci_latitude = "latitude";
  key_npci_location = "location";
  key_npci_deviceId = "deviceId";
  key_npci_deviceIp = "deviceIp";
  key_npci_deviceOs = "deviceOs";
  key_npci_app = "app";
  key_npci_capability = "capability";
  key_npci_imei1 = "imei1";
  key_npci_imei2 = "imei2";
  key_npci_operatorId = "operatorId";
  key_npci_simSerialNo = "simSerialNo";
  key_npci_telecom = "telecom";
  key_npci_ipv4 = "ipv4";
  key_npci_ipv6 = "ipv6";
  key_npci_uuid = "uuid";
  key_npci_accNum = "accNum";
  key_npci_addressType = "addressType";
  key_npci_credKi = "credKi";
  key_npci_credCode = "credCode";
  key_npci_payerAddr = "payerAddr";
  key_npci_payerName = "payerName";
  key_npci_ifsc = "ifsc";
  key_npci_accountType = "accountType";
  key_npci_amount = "amount";
  key_npci_device = "device";
  key_npci_currency = "currency";
  key_npci_appVersion = "appVersion";
  key_npci_cbsType = "cbsType";
  key_npci_mobPlatform = "mobPlatform";
  key_npci_mobileAppVersion = "mobileAppVersion";
  key_npci_clientAppVersion = "clientAppVersion";
  key_npci_upiRequest = "upiRequest";
  key_npci_credDType = "credDType";
  key_npci_os = "os";
  key_npci_ip = "ip";
  //Keys for NPCI Services end

  //Values for NPCI Services start
  val_npci_GET_TOKEN = "GET_TOKEN";
  val_npci_CHALLENGE = "CHALLENGE";
  val_npci_ATMPIN = "ATMPIN";
  val_npci_MPIN = "MPIN";
  val_npci_SMS = "SMS";
  val_npci_NMPIN = "NMPIN";
  val_npci_upiPayVpa = "upiPayVpa";
  val_npci_upiPayVpaBqr = "upiPayVpaBqr";
  val_npci_upiPayMmid = "upiPayMmid";
  val_npci_upiPayIfsc = "upiPayIfsc";
  val_npci_upiPayIfscBqr = "upiPayIfscBqr";
  val_npci_pendingRequest = "pendingRequest";
  val_npci_approveMandate = "approveMandate";
  val_npci_scanQrPay = "scanQrPay";
  val_npci_inr = "INR";
  val_NEARBY = "NEARBY";


  //Values for NPCI Services end

  /* Constant Values for NPCI Handler End */

  /**
   *
   * Validation pattern start
   *
   */
  playStoreLink = "https://play.google.com/store/apps/details?id=com.psb.omniretail";
  appStoreLink = "https://apps.apple.com/in/app/psb-mpay/id937085144";
  // linkMSG = "You are invited to download and register in PSB BHIM UPI app to perform cashless transactions like money transfer, utility payments and recharges more securely. Click here to download the app ";
  linkMSG = 'You are invited to download and register in PSB BHIM UPI app to perform cashless transactions like money transfer, utility payments and recharges more securely. Click on below link to download the app.';
  ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  ALPHA_NUMERIC_SPACE_REGEX = /^[a-zA-Z0-9 ]*$/;
  ALPHA_NUMERIC_SPACE_UPI_REGEX = /^[a-zA-Z0-9@. -]*$/;
  ALPHABET_REGEX = /^[a-zA-Z]*$/;
  ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;
  NUMERIC_REGEX = /^[0-9]*$/;
  NUMERIC_SPACE_REGEX = /^[0-9 ]*$/;
  // UPI_ID_REGEX = "/^\w+@\w+$/";
  /**  Validation pattern end */

  /** Constants for Cards Different Color */
  cardColorsArr = [
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    },
    {
      cardColor: "blue1",
      cardDetailsColor: "blue1-a"
    },
    {
      cardColor: "pink1",
      cardDetailsColor: "pink1-a"
    },
    {
      cardColor: "maroon1",
      cardDetailsColor: "maroon1-a"
    },
    {
      cardColor: "blue2",
      cardDetailsColor: "blue2-a"
    }
  ]

  getEntityId(key?: any) {
    console.log("getEntityId key => ", key);

    if (window.hasOwnProperty('cordova')) {
      if (device.platform.toLowerCase() == this.val_android || device.platform.toLowerCase() == this.val_ios) {
        return key == null ? this.val_entityIDMob : this.val_entityId_UMOB;
      } else {
        return "";
      }
    } else {
      //Commenting UPIMOBILE after testing
         return key == null ? this.val_entityIDDesk : this.val_entityId_UMOB;
        // return key == null ? this.val_entityIDMob : this.val_entityId_UMOB;
    }
  }


  getIsCordova() {
    if (window.hasOwnProperty('cordova')) {
      return "cordova";
    } else {
      return "web";
    }
    // return "web";
  }

  getPlatform() {
    if (window.hasOwnProperty('cordova')) {
      return device.platform.toLowerCase();
    } else {
      return "web";
    }
    // return "web";
  }

  bankTypeLists = [
    {
      name: 'PSB Bank',
      id: 0
    }, {
      name: 'Other Bank',
      id: 1
    }, {
      name: 'International Bank',
      id: 2
    }
  ]

  languageList = [
    {
      'language': 'English',
      'code': 'en',
      'checked': true
    },
    {
      'language': 'हिंदी',
      'code': 'hn',
      'checked': false
    },
    {
      'language': 'मराठी',
      'code': 'mr',
      'checked': false
    },
    {
      'language': 'ਪੰਜਾਬੀ',
      'code': 'pa',
      'checked': false
    },
    {
      'language': 'తెలుగు',
      'code': 'te',
      'checked': false
    },
    {
      'language': 'ಕನ್ನಡ',
      'code': 'kn',
      'checked': false
    },
    {
      'language': 'தமிழ்',
      'code': 'ta',
      'checked': false
    },
    {
      'language': 'ગુજરાતી',
      'code': 'gu',
      'checked': false
    },
    {
      'language': 'മലയാളം',
      'code': 'ml',
      'checked': false
    },
  ];

  waterSupplyBoardList = [
    {
      id: "0", boardName: "Bangalore Water Supply and Sewerage Board (BWSSB)", label: "RR No", minLength: 8,
      maxLength: 8, pattern: this.NUMERIC_REGEX, errMsg: "WATER_BILL_INVALID_RR_NUMBER"
    },
    {
      id: "1", boardName: " Bhopal Municipal Corporation - Water", label: "Connection ID", minLength: 8,
      maxLength: 10, pattern: this.ALPHA_NUMERIC_REGEX, errMsg: "WATER_BILL_INVALID_CONNECTION_ID"
    },
    {
      id: "2", boardName: " Delhi Development Authority (DDA) - Water", label: "Customer ID", minLength: null,
      maxLength: null, pattern: this.NUMERIC_REGEX, errMsg: "WATER_BILL_INVALID_CUSTOMER_ID"
    },
    {
      id: "3", boardName: "Delhi Jal Board (DJB)", label: "K Number", minLength: 10,
      maxLength: 10, pattern: this.NUMERIC_REGEX, errMsg: "WATER_BILL_INVALID_K_NUMBER"
    },
    {
      id: "4", boardName: "Department of Public Health Engineering-Water, Mizoram", label: "Consumer Number", minLength: 5,
      maxLength: 15, pattern: this.NUMERIC_REGEX, errMsg: "WATER_BILL_INVALID_CONSUMER_NUMBER"
    },
    // {id:"5",boardName:"Greater Warangal Municipal Corporation - Water"},
    // {id:"6",boardName:"Gwalior Municipal Corporation - Water"},
    // {id:"7",boardName:"Haryana Urban Development Authority"},
    // {id:"8",boardName:" Hyderabad Metropolitan Water Supply and Sewerage Board (HMWSSB)"},
    // {id:"9",boardName:"Indore Municipal Corporation - Water"},
    // {id:"10",boardName:"Jabalpur Municipal Corporation - Water"},
    // {id:"11",boardName:"Jalkal Vibhag Nagar Nigam Prayagraj"},
    // {id:"12",boardName:"Kerala Water Authority (KWA) - Water"},
    // {id:"13",boardName:"Madhya Pradesh Urban (e-Nagarpalika) - Water"},
    // {id:"14",boardName:"Municipal Corporation Chandigarh - Water"},
    // {id:"15",boardName:"Municipal Corporation Jalandhar- Water"},
    // {id:"16",boardName:"Municipal Corporation of Amritsar"},
    // {id:"17",boardName:"Municipal Corporation of Faridabad -Water"},
    // {id:"18",boardName:"Municipal Corporation of Gurugram (MCG) -Water"},
    // {id:"19",boardName:"Municipal Corporation of Ludhiana -Water"},
    // {id:"20",boardName:"Mysuru City Corporation"},
    // {id:"21",boardName:"Nagpur Municipal Corporation- Orange City Water Nagpur"},
    // {id:"22",boardName:"Nanded Waghala City Municipal Corporation -Water"},
    // {id:"23",boardName:"New Delhi Municipal Council (NDMC) - Water"},
    // {id:"24",boardName:"Patna Municipal Corporation - GCC Tax"},
    // {id:"25",boardName:"Port Blair Municipal Council - Water"},
    // {id:"26",boardName:"Pune Municipal Corporation - Water"},
    // {id:"27",boardName:"Punjab Municipal Corporation/Council"},
    // {id:"28",boardName:"Ranchi Municipal Corporation"},
    // {id:"29",boardName:"Silvassa Municipal Council"},
    // {id:"30",boardName:"urat Municipal Corporation - Water"},
    // {id:"31",boardName:"Tumkur City Corporation-Water and UGD"},
    // {id:"32",boardName:"Ujjain Nagar Nigam- PHED- Water"},
    // {id:"33",boardName:"Urban Improvement Trust (UIT) - Bhiwandi"},
    // {id:"34",boardName:"Uttarakhand Jal Sansthan"},
  ];

  operatorList = [
    { id: "0", operatorName: "Airtel Digital TV" },
    { id: "1", operatorName: "Dish TV" },
    { id: "2", operatorName: "Sun Direct" },
    { id: "3", operatorName: "Tata Sky" },
    { id: "4", operatorName: "d2h" }
  ]

  mobileOperatorList: any = [
    { ID: "1", operatorName: "Airtel Prepaid" },
    { ID: "2", operatorName: "BSNL Prepaid" },
    { ID: "3", operatorName: "Vi Prepaid" },
  ];

  categoryList: any = [
    {
      id: 'mobileRecharge',
      type: 'MOBILE RECHARGE'
    },
    {
      id: 'electricity',
      type: 'ELECTRICITY'
    },
    {
      id: 'landline',
      type: 'LANDLINE'
    },
    {
      id: 'water',
      type: 'WATER'
    },
    {
      id: 'DTH',
      type: 'DTH'
    },
    {
      id: 'gas',
      type: 'GAS'
    },
    // {
    //   id:'7',
    //   type:'TAX'
    // },
    // {
    //   id:'8',
    //   type:'INSURANCE'
    // }
  ]

  electricityBoardlist = [
    {
      name: "Adani Electricity", id: 0, label: "Customer Account Number", minLength: 9,
      maxLength: 10, pattern: this.NUMERIC_REGEX, errMsg: "ELECTRICITY_BILL_INVALID_CUST_ACC_NO"
    },
    {
      name: "BEST", id: 1, label: "Customer Account Number", minLength: 9,
      maxLength: 10, pattern: this.NUMERIC_REGEX, errMsg: "ELECTRICITY_BILL_INVALID_CONSUMER_NO"
    },
    {
      name: "Tata Power - Mumbai", id: 2, label: "Customer Account Number", minLength: 12,
      maxLength: 12, pattern: this.NUMERIC_REGEX, errMsg: "ELECTRICITY_BILL_INVALID_CONSUMER_NO"
    }
  ];

  landLineOperatorList = [
    { id: "0", name: "MTNL (Mumbai)" },
    { id: "1", name: "MTNL (Delhi)" },
    { id: "2", name: "Airtel" },
    { id: "3", name: "BSNL Landline" }
  ];

  gasLineOperatorList = [
    {
      id: "1",
      value: "Aavantika Gas Ltd",
      label: "Customer Number",
      minLength: 9,
      maxLength: 15
    },
    {
      id: "2",
      value: "Adani Gas Limited",
      label: "Customer Number",
      minLength: 9,
      maxLength: 10
    },
    {
      id: "3",
      value: "Assam Gas Company Limited",
      label: "Customer ID",
      minLength: 12,
      maxLength: 13
    },
    {
      id: "4",
      value: "GAIL Gas Limited",
      label: "BP Number",
      minLength: 9,
      maxLength: 10
    },
    {
      id: "5",
      value: "Green Gas Limited",
      label: "CRN Number",
      minLength: 10,
      maxLength: 11
    },
    {
      id: "6",
      value: "Vadodara Gas Limited",
      label: "Consumer Number",
      minLength: 6,
      maxLength: 7
    }

  ];

  gasCylinderOperator = [
    {
      id: "7",
      value: "Bharat Gas",
      label: "LPG Id/Mobile No",
      minLength: 10,
      maxLength: 17
    },
    {
      id: "8",
      value: "HP Gas",
      label: "Customer No./Mobile No./17-digit LPG ID",
      minLength: 10,
      maxLength: 17
    },
    {
      id: "9",
      value: "Indane",
      label: "Consumer Number and DealerCode/LPG ID/Mobile No.",
      minLength: 10,
      maxLength: 17
    }

  ]

  corporationLists = [
    {
      id: "0",
      name: "Ahmedabad Municipal Corporation",
      label: "Property Number",
      errMsg: "TAX_BILL_INVALID_PROPERTY_NO",
      minLength: 15,
      maxLength: 15,
      pattern: this.NUMERIC_REGEX
    }, {
      id: "1",
      name: "Belagavi City Corporation",
      label: "Property Number",
      errMsg: "TAX_BILL_INVALID_PROPERTY_NO",
      minLength: 1,
      maxLength: 7,
      pattern: this.ALPHA_NUMERIC_REGEX
    }, {
      id: "2",
      name: "Greater Chennai Corporation",
      errMsg: "TAX_BILL_INVALID_PROPERTY_ID",
      label: "Property ID",
      minLength: 13,
      maxLength: 13,
      pattern: this.NUMERIC_REGEX
    }, {
      id: "3",
      name: "Greater Visakhapatnam Municipal(GVMC)",
      errMsg: "TAX_BILL_INVALID_PROPERTY_TAX_NUMBER",
      label: "Property Tax Number",
      minLength: 5,
      maxLength: 11,
      pattern: this.NUMERIC_REGEX
    }, {
      id: "4",
      name: "Hubli-Dharwad Municipal Corporation",
      errMsg: "TAX_BILL_INVALID_PROPERTY_ID",
      label: "Property ID",
      minLength: 5,
      maxLength: 15,
      pattern: this.NUMERIC_REGEX
    }
  ]

  InsuranceLists = [
    {
      id: "0",
      name: "Aditya Birla Sun Life Insurance",
      label: "Policy Number",
      minLength: 9,
      maxLength: 9,
      validateRegx: "^[0-9]*$",
    }, {
      id: "1",
      name: "Bajaj Allianz General Insuance",
      label: "Policy Number",
      minLength: 24,
      maxLength: 24,
      validateRegx: "^[a-zA-Z0-9_]*$"
    }, {
      id: "2",
      name: "TATA AIA Life Insurance",
      label: "Policy Number",
      minLength: 10,
      maxLength: 11,
      validateRegx: "^[a-zA-Z0-9_]*$"
    }
  ]

  donationLists = [
    {
      id: "0",
      name: "ADHAR"
    }
  ]

  // upiMenuLists = [
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "01",
  //     "menuName": "FAQS",
  //     "ID": "01",
  //     "type": "faq",
  //     "icon": "question.svg",
  //     "route": "faq",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "02",
  //     "menuName": "MANAGED_BLOCKED_UPID_ID",
  //     "ID": "01",
  //     "type": "menu",
  //     "icon": "block_user.svg",
  //     "route": "manageBlockUpiId",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "03",
  //     "menuName": "CHANGE_LANGUAGE",
  //     "ID": "01",
  //     "type": "menu",
  //     // "icon": "change-language.svg",
  //     "icon": 'language-g.svg',
  //     "route": "languageChange",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "04",
  //     "menuName": "CHANGE_MPIN",
  //     "ID": "01",
  //     "type": "menu",
  //     "icon": "change-mpin.svg",
  //     "route": "changeMpin",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "06",
  //     "menuName": "COMPLAINTS",
  //     "ID": "01",
  //     "type": "menu",
  //     "icon": "complaint.svg",
  //     "route": "complaint",
  //     "subMenu": []
  //   },

  //   // {
  //   //   "Status": "Active",
  //   //   "sequenceNo": "07",
  //   //   "menuName": "BILL_REMINDER",
  //   //   "ID": "01",
  //   //   "type": "menu",
  //   //   "icon": "bill-reminder.svg",
  //   //   "route": "",
  //   //   "subMenu": []
  //   // },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "09",
  //     "menuName": "RATE_US",
  //     "ID": "01",
  //     "type": "menu",
  //     // "icon": "rate-us.svg",
  //     "icon": 'rate-us1.svg',
  //     "route": "",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "10",
  //     "menuName": "REFER_A_FRIEND",
  //     "ID": "01",
  //     "type": "menu",
  //     "icon": "refer-friend1.svg",
  //     "route": "referFriend",
  //     "subMenu": []
  //   },
  //   {
  //     "Status": "Active",
  //     "sequenceNo": "11",
  //     "menuName": "DE_REGISTER",
  //     "ID": "01",
  //     "type": "menu",
  //     "icon": "de-register.svg",
  //     "route": "deregister",
  //     "subMenu": []
  //   },
  //   //   {
  //   //     "Status": "Active",
  //   //     "sequenceNo": "05",
  //   //     "menuName": "CHANGE_EMAIL_ID",
  //   //     "ID": "01",
  //   //     "type": "menu",
  //   //     "icon": "change-mpin.svg",
  //   //     "route": "",
  //   //     "subMenu":[]
  //   // },

  //   //   {
  //   //     "Status": "Active",
  //   //     "sequenceNo": "08",
  //   //     "menuName": "PAYMENT_REMINDER",
  //   //     "ID": "01",
  //   //     "type": "menu",
  //   //     "icon": "bill-reminder.svg",
  //   //     "route": "dashoard",
  //   //     "subMenu":[]
  //   // },



  //   //   {
  //   //     "Status": "Active",
  //   //     "sequenceNo": "01",
  //   //     "menuName": "Select Theme",
  //   //     "ID": "01",
  //   //     "type": "menu",
  //   //     "icon": "select-theme.svg",
  //   //     "route": "dashboard",
  //   //     "subMenu":[]
  //   // },
  //   //   {
  //   //     "Status": "Active",
  //   //     "sequenceNo": "01",
  //   //     "menuName": "Enable Fingerprint/FaceID",
  //   //     "ID": "01",
  //   //     "type": "menu",
  //   //     "icon": "fingerprint2.svg",
  //   //     "route": "dashboard",
  //   //     "subMenu":[]
  //   // },
  //   // {
  //   //       "Status": "Active",
  //   //       "sequenceNo": "20",
  //   //       "menuName": "THEME_SETTINGS",
  //   //       "ID": "20",
  //   //       "icon":"passbook.svg",
  //   //       "type": "menu",
  //   //       "route":"themeSettings",
  //   //       "subMenu":[]
  //   // }
  // ]

  /*changesin upi list dashboard*/
  upiMenuLists = [

    {
      "Status": "Active",
      "sequenceNo": "01",
      // "menuName": "MY_PROFILE",
      "menuName": "PERSONAL_DETAILS",
      "ID": "01",
      "type": "menu",
      "icon": "personal-details.svg",
      "route": "personalDetails",
      "subMenu": []
    },

    {
      "Status": "Active",
      "sequenceNo": "02",
      "menuName": "MANAGED_BLOCKED_UPID_ID",
      "ID": "02",
      "type": "menu",
      "icon": "block_user.svg",
      "route": "manageBlockUpiId",
      "subMenu": []
    },

    {
      "Status": "Active",
      "sequenceNo": "03",
      "menuName": "CHANGE_MPIN",
      "ID": "01",
      "type": "menu",
      "icon": "change-mpin.svg",
      "route": "changeMpin",
      "subMenu": []
    },

    {
      "Status": "Active",
      "sequenceNo": "04",
      "menuName": "GENERATE_QR",
      "ID": "01",
      "type": "menu",
      "icon": "generate-QR.svg",
      "route": "myProfile",
      "subMenu": []
    },
    // {
    //   "Status": "Active",
    //   "sequenceNo": "05",
    //   "menuName": "CHANGE_EMAIL",
    //   "ID": "01",
    //   "type": "menu",
    //   "icon": "change-email.svg",
    //   "route": "changeEmail",
    //   "subMenu": []
    // },
    {
      "Status": "Active",
      "sequenceNo": "06",
      "menuName": "COMPLAINTS",
      "ID": "01",
      "type": "menu",
      "icon": "complaint.svg",
      "route": "complaint",
      "subMenu": []
    },
    {
      "Status": "Active",
      "sequenceNo": "07",
      "menuName": "CHANGE_LANGUAGE",
      "ID": "01",
      "type": "menu",
      // "icon": "change-language.svg",
      "icon": 'language-g.svg',
      "route": "languageChange",
      "subMenu": []
    },

    // {
    //   "Status": "Active",
    //   "sequenceNo": "06",
    //   "menuName": "CHANGE_LANGUAGE",
    //   "ID": "01",
    //   "type": "menu",
    //   // "icon": "change-language.svg",
    //   "icon": 'language-g.svg',
    //   "route": "languageChange",
    //   "subMenu": []
    // },

    // {
    //   "Status": "Active",
    //   "sequenceNo": "07",
    //   "menuName": "BILL_REMINDER",
    //   "ID": "01",
    //   "type": "menu",
    //   "icon": "bill-reminder.svg",
    //   "route": "",
    //   "subMenu": []
    // },
    //   {
    //     "Status": "Active",
    //     "sequenceNo": "08",
    //     "menuName": "PAYMENT_REMINDER",
    //     "ID": "01",
    //     "type": "menu",
    //     "icon": "payment-reminder.svg",
    //     "route": "paymentReminder",
    //     "subMenu":[]
    // },

    // {
    //   "Status": "Active",
    //   "sequenceNo": "09",
    //   "menuName": "RATE_US",
    //   "ID": "01",
    //   "type": "menu",
    //   "icon": 'rate-us1.svg',
    //   "route": "",
    //   "subMenu": []
    // },

    {
      "Status": "Active",
      "sequenceNo": "09",
      "menuName": "REFER_A_FRIEND",
      "ID": "01",
      "type": "menu",
      "icon": "refer-friend1.svg",
      "route": "referFriend",
      "subMenu": []
    },
    // {
    //   "Status": "Active",
    //   "sequenceNo": "01",
    //   "menuName": "FAQS",
    //   "ID": "01",
    //   "type": "faq",
    //   "icon": "question.svg",
    //   "route": "faq",
    //   "subMenu": []
    // },
    {
      "Status": "Active",
      "sequenceNo": "10",
      "menuName": "FAQS",
      "ID": "01",
      "type": "menu",
      "icon": "faq-icon.svg",
      "route": "faq",
      "subMenu": []
    },
    {
      "Status": "Active",
      "sequenceNo": "11",
      "menuName": "PRIVACY_POLICY",
      "ID": "01",
      "type": "menu",
      "icon": "privacy-policy.svg",
      "route": "privacy",
      "subMenu": []
    },

    {
      "Status": "Active",
      "sequenceNo": "12",
      "menuName": "DE_REGISTER",
      "ID": "01",
      "type": "menu",
      "icon": "de-register.svg",
      "route": "deregister",
      "subMenu": []
    },
    // {
    //   "Status": "Active",
    //   "sequenceNo": "14",
    //   "menuName": "ABOUT",
    //   "ID": "01",
    //   "type": "menu",
    //   "icon": "about-us.svg",
    //   "route": "about",
    //   "subMenu": []
    // },


  ]

/*end of changes in upi list dashboard*/







menuLists = [
  {
    "Status": "Active",
    "sequenceNo": "01",
    "menuName": "DASHBOARD",
    "ID": "01",
    "type": "menu",
    "icon": "dashboard.svg",
    "route": 'dashboard',
    "subMenu": []
  },
  {
    "Status": "Active",
    "sequenceNo": "02",
    "menuName": "MY_ACCOUNTS",
    "ID": "02",
    "type": "menu",
    "icon": "my-accounts_old.svg",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "OPERATIVE_ACCOUNT",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myAccount",
        //"route": "myAccountMobile"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_DEPOSITS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myDeposits",
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_TERM_LOANS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myBorrowings",
          // loanList

      },
    ] ,
  },
  {
    "Status": "Active",
    "sequenceNo": "03",
    "menuName": "FUND_TRANSFER",
    "ID": "03",
    "icon": "fund-transfer-g.svg",
    "type": "menu",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INSTANT_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "instantPay"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "SEND_MONEY",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "sendMoney"
      },
      {
        "Status": "Active",
        "sequenceNo": "06",
        "menuName": "MANAGE_PAYEE",
        "ID": "06",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "managePayee"
      },
      {
        "Status": "Active",
        "sequenceNo": "07",
        "menuName": "STANDING_INSTRUCTIONS",
        "ID": "07",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "standingInstructionList"
      },

      // {
      //   "Status": "inactive",
      //   "sequenceNo": "05",
      //   "menuName": "CARDLESS_CASH_WITHDRAWALS",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": ""
      // },
      // {
      //   "Status": "inactive",
      //   "sequenceNo": "05",
      //   "menuName": "SCHEDULED_TRANSACTION",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": "transactionStatus"
      // },

    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "MY_CARDS",
    "ID": "05",
    // "ID": "comingsoon",
    "icon": "my-cards-p.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "DEBIT_CARDS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "debitCards"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "APPLY_FOR_NEW_CARD",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "applyCards"
      },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "15",
    "menuName": "RECHARGE_BILLPAY",
   //"ID": "comingsoon",
      "ID": "06",
    "icon": "recharge-bills.svg",
    "type": "menu",
    "route": "retailRechargeBillPay",
    "subMenu": [
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "BILL_PAYMENT",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRechargeBillPay",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "REGISTERED_PAY",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRegisterNewBiller",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "Recent Transactions",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "PENDING_BILL_REMINDER",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailPendingBillReminder",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "COMPLAINT",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRaiseComplaint",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "PAYMENT_HISTORY",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailPaymentHistory",
      //   "subMenu": []
      // },
    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "Tax",
    "ID": "comingsoon",
    "icon": "tax-center-gh.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [ ]
  },

  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "SERVICES",
    "ID": "08",
    "icon": "services.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
        {
        "Status": "Active",
        "sequenceNo": "07",
        "menuName": "TDS_CERTIFICATE",
        "ID": "07",
        "icon": "",
        "type": "menu",
        "route": "tdsCertificate",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "09",
        "menuName": "FREEZE_ACCOUNTS",
        "ID": "09",
        "icon": "recharge-bills.png",
        "type": "menu",
        "route": "freezeAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "LINK_ACCOUNT",
        "ID": "11",
        "icon": "dashboard.png",
        "type": "menu",
        "route": "linkAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "DELINK_ACCOUNT",
        "ID": "11",
        "icon": "apply-for-products.png",
        "type": "menu",
        "route": "delinkAccount",
        "subMenu": []
      },
    ]
  },


  {
    "Status": "Active",
    "sequenceNo": "12",
    "menuName": "SOCIAL_SECURITIES",
    "ID": "09",
    "icon": "Investments.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
          "sequenceNo": "06",
          "menuName": "PMJJBY",
          "ID": "06",
          "icon": "",
          "type": "menu",
          "route": "pmjjby",
          "subMenu": []
        },
        {
          "Status": "Active",
          "sequenceNo": "06",
          "menuName": "PMSBY",
          "ID": "06",
          "icon": "",
          "type": "menu",
          "route": "pmsby",
          "subMenu": []
        },
      {
        "Status": "Active",
        "sequenceNo": "06",
        "menuName": "APY",
        "ID": "06",
        "icon": "",
        "type": "menu",
        "route": "socialSecurities",
        "subMenu": []
      },

    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "11",
    "menuName": "DONATIONS",
    "ID": "10",
    "icon": "Donation-sprite.svg",
    "type": "menu",
    "route": "donations",
    "subMenu": []
  },

  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "CHEQUE_BOOK",
    "ID": "11",
    "icon": "cheque-services_old.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "MY_CHEQUE_BOOK",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myChequeBook"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "CHEQUE_STATUS_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeStatusEnquiry"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "POSITIVE_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "positivePay"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "STOP_CHEQUE",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "stopCheques"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INWARD_CHEQUE_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "inwardChequeInquiry"
      },{
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "NEW_CHEQUEBOOK_REQUEST",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeBookRequest"
      },

    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "16",
    "menuName": "TOKEN",
    "ID": "comingsoon",
    "icon": "Others.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
    ]
  },

];



menuListsloans = [
  {
    "Status": "Active",
    "sequenceNo": "01",
    "menuName": "DASHBOARD",
    "ID": "01",
    "type": "menu",
    "icon": "dashboard.svg",
    "route": 'dashboard',
    "subMenu": []
  },
  {
    "Status": "Active",
    "sequenceNo": "02",
    "menuName": "MY_ACCOUNTS",
    "ID": "02",
    "type": "menu",
    "icon": "my-accounts.svg",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "OPERATIVE_ACCOUNT",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myAccount",
        //"route": "myAccountMobile"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_DEPOSITS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myDeposits",
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_TERM_LOANS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myBorrowings",
          // loanList

      },
    ] ,
  },
  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "SERVICES",
    "ID": "08",
    "icon": "services.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "LINK_ACCOUNT",
        "ID": "11",
        "icon": "dashboard.png",
        "type": "menu",
        "route": "linkAccount",
        "subMenu": []
      },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "11",
      //   "menuName": "DELINK_ACCOUNT",
      //   "ID": "11",
      //   "icon": "apply-for-products.png",
      //   "type": "menu",
      //   "route": "delinkAccount",
      //   "subMenu": []
      // },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "comingsoon",
    "menuName": "Token",
    "ID": "12",
    "icon": "Others.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      // {
      //   "Status": "Active",
      //   "sequenceNo": "01",
      //   "menuName": "PKI_ENROLLMENT",
      //   "ID": "01",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "emas",
      //   "subMenu": []
      // }
    ]
  },
];


menuListsNri = [
  {
    "Status": "Active",
    "sequenceNo": "01",
    "menuName": "DASHBOARD",
    "ID": "01",
    "type": "menu",
    "icon": "dashboard.svg",
    "route": 'dashboard',
    "subMenu": []
  },
  {
    "Status": "Active",
    "sequenceNo": "02",
    "menuName": "MY_ACCOUNTS",
    "ID": "02",
    "type": "menu",
    "icon": "my-accounts.svg",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "OPERATIVE_ACCOUNT",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myAccount",
        //"route": "myAccountMobile"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_DEPOSITS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myDeposits",
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "MY_TERM_LOANS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myBorrowings",
          // loanList

      },
    ] ,
  },
  {
    "Status": "Active",
    "sequenceNo": "03",
    "menuName": "FUND_TRANSFER",
    "ID": "03",
    "icon": "fund-transfer-g.svg",
    "type": "menu",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INSTANT_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "instantPay"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "SEND_MONEY",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "sendMoney"
      },
      {
        "Status": "Active",
        "sequenceNo": "06",
        "menuName": "MANAGE_PAYEE",
        "ID": "06",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "managePayee"
      },
      {
        "Status": "Active",
        "sequenceNo": "07",
        "menuName": "STANDING_INSTRUCTIONS",
        "ID": "07",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "standingInstructionList"
      },

      // {
      //   "Status": "inactive",
      //   "sequenceNo": "05",
      //   "menuName": "CARDLESS_CASH_WITHDRAWALS",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": ""
      // },
      // {
      //   "Status": "inactive",
      //   "sequenceNo": "05",
      //   "menuName": "SCHEDULED_TRANSACTION",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": "transactionStatus"
      // },

    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "MY_CARDS",
    "ID": "05",
    // "ID": "comingsoon",
    "icon": "my-cards-p.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "DEBIT_CARDS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "debitCards"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "APPLY_FOR_NEW_CARD",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "applyCards"
      },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "15",
    "menuName": "RECHARGE_BILLPAY",
   "ID": "comingsoon",
    //  "ID": "06",
    "icon": "recharge-bills.svg",
    "type": "menu",
    "route": "retailRechargeBillPay",
    "subMenu": [
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "BILL_PAYMENT",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRechargeBillPay",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "REGISTERED_PAY",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRegisterNewBiller",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "Recent Transactions",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "PENDING_BILL_REMINDER",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailPendingBillReminder",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "COMPLAINT",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailRaiseComplaint",
      //   "subMenu": []
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "08",
      //   "menuName": "PAYMENT_HISTORY",
      //   "ID": "08",
      //   "icon": "",
      //   "type": "menu",
      //   "route": "retailPaymentHistory",
      //   "subMenu": []
      // },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "SERVICES",
    "ID": "08",
    "icon": "services.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "09",
        "menuName": "FREEZE_ACCOUNTS",
        "ID": "09",
        "icon": "recharge-bills.png",
        "type": "menu",
        "route": "freezeAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "LINK_ACCOUNT",
        "ID": "11",
        "icon": "dashboard.png",
        "type": "menu",
        "route": "linkAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "DELINK_ACCOUNT",
        "ID": "11",
        "icon": "apply-for-products.png",
        "type": "menu",
        "route": "delinkAccount",
        "subMenu": []
      },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "11",
    "menuName": "DONATIONS",
    "ID": "10",
    "icon": "Donation-sprite.svg",
    "type": "menu",
    "route": "donations",
    "subMenu": []
  },

  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "CHEQUE_BOOK",
    "ID": "11",
    "icon": "cheque-services_old.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "MY_CHEQUE_BOOK",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myChequeBook"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "CHEQUE_STATUS_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeStatusEnquiry"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "POSITIVE_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "positivePay"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "STOP_CHEQUE",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "stopCheques"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INWARD_CHEQUE_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "inwardChequeInquiry"
      },{
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "NEW_CHEQUEBOOK_REQUEST",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeBookRequest"
      },

    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "comingsoon",
    "menuName": "Token",
    "ID": "12",
    "icon": "Others.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "01",
        "menuName": "PKI_ENROLLMENT",
        "ID": "01",
        "icon": "",
        "type": "menu",
        "route": "emas",
        "subMenu": []
      }
    ]
  },
];












menuListsMobile = [
  // {
  //   "Status": "Active",
  //   "sequenceNo": "01",
  //   "menuName": "DASHBOARD",
  //   "ID": "01",
  //   "type": "menu",
  //   "icon": "dashboard.png",
  //   "route": 'dashboardMobile',
  //   "subMenu": []
  // },
  {
    "Status": "Active",
    "sequenceNo": "02",
    "menuName": "MY_ACCOUNTS",
    "ID": "02",
    "type": "menu",
    "icon": "m-passbook.png",
    "route": "myAccountMobile",
    "subMenu": []
  },
  {
    "Status": "Active",
    "sequenceNo": "03",
    "menuName": "FUND_TRANSFER",
    "ID": "03",
    "icon": "send-money.png",
    "type": "menu",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INSTANT_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "instantPay"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "SEND_MONEY",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "sendMoney"
      },
      {
        "Status": "Active",
        "sequenceNo": "06",
        "menuName": "MANAGE_PAYEE",
        "ID": "06",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "managePayee"
      },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "05",
      //   "menuName": "TRANSACTION_STATUS",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": "transactionStatus"
      // },
      // {
      //   "Status": "Active",
      //   "sequenceNo": "05",
      //   "menuName": "IMPS_TRANSACTION",
      //   "ID": "05",
      //   "icon": "right-arrow.svg",
      //   "type": "submenu",
      //   "route": "impsTransactionStatus"
      // },
      {
        "Status": "Active",
        "sequenceNo": "07",
        "menuName": "STANDING_INSTRUCTIONS",
        "ID": "07",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "standingInstructionList"
      },
    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "MY_CARDS",
    "ID": "07",
    "icon": "my-cards.png",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "DEBIT_CARDS",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "debitCards"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "APPLY_FOR_NEW_CARD",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "applyCards"
      },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "BHIM UPI",
    "ID": "07",
    "icon": "bhim_icon.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "BHIM UPI Home",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "upiDashboard"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "Manage Block UPI ID",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "manageBlockUpiId"
      },
      {
        "Status": "Active",
        "sequenceNo": "04",
        "menuName": "De-Register",
        "ID": "04",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "deregister"
      }
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "15",
    "menuName": "RECHARGE_BILLPAY",
    "ID": "comingsoon",
    "icon": "recharge-bills.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "Tax",
    "ID": "comingsoon",
    "icon": "tax-center-gh.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [ ]
  },

  {
    "Status": "Active",
    "sequenceNo": "13",
    "menuName": "SERVICES",
    "ID": "08",
    "icon": "services.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
        {
        "Status": "Active",
        "sequenceNo": "07",
        "menuName": "TDS_CERTIFICATE",
        "ID": "07",
        "icon": "",
        "type": "menu",
        "route": "tdsCertificate",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "09",
        "menuName": "FREEZE_ACCOUNTS",
        "ID": "09",
        "icon": "recharge-bills.png",
        "type": "menu",
        "route": "freezeAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "LINK_ACCOUNT",
        "ID": "11",
        "icon": "dashboard.png",
        "type": "menu",
        "route": "linkAccount",
        "subMenu": []
      },
      {
        "Status": "Active",
        "sequenceNo": "11",
        "menuName": "DELINK_ACCOUNT",
        "ID": "11",
        "icon": "apply-for-products.png",
        "type": "menu",
        "route": "delinkAccount",
        "subMenu": []
      },
    ]
  },
  {
    "Status": "Active",
    "sequenceNo": "12",
    "menuName": "SOCIAL_SECURITIES",
    "ID": "09",
    "icon": "Investments.svg",
    "type": "submenu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
          "sequenceNo": "06",
          "menuName": "PMJJBY",
          "ID": "06",
          "icon": "",
          "type": "menu",
          "route": "pmjjby",
          "subMenu": []
        },
        {
          "Status": "Active",
          "sequenceNo": "06",
          "menuName": "PMSBY",
          "ID": "06",
          "icon": "",
          "type": "menu",
          "route": "pmsby",
          "subMenu": []
        },
      {
        "Status": "Active",
        "sequenceNo": "06",
        "menuName": "APY",
        "ID": "06",
        "icon": "",
        "type": "menu",
        "route": "socialSecurities",
        "subMenu": []
      },

    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "11",
    "menuName": "DONATIONS",
    "ID": "10",
    "icon": "Donation-sprite.svg",
    "type": "menu",
    "route": "donations",
    "subMenu": []
  },

  {
    "Status": "Active",
    "sequenceNo": "07",
    "menuName": "CHEQUE_BOOK",
    "ID": "11",
    "icon": "cheque-services_old.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "MY_CHEQUE_BOOK",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "myChequeBook"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "CHEQUE_STATUS_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeStatusEnquiry"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "POSITIVE_PAY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "positivePay"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "STOP_CHEQUE",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "stopCheques"
      },
      {
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "INWARD_CHEQUE_ENQUIRY",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "inwardChequeInquiry"
      },{
        "Status": "Active",
        "sequenceNo": "05",
        "menuName": "NEW_CHEQUEBOOK_REQUEST",
        "ID": "05",
        "icon": "right-arrow.svg",
        "type": "submenu",
        "route": "chequeBookRequest"
      },

    ]
  },

  {
    "Status": "Active",
    "sequenceNo": "16",
    "menuName": "TOKEN",
    "ID": "comingsoon",
    "icon": "Others.svg",
    "type": "menu",
    "route": "",
    "subMenu": [
    ]
  },
]


  /** storageEncryptKey is used for encryption purpose */
  storageEncryptKey = 'p$b@20#st0mni';
  /** mapEncryptKey is used for encryption purpose */
  sessionEncryptKey = '0mni@P$b#2020';
  mapEncryptKey = 'jrD@Mt6i';
  staticKey = "jrD@Mt6i#0mnip$b";
  languageKey = '@MrN$2Qi8R';
  InvalidSessionCode = "92";
  upiEncryptKey = "0d097c5eeef2466e";
  langStaticKey = "laN@Jv8k#Omnip$b";
  crmKey = "WsA&tg3q@oil2sD"
  dummyImeiNo = "525252525252525252" //TODO:need to remove just for checking
  bbpsPoolAcc ="03855039095001"
  generateRepayPDFFormatObj = {
    BANK_DETAILS: "BANK_DETAILS",
    TO_WHOM_IT_MAY_CONCERN: "TO_WHOM_IT_MAY_CONCERN",
    THIS_IS_CERTIFIED_THAT: 'THIS_IS_CERTIFIED_THAT',
    RESIDENCE_OF: "RESIDENCE_OF",
    ADDRESS: "ADDRESS",
    ADDRESS_CORRESPONDANCE: "ADDRESS_CORRESPONDANCE",
    FACILITY_MSG: "FACILITY_MSG",
    ON: "ON",
    PAID_INTEREST_MSG: "PAID_INTEREST_MSG",
    BELOW_DETAILS: "BELOW_DETAILS",
    AMOUNT_PAID_FROM: "AMOUNT_PAID_FROM",
    TO: "TO",
    PRINCIPAL_INTEREST: "PRINCIPAL_INTEREST",
    INTEREST: "INTEREST",
    RS: "RS",
    CERTIFICATE_ISSUE_REQUEST: "CERTIFICATE_ISSUE_REQUEST",
    EXECUTIVE_CREDIT: "EXECUTIVE_CREDIT"
  }

//  DSC_Key = "MIIEpAIBAAKCAQEAxRPHFOIgTk0MoyDJ42Ff94veZzXFgdNGeIrHuJaToRyjwxPcfXfSn5y0l+KWljQGsekD7VaoCC1WcE/e8ClsWlpypdXOYp1KbrlffbjlfNiIGbzk6P23dsjtuC386Zt+mT9ZCpQigRStsA1vWQKt3CMDfxZIJkMUfaY5JexBXEpug1qRpJXdJY488Z7x+JeZsslGPRbGfIEBFokO0I2jD92NsKpKa9lubRDXIBPpTqyHPg7hoxGZqSXpVgWYq/Dtu3cJHy5gKKoepyogknSZfm60Mt1QB29cmXLA/z6I+UBgXVhtvGokd1AE/9dzvaCE95EoqZS0TaeJ+OQA++jhuwIDAQABAoIBABxZXKPru0tILhnb15l2d8A7myyBlv22j0aRFWsUzfu5C52TjSjHRGxitbUQ39SPe1Rlo9j6RDBDmqbhS70vAup5uaWSp0jsPg7GFQRtb9A7sv2bfITqKlVTUKQpNAkZWGa3BBn6ISnW+FKA5umI8cre29vmL/lrtiuKQ7eUJVAfFqQgDklqes8Ytz2OSxn2HqOSWKstG2hlcKQEJZBkdT6yF95ZPZDgC8QhqnSH3MSzampMf0sZzpV7qF6wY8qDOReZ5hsBuOdB/oUPZYtQuHBikFbr1R2gzAIYU+aBeaiTYW/MBypA/1l0tfciUUzEpJ96mSkacCaq43VIxEGcq2ECgYEA9gqIqwK8isu1+HemMaI4icI19Vmh3gqcskJrqYVGxJemxnLjQTD2w40Vn8UPlRr//3QSCbkNTan/6jKvsoI5gV/iA+ZQShZvcebXjtGoTyIWSGjtcEcxqwn7BVflHJlb94dtB9znmnIY5VamdmRVVqmgXCfg6DfdXQziS9qNUikCgYEAzQ3h5KMYZ+fObZ46MgBrZHkMWUPmRg2KMoL0PW8RDrhRZJ7Db5C5X9ThmiPwEnikkiJAy+eGXDNMN4VKWquCIzvf0D7BfDz7rloYUHiYMhJ5dUn6Q62dbyatGhg0Zb9SuzExd9eTg0YKu1YNjK4Xa/YWgkp2MYrtOGBsZz0/eUMCgYEAkcbf/uLaLypPoO3TbGj/Mq/9JGd8/oAvI3czLvemXGi2CbKcb03Bh0+aVlV9zAx5TTPKVDRua2ukE3EApLV/uOXElibpv1vXoBbz9MzH+krqBPEWbYXhKcP6FMplFzLOSLTWpuf92YZstcVHT7JW1cgfGTsPiMdAwxcVJXhSbzECgYEAyquI9Jl6+t/zeQbl0Bv4CUNXQDdLNzwUtp4WV04aluj4kbIVyoRJpH1dSiNxGmChkEpIrwC0HRcaotmcRwezRa3dJg+Q34HK5GXqGEdJblwyLgojUJcdvwmEGAGKcHJsi9YwZZnuE9a7rrN8Cura/XsqfjaooYkFtC4hltzDis8CgYAVBqztRNY2ZP0LBiULZwvjwmN+8XpJjQ59TOfJUaaqwuYgcvc0T9JaE09EvTmtBfKcPQyXhnsLgqZ+aWN2podrCShVvT2rzpJBPqj8TL21AITo3H0W6XMU+yp4fVfi4L43UVikJzUwV2azVprx85svbUiab+6qNtCfj/hdaeUKEw=="
  DSC_Key = "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"
  /************************************************************* Omni Constants End******************************************************************************/
// ######################## BILL PAY ###############################################
clientid ="CDAJOM2G3G0O51ST"
bd_encyption_key ='3b2a47fdb06c54c7'
secretkey ="P2DZN5ZE7P9PJOGN0SUR0EOOI4NV4TEJR3XZ62RX4HHUE5F83051628083557057"




  /************************************************************* UPI Constants Start******************************************************************************/
  upiFrequencyList = [
    { "name": "ONETIME", "frequencyName": "ONE_TIME", "dayLimit": 0},
    { "name": "DAILY", "frequencyName": "DAILY", "dayLimit": 0},
    { "name": "WEEKLY", "frequencyName": "WEEKLY", "dayLimit": 7},
    { "name": "FORTNIGHTLY", "frequencyName": "FORTNIGHTLY", "dayLimit": 14},
    { "name": "MONTHLY", "frequencyName": "MONTHLY", "dayLimit": 30},
    { "name": "BIMONTHLY", "frequencyName": "BI_MONTHLY", "dayLimit": 60},
    { "name": "QUARTERLY", "frequencyName": "QUARTERLY", "dayLimit": 90},
    { "name": "HALFYEARLY", "frequencyName": "HALF_YEARLY", "dayLimit": 180},
    { "name": "YEARLY", "frequencyName": "YEARLY", "dayLimit": 365},
    { "name": "ASPRESENTED", "frequencyName": "ASPRESENTED", "dayLimit": 0}
  ]

  debitDayList = [
    { "debitName": "BEFORE", "value": "BEFORE" },
    { "debitName": "ON", "value": "ON" },
    { "debitName": "AFTER", "value": "AFTER" }
  ];

  QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
  QRCodeErrorDesc = "INVALID_QR_CODE_DESC";
  QRCodeDesc = "QR_CODE_DESC";
  ScanGalleryDesc = "SCAN_FROM_GALL_DESC";
  privacyPolicyURL = 'https://www.psbindia.com/document/customer-care/PSBPolicies/Policy_CRP_public.pdf';
  /************************************************************* UPI Constants Start******************************************************************************/

psbNewLogo = "data:image/png;base64,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"

}
