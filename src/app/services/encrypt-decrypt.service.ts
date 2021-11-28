import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// import * as CryptoSign from 'crypto-sign';
import { AppConstants } from '../app.constant';
declare var global;
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor(
    private constant: AppConstants
  ) { }
  /**
   * encrypt value using cryptojs
   * @PASSPHRASE
   * @txtToDecrypt
   */
  encryptText(PASSPHRASE, txtToEncrypt) {

    var salt = CryptoJS.lib.WordArray.random(256 / 16);
    var iv = CryptoJS.lib.WordArray.random(256 / 16);
    var key128Bits = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32 });
    var key128Bits100Iterations = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32, iterations: 1000 });
    var encrypted = CryptoJS.AES.encrypt(txtToEncrypt, key128Bits100Iterations, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var CombineData = salt + " " + iv + " " + encrypted;
    console.log('SERVICE REQUEST ', txtToEncrypt);
    console.log('PASSPHRASE: ', PASSPHRASE);
    return CombineData;
  }

 /**
   * decrypt value using cryptojs
   * @PASSPHRASE
   * @txtToDecrypt
   */
  decryptText(PASSPHRASE, txtToDecrypt) {
    try {
      var arrdata = txtToDecrypt.split(" ");
      var serverSalt = arrdata[0],
        serveriv = arrdata[1],
        encryptedData = arrdata[2];
      var salt = CryptoJS.enc.Hex.parse(serverSalt);
      var iv = CryptoJS.enc.Hex.parse(serveriv);
      var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32, iterations: 1000 });
      var decrypt = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

      var decryptValue = decrypt.toString(CryptoJS.enc.Utf8);
      // console.log(PASSPHRASE);
      return decryptValue;

    }
    catch (e) {

    }
  }

  pkcsEncryptDigitallySignBase64Method(pass, message) {
    // var digiSign = CryptoSign.digitalSignature;

    // let digiSignConfig = digiSign.config({
    //   "prikeyFilePath": this.constant.DSC_Key, //<file,buffer>
    // });

    var salt = CryptoJS.lib.WordArray.random(256 / 16);

    var key = CryptoJS.PBKDF2(pass, salt, {keySize: 256 / 32, iterations: 1000});
    var iv = CryptoJS.lib.WordArray.random(256 / 16);

    var encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    // let apiSignedToken = digiSignConfig.generateAPISign({ payload: JSON.stringify(encrypted)});//pass payload as string
    // console.log(`API signatured token is `, apiSignedToken);

    var encryptedHex = this.base64ToHex(encrypted.toString());

    var base64result = this.hexToBase64(""+salt+ iv + encryptedHex);

    return base64result;
  }

  base64ToHex(str) {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
  }

  hexToBase64(str) {
    return btoa(str.match(/\w{2}/g).map(a => {return String.fromCharCode(parseInt(a, 16));} ).join(""))
  }


  /**
   * MD5 encryption for password
   * @txtToHash
   */
  createMD5Value(txtToHash){
    try{
      // return CryptoJS.MD5(txtToHash).toString();
       return CryptoJS.SHA256(txtToHash).toString();
    }
    catch(e){
    }
  }

  //The set method is use for encrypt the value.
  //other method need to remove
  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  //other method need to remove
  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
