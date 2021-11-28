package com.infra.psbnpci;

import android.util.Base64;

public class TrustCreator {
  public static String createTrust(String alg, String padding, String message, String token) {
    String trust = null;
    CryptLib lib = null;
    try {
      lib = new CryptLib();
      byte[] tokenBytes = lib.hexStringToByteArray(token);
      trust = Base64.encodeToString(lib.encrypt(alg, padding, lib.SHA256(message), tokenBytes), 2);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return trust;
  }
}
