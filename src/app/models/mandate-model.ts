/**
 * Mandate Model
 */

export class MandateList implements Deserializable {
    MandateList: MandateList[];

  deserialize(input: any): this {
    this.MandateList = input.map(mandate => new Mandate().deserialize(mandate));
    return this;
  }
}

export class Mandate implements Deserializable {
  mandateVpa: string;
  purpose: string;
  mandateName: string;
  payeeCode: string;
  credDLength: any
  shareToPayee: string;
  txnType: string;
  bankName: string;
  error: string;
  credDType: any
  frequency: string;
  payeeName: string;
  umn: string;
  credSubType: any
  payerName: string;
  createdTime: string;
  refUrl: string;
  refID: string;
  invoiceLink: string;
  initiatedBy: string;
  amount: string;
  merchantCode: string;
  orgTxnId: string;
  amountRule: string;
  validityEnd: string;
  isRevokable: string;
  mobileNo: string;
  validityStart: string;
  executable: string;
  errorMsg: string;
  rrn: string;
  payerAccount: string;
  payeeAddress: string;
  payerAddress: string;
  payerIfsc: string;
  credType: any
  createdBy: string;
  payeeIfsc: string;
  payerCode: string;
  payeeAccount: string;
  remarks: string;
  txnId: string;
  status: string;
  recurrenceRuleType:string = "";
  recurrenceRuleValue:string ="";
  mandateInitiatedBy:string="";
  noOfDebits:string ="";
  debitDay:string = "";
  completedDebits:string ="";
  recurrencePattern:string ="";
  requestExpireTime:string = "";
  expiredDate:string="";
  refURL:string = "";
  mandateTxnID:string = "";
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}



export class MandatePayment implements Deserializable {
  fromUPIId: string;
  payeeName: string;
  toPayee: string;
  amount: string;
  frequency: string;
  validityStartDate: string;
  validityEndDate : string;
  debitDay:string;
  remarks:string;
  notifyPayee:string;
  selectedVpa:any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}


export class MandateRequest implements Deserializable {
  requestedFromUPIId: string;
  payerName: string;
  depositToUPIId: string;
  amount: string;
  frequency: string;
  validityStartDate: string;
  validityEndDate : string;
  debitDay:string;
  remarks:string;
  selectedVpa:any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}


export class MandateCollect implements Deserializable {
  fromUPIId: string;
  payeeName: string;
  toPayee: string;
  amount: string;
  frequency: string;
  validityStartDate: string;
  validityEndDate : string;
  debitDay:string;
  remarks:string;
  notifyPayee:string;
  selectedVpa:any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}


export interface Deserializable {
  deserialize(input: any): this;
}