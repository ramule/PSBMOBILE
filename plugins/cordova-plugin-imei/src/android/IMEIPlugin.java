package com.plugin.IMEI;


import org.json.JSONArray;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.provider.Settings.Secure;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

public class IMEIPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";
		
        if (action.equals("get")) {
            //TelephonyManager telephonyManager = (TelephonyManager)this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
            result = getUniqueID();
        }
        else {
            status = PluginResult.Status.INVALID_ACTION;
        }
        callbackContext.sendPluginResult(new PluginResult(status, result));
        return true;
    }
	
	public String getUniqueID(){    
		String myAndroidDeviceId = "";
		TelephonyManager mTelephony = (TelephonyManager) this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
		if (mTelephony.getDeviceId() != null){
			myAndroidDeviceId = mTelephony.getDeviceId(); 
		}else{
			Context context=this.cordova.getActivity().getApplicationContext();
			 myAndroidDeviceId = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID); 
		}
		return myAndroidDeviceId;
	}

}
