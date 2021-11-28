package com.cordova.plugins.QRCP;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import androidx.core.content.ContextCompat;

import com.sample.qrcp.QCA;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;


/**
 * This class echoes a string called from JavaScript.
 */
public class QRCP extends CordovaPlugin {
  PluginResult result = null;
  public CallbackContext callbackContext = null;
  public CallbackContext callbackContext1 = null;
  public Activity serviceActivity;
  public String packageName;
  static Context context;
  static Activity activity;
  public static CallbackContext callback;
  private CordovaInterface cordovaInterface = null;
  public static String errorMsg = "";
  public static String scanDes = "";
  public static String scanbtn = "";
  public static ArrayList<String> arrayListPermission;
  private static final String PROB_PARSE = "Problem while parsing QR or Invalid QR Code.";
  private static final String POINT_QR = "Point at QR code to Pay";
  private static final String SCAN_GALL = "Scan from Gallery";
  // public static String UUID = "";
  // public String devId;
  public static final int REQUEST_CODE = 0x0ba7c0de;
  private static final String CANCELLED = "cancelled";
  private static final String FORMAT = "format";
  private static final String TEXT = "text";
  private static final String LOG = QRCP.class.getSimpleName();
  @Override
  public void initialize(final CordovaInterface cordova, final CordovaWebView webView) {
    super.initialize(cordova, webView);
    serviceActivity = cordova.getActivity();
    cordovaInterface = cordova;
    packageName = serviceActivity.getPackageName();
  }

  @Override
  public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
    this.callbackContext = callbackContext;
    if (action.equals("scan")) {
      final String invalidQRMsg = args.getJSONObject(0).getString("invalidQRMsg");
      final String pointQRMsg = args.getJSONObject(0).getString("pointQRMsg");
      final String scanGalleryMsg = args.getJSONObject(0).getString("scanGalleryMsg");
      final String recentPayees = args.getJSONObject(0).getString("recentPayees");
      checkCameraPermissionAndProceed(invalidQRMsg, pointQRMsg, scanGalleryMsg, recentPayees,this.callbackContext,serviceActivity);
      return true;
    }  else {
    }

    return false;
  }

  public void checkCameraPermissionAndProceed(String errorString, String scanDesc, String scanBtnText,String recentPayees, CallbackContext call, Activity serviceActivity) {
    context = serviceActivity.getApplicationContext();
    errorMsg = errorString;
    scanDes = scanDesc;
    scanbtn = scanBtnText;
    callback = call;

    cordovaInterface.setActivityResultCallback(this);
    Intent intent = new Intent(context, QCA.class);
    intent.putExtra("errorText", errorString);
    intent.putExtra("scanDescText", scanDesc);
    intent.putExtra("scanBtnText",scanBtnText);
    intent.putExtra("RecentArray", recentPayees);
    serviceActivity.startActivityForResult(intent, 101);
  }

  /**
   * Called when the barcode scanner intent completes.
   *
   * @param requestCode The request code originally supplied to startActivityForResult(),
   *                       allowing you to identify who this result came from.
   * @param resultCode  The integer result code returned by the child activity through its setResult().
   * @param intent      An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
   */
  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    if (requestCode == 101) {
        JSONObject obj = new JSONObject();
        try {
          if(intent != null){
            obj.put(TEXT, intent.getStringExtra("MESSAGE"));
            this.callbackContext.success(obj);
          }

        } catch (JSONException e) {
        }
      }else {
        this.callbackContext.error("Unexpected error");
      }
  }

  public static boolean hasPermission(Context context, String permission) {
    return ContextCompat.checkSelfPermission(context, permission) == 0;
  }


}
