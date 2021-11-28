/**
 * scan QRCode Model
 */
export class ScanQrCode implements Deserializable {
    ver: Number;
    mode : string;
    orgId : string;
    tid : string;
    tr : string;
    tn : string;
    category : string;
    url : string;
    pa : string;
    pn : string;
    mc : string;
    am : string;
    mid : string;
    msid : string;
    mtid : string;
    qrMedium : string;
    QRexpire : string;
    sign : string;
    setKey: string;
    deserialize(input: any): this {
        console.log("input mode", input);
        Object.assign(this, input);
        return this;
    }
  }

  export class BharatQRModel implements Deserializable {
    setKey: any;
    setLength : any;
    setValue : any;
    setAccountNo : any;
    qrIfsc : any;
    setPaymentAddress: any;
    addKeyArray: any[];
    addLengthArray: any[];
    addValueArray: any[];
    deserialize(input: any): this {
        console.log("input mode", input);
        Object.assign(this, input);
        return this;
    }
  }
  
  export interface Deserializable {
    deserialize(input: any): this;
  }