package com.infra.psbnpci;

import android.util.Log;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utilities {
  public static void showLogE(String TAG, String message) {
    Log.e(TAG, message);
  }
  
  public static String maskAccountNumber(String text) {
    return text.replace(text.substring(0, text.length() - 4), "********");
  }
  
  public static boolean isDateExpired(String storedDate) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
      Date strDate = sdf.parse(storedDate);
      if ((new Date()).after(strDate))
        return true; 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return false;
  }
  
  public static boolean isNotNullOrEmpty(String value) {
    if (value == null)
      return false; 
    if (value.equals("") || value.toLowerCase().equalsIgnoreCase("null"))
      return false; 
    return true;
  }
}
