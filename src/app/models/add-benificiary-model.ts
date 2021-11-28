/**
 * UPI AddBenificiary Model
 */
export class AddBenificiary implements Deserializable {
  payeeName:string;
  nickName: string;
  isFavourite: boolean;
  payeeVPA: string;
  accNum: string;
  ifsc: number;
  mmid: string;
  
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export interface Deserializable {
  deserialize(input: any): this;
}