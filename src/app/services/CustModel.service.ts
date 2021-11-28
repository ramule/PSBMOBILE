import { Injectable } from '@angular/core';
import { UPIAccoutDetail } from '../utilities/app-interface';


Injectable({
    providedIn: 'root'
})

// declare const modal: UPIAccouts;
export class CustModal  {
    public addressList : any=[];
    constructor(apiAddressArrayString:Array<string>) {
        
        
        // "psp12@psb|PSB00008498|849820110000266|Y|PIN|MPIN|4|NUM|null|Y|Y|N|"
        // paymentAddress|ifsc|accountNo|isValid|credType|credSubType|credDlength|creddType|bankname|onlycredit|onlydebit|isfavourite|regmobformat
        

        apiAddressArrayString.forEach(element => {
            let sub = element.split("|");
            let temp : UPIAccoutDetail = {
                "id": 0 ,
                "paymentAddress": "", //"psp12@psb",
                "addressType": "", //"ACCOUNT",
                "isDefaultAccount": null, // null;
                "accountType": "", //"SAVINGS";
                "accountNo": "", //"857679479890125";
                "ifsc": "", //"AABF0009009";
                "aadhaarNo": null, // null;
                "iin": null, // null;
                "mmid": null, // null;
                "mobileNo": "", //"918657425953";
                "custName": "", //"ABC";
                "credType": "", //"OTP";
                "credSubType": null, // null;
                "credDlength": null, // null;
                "credDtype": null, // null;
                "atmCredType": null, // null;
                "atmCredSubType": null, // null;
                "atmDLength": null, // null;
                "atmDtype": null, // null;
                "isMpinSet": null, // null;
                "isAeba": null, // null;
                "lastSyncDate": null, // null;
                "lastSyncStatus": null, // null;
                "createdTime": 0, // 1594027660000;
                "updatedTime": null, // null;
                "active": "", //"Y";
                "bankName": "", //"Mypsp2";
                "otpType": "", //"SMS";
                "otpSubType": "", //"otp";
                "otpDlength": "", //"6";
                "otpDtype": "", //"NUM";
                "mcc": null, // null;
                "isMerchantVpa": null, // null;
                "entityID": "", //"psb";
                "appID": "", //"psb";
                "maskedAccNo": "", //"XXXXXXXXXXX0125";
                "mbeba": "", //"Y";
                "balanceAmount": "", //"NA";
                "lastBalanceUpdate": "", //"NA";
                "defaultAccount": "", //"Y";
                "credPinType": "", //"NUM";
                "credPinSubType": "", //"SMS"
                "isValid" : "",
                "onlycredit" : "",
                "onlydebit" : "",
                "isfavourite" : "",  
            };
            
            console.log(temp);
            
            temp.paymentAddress = sub[0]; 
            temp.ifsc = sub[1]; 
            temp.accountNo = sub[2]; 
            temp.accountNo = sub[3]; 
            temp.isValid = sub[4]; 
            temp.credType = sub[5]; 
            temp.credSubType = sub[6]; 
            temp.credDlength = sub[7]; 
            temp.credDtype = sub[8]; 
            temp.bankName = sub[9]; 
            temp.onlycredit = sub[10]; 
            temp.onlydebit = sub[11]; 
            temp.isfavourite = sub[12]; 
            this.addressList.push(temp)
        });
        console.log(this.addressList);
    }

    getAddreList(): Array<any> {
        return this.addressList;
    }
}
