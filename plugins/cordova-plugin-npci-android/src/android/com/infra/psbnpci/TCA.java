package com.infra.psbnpci;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.npci.upi.security.services.CLServices;
import org.npci.upi.security.services.ServiceConnectionStatusNotifier;

public class TCA implements ServiceConnectionStatusNotifier {
  String typeNew;

  CallbackContext callbackNew;

  TCA(String type, CallbackContext callback) {
    this.typeNew = type;
    this.callbackNew = callback;
  }
  
  public void serviceConnected(CLServices clServices) {
    NHCP.callOnceServiceStarted(clServices, this.typeNew, this.callbackNew);
  }

  public void serviceDisconnected() {
    NHCP.clServices = null;
    NHCP.showErrorOnCLInit(this.callbackNew);
  }
}
