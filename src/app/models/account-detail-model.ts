/**
 * UPI Account Detail Model
 */
export class UPIBankAccount implements Deserializable {
    mbeba : any;
    isDefaultAccount : string;
    bankName : string;
    mcc : string;
    lastBalanceUpdate : string;
    ifsc : string;
    accType : string;
    accNum : string;
    addressType : string;
    isValid : string;
    active : string;
    defaultAccount : string;
    custName : string;
    balanceAmount : string;
    maskedAccountNumber : string;
    paymentAddress : string;
    isUpiGlobalActive : string;
    debitFreezeStatus : string;
    
    credType:string;
    credDType:string;
    credSubType:string;
    credDLength : string;
    
    atmDType:string;
    atmCredType:string="";
    atmCredSubType:string="";
    atmDLength:string;
    
    otpCredType:string; 
    otpCredDType:string;
    otpCredSubType:string;
    otpCredDLength:string;
    
    
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }
  
  export interface Deserializable {
    deserialize(input: any): this;
  }