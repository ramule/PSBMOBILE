/**
 * UPI Complaint Model
 */
export class ComplaintList implements Deserializable {
    complaintList: ComplaintList[];
    
    deserialize(input: any): this {
      this.complaintList = input.map(complaint => new Complaint().deserialize(complaint));
      return this;
    }
  }
  
  /**
 * UPI Complaint Model
 */
export class Complaint implements Deserializable {
    feedbackTime:string;
    subject: string;
    customerEmail: string;
    complaintType: string;
    description: string;
    entityID: number;
    mobileNo: string;
    escalate: string;
    transactionID: string;
    complaintNo: number;
    rrn: string;
    status: string;
    txnAmount:string;
    payerAddr:string;
    transactionDate:string;
    payeeAddr:string;
    umn:string;
    refID:string;
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }
  
  export interface Deserializable {
    deserialize(input: any): this;
  }
