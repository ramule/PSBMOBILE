package com.cordova.SDCP;
import android.app.Activity;
import android.content.Context;
import android.net.ConnectivityManager;
import android.os.Build;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PermissionHelper;
import org.apache.cordova.PluginResult;
import android.util.Log;

public class SCDCP {
  private ArrayList<SubscriptionInfoModel> subscriptionInfoArrayList;

  boolean intentCalled = false;

  String simSlotOne = "";

  String simSlotTwo = "";

  boolean dualSim = false;

  CallbackContext callbackFunction = null;

  Activity activity;

  public void checkSimState(CallbackContext callback,Activity activity) {
    this.callbackFunction = callback;
    boolean status = checkSimState(activity);
    sendCallbackResponse(status);
  }

  public void checkSimStatus(String simOne, String simTwo, boolean isDualSim, CallbackContext callback,Activity activity) {
    // CordovaPlugin that = new CordovaPlugin();
    this.simSlotOne = simOne;
    this.simSlotTwo = simTwo;
    this.dualSim = isDualSim;
    this.callbackFunction = callback;

    TelephonyManager telMgr = (TelephonyManager)activity.getSystemService("phone");
    int simState = telMgr.getSimState();
    switch (simState) {
      case 1:
        sendCallback("02", "", "", true);
        break;
      case 4:
        sendCallback("02", "", "", true);
        break;
      case 2:
        sendCallback("02", "", "", true);
        break;
      case 3:
        sendCallback("02", "", "", true);
        break;
      case 5:
        getDeviceDetails((Context)activity);
        break;
      case 0:
        sendCallback("02", "", "", true);
        break;
    }
  }

  String messageText = "";

  private void getDeviceDetails(Context context) {
    this.subscriptionInfoArrayList = new ArrayList<>();
    if (Build.VERSION.SDK_INT >= 22) {
      try {
        SubscriptionManager subscriptionManager = SubscriptionManager.from(context.getApplicationContext());
        List<SubscriptionInfo> subscriptionManagerArrayList = subscriptionManager.getActiveSubscriptionInfoList();
        for (SubscriptionInfo subscriptionInfo : subscriptionManagerArrayList) {
          SubscriptionInfoModel subscriptionInfoModel = new SubscriptionInfoModel(subscriptionInfo.getDisplayName().toString(), String.valueOf(subscriptionInfo.getSubscriptionId()), String.valueOf(subscriptionInfo.getSimSlotIndex()));
          this.subscriptionInfoArrayList.add(subscriptionInfoModel);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      try {
        TelephonyManager telephonyManager = (TelephonyManager)context.getSystemService("phone");
        if (telephonyManager.getSubscriberId() != null) {
          SubscriptionInfoModel subscriptionInfoModel = new SubscriptionInfoModel(telephonyManager.getNetworkOperatorName(), String.valueOf(telephonyManager.getSubscriberId()), String.valueOf(telephonyManager.getLine1Number()));
          this.subscriptionInfoArrayList.add(subscriptionInfoModel);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    if (this.subscriptionInfoArrayList != null && this.subscriptionInfoArrayList.size() > 0) {
      if (!this.simSlotOne.equals("blank") || !this.simSlotTwo.equals("blank")) {
        if (this.subscriptionInfoArrayList.size() == 2) {
          if (this.simSlotOne.equals(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId()) || this.simSlotTwo.equals(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(1)).getSubscriptionId())) {
            sendCallback("01", "", "", true);
            return;
          }
          sendCallback("01", "", "", false);
          return;
        }
        if (this.subscriptionInfoArrayList.size() == 1) {
          if (!this.simSlotOne.equalsIgnoreCase("") && !this.simSlotTwo.equalsIgnoreCase("") && (this.simSlotOne.equals(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId()) || this.simSlotTwo.equals(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId()))) {
            sendCallback("01", "", "", true);
            return;
          }
          if (this.simSlotOne.equalsIgnoreCase("") && this.simSlotTwo.equalsIgnoreCase(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId())) {
            sendCallback("01", "", "", true);
            return;
          }
          if (this.simSlotTwo.equalsIgnoreCase("") && this.simSlotOne.equalsIgnoreCase(((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId())) {
            sendCallback("01", "", "", true);
            return;
          }
          sendCallback("01", "", "", false);
          return;
        }
        sendCallback("01", "", "", true);
        return;
      }
      String str1 = "";
      String str2 = "";
      if (this.subscriptionInfoArrayList.size() == 1) {
        str1 = ((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId();
        str2 = "";
      } else if (this.subscriptionInfoArrayList.size() == 2) {
        str1 = ((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(0)).getSubscriptionId();
        str2 = ((SubscriptionInfoModel)this.subscriptionInfoArrayList.get(1)).getSubscriptionId();
      }
      sendCallback("00", str1, str2, true); //str1, str2 store in app
      return;
    }
    sendCallback("00", "1", "2", true);
  }

  public boolean checkSimState(Activity activity) {
    CordovaPlugin that = new CordovaPlugin();
    TelephonyManager telMgr = (TelephonyManager)activity.getSystemService("phone");
    int simState = telMgr.getSimState();
    switch (simState) {
      case 1:
        break;
      case 4:
        break;
      case 2:
        break;
      case 3:
        break;
      case 5:
        return true;
      case 0:
        return true;
    }
    return false;
  }

  private void sendCallback(String status, String simOneInfo, String simTwoInfo, boolean isValidSimFound) {
    JSONObject response = new JSONObject();
    try {
      response.put("status", status);
      response.put("simOneInfo", simOneInfo);
      response.put("simTwoInfo", simTwoInfo);
      response.put("validSimFound", isValidSimFound);
      this.callbackFunction.success(response);
    } catch (Exception e) {
      // this.callbackFunction.error(e);
      e.printStackTrace();
    }
  }


  private void sendCallbackResponse(boolean isSimActive) {
    JSONObject response = new JSONObject();
    try {
      response.put("isSimActive", isSimActive);
      this.callbackFunction.success(response);
    } catch (Exception e) {
      // this.callbackFunction.error(e);
      e.printStackTrace();
    }
  }

  public static boolean isNetworkAvailable() {
    CordovaPlugin that = new CordovaPlugin();
    return ((ConnectivityManager)that.cordova.getActivity().getApplicationContext().getSystemService("connectivity")).getActiveNetworkInfo().getTypeName().equals("MOBILE");
  }
}
