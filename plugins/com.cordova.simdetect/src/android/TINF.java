package com.cordova.SDCP;

import android.content.Context;
import android.telephony.TelephonyManager;
import java.lang.reflect.Method;

public final class TINF {
  private static TINF TINF;
  
  private String imsiSIM1;
  
  private String imsiSIM2;
  
  private boolean isSIM1Ready;
  
  private boolean isSIM2Ready;
  
  public String getImsiSIM1() {
    return this.imsiSIM1;
  }
  
  public String getImsiSIM2() {
    return this.imsiSIM2;
  }
  
  public boolean isSIM1Ready() {
    return this.isSIM1Ready;
  }
  
  public boolean isSIM2Ready() {
    return this.isSIM2Ready;
  }
  
  public boolean isDualSIM() {
    return (this.imsiSIM2 != null);
  }
  
  public static TINF getInstance(Context context) {
    if (TINF == null) {
      TINF = new TINF();
      TelephonyManager telephonyManager = (TelephonyManager)context.getSystemService("phone");
      TINF.imsiSIM1 = telephonyManager.getDeviceId();
      TINF.imsiSIM2 = null;
      try {
        TINF.imsiSIM1 = getDeviceIdBySlot(context, "getDeviceIdGemini", 0);
        TINF.imsiSIM2 = getDeviceIdBySlot(context, "getDeviceIdGemini", 1);
      } catch (GeminiMethodNotFoundException e) {
        e.printStackTrace();
        try {
          TINF.imsiSIM1 = getDeviceIdBySlot(context, "getDeviceId", 0);
          TINF.imsiSIM2 = getDeviceIdBySlot(context, "getDeviceId", 1);
        } catch (GeminiMethodNotFoundException e1) {
          e1.printStackTrace();
        } 
      } 
      TINF.isSIM1Ready = (telephonyManager.getSimState() == 5);
      TINF.isSIM2Ready = false;
      try {
        TINF.isSIM1Ready = getSIMStateBySlot(context, "getSimStateGemini", 0);
        TINF.isSIM2Ready = getSIMStateBySlot(context, "getSimStateGemini", 1);
      } catch (GeminiMethodNotFoundException e) {
        e.printStackTrace();
        try {
          TINF.isSIM1Ready = getSIMStateBySlot(context, "getSimState", 0);
          TINF.isSIM2Ready = getSIMStateBySlot(context, "getSimState", 1);
        } catch (GeminiMethodNotFoundException e1) {
          e1.printStackTrace();
        } 
      } 
    } 
    return TINF;
  }
  
  private static String getDeviceIdBySlot(Context context, String predictedMethodName, int slotID) throws GeminiMethodNotFoundException {
    String imsi = null;
    TelephonyManager telephony = (TelephonyManager)context.getSystemService("phone");
    try {
      Class<?> telephonyClass = Class.forName(telephony.getClass().getName());
      Class<?>[] parameter = new Class[1];
      parameter[0] = int.class;
      Method getSimID = telephonyClass.getMethod(predictedMethodName, parameter);
      Object[] obParameter = new Object[1];
      obParameter[0] = Integer.valueOf(slotID);
      Object ob_phone = getSimID.invoke(telephony, obParameter);
      if (ob_phone != null)
        imsi = ob_phone.toString(); 
    } catch (Exception e) {
      e.printStackTrace();
      throw new GeminiMethodNotFoundException(predictedMethodName);
    } 
    return imsi;
  }
  
  private static boolean getSIMStateBySlot(Context context, String predictedMethodName, int slotID) throws GeminiMethodNotFoundException {
    boolean isReady = false;
    TelephonyManager telephony = (TelephonyManager)context.getSystemService("phone");
    try {
      Class<?> telephonyClass = Class.forName(telephony.getClass().getName());
      Class<?>[] parameter = new Class[1];
      parameter[0] = int.class;
      Method getSimStateGemini = telephonyClass.getMethod(predictedMethodName, parameter);
      Object[] obParameter = new Object[1];
      obParameter[0] = Integer.valueOf(slotID);
      Object ob_phone = getSimStateGemini.invoke(telephony, obParameter);
      if (ob_phone != null) {
        int simState = Integer.parseInt(ob_phone.toString());
        if (simState == 5)
          isReady = true; 
      } 
    } catch (Exception e) {
      e.printStackTrace();
      throw new GeminiMethodNotFoundException(predictedMethodName);
    } 
    return isReady;
  }
  
  private static class GeminiMethodNotFoundException extends Exception {
    private static final long serialVersionUID = -996812356902545308L;
    
    public GeminiMethodNotFoundException(String info) {
      super(info);
    }
  }
}
