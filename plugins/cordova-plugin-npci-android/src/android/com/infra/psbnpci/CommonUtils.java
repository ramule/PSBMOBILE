package com.infra.psbnpci;

import android.util.Base64;
import android.util.Log;

public class CommonUtils {
  public static String getChallenge(String type, String deviceId) {
    String request_challenge = null;
    request_challenge = NHCP.getClServices().getChallenge(type, deviceId);
    Log.e("NPCI_MOBILE", "Challange From CL : " + request_challenge);
    return request_challenge;
  }

  public static String populateHMAC(String alg, String padding, String app_id, String mobile, String token, String deviceId) {
    String hmac = null;
    try {
      CryptLib cryptLib = new CryptLib();
      String message = app_id + "|" + mobile + "|" + deviceId;
      Log.e("PSP Hmac Msg", message);
      byte[] tokenBytes = cryptLib.hexStringToByteArray(token);
      byte[] hmacBytes = cryptLib.encrypt(alg, padding, cryptLib
          .SHA256(message), tokenBytes);
      hmac = Base64.encodeToString(hmacBytes, 0);
      Log.d("PSP Hmac", hmac);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return hmac;
  }

  public static String byteArrayToHex(byte[] a) {
    StringBuilder sb = new StringBuilder(a.length * 2);
    for (byte b : a) {
      sb.append(String.format("%02x", new Object[] { Integer.valueOf(b & 0xFF) }));
    }
    return sb.toString();
  }

  public static String getCredAllowed(String type, String credType, String credSubType, String credDType, String credDLength, String atmCredType, String atmCredSubType, String atmCredDType, String atmCredDLength, String otpType, String otpSubType, String otpDType, String otpDLenght) {
    String credAllowedString;
    if (type.equals("OTPMPINATM")) {
      credAllowedString = "{\n\"CredAllowed\": [\n{\n\"type\": " + otpType + ",\"subtype\": " + otpSubType + ",\n\"dType\": " + otpDType + ",\n\"dLength\": " + otpDLenght + "\n},\n{\n\"type\": " + credType + ",\"subtype\": " + credSubType + ",\"dType\": " + credDType + ",\"dLength\": " + credDLength + "},\n{\n\"type\": " + atmCredType + ",\"subtype\": " + atmCredSubType + ",\"dType\": " + atmCredDType + ",\"dLength\": " + atmCredDLength + "}\n]\n}";
    } else if (type.equals("MPIN")) {
      credAllowedString = "{\"CredAllowed\": [{\"type\": " + credType + ",\"subtype\": " + credSubType + ",\"dType\": " + credDType + ",\"dLength\": " + credDLength + "}]}";
    } else if (type.equals("MPINNPIN")) {
      credAllowedString = "{\"CredAllowed\": [{\"type\": " + credType + ",\"subtype\": \"MPIN\",\"dType\": " + credDType + ",\"dLength\": " + credDLength + "},{\"type\": " + credType + ",\"subtype\": \"NMPIN\",\"dType\": " + credDType + ",\"dLength\": " + credDLength + "}]}";
    } else if (type.equals("OTPMPIN")) {
      credAllowedString = "{\"CredAllowed\": [{\"type\": \"OTP\",\"subtype\": \"SMS\",\"dType\": \"ALPH | NUM\",\"dLength\": 6},{\"type\": " + credType + ",\"subtype\": \"MPIN\",\"dType\": " + credDType + ",\"dLength\": " + credDLength + "}]}";
    } else if (type.equals("OTP")) {
      credAllowedString = "{\"CredAllowed\": [{\"type\": \"OTP\",\"subtype\": \"SMS\",\"dType\": \"ALPH | NUM\",\"dLength\": 6}]}";
    } else {
      credAllowedString = "{\"CredAllowed\": [{\"type\": \"PIN\",\"subtype\": \"MPIN\",\"dType\": \"ALPH | NUM\",\"dLength\": 6}]}";
    }
    return credAllowedString;
  }
}
