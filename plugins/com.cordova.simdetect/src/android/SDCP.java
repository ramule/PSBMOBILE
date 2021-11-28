package com.cordova.SDCP;

import android.app.Activity;
import android.content.Context;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.cordova.SDCP.SCDCP;
import com.cordova.SDCP.SCRCP;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class SDCP extends CordovaPlugin {

  Activity activity;


  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

    activity = cordova.getActivity();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("getSharedPreferences")) {
      SharedPreferences sharedpreferences = cordova.getActivity().getSharedPreferences("CordovaSharedPref", Context.MODE_PRIVATE);
      Boolean value = sharedpreferences.getBoolean("isAppMinimised", false);
      if (value) {
        // Toast.makeText(cordova.getActivity(),"Device binding stopped", Toast.LENGTH_LONG).show();
      }
      this.getSharedPrefs(value, callbackContext);
      return true;
    } else if (action.equals("checkSimStatus")) {
      final String simOne = args.getJSONObject(0).getString("simOne");
      final String simTwo = args.getJSONObject(0).getString("simTwo");
      final boolean isDualSim = args.getJSONObject(0).getBoolean("isDualSim");
      SCDCP s = new SCDCP();
      s.checkSimStatus(simOne, simTwo, isDualSim, callbackContext, activity);

      // this.coolMethod(message, callbackContext);
      return true;
    } else if (action.equals("isSimAvailable")) {

      SCDCP s = new SCDCP();
      s.checkSimState(callbackContext, activity);

      // this.coolMethod(message, callbackContext);
      return true;
    } else if (action.equals("registerSimChange")) {
      SCRCP SCRCP;
      SCRCP = new SCRCP();
      activity.registerReceiver(SCRCP, new IntentFilter("android.intent.action.SIM_STATE_CHANGED"));
      JSONObject jsonObject = new JSONObject();
      try {
        jsonObject.put("registerSimChanged", true);
        callbackContext.success(jsonObject);
      } catch (JSONException e) {
        e.printStackTrace();
      }
      return true;
    }
    return false;
  }

  private void getSharedPrefs(boolean sharedPrefVal, CallbackContext callbackContext) {
    JSONObject jsonObject = new JSONObject();
    try {
      jsonObject.put("isAppMinimised", sharedPrefVal);
      callbackContext.success(jsonObject);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }
}
