package com.infra.psbnpci;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Base64;
import android.widget.Toast;

import java.util.HashMap;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.npci.upi.security.pinactivitycomponent.CLConstants;
import org.npci.upi.security.services.CLRemoteResultReceiver;
import org.npci.upi.security.services.CLServices;
import org.apache.cordova.PluginResult;

public class NHCP {
  public static CLServices clServices;

  public static boolean isCLInitialized = false;

  public static boolean isCLRegistered = false;

  public static NHCP mInstance;

  public static String keyCode = "NPCI";

  public static Activity serviceActivity;

  static String deviceId;

  static String mobileNo;

  static String appId;

  public static String alg = "";

  public static String padding = "";

  public static String transactionID = "";

  public static String tranPrefix = "";

  public static String localeValue = "";

  public static String refUrl = "";

  public static String entityId = "";

  private static String bankName = "";

  public static String xmlPayloadString = "";

  public static String credAllowedString = "";

  public static String token = "";

  public static String tokenExpiry = "";

  public static String hexToken = "";

  public static String challenge = "";

  public static CallbackContext credCallBack;

  static PluginResult result = null;
  public static CallbackContext callbackContext = null;

  public NHCP getmInstance() {
    if (mInstance == null)
      mInstance = new NHCP();
    return mInstance;
  }

  public void setNPCIVariables(String devId, String moNo, String id, String url, String locale, String entity,
                               String tokenValue, String expiry, String algo, String paddingvalue, Activity servicesActivity, CallbackContext CallbackContext) throws Exception, JSONException {
    Utilities.showLogE("NPCI_MOBILE",
      "Before setNPCIVariables----------" + " devId : " + devId + " moNo : " + moNo + " id : " + id + " url : " + url
        + " locale : " + locale + " entity : " + entity + " tokenValue : " + tokenValue + " expiry : " + expiry
        + " algo : " + algo + " paddingvalue : " + paddingvalue + " serviceActivity : " + servicesActivity);


    // Before setNPCIVariables---------- devId : initial moNo : 2b540385fbd53805 id : 919867799620 url : com.infra.uboiios locale : http://unionbankofindia.co.in entity : en_IN tokenValue : unionbank expiry : SGNwcmFJc21ibGpRdHl0aE9yV1gzejk2REhteWtOT24= algo : AES paddingvalue : AES/CBC/PKCS5Padding serviceActivityy : io.cordova.hellocordova.MainActivity@ee9cb5e
    callbackContext = CallbackContext;
    serviceActivity = servicesActivity;
    deviceId = devId;
    mobileNo = moNo;
    appId = id;
    localeValue = locale;
    refUrl = url;
    entityId = entity;
    token = tokenValue;
    tokenExpiry = expiry;
    alg = algo;
    padding = paddingvalue;
    Utilities.showLogE("NPCI_MOBILE", "After setNPCIVariables----------" + deviceId);

    JSONObject jsonObject = new JSONObject();
    try {
      jsonObject.put("msg", "setNPCIVariables : SUCESS");
      result = new PluginResult(PluginResult.Status.OK, jsonObject);
      result.setKeepCallback(false);
      if (callbackContext != null) {
        callbackContext.sendPluginResult(result);
        //no more result , hence the context is cleared.
        callbackContext = null;
      } else {
        callbackContext.error("setNPCIVariables : Error");
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  public void startCLService(String type, CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "Inside Start Service CL");
    Utilities.showLogE("NPCI_MOBILE", "IS CL STARTED : " + isCLInitialized);
    if (!isCLInitialized) {
      try {
        Utilities.showLogE("NPCI_MOBILE", "CONNECTING CL....");
        CLServices.initService((Context) serviceActivity, new TCA(type, callbackContext));
      } catch (Exception e) {
        e.printStackTrace();
        if (e.getMessage().equalsIgnoreCase("Service already initiated"))
          showErrorOnCLInit(callbackContext);
      }
    } else {
      Utilities.showLogE("NPCI_MOBILE", "ALREADY CONNECTED");
      try {
        if (clServices != null) {
          generateChallangeAndToken(type, callbackContext);
        } else {
          showErrorOnCLInit(callbackContext);
        }
      } catch (Exception e) {
        showErrorOnCLInit(callbackContext);
        e.printStackTrace();
      }
    }
  }

  public static void showErrorOnCLInit(CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "ShowErrorOnClInit");
    Toast.makeText((Context) serviceActivity, "Some Error. Please restart the application...", 0).show();
    try {
      callbackContext.success(getJsonResponse("01", ""));
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void callOnceServiceStarted(CLServices services, String type, CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "Service Connected");
    isCLInitialized = true;
    clServices = services;
    Utilities.showLogE("NPCI_MOBILE", "INIT : " + isCLInitialized + "  CL : " + clServices);
    try {
      generateChallangeAndToken(type, callbackContext);
    } catch (Exception e) {
      e.printStackTrace();
      showErrorOnCLInit(callbackContext);
    }
  }

  public static void generateChallangeAndToken(String type, CallbackContext callbackContext) throws Exception {
    Utilities.showLogE("NPCI_MOBILE", "GenerateChallengeAndToken");
    try {
      if (token == null || token.equalsIgnoreCase("")) {
        challenge = CommonUtils.getChallenge(type, deviceId);
        Utilities.showLogE("NPCI_MOBILE", "Challange : " + challenge);
        if (challenge == null) {
          showErrorOnCLInit(callbackContext);
        } else {
          result = new PluginResult(PluginResult.Status.OK, getJsonResponse("00", challenge));
          result.setKeepCallback(false);
          if (callbackContext != null) {
            callbackContext.sendPluginResult(result);
            //no more result , hence the context is cleared.
            callbackContext = null;
          } else {
            callbackContext.error("Error generating challenge and token");
          }
          // callback.success(getJsonResponse("00", challenge));
        }
      } else if (Utilities.isDateExpired(tokenExpiry)) {
        token = "";
        Utilities.showLogE("NPCI_MOBILE", "Expired date");
        generateChallangeAndToken("rotate", callbackContext);
      } else {
        registerCLService(type, callbackContext);
        Utilities.showLogE("NPCI_MOBILE", "Existing Token " + token);
      }
    } catch (Exception e) {
      e.printStackTrace();
      showErrorOnCLInit(callbackContext);
    }
  }

  public static void registerCLService(String type, CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "RegisterCLService");
    try {
      Utilities.showLogE("NPCI_MOBILE", "Token : " + token);
      hexToken = CommonUtils.byteArrayToHex(Base64.decode(token, 2));
      Utilities.showLogE("NPCI_MOBILE", "HexToken : " + hexToken);
      if (!token.isEmpty()) {
        String hmac = CommonUtils.populateHMAC(alg, padding, appId, mobileNo, hexToken, deviceId);
        Utilities.showLogE("NPCI_MOBILE", "hmac : " + hmac);
        isCLRegistered = clServices.registerApp(appId, mobileNo, deviceId, hmac);
        Utilities.showLogE("NPCI_MOBILE", "appId " + appId);
        Utilities.showLogE("NPCI_MOBILE", "mobileNo " + mobileNo);
        Utilities.showLogE("NPCI_MOBILE", "deviceId " + deviceId);
        Utilities.showLogE("NPCI_MOBILE", "hmac " + hmac);
        Utilities.showLogE("NPCI_MOBILE", "hexToken " + hexToken);
        Utilities.showLogE("NPCI_MOBILE", "CL Registered " + isCLRegistered);
        Utilities.showLogE("NPCI_MOBILE", "CL Registered 2 " + isCLRegistered);
        Utilities.showLogE("NPCI_MOBILE", "CL Initiated " + isCLInitialized);
        Utilities.showLogE("NPCI_MOBILE", "Challenge is " + challenge);
        callbackContext.success(getJsonResponse("00", challenge));
      }
    } catch (Exception e) {
      e.printStackTrace();
      showErrorOnCLInit(callbackContext);
    }
  }

  private static String otpType = "OTP";

  private static String otpSubType = "SMS";

  private static String otpDType = "NUM";

  private static String otpDLenght = "6";

  public void setOtpCredValues(String credType, String credSubType, String credDType, String credDLength, CallbackContext callbackContext) {
    otpType = credType;
    otpSubType = credSubType;
    otpDType = credDType;
    otpDLenght = credDLength;
    callbackContext.success(getJsonResponse("00", ""));
  }

  public void setBankNameCredXML(String bank, String type, String credType, String credSubType, String credDType, String credDLength, String atmCredType, String atmCredSubType, String atmCredDType, String atmCredDLength, String xmlPayload, boolean considerOtp,CallbackContext callbackContext) {
    bankName = bank;
    credAllowedString = CommonUtils.getCredAllowed(type, credType, credSubType, credDType, credDLength, atmCredType, atmCredSubType, atmCredDType, atmCredDLength, otpType, otpSubType, otpDType, otpDLenght);
    Utilities.showLogE("NPCI_MOBILE", "credAllowedString =>"+ credAllowedString);
    xmlPayloadString = xmlPayload;
//    result = new PluginResult(PluginResult.Status.OK, "setBankCredXML Success");
//    result.setKeepCallback(false);
//    if (callbackContext != null) {
//      callbackContext.sendPluginResult(result);
//      //no more result , hence the context is cleared.
//      callbackContext = null;
//    } else {
//      callbackContext.error("setBankNameCredXML : Error");
//    }
    callbackContext.success(getJsonResponse("00", ""));
  }

  public void initiateSendMoney(String txnId, String payerAddress, String payeeAddress, String amount, String payeeName, CallbackContext callbackContext) {
    credCallBack = callbackContext;
    transactionID = txnId;
    Utilities.showLogE("NPCI_MOBILE", "Transaction ID : " + transactionID);
    JSONObject salt = getSaltData(amount, transactionID, payerAddress, payeeAddress);
    String trustStr = getTrustData(amount, transactionID, payerAddress, payeeAddress);
    JSONArray payInfoArray = getPayInfoJson(payeeName, amount, "Send Money", transactionID, payerAddress);
    CLRemoteResultReceiver remoteResultReceiver = getRemoteReceiver();
    clServices.getCredential(keyCode, xmlPayloadString, credAllowedString,
      getConfigurationJson(false), salt.toString(), payInfoArray.toString(), trustStr, getLocaleValue(), remoteResultReceiver);
  }

  public void initiateSetUpiPin(String paymentAdd, String txnId, String accountNo, CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "Inside initiateSetUpiPin");
    credCallBack = callbackContext;
    transactionID = txnId;

    JSONObject salt = getSaltData("0", transactionID, paymentAdd, "null");
    String trustStr = getTrustData("0", transactionID, paymentAdd, "null");
    JSONArray payInfoArray = getPayInfoJson("", "", "Set UPI Pin", transactionID, Utilities.maskAccountNumber(accountNo));

    Utilities.showLogE("NPCI_MOBILE", "credCallBack => "+ credCallBack);
    Utilities.showLogE("NPCI_MOBILE", "transactionID => "+ txnId);
    Utilities.showLogE("NPCI_MOBILE", "salt => "+ salt);
    Utilities.showLogE("NPCI_MOBILE", "trustStr => "+ trustStr);
    Utilities.showLogE("NPCI_MOBILE", "payInfoArray => "+ payInfoArray);
    Utilities.showLogE("NPCI_MOBILE", "credAllowedString => "+ credAllowedString);
    Utilities.showLogE("NPCI_MOBILE", "keyCode => "+ keyCode);
    Utilities.showLogE("NPCI_MOBILE", "xmlPayloadString => "+ xmlPayloadString);
    Utilities.showLogE("NPCI_MOBILE", "localeValue => "+ localeValue);
    Utilities.showLogE("NPCI_MOBILE", "CL SERVICE : " + clServices);

    CLRemoteResultReceiver remoteResultReceiver = getRemoteReceiver();

    clServices.getCredential(keyCode, xmlPayloadString, credAllowedString,
      getConfigurationJson(true), salt.toString(), payInfoArray.toString(), trustStr, getLocaleValue(), remoteResultReceiver);
  }

  public void initiateCollectRequestAccept(String txnId, String transAmount, String payerAddress, String payeeAddress, CallbackContext callbackContext) {
    credCallBack = callbackContext;
    transactionID = txnId;
    JSONObject salt = getSaltData(transAmount, transactionID, payerAddress, payeeAddress);
    String trustStr = getTrustData(transAmount, transactionID, payerAddress, payeeAddress);
    JSONArray payInfoArray = getPayInfoJson(payeeAddress, transAmount, "Accept Collect Request", transactionID, payerAddress);
    CLRemoteResultReceiver remoteResultReceiver = getRemoteReceiver();
    clServices.getCredential(keyCode, xmlPayloadString, credAllowedString,
      getConfigurationJson(false), salt.toString(), payInfoArray.toString(), trustStr, getLocaleValue(), remoteResultReceiver);
  }

  public void initiateBalanceEnquiry(String txnId, String paymentAddress, String accountNo, CallbackContext callbackContext) {
    Utilities.showLogE("NPCI_MOBILE", "Inside initiateBalanceEnquiry");
    credCallBack = callbackContext;
    transactionID = txnId;
    JSONObject salt = getSaltData("0", transactionID, paymentAddress, "null");
    String trustStr = getTrustData("0", transactionID, paymentAddress, "null");
    JSONArray payInfoArray = getPayInfoJson("", "", "Check Balance", transactionID, Utilities.maskAccountNumber(accountNo));
    CLRemoteResultReceiver remoteResultReceiver = getRemoteReceiver();
    Utilities.showLogE("NPCI_MOBILE", "CL SERVICE : " + clServices);
    clServices.getCredential(keyCode, xmlPayloadString, credAllowedString,
      getConfigurationJson(true), salt.toString(), payInfoArray.toString(), trustStr, localeValue, remoteResultReceiver);
//    callbackContext.success(getJsonResponse("01", ""));
  }

  public void initiateChangeUpiPin(String txnId, String paymentAdd, String accountNo, CallbackContext callbackContext) {
    credCallBack = callbackContext;
    transactionID = txnId;
    JSONObject salt = getSaltData("0", transactionID, paymentAdd, "null");
    String trustStr = getTrustData("0", transactionID, paymentAdd, "null");
    JSONArray payInfoArray = getPayInfoJson("", "", "Change UPI Pin", "", Utilities.maskAccountNumber(accountNo));
    CLRemoteResultReceiver remoteResultReceiver = getRemoteReceiver();
    clServices.getCredential(keyCode, xmlPayloadString, credAllowedString,
      getConfigurationJson(false), salt.toString(), payInfoArray.toString(), trustStr, localeValue, remoteResultReceiver);
  }

  private void parseResult(Bundle data) {
    Utilities.showLogE("NPCI_MOBILE", "inside parseResult...");
    String errorMsgStr = data.getString("error");
    if (errorMsgStr != null && !errorMsgStr.isEmpty()) {
      Utilities.showLogE("NPCI_MOBILE", errorMsgStr);
      try {
        credCallBack.success(getJsonResponse("01", ""));
      } catch (Exception e) {
        e.printStackTrace();
      }
      return;
    }
    HashMap<String, String> credListHashMap = (HashMap<String, String>) data.getSerializable("credBlocks");
    JSONArray responseArray;
    JSONObject responseJSON;
    try {
      responseJSON = new JSONObject();
      responseArray = new JSONArray();
      responseJSON.put("status", "00");
      responseJSON.put("transactionId", transactionID);
      
      for (String cred : credListHashMap.keySet()) {
        try {
          JSONObject credBlock = new JSONObject(credListHashMap.get(cred));
          Utilities.showLogE("NPCI_MOBILE", "credBlock.toString : " + credBlock.toString());
          String credDataForJson = credBlock.getJSONObject("data").getString("encryptedBase64String");
          Utilities.showLogE("NPCI_MOBILE", "credDataForJson : " + credDataForJson);
          String credkey = credBlock.getJSONObject("data").getString("ki");
          Utilities.showLogE("NPCI_MOBILE", "credkey : " + credkey);
          String credId = credBlock.getJSONObject("data").getString("code");
          Utilities.showLogE("NPCI_MOBILE", "credId : " + credId);
          String credType = credBlock.getString("type");
          Utilities.showLogE("NPCI_MOBILE", "credType : " + credType);
          String credSubType = credBlock.getString("subType");
          Utilities.showLogE("NPCI_MOBILE", "credSubType : " + credSubType);
          Utilities.showLogE("NPCI_MOBILE", credBlock.getJSONObject("data").getString("encryptedBase64String"));
          JSONObject response = new JSONObject();
          // response.accumulate("transactionId", transactionID);
          // response.put("status", "00");
          response.accumulate("credDataForJson", credDataForJson);
          response.accumulate("credkey", credkey);
          response.accumulate("credId", credId);
          response.accumulate("credType", credType);
          response.accumulate("credSubType", credSubType);

          // credCallBack.success(response);
          responseArray.put(response);
        } catch (Exception e) {
          e.printStackTrace();
        }
      } 
      responseJSON.put("responseArray", responseArray);
      credCallBack.success(responseJSON);
       
    } catch (Exception e) {
      e.printStackTrace();
    }

    
    
  }

  public CLRemoteResultReceiver getRemoteReceiver() {
    Utilities.showLogE("NPCI_MOBILE", "inside getRemoteReceiver ");
    return new CLRemoteResultReceiver(new ResultReceiver(new Handler()) {
      protected void onReceiveResult(int resultCode, Bundle resultData) {
        super.onReceiveResult(resultCode, resultData);
        Utilities.showLogE("NPCI_MOBILE", "resultCode : " + resultCode);
        Utilities.showLogE("NPCI_MOBILE", "resultData : " + resultData.toString());

        if (resultCode == 1) {
          if (resultData != null) {
            Utilities.showLogE("NPCI_MOBILE", "Passing Data to Class : " + resultData.toString());
            NHCP.this.parseResult(resultData);
          }
        } else if (resultCode == 2) {
          try {
            JSONObject response = new JSONObject();
            response.put("status", "02");
            NHCP.credCallBack.success(response);
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }
    });
  }

  public String getConfigurationJson(boolean resendFeature) {
    JSONObject configuration = new JSONObject();
    try {
      configuration.put("payerBankName", bankName);
      configuration.put("backgroundColor", "#FFFFFF");
      if (resendFeature)
        configuration.put("resendOTPFeature", true);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return configuration.toString();
  }

  public String getTrustData(String amount, String tranId, String payerAddress, String payeeAddress) {
    String trustStr = "";
    try {
      StringBuilder trustParamBuilder = new StringBuilder(100);
      trustParamBuilder.append(amount).append(CLConstants.SALT_DELIMETER)
        .append(tranId).append(CLConstants.SALT_DELIMETER)
        .append(payerAddress).append(CLConstants.SALT_DELIMETER)
        .append(payeeAddress).append(CLConstants.SALT_DELIMETER)
        .append(appId).append(CLConstants.SALT_DELIMETER)
        .append(mobileNo).append(CLConstants.SALT_DELIMETER)
        .append(deviceId);
      trustStr = TrustCreator.createTrust(alg, padding, trustParamBuilder.toString(), hexToken);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return trustStr;
  }

  public JSONObject getSaltData(String amount, String tranId, String payerAddress, String payeeAddress) {
    JSONObject salt = new JSONObject();
    try {
      salt.put("txnId", tranId);
      salt.put("txnAmount", amount);
      salt.put("deviceId", deviceId);
      salt.put("appId", appId);
      salt.put("mobileNumber", mobileNo);
      salt.put("payerAddr", payerAddress);
      salt.put("payeeAddr", payeeAddress);
      Utilities.showLogE("salt", salt.toString());
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return salt;
  }

  public JSONArray getPayInfoJson(String payeeName, String amount, String note, String transID, String account) {
    JSONArray payInfoArray = new JSONArray();
    try {
      if (!payeeName.equalsIgnoreCase("")) {
        JSONObject jsonPayeeName = new JSONObject();
        jsonPayeeName.put("name", "payeeName");
        jsonPayeeName.put("value", payeeName);
        payInfoArray.put(jsonPayeeName);
      }
      if (!amount.equalsIgnoreCase("")) {
        JSONObject txnAmount = new JSONObject();
        txnAmount.put("name", "txnAmount");
        txnAmount.put("value", amount);
        payInfoArray.put(txnAmount);
      }
      if (!note.equalsIgnoreCase("")) {
        JSONObject jsonNote = new JSONObject();
        jsonNote.put("name", "note");
        jsonNote.put("value", note);
        payInfoArray.put(jsonNote);
      }
      if (!transID.equalsIgnoreCase("")) {
        JSONObject jsonRefId = new JSONObject();
        jsonRefId.put("name", "refId");
        jsonRefId.put("value", transID);
        payInfoArray.put(jsonRefId);
      }
      JSONObject jsonRefUrl = new JSONObject();
      jsonRefUrl.put("name", "refUrl");
      jsonRefUrl.put("value", refUrl);
      payInfoArray.put(jsonRefUrl);
      if (!account.equalsIgnoreCase("")) {
        JSONObject jsonAccount = new JSONObject();
        jsonAccount.put("name", "account");
        jsonAccount.put("value", account);
        payInfoArray.put(jsonAccount);
      }
      Utilities.showLogE("payInfo", payInfoArray.toString());
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return payInfoArray;
  }

  private String getLocaleValue() {
    return localeValue;
  }

  public static CLServices getClServices() {
    return clServices;
  }

  private static String getJsonResponse(String status, String challenge) {
    String responseString = "";
    try {
      JSONObject response = new JSONObject();
      response.put("status", status);
      response.put("challenge", challenge);
      response.put("registered", isCLRegistered);
      response.put("initialised", isCLInitialized);
      responseString = response.toString();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return responseString;
  }

  public void setIntentResponse(String txnId, String responseCode, String rrnValue, String status, String refId) {
    String responseIntent = "txnId=" + txnId + "&responseCode=" + responseCode + "&approvalRefNo=" + rrnValue + "&status=" + status + "&txnRef=" + refId;
    Intent intent = new Intent();
    intent.putExtra("response", responseIntent);
    Utilities.showLogE("INTENT", "Response Intent : " + responseIntent);
  }

  // public String generateTransactionId(String paramString)
  // {
  //   String str = UUID.randomUUID().toString();
  //   return paramString.toUpperCase().substring(0, 3).toUpperCase() + str.replaceAll("-", "");
  // }
}
