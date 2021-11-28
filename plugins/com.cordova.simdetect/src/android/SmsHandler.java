package com.cordova.SDCP;

import android.app.Activity;
import android.app.PendingIntent;
import android.os.Build;
import android.os.IBinder;
import java.lang.reflect.Method;

public class SmsHandler {
  static Activity fragment;
  
  public SmsHandler(Activity fObj) {
    // this;
    fragment = fObj;
  }
  
  public static void send(String SMSGateway, String message, int simId, String appName, PendingIntent sentIntent, PendingIntent deliveryIntent) {
    String name = "isms";
    if (simId > 1)
      name = "isms" + simId; 
    try {
      Method method = Class.forName("android.os.ServiceManager").getDeclaredMethod("getService", new Class[] { String.class });
      method.setAccessible(true);
      Object param = method.invoke((Object)null, new Object[] { name });
      method = Class.forName("com.android.internal.telephony.ISms$Stub").getDeclaredMethod("asInterface", new Class[] { IBinder.class });
      method.setAccessible(true);
      Object stubObj = method.invoke((Object)null, new Object[] { param });
      if (Build.VERSION.SDK_INT < 18) {
        method = stubObj.getClass().getMethod("sendText", new Class[] { String.class, String.class, String.class, PendingIntent.class, PendingIntent.class });
        method.invoke(stubObj, new Object[] { SMSGateway, null, message, sentIntent, deliveryIntent });
        return;
      } 
      method = stubObj.getClass().getMethod("sendText", new Class[] { String.class, String.class, String.class, String.class, PendingIntent.class, PendingIntent.class });
      method.invoke(stubObj, new Object[] { appName, SMSGateway, null, message, sentIntent, deliveryIntent });
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
