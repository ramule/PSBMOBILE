package com.cordova.SDCP;

public class SubscriptionInfoModel {
  private String displayName;
  
  private String subscriptionId;
  
  private String simSlotIndex;
  
  public SubscriptionInfoModel(String displayName, String subscriptionId, String simSlotIndex) {
    this.displayName = displayName;
    this.subscriptionId = subscriptionId;
    this.simSlotIndex = simSlotIndex;
  }
  
  public String getSimSlotIndex() {
    return this.simSlotIndex;
  }
  
  public void setSimSlotIndex(String simSlotIndex) {
    this.simSlotIndex = simSlotIndex;
  }
  
  public String getSubscriptionId() {
    return this.subscriptionId;
  }
  
  public void setSubscriptionId(String subscriptionId) {
    this.subscriptionId = subscriptionId;
  }
  
  public String getDisplayName() {
    return this.displayName;
  }
  
  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }
}
