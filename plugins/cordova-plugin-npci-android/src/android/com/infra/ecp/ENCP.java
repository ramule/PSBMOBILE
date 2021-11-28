package com.infra.ecp;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
// import android.util.Base64;
import android.widget.Toast;
import java.util.HashMap;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.npci.upi.security.pinactivitycomponent.CLConstants;
import org.npci.upi.security.services.CLRemoteResultReceiver;
import org.npci.upi.security.services.CLServices;
import org.apache.cordova.PluginResult;
import android.util.Log;

import java.io.ByteArrayInputStream;
import java.io.StringReader;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;

public class ENCP {
    public static CallbackContext callbackContext = null;
    public static String plainValue = "";
    public static String encryptedString = "";
    static PluginResult result = null;

  public static void getEncryptedValueFromCert(String alg, String certFactory, String certificateString, String plainValue,CallbackContext callbackContext) {
        X509Certificate certificate = null;
        CertificateFactory cf = null;
        String encryptedString = "";
        try {
            if (certificateString != null && !certificateString.trim().isEmpty()) {
                certificateString = certificateString.replace("-----BEGIN CERTIFICATE-----\n", "")
                        .replace("-----END CERTIFICATE-----", ""); // NEED FOR PEM FORMAT CERT STRING
                byte[] certificateData = new BASE64Decoder().decodeBuffer(certificateString);

                //X509
                cf = CertificateFactory.getInstance(certFactory);
                certificate = (X509Certificate) cf.generateCertificate(new ByteArrayInputStream(certificateData));
                Key pubKey = certificate.getPublicKey();

                //RSA/ECB/PKCS1Padding
                Cipher cipher = Cipher.getInstance(alg);
                cipher.init(Cipher.ENCRYPT_MODE, pubKey);
                byte[] plain = plainValue.getBytes();
                byte[] encrypted = cipher.doFinal(plain);
                // String encryptedString = new BASE64Encoder().encode(encrypted);
                encryptedString = new BASE64Encoder().encode(encrypted);
                // return encryptedString;
            }
        } catch (CertificateException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // return plainValue;
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("msg", "getEncryptedValueFromCert : SUCESS");
            // jsonObject.put("plainValue", plainValue);
            jsonObject.put("encryptedString", encryptedString);

            result = new PluginResult(PluginResult.Status.OK, jsonObject);
            result.setKeepCallback(false);
            if (callbackContext != null) {
                callbackContext.sendPluginResult(result);
                //no more result , hence the context is cleared.
                callbackContext = null;
            } else {
                callbackContext.error("getEncryptedValueFromCert : Error");
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}