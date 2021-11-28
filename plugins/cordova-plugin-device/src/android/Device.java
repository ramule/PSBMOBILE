/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package org.apache.cordova.device;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.TimeZone;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.provider.Settings;
import android.util.Log;

import com.infra.psbnpci.Utilities;

public class Device extends CordovaPlugin {
  public static final String TAG = "Device";

  public static String platform;                            // Device OS
  public static String uuid;                                // Device UUID

  private static final String ANDROID_PLATFORM = "Android";
  private static final String AMAZON_PLATFORM = "amazon-fireos";
  private static final String AMAZON_DEVICE = "Amazon";

  /**
   * Constructor.
   */
  public Device() {
  }

  /**
   * Sets the context of the Command. This can then be used to do things like
   * get file paths associated with the Activity.
   *
   * @param cordova The context of the main Activity.
   * @param webView The CordovaWebView Cordova is running in.
   */
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    Device.uuid = getUuid();
  }

  /**
   * Executes the request and returns PluginResult.
   *
   * @param action          The action to execute.
   * @param args            JSONArry of arguments for the plugin.
   * @param callbackContext The callback id used when calling back into JavaScript.
   * @return True if the action was valid, false if not.
   */
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if ("getDeviceInfo".equals(action)) {
      JSONObject r = new JSONObject();
      r.put("uuid", Device.uuid);
      r.put("version", this.getOSVersion());
      r.put("platform", this.getPlatform());
      r.put("model", this.getModel());
      r.put("manufacturer", this.getManufacturer());
      r.put("isVirtual", this.isVirtual());
      r.put("serial", this.getSerialNumber());
      callbackContext.success(r);
    } else if ("getCertificateInfo".equals(action)) {
      final String algorithmType = args.getString(0);
      String value = getCertificateInfo(cordova,algorithmType);
      if(!value.isEmpty()){
        callbackContext.success(value);
      }else {
        callbackContext.error(value);
      }
    }
        else{
      return false;
    }
    return true;
  }


  public static String getCertificateInfo(CordovaInterface cordova, String algorithm) {
    String value = "";
    try {
      PackageInfo packageInfo = cordova.getContext().getPackageManager().getPackageInfo(cordova.getContext().getApplicationContext().getPackageName(), PackageManager.GET_SIGNATURES);
      Signature[] signatures = packageInfo.signatures;
      for (Signature signature : signatures) {
        MessageDigest md;
        md = MessageDigest.getInstance(algorithm);
        md.update(signature.toByteArray());
        byte[] byteArray = md.digest();
        StringBuffer md5StrBuff = new StringBuffer();
        for (int i = 0; i < byteArray.length; i++) {
          if (Integer.toHexString(0xFF & byteArray[i]).length() == 1) {
            md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
          } else {
            md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
          }
        }
        value = String.valueOf(md5StrBuff);
      }
    } catch (PackageManager.NameNotFoundException e) {
      Log.e(TAG,"Error getCertificateInfo NameNotFoundException " + e);
    } catch (NoSuchAlgorithmException e) {
      Log.e(TAG,"Error getCertificateInfo NoSuchAlgorithmException " + e);
    }
    return value;
  }

  //--------------------------------------------------------------------------
  // LOCAL METHODS
  //--------------------------------------------------------------------------

  /**
   * Get the OS name.
   *
   * @return
   */
  public String getPlatform() {
    String platform;
    if (isAmazonDevice()) {
      platform = AMAZON_PLATFORM;
    } else {
      platform = ANDROID_PLATFORM;
    }
    return platform;
  }

  /**
   * Get the device's Universally Unique Identifier (UUID).
   *
   * @return
   */
  public String getUuid() {
    String uuid = Settings.Secure.getString(this.cordova.getActivity().getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
    return uuid;
  }

  public String getModel() {
    String model = android.os.Build.MODEL;
    return model;
  }

  public String getProductName() {
    String productname = android.os.Build.PRODUCT;
    return productname;
  }

  public String getManufacturer() {
    String manufacturer = android.os.Build.MANUFACTURER;
    return manufacturer;
  }

  public String getSerialNumber() {
    String serial = android.os.Build.SERIAL;
    return serial;
  }

  /**
   * Get the OS version.
   *
   * @return
   */
  public String getOSVersion() {
    String osversion = android.os.Build.VERSION.RELEASE;
    return osversion;
  }

  public String getSDKVersion() {
    @SuppressWarnings("deprecation")
    String sdkversion = android.os.Build.VERSION.SDK;
    return sdkversion;
  }

  public String getTimeZoneID() {
    TimeZone tz = TimeZone.getDefault();
    return (tz.getID());
  }

  /**
   * Function to check if the device is manufactured by Amazon
   *
   * @return
   */
  public boolean isAmazonDevice() {
    if (android.os.Build.MANUFACTURER.equals(AMAZON_DEVICE)) {
      return true;
    }
    return false;
  }

  public boolean isVirtual() {
    return android.os.Build.FINGERPRINT.contains("generic") ||
      android.os.Build.PRODUCT.contains("sdk");
  }

}
