package com.cordova.SDCP;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.telephony.SmsManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;
import android.widget.Toast;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;

public class SimModule {
  static Context context;
  
  static boolean isSMSSent = false;
  
  static String registeredSim = "1";
  
  static String verificationCode = "";
  
  ProgressDialog progress;
  
  static PendingIntent sentPI;
  
  static PendingIntent deliverPI;
  
  static deliverReceiver dr;
  
  static boolean isRegistered = false;
  
  static sentReceiver sr;
  
  public boolean allPermissionAssigned() {
    CordovaPlugin that = new CordovaPlugin();
    context = that.cordova.getActivity().getApplicationContext();
    ArrayList<String> permissionArray = new ArrayList<>();
    if (!hasPermission(context, "android.permission.SEND_SMS"))
      permissionArray.add("android.permission.SEND_SMS"); 
    if (!hasPermission(context, "android.permission.ACCESS_COARSE_LOCATION"))
      permissionArray.add("android.permission.ACCESS_COARSE_LOCATION"); 
    if (!hasPermission(context, "android.permission.READ_PHONE_STATE"))
      permissionArray.add("android.permission.READ_PHONE_STATE"); 
    if (permissionArray.size() > 0) {
      String[] mStringArray = new String[permissionArray.size()];
      mStringArray = permissionArray.<String>toArray(mStringArray);
      showLogE("Permission Required : " + mStringArray.length);
      return false;
    } 
    showLogE("Dual SIM PHONE : " + TMR.isDualMode());
    return true;
  }
  
  public boolean hasPermission(Context context, String permission) {
    return (ContextCompat.checkSelfPermission(context, permission) == 0);
  }
  
  public void goToSettings() {
    CordovaPlugin that = new CordovaPlugin();
    Intent intent = new Intent("android.settings.APPLICATION_DETAILS_SETTINGS", Uri.fromParts("package", "com.infra.uboi", null));
    intent.addFlags(268435456);
    that.cordova.getActivity().startActivity(intent);
  }
  
  public boolean checkPhoneSimCount() {
    if (TMR.isDualMode())
      return true; 
    return false;
  }
  
  public boolean checkSmsSent() {
    return isSMSSent;
  }
  
  private static String returnString = "";
  
  static CallbackContext konyCallBack;
  
  private String appendString(String append) {
    returnString += "" + append + "~";
    return returnString;
  }
  
  public String getSimInformation() {
    CordovaPlugin that = new CordovaPlugin();
    context = that.cordova.getActivity().getApplicationContext();
    returnString = "";
    if (TMR.isDualMode()) {
      appendString("TRUE");
      int currentapiVersion = Build.VERSION.SDK_INT;
      if (currentapiVersion >= 22) {
        appendString("AVAILABLE");
        try {
          ArrayList<Integer> simInfo = new ArrayList();
          List<SubscriptionInfo> subscriptionInfoList = SubscriptionManager.from(context).getActiveSubscriptionInfoList();
          ArrayList<String> SimOperator = new ArrayList();
          for (SubscriptionInfo subscriptionInfo : subscriptionInfoList) {
            simInfo.add(Integer.valueOf(subscriptionInfo.getSubscriptionId()));
            SimOperator.add(subscriptionInfo.getDisplayName().toString());
            showLogE("subscriptionId:" + subscriptionInfo.getDisplayName());
          } 
          if (simInfo.size() == 0) {
            Toast.makeText(context, "txt_no_sim_for_sms", 0).show();
            returnString = "";
          } else if (simInfo.size() == 1) {
            try {
              appendString("1~" + ((SubscriptionInfo)subscriptionInfoList.get(0)).getSubscriptionId());
              appendString((String)((SubscriptionInfo)subscriptionInfoList.get(0)).getDisplayName());
            } catch (Exception e) {
              e.printStackTrace();
            } 
          } else {
            appendString("1~" + ((SubscriptionInfo)subscriptionInfoList.get(0)).getSubscriptionId());
            appendString((String)((SubscriptionInfo)subscriptionInfoList.get(0)).getDisplayName());
            appendString("2~" + ((SubscriptionInfo)subscriptionInfoList.get(1)).getSubscriptionId());
            appendString((String)((SubscriptionInfo)subscriptionInfoList.get(1)).getDisplayName());
          } 
        } catch (Exception exception) {}
      } else {
        appendString("UNAVAILABLE");
      } 
    } else {
      appendString("FALSE");
    } 
    return returnString;
  }
  
  public boolean checkSimState() {
    CordovaPlugin that = new CordovaPlugin();
    TelephonyManager telMgr = (TelephonyManager)that.cordova.getActivity().getSystemService("phone");
    int simState = telMgr.getSimState();
    switch (simState) {
      case 1:
        showLogE("SIM_STATE_ABSENT");
        break;
      case 4:
        showLogE("SIM_STATE_NETWORK_LOCKED");
        break;
      case 2:
        showLogE("SIM_STATE_PIN_REQUIRED");
        break;
      case 3:
        showLogE("SIM_STATE_PUK_REQUIRED");
        break;
      case 5:
        showLogE("SIM_STATE_READY");
        return true;
      case 0:
        showLogE("SIM_STATE_UNKNOWN");
        return true;
    } 
    return false;
  }
  
  private void setRegisteredSim() {
    CordovaPlugin that = new CordovaPlugin();
    context = that.cordova.getActivity().getApplicationContext();
    if (TINF.getInstance(context).isSIM1Ready()) {
      registeredSim = "1";
    } else if (TINF.getInstance(context).isSIM2Ready()) {
      registeredSim = "2";
    } 
    showLogE("RegisteredSIM : " + registeredSim);
  }
  
  public String sendLongSMS(String SimID, String SMSGateway, String deviceId, String appName, String isGreaterThanLollipop, String message, CallbackContext callback) {
    CordovaPlugin that = new CordovaPlugin();
    context = that.cordova.getActivity().getApplicationContext();
    konyCallBack = callback;
    String SENT = "SMS_SENT";
    String DELIVERED = "SMS_DELIVERED";
    deliverPI = PendingIntent.getBroadcast(context, 0, new Intent(DELIVERED), 0);
    verificationCode = getRandomNumber();
    showLogE("RandomNum : " + verificationCode);
    try {
      SmsManager smsManager = SmsManager.getDefault();
      if (Integer.parseInt(SimID) == -111) {
        showLogE("Sagar1");
        smsManager.sendTextMessage(SMSGateway, null, message, sentPI, deliverPI);
      } else if (isGreaterThanLollipop.equalsIgnoreCase("true")) {
        showLogE("Sagar2");
        SmsManager.getSmsManagerForSubscriptionId(Integer.parseInt(SimID)).sendTextMessage(SMSGateway, null, message, sentPI, deliverPI);
      } else {
        showLogE("Sagar3");
        SmsHandler smsHandler = new SmsHandler(that.cordova.getActivity());
        SmsHandler.send(SMSGateway, message, Integer.parseInt(SimID), appName, sentPI, deliverPI);
      } 
      sr = new sentReceiver();
      dr = new deliverReceiver();
      isRegistered = true;
      that.cordova.getActivity().registerReceiver(sr, new IntentFilter(SENT));
      that.cordova.getActivity().registerReceiver(dr, new IntentFilter(DELIVERED));
    } catch (Exception e) {
      Toast.makeText(context, "msg_sending_sms_failed", 0).show();
      e.printStackTrace();
    } 
    return verificationCode;
  }
  
  public void showToast(String msg) {
    CordovaPlugin that = new CordovaPlugin();
    Toast.makeText(that.cordova.getActivity().getApplicationContext(), msg, 0).show();
  }
  
  private static void showLogE(String message) {}
  
  public class sentReceiver extends BroadcastReceiver {
    public void onReceive(Context context, Intent arg1) {
      SimModule.isSMSSent = false;
      switch (getResultCode()) {
      
      } 
    }
  }
  
  public class deliverReceiver extends BroadcastReceiver {
    public void onReceive(Context context, Intent arg1) {
      SimModule.isSMSSent = false;
      switch (getResultCode()) {
        case -1:
          SimModule.isSMSSent = true;
          break;
      } 
      try {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("response", SimModule.isSMSSent);
        SimModule.konyCallBack.success(jsonObject);
      } catch (Exception e) {
        e.printStackTrace();
      } 
    }
  }
  
  public String getRandomNumber() {
    try {
      Random random = new Random();
      return String.format("%04d", new Object[] { Integer.valueOf(random.nextInt(9999)) });
    } catch (Exception e) {
      e.printStackTrace();
      return "1231";
    } 
  }
}
