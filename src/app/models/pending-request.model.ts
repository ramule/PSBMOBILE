/**
 * Pending Request Model for UPI
 */

export class PendingRequest implements Deserializable {
  rrn: any
  pendingWithMe: PendingWithMe[]=[];
  pendingByPayer: PendingByPayer[]=[];
  deserialize(input: any) {
    Object.assign(input);
    this.pendingWithMe = input.PENDINGBYME.map(pendingWithMe => new PendingWithMe().deserialize(pendingWithMe));
    this.pendingByPayer = input.PENDINGBYPAYER.map(pendingByPayer => new PendingByPayer().deserialize(pendingByPayer));
    return this;
  }

}

export class PendingByPayer implements Deserializable {
  public payeeAddress: string;
  public amount: string;
  public payerAddress: string;
  public expiredDate: string;
  public payerName: string;
  public requestedDate: string;
  public refId: string;
  public remarks: string;
  public txnId: string;
  public payerAccount :string;
  public maskedPayerAccount:string;
  public accountType:string;
  public notificationType :string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }


}

export class PendingWithMe implements Deserializable {
  public recurrenceRuleType: number;
  public minAmount: string;
  public purpose: string;
  public recurrencePattern: number;
  public expiredDateTimeStamp : string;
  public expiredDate: string;
  public credDLength: string;
  public bankName: string;
  public notificationType: string;
  public isActive: string;
  public credDType: any;
  public frequency: string;
  public payeeName: string;
  public credSubType: string;
  public requestedDate: string;
  public initiatedBy: string;
  public amount: string;
  public amountRule: string;
  public validityEnd: string;
  public recurrenceRuleValue: any;
  public validityStart: string;
  public payerAccount: string;
  public payeeAddress: string;
  public payerAddress: string;
  public payerIfsc: string;
  public credType: string;
  public refId: string;
  public remarks: string;
  public txnId: string;
  public status: string;
  public maskedPayerAccount:String;
  public accountType:string;
  public isGstEnable:string ="";
  public invoiceDate:string ="";
  public invoiceName:string ="";
  public invoiceNumber:string ="";
  public isSeen:boolean = false;
  public payeeCode:string = "";
  public refUrl:string = "";

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
export interface Deserializable {
  deserialize(input: any): this;
}