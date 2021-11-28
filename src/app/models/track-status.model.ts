// ":{"subject":"testRaise","complaintType":"Transaction","customerEmail":"infra@gmail.com","customerId":"","description":"baba","entityID":"psb","mobileNo":"918651125953","transactionID":"PSB8c8598b9a000947abb69f2a85949a2e8","rrn":"034400201470"}

/**
 * UPI Account Detail Model
 */
export class TrackStatus implements Deserializable {
    subject : any;
    complaintType : string;
    customerEmail : string;
    customerId : string;
    description : string;
    transactionID : string;
    rrn : string;
    txnAmount:string;
    payerAddress:string;
    payeeAddress:string;
    transactionDate:string;
    txnStatus:string;
    transactionType:string;
    payeeCode:string;
    umn:string;
    refID:string="";
    initiationMode:string="";
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }
  
  export interface Deserializable {
    deserialize(input: any): this;
  }