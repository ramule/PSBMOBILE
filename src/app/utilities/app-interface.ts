export interface IRequest {
    sourceIp:any;
    prefered_Language:any;
    entityId: any;
    deviceId: any;
    map: any;
  }

export interface IStatus {
    SUCCESS: number,
    ERR_CODE_BAD_REQUEST: number,
    ERR_CODE_UNAUTHORIZED: number,
    ERR_CODE_FORBIDDEN: number,
    ERR_CODE_NOT_FOUND: number,
    ERR_CODE_METHOD_NOT_ALLOWED: number,
    ERR_CODE_SERVER_ERROR: number,
    ERR_CODE_SERVER_UNAVAILABLE: number,
    ERR_CODE_TIMEOUT: number,
    ERR_CODE_UNKNOWN: number,
}


export interface UPIAccoutDetail  {
      
  // Acoount Detaills Keys
    "id": number;
    "paymentAddress": string; //"psp12@psb",
    "addressType": string; //"ACCOUNT",
    "isDefaultAccount": any; // null;
    "accountType": string; //"SAVINGS";
    "accountNo": string; //"857679479890125";
    "ifsc": string; //"AABF0009009";
    "aadhaarNo": any; // null;
    "iin": any; // null;
    "mmid": any; // null;
    "mobileNo": string; //"918657425953";
    "custName": string; //"ABC";
    "credType": string; //"OTP";
    "credSubType": any; // null;
    "credDlength": any; // null;
    "credDtype": any; // null;
    "atmCredType": any; // null;
    "atmCredSubType": any; // null;
    "atmDLength": any; // null;
    "atmDtype": any; // null;
    "isMpinSet": any; // null;
    "isAeba": any; // null;
    "lastSyncDate": any; // null;
    "lastSyncStatus": any; // null;
    "createdTime": number; // 1594027660000;
    "updatedTime": any; // null;
    "active": string; //"Y";
    "bankName": string; //"Mypsp2";
    "otpType": string; //"SMS";
    "otpSubType": string; //"otp";
    "otpDlength": string; //"6";
    "otpDtype": string; //"NUM";
    "mcc": any; // null;
    "isMerchantVpa": any; // null;
    "entityID": string; //"psb";
    "appID": string; //"psb";
    "maskedAccNo": string; //"XXXXXXXXXXX0125";
    "mbeba": string; //"Y";
    "balanceAmount": string; //"NA";
    "lastBalanceUpdate": string; //"NA";
    "defaultAccount": string; //"Y";
    "credPinType": string; //"NUM";
    "credPinSubType": string; //"SMS"
    
    // Only in addressList
    "isValid" : string;  // Y
    "onlycredit" : string;  // N
    "onlydebit" : string; // N
    "isfavourite" : string;  // N 
}

export interface UPIAccoutDetail2 {
      
  // Acoount Detaills Keys

    "mbeba": any; // null,
    
    "isDefaultAccount": string; // "Y",
    
    "credDLength": string; // "4",
    
    "bankName": any; //null,
    
    "mcc": string; // "0000",
    
    "credDType": string; // "NUM",
    
    "atmDType": string; // "NUM",
    
    "lastBalanceUpdate": string; // "NA",
    
    "credSubType": string; // "MPIN",
    
    "atmCredSubType": string; // "ATMPIN",
    
    "ifsc": string; // "PSB00008498",
    
    "accType": string; // "CURRENT",
    
    "otpCredSubType": string; // "otp",
    
    "atmDLength": string; // "4",
    
    "accNum": string; // "849820110000266",
    
    "addressType": string; // "ACCOUNT",
    
    "isValid": string; // "Y",
    
    "atmCredType": string; // "PIN",
    
    "active": string; // "Y",
    
    "otpCredType": string; // "SMS",
    
    "defaultAccount": string; // "true",
    
    "custName": string; // "psb_mw_test",
    
    "balanceAmount": string; // "4",
    
    "otpCredDLength": string; // "6",
    
    "credType": string; // "NUM",
    
    "otpCredDType": string; // "NUM"

    "maskedAccountNumber": string; // "XXXX"

    "showBalance":boolean;
    
    "maskedBalance":string;

    "debitFreezeStatus": string;

    "isUpiGlobalActive": string;

    "isBalanceUpdated": boolean;

    "currentLimit":any;
    
    "accTypeActual":any;

    "accountLinkedTime": any;

    "isPSBAccount":boolean;
}

export interface addresslist  {
  "paymentAddress": string; // "psp12@psb";
  "default": string; // "N",
  "limit": string; // "40000",
  "currentLimit":string;
  "accounts" :Array<UPIAccoutDetail2>
  "frequency": any;
  "vpaQrFlag": any;
  "vpaSelected":boolean;
}


export interface UPITransaction  {
  "TOACCOUNT": string; // "857679479890130"
  "REMITTERMOBILE": any; // "918651125953" NULL
  "ERRORMSG": string; // "NA"
  "FROMACCOUNT": any; // "849820110000266" NULL
  "BANKNAME": string; // "849820110000266"
  "REMARKS": string; // "CERT5"
  "TXNID": string; // "ba"
  "RRN": string; // "PSB8c8598b9a000947abb69f2a85949a2e8"
  "PAYEEIFSC": string; // "021100094888"
  "DATETIME": string; // "CERE0876543"
  "BENMOBILE": string; // "2020-12-22 13:41:04"
  "AMOUNT": string; // "30.00"
  "TRNSTATUS": string; // "COMPLETED"
  "PROCESSINGCODE": string; // "UPI_TRANSFER"
  "ERROR": string; // "NA"
  "PAYEEADDR": string; // "xyz@centalbank"
  "PAYERADDR": string; // "psb12@psb"
  "TYPE": string; // "DR"
  "REMITTERNAME": string; // "pqr"
  "MASKEDFROMACCOUNT": string; // "XXXXXXXXXXX0266"
  "MASKED_TO_ACCOUNT": string; // "XXXXXXXXXXX0130"
  "BENNAME": string; // "abc in"
  "PAY_MODE": any; // null
  
}
     
export interface DtlStatementData{
  "START_DATE" : any;//   8
  "END_DATE" : any;//   8
  "LOW_AMOUNT" : any;//   17
  "HIGH_AMOUNT" : any;//   17
  "FIRST_CHEQUE_NUMBER"  : any;//  8
  "LAST_CHEQUE_NUMBER" : any;//   8
  "NUMBER_OF_RECORDS_REQUESTED" : any;//   2
  "SORT_CRITERIA" : any;//   1
  "CRDR_FLAG" : any;//    1
  "LAST_TRANSACTION_DATE" : any;//   8
  "LAST_TRANSACTION_ID" : any;//   9
  "LAST_PART_TRANSACTION_NUMBER" : any;//   4
  "LAST_POSTING_DATE" : any;//   14
  "LAST_BALANCE" : any;//   17
}
      


// TOACCOUNT
// REMITTERMOBILE
// ERRORMSG
// FROMACCOUNT
// BANKNAME
// REMARKS
// TXNID
// RRN
// PAYEEIFSC
// DATETIME
// BENMOBILE
// AMOUNT
// TRNSTATUS
// PROCESSINGCODE
// ERROR
// PAYEEADDR
// PAYERADDR
// TYPE
// REMITTERNAME
// MASKEDFROMACCOUNT
// MASKED_TO_ACCOUNT
// BENNAME
// PAY_MODE

// "TOACCOUNT": "857679479890130",
//       "REMITTERMOBILE": "918651125953",
//       "ERRORMSG": "NA",
//       "FROMACCOUNT": "",
//       "BANKNAME": "CERT5",
//       "REMARKS": "ba",
//       "TXNID": "PSB8c8598b9a000947abb69f2a85949a2e8",
//       "RRN": "021100094888",
//       "PAYEEIFSC": "CERE0876543",
//       "DATETIME": "2020-12-22 13:41:04",
//       "BENMOBILE": null,
//       "AMOUNT": "30.00",
//       "TRNSTATUS": "COMPLETED",
//       "PROCESSINGCODE": "UPI_TRANSFER",
//       "ERROR": "NA",
//       "PAYEEADDR": "xyz@centalbank",
//       "PAYERADDR": "psb12@psb",
//       "TYPE": "DR",
//       "REMITTERNAME": "pqr",
//       "MASKEDFROMACCOUNT": "XXXXXXXXXXX0266",
//       "MASKED_TO_ACCOUNT": "XXXXXXXXXXX0130",
//       "BENNAME": "abc inb"