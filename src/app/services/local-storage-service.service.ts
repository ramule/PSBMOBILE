import { Inject, Injectable, Injector } from '@angular/core';
import { LOCAL_STORAGE, StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { AppConstants } from '../app.constant';
import { DataService } from './data.service';

// import {select, Store} from '@ngrx/store';
// import {selectCustomers} from '../customer/store/selector/customer.selectors';
// import {CustomerState} from '../customer/store/reducer/customer.reducer';
// import {addCustomer} from '../customer/store/action/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  ominiChannelParam: any = {};

  //constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService, @Inject(SESSION_STORAGE) private sessionStorage: StorageService, private encryptDecrypt : EncryptDecryptService,private constant:AppConstants, private injector: Injector , private store: Store<CustomerState>) { }
  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService, @Inject(SESSION_STORAGE) private sessionStorage: StorageService, private encryptDecrypt : EncryptDecryptService,private constant:AppConstants, private injector: Injector ) { }

  
  setLocalStorage(key, value) {
    let encVal = this.encryptDecrypt.encryptText(this.constant.storageEncryptKey,value);
    this.localStorage.set(key, encVal);
  }
  
  setPlainLocalStorage(key, value) {
    this.localStorage.set(key, value);
  }

  getPlainLocalStorage(key) {
    return this.localStorage.get(key);
  }

  getLocalStorage(key) {
    let storageKey = this.localStorage.get(key);
      return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
    // var upiStandAlone = this.injector.get(DataService).upiStandAlone;
    // if(!upiStandAlone &&  this.constant.getPlatform() == 'web' && (key != this.constant.storage_languageVersion && key != this.constant.storage_languageJson && key != this.constant.storage_language && key != this.constant.storage_languageList) ){
    //   let storageKey = this.getOmniChannelReqParam(key);
    //   console.log("key =======>"+storageKey);
    //   return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
    // }
    // else{
    //   let storageKey = this.localStorage.get(key);
    //   return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
    // }
    
  }

  removeFromLocalStorage(key) {
    this.localStorage.remove(key);
  }

  clearLocalStorage() {
    this.localStorage.clear();
  }

  hasKeyLocalStorage(key) {
    return this.localStorage.has(key);
  }

  setSessionStorage(key, value) {
    let encVal = this.encryptDecrypt.encryptText(this.constant.storageEncryptKey,value);
    this.sessionStorage.set(key, encVal);
  }

  getSessionStorage(key) {
    let storageKey = this.sessionStorage.get(key);
    return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
  }

  hasKeySessionStorage(key) {
    return this.sessionStorage.has(key);
  }

  removeFromSessionStorage(key) {
    this.sessionStorage.remove(key);
  }

  clearSessionStorage() {
    this.sessionStorage.clear();
  }


  clearOmniStorageAndVariable(){
    
  }

  // setOmniChannelReqParam(key, param) {
  //   var dtl = [],customers$ :any;
  //   customers$ = this.store.pipe(select(selectCustomers));
  //   if(customers$.actionsObserver._value.customer) dtl = customers$.actionsObserver.value.customer;
  //   dtl = JSON.parse(JSON.stringify(dtl));
  //   dtl.push({ 'type': key , 'value': param })
  //   this.store.dispatch(addCustomer(dtl));
  // }

  // getOmniChannelReqParam(key) {
  //   var storageDtl :any , selStorageKeyValue :any;
  //   storageDtl = this.store.pipe(select(selectCustomers));
  //   console.log(storageDtl.actionsObserver._value.customer);
  //   selStorageKeyValue = storageDtl.actionsObserver._value.customer.filter(obj => obj.type == key);
  //   console.log(selStorageKeyValue);
  //   return selStorageKeyValue;
  // }


}