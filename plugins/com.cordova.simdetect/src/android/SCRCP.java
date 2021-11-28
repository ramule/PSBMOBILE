package com.cordova.SDCP;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;

import java.util.ArrayList;

public class SCRCP extends BroadcastReceiver {

  private ArrayList<SubscriptionInfoModel> subscriptionInfoArrayList;
  boolean intentCalled = false;
  boolean isSimAbsent = false;

  @Override
  public void onReceive(Context context, Intent intent) {
    intentCalled = false;
    subscriptionInfoArrayList = new ArrayList<>();
    ifSimAvailable(context);
  }

  private void ifSimAvailable(Context context) {
    TelephonyManager telMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
    int simState = telMgr.getSimState();
    switch (simState) {
      case TelephonyManager.SIM_STATE_ABSENT:
        callIntent(context);
        break;
      case TelephonyManager.SIM_STATE_NETWORK_LOCKED:
        break;
      case TelephonyManager.SIM_STATE_PIN_REQUIRED:
        break;
      case TelephonyManager.SIM_STATE_PUK_REQUIRED:
        break;
      case TelephonyManager.SIM_STATE_READY:
        break;
      case TelephonyManager.SIM_STATE_UNKNOWN:
        break;
    }
  }


  private void showPrefClearDialog(final Context context) {
    if (!isSimAbsent) {
      isSimAbsent = true;
      Intent intent = new Intent(context, SCDA.class);
      intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      context.startActivity(intent);
    }
  }

  private void callIntent(Context context) {
    if (!intentCalled) {
      intentCalled = true;
      showPrefClearDialog(context);
    }
  }

}
