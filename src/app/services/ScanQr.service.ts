import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { PluginService } from '../services/plugin-service';
import { CommonMethods } from '../utilities/common-methods';
import { ScanQrCode, BharatQRModel } from '../models/scan-qrcode-model';
import { Location } from '@angular/common';
declare var scanQR: any;
declare var showToastMessage: any;

@Injectable({
  providedIn: 'root'
})

export class ScanQrService {
  qrModel: any = {};
  popupData: any = {};
  FinalQR: any;
  BharatQRAryList = [];
  innerArray: any;
  arrayList: Array<BharatQRModel> = [];
  addKeyArray: any[];
  addLengthArray: any[];
  addValueArray: any[];
  qrImage: any = "";
  qrCodeType: any;
  qrCodeMode: any;
  constructor(public DataService: DataService,
    public plugin: PluginService,
    public commonMethod: CommonMethods,
    public router: Router,
    private location: Location) { }


  getQrResponse(QRScanText, medium?) {
    var qrJSON = {}
    // QRScanText = "upi://pay?ver=01&mode=16&orgId=159992&tid=NPCI8cdd79c7391467cb76988fe8bbccebc&tr=MerRef123&tn=Merchant%20QR&category=02&url=https://www.test.com&pa=merchant@npci&pn=Merchant%20Name&mc=5411&am=1000.00&mid=12343&msid=56789&mtid=12343&qrMedium=03&QRexpire=2019-06- 11T13:21:55+05:30&sign=MEYCIQDaaEAL06Vsn9aNIarP7dai8/h9cMrVvuYe+uly0rYIMwIhAPRjz6Cj1ZodDLf/NZIGYnW4gypE84DNDzRETQTY1IpM"
    // QRScanText = "000201010212021647250010000000120415526550000000001061661000900000000310823ICIC000123812380151933726360010A0000005240110anjali@upi0204null27720010A0000005240135bivek1234567890123456789012345520130215http://i.org.in28300010A000000524011270308093964452045411530335654030.05802IN5909BivekRath6006MUMBAI610640006762410203***0403***0603***0708000000030804test63047eff";
    // QRScanText = "upi://mandate?ver=01&mode=24&orgId=159991&tid=NPCI8cdd79c7391467cb76988fe8bbccebc&tr=MerRef123&tn=Mandate%20QR&category=02&url=https://www.test.com&pa=9423235696@psb&pn=Merhcant%20Mandate&mc=5411&am=1000.00&cu=INR&mid=12343&mtid=12343&qrMedium=06&QRexpire=2019-06-11T13:21:55+05:30&txnType=CREATE&mn=Test%20Mandate&type=&validitystart=11062019&validityend=11102020&amrule=MAX&recur=ONETIME&rev=Y&share=Y&block=Y&sign=MEYCIQDaaEAL06Vsn9aNIarP7dai8/h9cMrVvuYe+uly0rYIMwIhAPRjz6Cj1ZodDLf/NZIGYnW4gypE84DNDzRETQTY1IpM"
    console.log(QRScanText);
    if (!this.commonMethod.validateEmpty(QRScanText)) {
      var QRScanText = QRScanText.replace(/%20/g, " ");
      var QRScanText = QRScanText.replace(/%40/g, "@");
      var QRScanText = QRScanText.replace(/%/g, " ");
      if (QRScanText.substring(0, 3) === "upi") {
        var filterQrText = QRScanText.includes("?") ? QRScanText.split("?") : ''; //Split QRCode on basis of ? to get QRTpye and QRMode
        var splitQrType = filterQrText[0].split("://");
        this.qrCodeMode = splitQrType[0];
        this.qrCodeType = splitQrType[1];
        // if (this.qrCodeType == QRType) {
        var filterQrText = filterQrText[1].split("&");
        console.log(filterQrText);
        filterQrText.forEach(qrText => {
          var splitQrText = qrText.split("=");
          var qrLabel = splitQrText[0];
          var qrData = splitQrText[1];
          qrJSON[qrLabel] = qrData;
        });
        let addScanQrCode: ScanQrCode = new ScanQrCode().deserialize(qrJSON);
        let qrScanData = this.validateScanData(addScanQrCode, medium);
        console.log("addScanQrCode => ")
        console.log(addScanQrCode);
        console.log('qrScanData => ');
        console.log(qrScanData);
        return qrScanData;
        // } else {
        //   return false;
        // }
      } else if (QRScanText.substring(0, 2) === '00') {
        this.qrModel = {};
        var scanData = QRScanText.substring(6);
        this.parseBharatQr(scanData, false, medium);
        return this.qrModel;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validateScanData(scanData, medium) {
    //Common
    scanData.qrMedium = medium ? '01' : '00';
    this.mandatoryValidation(this.nullified(scanData.ver)); // Mandatory,  QR Version.
    let scanModeFlag = this.scanModeValidation(scanData.mode); //Mandatory 01 = Static QR Code (Offline) 02 = Static Secure QR Code (Offline) 04 = Intent 05 = Secure Intent 06 = NFC(Near field communication) 07= BLE (Bluetooth) 08= UHF (ultra-high frequency) 13= Static Secure QR Mandate (Offline) 14= Restricted 15= Dynamic QR Code (Offline) 16= Dynamic Secure QR Code (Offline) 17= Dynamic Secure QR Mandate (Offline) 18= ATMQR (Dynamic) 19 = Online STATIC QR Code 20 = Online STATIC Secure QR Code 21 = Online Static QR Mandate 22 = Online Dynamic QR Code 23 = Online Dynamic Secure QR Code 24= Online Dynamic Secure QR Code Mandate.
    if (this.DataService.isDeepLinkIntentCalled == true) {
      scanData.mode = '04';
    }else if (!scanModeFlag) {
      if (scanData.sign) {
        scanData.mode = '02'
      } else {
        scanData.mode = '01'
      }
    } 
    this.nullified(scanData.purpose);//conditional, default 00 01 – SEBI 02 - AMC 03 - Travel 04 – Hospitality 05 - Hospital 06 - Telecom 07- Insurance 08 - Education 09 - Gifting 10 - BBPS 11- Global UPI 12 - Metro ATM QR 13 - Non-metro ATM QR 14 – SI 15 – Corporate disbursement
    this.validator(this.nullified(scanData.orgId), 6, 12);// conditional, validation 6-12 char, Org Id of the acquiring bank/ PSP
    this.validator(this.nullified(scanData.tid), 35, 35);//optional, validation 35 char, Transactions ID must be PSP Generated.
    this.mandatoryValidation(this.validator(this.nullified(scanData.tr), 1, 35));//Mandatory for Dynamic, validation max 35 char Transactions reference no.
    this.validator(this.nullified(scanData.tn), 0, 50);//Optional Validation Max 50 Transaction Note
    this.nullified(scanData.catagory); //Mandatory in case of URL Present, 01-Advertisement 02- Invoice
    this.validator(this.nullified(scanData.url), 0, 99);// Optional, Validation Max 99 char , Transaction related URL like Invoice.
    this.mandatoryValidation(this.validationForVPA(this.nullified(scanData.pa)));// Mandatory Validation Max 255 Char, UPI Payment Address
    this.validator(this.mandatoryValidation(this.nullified(scanData.pn)), 1, 99);// Mandatory Validation Max 99, Payee Name
    this.mandatoryValidation(this.validator(this.nullified(scanData.mc), 4, 4));// Mandatory Validation 4 digit num, Payee Merchant Code default 0000
    this.nullified(scanData.am);//Optional Validation 2 digit after decimal, Transaction Amount, If ‘am’ is not present (static) or If ‘mam’ is populated and ‘am’ value is non-zero (dynamic) then ‘am’ field is editable. If “Purpose = 11”, this param is optional
    this.nullified(scanData.mam);//Optional, Validation 2 digit after decimal, It should always be an INR value greater than zero. Minimum Amount.
    this.validator(this.nullified(scanData.mid), 0, 20);//Optional, Validation Max 20 Char, Merchant ID shall be passed in this tag.
    this.validator(this.nullified(scanData.msid), 0, 20);//Optional, Validation Max 20 Char, Store ID shall be passed in this tag.
    this.validator(this.nullified(scanData.mtid), 0, 20);//Optional, Validation Max 20 Char, Terminal ID shall be passed in this tag.
    this.nullified(scanData.enTips);//Optional, Indicates whether the consumer should be prompted to enter tip.1. If enTips=Y means, payer psp should prompt for tip amount on the app. 2. PSP to capture this value and add the same to the amount in “am” field for debit while constructing ReqPay API to UPI.
    this.nullified(scanData.qrMedium); //Mandatory, This field indicates the Source channel i.e. creation point of the string. 01 - PICK FROM GALLERY 02 - APP 03 – POS 04 - PHYSICAL 05– ATM 06 – WEB To generate the string, code 02 to 06 to be used. Code 01 – Pick from Gallery, applicable only to Payer PSP to identify and pass
    this.validator(this.nullified(scanData.invoiceName), 0, 99);//Optional, Validation Max 99 alphaNum, used to capture the bill/ invoice customer name.
    this.nullified(scanData.QRexpire);//Optional, Dynamic or Static QR – QR expiry date & time.
    this.nullified(scanData.QRts);//Optional, This is the time stamp when the QR was created.
    this.validator(this.nullified(scanData.split), 0, 255);//Optional, Validation Max 255, It will contain the split details of amount. The PSP must compute the Amount value & Tip amount to show the final amount to customer for PIN authorization
    this.validator(this.nullified(scanData.pinCode), 0, 10);//Optional, Validation Max 10 numeric, Zip code or Pin code or Postal code of the merchant.
    this.nullified(scanData.Tier);//Optional, Denotes the tier of the city on basis of population TIER1| TIER2| TIER3| TIER4| TIER5| TIER6
    this.nullified(scanData.txnType);//optional, txn type which denote type of txn PAY/COLLECT/CREATE/UPDATE/REVOKE
    this.nullified(scanData.Consent);//optional, The consent type denotes the purpose for which the customer’s consent is being taken.

    //Mandate Specific
    this.validator(this.nullified(scanData.mn), 1, 99);// Conditional(Mandate), Validation Max 99 char, Mandate name specifies the purpose of mandate
    this.validator(this.nullified(scanData.type), 1, 99);// Conditional(Mandate), Validation Max 99 char, Future Use
    this.nullified(scanData.validitystart); //Conditional (Mandatory for Mandate), Defines start time of mandate validity
    this.nullified(scanData.validityend); //Conditional (Mandatory for Mandate), Defines end time of mandate validity
    this.nullified(scanData.amrule);//Conditional(Mandate) ‘MAX’ or ‘EXACT’ rule applied to mandate Default 'MAX'
    this.nullified(scanData.recur); //Conditional (Mandatory for Mandate) , Specifies the frequency of mandate debit (ONETIME|DAILY|WEEKLY|FORTNIGHTLY| MONTHLY| BIMONTHLY|QUARTERLY|HALFYEARLY|YEARLY| ASPRESENTED”)
    this.validator(this.nullified(scanData.recurvalue), 1, 99);// Conditional(Mandate), Validation Max 99 char, Specifies date along with 'recurtype' for debit (Future Use)
    this.nullified(scanData.recurtype);// Conditional(Mandate), Can have values: (BEFORE|ON|AFTER), Specifies date along with 'recurvalue' for debit (FOR FUTURE USE)
    this.nullified(scanData.rev);// Conditional(Mandate), Revocable tag can be passed as Y/N.In case this tag is not present in the QR, App should by default pass the value as ‘Y’
    this.nullified(scanData.share);// Conditional(Mandate), Share to Payee option can be given as Y/N. In case the tag is not present in the QR, customer will have the option to opt for the same in the app.
    this.nullified(scanData.block);// Conditional(Mandate), For Future Use. Presently all the mandates will be with BLOCK= Y (this field is removed in QR 2.0 version, still older version1.0 supports )
    this.validator(this.nullified(scanData.umn), 1, 20);// Conditional(Mandate), Validation Max 35 char, Unique mandate number shared by payer for the payee to initiate the debit
    this.validator(this.nullified(scanData.skip), 0, 2);// Optional (mandate), Validation Max 2 char, (future use) mandate can be executed for a non –registered mandate i.e. mandate is not present with Payee PSP

    //IQR Specific
    this.validator(this.nullified(scanData.cu), 3, 3);//Optional, Validation 3 digit aplha code, Currency Code of transaction.
    this.validator(this.nullified(scanData.cc), 3, 3);//Conditional(iQR), Validation 3 digit numeric, Indicates the country code of the merchant.
    this.validator(this.nullified(scanData.bAm), 2, 2);// Conditional(Mandatory for IQR), Validation 2 digit after decimal, contain the purchase amount populated by merchant
    this.validator(this.nullified(scanData.bCurr), 3, 3);// Conditional(Mandatory for IQR), Validation 3 digit alpha value ,display a recognizable currency to the consumer whenever an amount is being displayed

    //GST Specific
    this.nullified(scanData.gstBrkUp);// Conditional(Mandatory for GST), Contain the breakup of GST
    if (scanData.hasOwnProperty('gstBrkUp')) {
      var splitAmount = {};
      if (scanData.gstBrkUp.includes("|")) {
        var gstBrkUpText = scanData.gstBrkUp.split("|");
        gstBrkUpText.forEach(gstBrk => {
          var gstBrkText = gstBrk.split(":");
          var gstBrkLabel = gstBrkText[0];
          var gstBrkData = parseFloat(gstBrkText[1]).toFixed(2);
          splitAmount[gstBrkLabel] = gstBrkData;
        });
        scanData.splitAmount = splitAmount;
      } else {
        var gstBrkUpText = scanData.gstBrkUp;
        var gstBrkText = gstBrkUpText.split(":");
        var gstBrkLabel = gstBrkText[0];
        var gstBrkData = parseFloat(gstBrkText[1]).toFixed(2);
        splitAmount[gstBrkLabel] = gstBrkData;
        scanData.splitAmount = splitAmount;
      }
    }
    this.validator(this.nullified(scanData.invoiceNo), 3, 20);//Conditional(Mandatory for GST), Validation Max 20 char AlphaNumeric used to capture the bill/ invoice no.
    this.nullified(scanData.invoiceDate);//Conditional(Mandatory for GST),  used to capture the bill/ invoice date.
    this.nullified(scanData.gstIn);// Conditional(GST) The merchant populate GSTIN value under this tag.
    // Secure QR (For all QR Type)
    // if(scanData.sign.length != 0) {
    // }
    if (this.DataService.isDeepLinkIntentCalled == true && scanData.sign) {
      scanData.mode = '05';
    } else {
      this.nullified(scanData.sign);// Mandatory Digital Signature needs to be passed in this tag. (It is used for Securing the String)
    }
    this.nullified(scanData.query);//Optional, Validation Max 255 char, This is for future use in JSON format. We can add multiple fields basis requirements.
    scanData.qrType = scanData.gstIn ? 'GST' : this.qrCodeType;
    scanData.qrMode = this.qrCodeMode
    console.log("ScanUPIQRCodeData", scanData)
    return scanData;
  }

  validator(input, minCond, maxCond) {
    if (null != input) {
      if (input.length >= minCond && input.length <= maxCond) {
        return input;
      } else {
        // this.showPopup("inValidQrCode", "");
        return input;
      }
    }
    return input;
  }

  mandatoryValidation(input) {
    if (null == input || input == '') {
      // this.showPopup("inValidQrCode", "");
      //Utilities.showCustomDialog(context,customDialogClick,"QR validation failed",Constants.ErroDialogTag.QRErrorTag,"OK","");
      return input;
    } else {
      return input;
    }
  }

  scanModeValidation(mode) {
    if (null == mode || mode == '' || mode == undefined) {
      // this.showPopup("inValidQrCode", "");
      //Utilities.showCustomDialog(context,customDialogClick,"QR validation failed",Constants.ErroDialogTag.QRErrorTag,"OK","");
      return false;
    } else {
      return true;
    }
  }

  nullified(input) {
    if (null == input || input == '') {
      // this.showPopup("inValidQrCode", "");
      return "";
    } else {
      return input;
    }
  }

  validationForVPA(vpa) {
    if (null != vpa) {
      let at = '@';
      let count = 0;
      for (let i = 0; i < vpa.length; i++) {
        if (vpa.charAt(i) == at) {
          count++;
        }
      }
      if (count == 1 && vpa.length >= 0 && vpa.length <= 255) {
        return vpa;
      } else {
        // this.showPopup("inValidQrCode", "");
        return vpa;
      }
    }
    return vpa;
  }

  parseBharatQr(scanData, inner, medium) {
    this.arrayList = [];
    this.FinalQR = '';
    for (let j = 0; j < scanData.length;) {
      let bharatQRModel = new BharatQRModel();
      bharatQRModel.setKey = scanData.substring(j, j + 2);
      //Check for Valid key
      // if (!validKey(bharatQRModel.setKey, context)) {
      //   Toast.makeText(context, context.getString(R.string.msg_invalid_bharat_qr), Toast.LENGTH_SHORT).show();
      //   this.qrModel.isValid(false);
      //   break;
      // }
      // alert(bharatQRModel.setKey);
      j = j + 2;
      bharatQRModel.setLength = parseInt(scanData.substring(j, j + 2));
      j = j + 2;
      bharatQRModel.setValue = scanData.substring(j, j + bharatQRModel.setLength);
      j = j + bharatQRModel.setLength;

      if (inner) {
        this.FinalQR = this.FinalQR + "\n\t\t\t" + bharatQRModel.setKey + "  " + bharatQRModel.setLength + "  " + bharatQRModel.setValue;
      } else {
        this.FinalQR = this.FinalQR + "\n" + bharatQRModel.setKey + "  " + bharatQRModel.setLength + "  " + bharatQRModel.setValue;
      }

      if (bharatQRModel.setKey === "01") {
        this.qrModel.qrInitiationMode = bharatQRModel.setValue;
      }
      if (bharatQRModel.setKey === "08") {
        if (bharatQRModel.setLength > 11) {
          //Set IFSC
          this.qrModel.qrIfsc = bharatQRModel.setValue.substring(0, 11);
        }
        if (bharatQRModel.setLength > 12 && this.qrModel.qrIfsc.length == 11) {
          //Set Account No.
          this.qrModel.qrAccountNo = bharatQRModel.setValue.substring(11, bharatQRModel.setValue.length);
        }
      } else if (bharatQRModel.setKey === "26" || bharatQRModel.setKey === "27" || bharatQRModel.setKey === "28" || bharatQRModel.setKey === "62") {
        this.innerArray = this.parseBharatQr(bharatQRModel.setValue, true, medium);
        this.addKeyArray = [];
        this.addLengthArray = [];
        this.addValueArray = [];
        for (let p = 0; p < this.innerArray.length; p++) {
          this.addKeyArray.push(this.innerArray[p].setKey);
          this.addLengthArray.push(this.innerArray[p].setLength);
          this.addValueArray.push(this.innerArray[p].setValue);
        }

        if (bharatQRModel.setKey === "26") {
          if (this.addKeyArray.includes("00") && this.addValueArray.includes("A000000524")) {
            // var indexOfKey = 
            if (this.addKeyArray.includes("01") && this.addValueArray[this.addKeyArray.indexOf("01")].includes("@")) {
              //Set Payment Address
              this.qrModel.qrPaymentAddress = this.addValueArray[this.addKeyArray.indexOf("01")];
              console.log("setPaymentAddress", this.addValueArray[this.addKeyArray.indexOf("01")]);
            }
            if (this.addKeyArray.includes("02")) {
              //Set Minimum Amount
              this.qrModel.qrMinAmount = this.addValueArray[this.addKeyArray.indexOf("02")];
              console.log("setMinAmount", this.addValueArray[this.addKeyArray.indexOf("02")]);
            }
          }
        } else if (bharatQRModel.setKey === "27") {
          if (this.addKeyArray.includes("00") && this.addValueArray.includes("A000000524")) {
            if (this.addKeyArray.includes("01") && this.addValueArray[this.addKeyArray.indexOf("01")].length >= 4 && this.addValueArray[this.addKeyArray.indexOf("01")].length <= 35)
              //Set Reference Number
              this.qrModel.qrReferenceNo = this.addValueArray[this.addKeyArray.indexOf("01")];
            if (this.addKeyArray.includes("02"))
              //Set URL
              this.qrModel.qrUrl = this.addValueArray[this.addKeyArray.indexOf("02")];
          }
        } else if (bharatQRModel.setKey === "28") {
          if (this.addKeyArray.includes("00") && this.addValueArray.includes("A000000524")) {
            if (this.addKeyArray.includes("01") && this.addValueArray[this.addKeyArray.indexOf("01")].length == 12) {
              //Set Aadhaar No
              this.qrModel.qrAadhaarNo = this.addValueArray[this.addKeyArray.indexOf("01")];
            }
          }
        } else if (bharatQRModel.setKey === "62") {
          if (this.addKeyArray.includes("08") && this.addLengthArray[this.addKeyArray.indexOf("08")] > 0) {
            //Set Remark
            this.qrModel.qrRemark = this.addValueArray[this.addKeyArray.indexOf("08")];
            if (this.qrModel.qrRemark == "***") {
              //Remark Editable
              this.qrModel.qrRemarkEditable = true;
              this.qrModel.qrRemark = '';
            } else {
              this.qrModel.qrRemarkEditable = false;
              if (this.qrModel.qrRemark.startsWith("***")) {
                this.qrModel.qrRemarkEditable = true;
                this.qrModel.qrRemark = this.qrModel.qrRemark.replace('***', '');
              }
              // this.qrModel.setRemark(Utilities.removeSpecialCharacters(this.qrModel.getRemark()));
            }
          } else {
            this.qrModel.qrRemarkEditable = true;
          }
        }
      } else if (bharatQRModel.setKey === "52" && this.addLengthArray.length <= 4) {
        //Set Merchant Code
        this.qrModel.qrMerchantCode = bharatQRModel.setValue;
      } else if (bharatQRModel.setKey === "53" && this.addLengthArray.length == 3) {
        //Set Currency Code
        this.qrModel.qrCurrencyCode = bharatQRModel.setValue;

        if (this.qrModel.qrCurrencyCode != "356") {
          //Invalid Currency Code
          // Utilities.showLogE(Constants.LOGKEY, "Invalid Err4");
          // Toast.makeText(context, context.getString(R.string.msg_invalid_currency_bharat_qr), Toast.LENGTH_SHORT).show();
          this.qrModel.isValid(false);
          break;
        }
      } else if (bharatQRModel.setKey === "54") {
        //setAmount
        this.qrModel.qrAmount = bharatQRModel.setValue;
      } else if (bharatQRModel.setKey === "59") {
        //set Merchant Name
        this.qrModel.qrMerchantName = bharatQRModel.setValue; //(this.commonMethod.removeSpecialCharacters(bharatQRModel.setValue));
      } else if (bharatQRModel.setKey === "60") {
        //Set Merchant City
        this.qrModel.qrMerchantCity = bharatQRModel.setValue;
      } else if (bharatQRModel.setKey === "61") {
        //Set Merchant Pincode
        this.qrModel.qrMerchantPincode = bharatQRModel.setValue;
      }
      this.arrayList.push(bharatQRModel);
    }
    this.qrModel.mode = '03';
    this.qrModel.qrMode = "BHARAT_QR";
    this.qrModel.qrMedium = medium ? '01' : '00';
    console.log("ScanBharatQRCodeData", this.qrModel)
    return this.arrayList;
  }
}