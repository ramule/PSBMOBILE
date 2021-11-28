package com.infra.psbnpci;

import java.security.MessageDigest;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptLib {
  public byte[] SHA256(String paramString) {
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      md.update(paramString.getBytes("UTF-8"));
      byte[] digest = md.digest();
      return digest;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    } 
  }
  
  public byte[] encrypt(String alg, String padding, byte[] data, byte[] key) {
    try {
      SecretKeySpec keySpec = new SecretKeySpec(key, alg);
      byte[] iv = new byte[16];
      IvParameterSpec ivSpec = new IvParameterSpec(iv);
      Cipher acipher = Cipher.getInstance(padding);
      acipher.init(1, keySpec, ivSpec);
      byte[] arrayOfByte1 = acipher.doFinal(data);
      return arrayOfByte1;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    } 
  }
  
  public byte[] hexStringToByteArray(String s) {
    byte[] b = new byte[s.length() / 2];
    for (int i = 0; i < b.length; i++) {
      int index = i * 2;
      int v = Integer.parseInt(s.substring(index, index + 2), 16);
      b[i] = (byte)v;
    } 
    return b;
  }
}
