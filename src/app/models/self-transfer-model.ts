/* 
self transfer account list model for deposit and transfer account
*/
export class DepositAct implements Deserializable {
  depositAct: [];
  public accType: string;
  public accNum: string;
  public active: string;
  public addressType: string;
  public atmCredSubType: string;
  public atmCredType: string;
  public atmDLength: string;
  public atmDType: string;
  public balanceAmount: string;
  public bankName: string;
  public credDLength: string;
  public credDType: string;
  public credSubType: string;
  public credType: string;
  public custName: string;
  public defaultAccount: string;
  public ifsc: string;
  public isDefaultAccount: string;
  public isDeposit: string;
  public isSelected: string;
  public isValid: string;
  public lastBalanceUpdate: string;
  public maskedAccountNumber: string;
  public mbeba: string;
  public mcc: string;
  public otpCredDLength: string;
  public otpCredDType: string;
  public otpCredSubType: string;
  public otpCredType: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    this.depositAct = input;
    console.log("Deposit Model=> ",input);
    return this;
   }
}
  
/* 
Transfer Account model
*/

export class TransferAct implements Deserializable {
  transferAct: [];
  public accType: string;
  public accNum: string;
  public active: string;
  public addressType: string;
  public atmCredSubType: string;
  public atmCredType: string;
  public atmDLength: string;
  public atmDType: string;
  public balanceAmount: string;
  public bankName: string;
  public credDLength: string;
  public credDType: string;
  public credSubType: string;
  public credType: string;
  public custName: string;
  public defaultAccount: string;
  public ifsc: string;
  public isDefaultAccount: string;
  public isDeposit: string;
  public isSelected: string;
  public isValid: string;
  public lastBalanceUpdate: string;
  public maskedAccountNumber: string;
  public mbeba: string;
  public mcc: string;
  public otpCredDLength: string;
  public otpCredDType: string;
  public otpCredSubType: string;
  public otpCredType: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    this.transferAct = input;
    console.log("Transfer Model=> ",input)
    return this;
  }
}

export interface Deserializable {
    deserialize(input: any): this;
  }