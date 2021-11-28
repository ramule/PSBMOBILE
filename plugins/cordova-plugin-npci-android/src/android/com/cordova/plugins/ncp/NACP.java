package com.cordova.plugins.ncp;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.infra.psbnpci.*;
import org.apache.cordova.LOG;
import android.app.Activity;
import android.provider.Settings;
import java.util.UUID;
import com.infra.ecp.*;

/**
 * This class echoes a string called from JavaScript.
 */
public class NACP extends CordovaPlugin {
  PluginResult result = null;
  public CallbackContext callbackContext = null;
  public CallbackContext callbackContext1 = null;
  public Activity serviceActivity;
  public String packageName;
  public NHCP NHCPObject = new NHCP();
  public ENCP EncryptCertObject = new ENCP();
  // public static String UUID = "";
  // public String devId;

  @Override
  public void initialize(final CordovaInterface cordova, final CordovaWebView webView) {
    super.initialize(cordova, webView);
    serviceActivity = cordova.getActivity();
    packageName = serviceActivity.getPackageName();
    // devId = Settings.Secure.getString(this.cordova.getActivity().getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
    // String location = preferences.getString("androidpersistentfilelocation", "internal");
    LOG.e("PLUGIN_START", "Plugin Initialization Done");
    // serviceActivity.finish();
  }

  @Override
  public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
    this.callbackContext = callbackContext;
    LOG.d("args", args.toString());
    if (action.equals("coolMethod")) {
      final String message = args.getString(0);
      return true;
    }
//        else if (action.equals("SetNPCIWrapperVariables")) {
//          final String devId = args.getJSONObject(0).getString("deviceId");
//          final String moNo = args.getJSONObject(0).getString("mobileNo");
//          final String id = args.getJSONObject(0).getString("id");
//          final String url = args.getJSONObject(0).getString("url");
//          final String locale = args.getJSONObject(0).getString("locale");
//          final String entity = args.getJSONObject(0).getString("entity");
//          final String tokenValue = args.getJSONObject(0).getString("tokenValue");
//          final String expiry = args.getJSONObject(0).getString("expiry");
//          LOG.d("NHCPObject", devId + '-'+ moNo + '-' + id + '-' + url + '-' + locale + '-' + entity + '-' + tokenValue + '-' + expiry);
//          this.SetNPCIWrapperVariables(devId, moNo, id, url, locale, entity, tokenValue, expiry, serviceActivity,callbackContext);
//          return true;
//      } else if(action.equals("StartWrapperCLLibrary")) {
//        final String type = args.getString(0);
//        this.StartWrapperCLLibrary(type, callbackContext);
//        return true;
//      }
    else if (action.equals("getNHCPInstance")) {
      final JSONObject jsonObject = new JSONObject();
      try {
        jsonObject.put("msg", "getNHCPInstance : SUCCESS");
        jsonObject.put("NHCPInstance", NHCPObject);
      } catch (final JSONException e) {
        e.printStackTrace();
      }
      result = new PluginResult(PluginResult.Status.OK, jsonObject);
      result.setKeepCallback(false);
      if (callbackContext != null) {
        callbackContext.sendPluginResult(result);
        //no more result , hence the context is cleared.
        // callbackContext = null;
      } else {
        callbackContext.error("getNHCPInstance Wrapper Failed");
      }
      return true;
    } else if (action.equals("generateTransactionId")) {
      final String paramString = args.getString(0);
      try {
        this.generateTransactionId(paramString, callbackContext);
      } catch (Exception e) {
        e.printStackTrace();
      }
      return true;
    } else if (action.equals("setNPCIVariables")) {
      final String devId = args.getJSONObject(0).getString("deviceId");
      final String moNo = args.getJSONObject(0).getString("mobileNo");
      final String id = args.getJSONObject(0).getString("id");
      final String url = args.getJSONObject(0).getString("url");
      final String locale = args.getJSONObject(0).getString("locale");
      final String entity = args.getJSONObject(0).getString("entity");
      final String tokenValue = args.getJSONObject(0).getString("tokenValue");
      final String expiry = args.getJSONObject(0).getString("expiry");
      final String algo = args.getJSONObject(0).getString("algo");
      final String padding = args.getJSONObject(0).getString("padding");

      try {
        NHCPObject.setNPCIVariables(devId, moNo, id, url, locale, entity, tokenValue, expiry, algo, padding, serviceActivity, callbackContext);
      } catch (Exception e) {
        e.printStackTrace();
      }
      return true;
    } else if (action.equals("startCLService")) {
      final String type = args.getString(0);
      NHCPObject.startCLService(type, callbackContext);
      return true;
    } else if (action.equals("setOtpCredValues")) {
      final String credType = args.getJSONObject(0).getString("credType");
      final String credSubType = args.getJSONObject(0).getString("credSubType");
      final String credDType = args.getJSONObject(0).getString("credDType");
      final String credDLength = args.getJSONObject(0).getString("credDLength");

      NHCPObject.setOtpCredValues(credType, credSubType, credDType, credDLength, callbackContext);
      return true;
    } else if (action.equals("setBankNameCredXML")) {
      final String bank = args.getJSONObject(0).getString("bankName");
      final String type = args.getJSONObject(0).getString("credTypeValue");
      final String credType = args.getJSONObject(0).getString("credType");
      final String credSubType = args.getJSONObject(0).getString("credSubType");
      final String credDType = args.getJSONObject(0).getString("credDType");
      final String credDLength = args.getJSONObject(0).getString("credDLength");
      final String atmCredType = args.getJSONObject(0).getString("atmCredType");
      final String atmCredSubType = args.getJSONObject(0).getString("atmCredSubType");
      final String atmCredDType = args.getJSONObject(0).getString("atmCredDType");
      final String atmCredDLength = args.getJSONObject(0).getString("atmCredDLength");
      final String xmlPayload = args.getJSONObject(0).getString("xmlPayload");
      final Boolean considerOtp = args.getJSONObject(0).getBoolean("considerOtp");

      NHCPObject.setBankNameCredXML(bank, type, credType, credSubType, credDType, credDLength, atmCredType, atmCredSubType, atmCredDType, atmCredDLength, xmlPayload, considerOtp, callbackContext);
      return true;
    } else if (action.equals("initiateSetUpiPin")) {
      final String paymentAdd = args.getJSONObject(0).getString("paymentAddress");
      final String txnId = args.getJSONObject(0).getString("txnId");
      final String accountNo = args.getJSONObject(0).getString("accountNo");

      NHCPObject.initiateSetUpiPin(paymentAdd, txnId, accountNo, callbackContext);
      return true;
    } else if (action.equals("initiateBalanceEnquiry")) {
      final String txnId = args.getJSONObject(0).getString("txnId");
      final String paymentAddress = args.getJSONObject(0).getString("paymentAddress");
      final String accountNo = args.getJSONObject(0).getString("accountNo");

      NHCPObject.initiateBalanceEnquiry(txnId, paymentAddress, accountNo, callbackContext);
      return true;
    } else if (action.equals("initiateSendMoney")) {
      final String txnId = args.getJSONObject(0).getString("txnId");
      final String payerAddress = args.getJSONObject(0).getString("payerAddress");
      final String payeeAddress = args.getJSONObject(0).getString("payeeAddress");
      final String amount = args.getJSONObject(0).getString("amount");
      final String payeeName = args.getJSONObject(0).getString("payeeName");

      NHCPObject.initiateSendMoney(txnId, payerAddress, payeeAddress, amount, payeeName, callbackContext);
      return true;
    } else if (action.equals("initiateChangeUpiPin")) {
      final String txnId = args.getJSONObject(0).getString("txnId");
      final String paymentAddress = args.getJSONObject(0).getString("paymentAddress");
      final String accountNo = args.getJSONObject(0).getString("accountNo");

      NHCPObject.initiateChangeUpiPin(txnId, paymentAddress, accountNo, callbackContext);
      return true;
    } else if (action.equals("initiateCollectRequestAccept")) {
      final String txnId = args.getJSONObject(0).getString("txnId");
      final String transAmount = args.getJSONObject(0).getString("transAmount");
      final String payerAddress = args.getJSONObject(0).getString("payerAddress");
      final String payeeAddress = args.getJSONObject(0).getString("payeeAddress");

      NHCPObject.initiateCollectRequestAccept(txnId, transAmount, payerAddress, payeeAddress, callbackContext);
      return true;
    }
    if (action.equals("getEncryptedValueFromCert")) {
      //getEncryptedValueFromCert("RSA/ECB/PKCS1Padding","X509",certData, plainTpin);
      final String alg = args.getJSONObject(0).getString("alg");
      final String certFactory = args.getJSONObject(0).getString("certFactory");
      final String certificateString = args.getJSONObject(0).getString("certificateString");
      final String plainValue = args.getJSONObject(0).getString("plainValue");

      EncryptCertObject.getEncryptedValueFromCert(alg, certFactory, certificateString, plainValue, callbackContext);
      return true;
    } else {
      LOG.d("action", action.toString());
    }

    return false;
  }


  public void generateTransactionId(final String paramString, CallbackContext callbackContext) {
    String str = UUID.randomUUID().toString();
    String transactionId = paramString.toUpperCase().substring(0, 3).toUpperCase() + str.replaceAll("-", "");
    // final JSONObject jsonObject = new JSONObject();
    // jsonObject.put("transactionId",transactionId);
    result = new PluginResult(PluginResult.Status.OK, transactionId);
    result.setKeepCallback(false);
    if (callbackContext != null) {
      callbackContext.sendPluginResult(result);
      //no more result , hence the context is cleared.
      callbackContext = null;
    } else {
      callbackContext.error("Callbackcontext is null...");
    }
  }
}

