import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard, NavigationGuard } from './services/navigation-guard.service';
import {  AuthenticatedGuard } from './services/authenticated.guard.service';
import {ThemeSettingsComponent} from './pages/common-ui/theme-settings/theme-settings.component';
import { AppConstants } from './app.constant';
import { environment } from '../environments/environment.prod';
// var route: string = "/LandingPage";
var route: string = "/login";
declare var navigator:any;
// if(window.hasOwnProperty('cordova')){
//   route = "/login";
// }
// else{
//   route = "/login";
// }
if(window.hasOwnProperty('cordova')){
  if (("omniRegisteredUser" in localStorage) && ("isUpiRegistrationSuccess" in localStorage)) {
    console.log("User is registered in Omni & UPI");
      route = "/loginMobile";
  }else if ("omniRegisteredUser" in localStorage) {
    console.log("User is registered in Omni");
      route = "/loginMobile";
  }else if ("isUpiRegistrationSuccess" in localStorage) {
    console.log("User is registered in UPI");
      route = "/upiLogin";
  }else {
    console.log("User is registered neither in Omni & nor in UPI");
      route = "/LandingPage";
  }
  // navigator.splashscreen.hide();

}else{
  if(environment.production){
    route="/nliLanding"
  }else{
    route="/login"
  }
}

const routes: Routes = [
  { path: '', redirectTo: route, pathMatch: 'full' }, // for web
  // { path: '', redirectTo: '/loginMobile', pathMatch: 'full' }, // for mobile
  { path: 'themeSettings',component: ThemeSettingsComponent},

  /**** Omni Routes Starts  ****/
  { path: 'login', loadChildren: () => import('../app/pages/omni/pre-login/login/login.module').then(m => m.LoginModule), },
  { path : 'loginMobile', loadChildren: () => import('./pages/omni/pre-login/login-mobile/login-mobile.module').then(m => m.LoginMobileModule) },
  { path: 'otp', loadChildren: () => import('../app/pages/omni/pre-login/otp/otp.module').then(m => m.OtpModule) },

  //omni registration startmyaccount
  { path: 'registration', loadChildren: () => import('../app/pages/omni/pre-login/registration/registration-steps/registration-steps.module').then(m => m.RegistrationStepsModule),},
  { path: 'alreadyRegistered', loadChildren: () => import('../app/pages/omni/pre-login/already-registered/already-registered.module').then(m => m.AlreadyRegisteredModule) },
  { path: 'nonRegistered', loadChildren: () => import('../app/pages/omni/pre-login/non-register/non-register.module').then(m => m.NonRegisterModule) },
  { path: 'registrationMobCheck', loadChildren: () => import('./pages/omni/pre-login/registration/registration-mob-check/registration-mob-check.module').then(m => m.RegistrationMobCheckModule) },
  { path: 'registrationCustDetails', loadChildren: () => import('./pages/omni/pre-login/registration/registration-cust-details/registration-cust-details.module').then(m => m.RegistrationCustDetailsModule) },
  { path: 'registrationValidateRegDetails', loadChildren: () => import('./pages/omni/pre-login/registration/registration-validate-reg-details/registration-validate-reg-details.module').then(m => m.RegistrationValidateRegModule) },
  { path: 'registrationUsername', loadChildren: () => import('./pages/omni/pre-login/registration/registration-username/registration-username.module').then(m => m.RegistrationUsernameModule) },
  { path: 'registrationSecurityQuestion', loadChildren: () => import('./pages/omni/pre-login/registration/registration-security-question/registration-security-question.module').then(m => m.RegistrationSecurityQuestionModule) },
  { path: 'registrationTpin', loadChildren: () => import('./pages/omni/pre-login/registration/registration-tpin/registration-tpin.module').then(m => m.RegistrationTpinModule) },
  { path: 'registrationMpin', loadChildren: () => import('./pages/omni/pre-login/registration/registration-mpin/registration-mpin.module').then(m => m.RegistrationMpinModule) },
  { path: 'registrationSuccess', loadChildren: () => import('./pages/omni/pre-login/registration/register-success/register-success.module').then(m => m.RegistrationSuccessModule) },
  { path: 'registrationMpinUserValidate', loadChildren: () => import('./pages/omni/pre-login/registration/registration-mpin-validate-user/registration-mpin-validate-user.module').then(m => m.RegistrationMpinValidateUserModule) },

  //omni registration end

//omni Acc opening
  { path: 'accountOpeningSteps', loadChildren: () => import('../app/pages/omni/pre-login/account-opening/account-opening-steps/account-opening-steps.module').then(m => m.AccountOpeningStepsModule) },
  { path: 'accountOpening', loadChildren: () => import('../app/pages/omni/pre-login/account-opening/account-opening-landing/account-opening-landing.module').then(m => m.AccountOpeningLandingModule) },
  { path: 'accountOpeningBasicDetails', loadChildren: () => import('../app/pages/omni/pre-login/account-opening/account-opening-basic-details/account-opening-basic-details.module').then(m => m.AccountOpeningBasicDetailsModule) },
  { path: 'accountOpeningKyc', loadChildren: () => import('../app/pages/omni/pre-login/account-opening/account-opening-kyc-verification/account-opening-kyc-verification.module').then(m => m.AccountOpeningKycVerificationModule) },
  { path: 'accountOpeningSuccess', loadChildren: () => import('../app/pages/omni/pre-login/account-opening/account-opening-success/account-opening-success.module').then(m => m.AccountOpeningSuccessModule) },
  { path: 'ForgotPassword', loadChildren: () => import('./pages/omni/pre-login/forgot-password/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'ForgotUsername', loadChildren: () => import('./pages/omni/pre-login/forgot-username/forgot-username/forgot-username.module').then(m => m.ForgotUsernameModule) },
  { path: 'usernameSuccess', loadChildren: () => import('./pages/omni/pre-login/forgot-username/username-success/username-success.module').then(m => m.UsernameSuccessModule) },
  { path: 'forgotPasswordAuth', loadChildren: () => import('./pages/omni/pre-login/forgot-password/forgot-password-user-auth/forgot-password-user-auth.module').then(m => m.ForgotPasswordUserAuthModule) },
  { path: 'setPassword', loadChildren: () => import('./pages/omni/pre-login/forgot-password/forgot-password-set-password/forgot-password-set-password.module').then(m => m.ForgotPasswordSetPasswordModule) },
  { path: 'forgotPasswordSuccess', loadChildren: () => import('./pages/omni/pre-login/forgot-password/forgot-password-success/forgot-password-success.module').then(m => m.ForgotPasswordSuccessModule) },
  { path: 'moreServices', loadChildren: () => import('./pages/omni/pre-login/more-services/more-services.module').then(m => m.MoreServicesModule) },

  //forgot mpin tpin
  { path: 'forgotMpinMob', loadChildren: () => import('./pages/omni/pre-login/forgot-mpin-mob/forgot-mpin-mob.module').then(m => m.ForgotMpinMobModule) },

  { path: 'setForgotMpin', loadChildren: () => import('./pages/omni/pre-login/forgot-mpin/forgot-mpin/forgot-mpin.module').then(m => m.ForgotMpinModule) },
  { path: 'forgotMpinSuccess', loadChildren: () => import('./pages/omni/pre-login/forgot-mpin/forgot-mpin-success/forgot-mpin-success.module').then(m => m.ForgotMpinSuccessModule) },
  { path: 'setForgotMpinUserAuth', loadChildren: () => import('./pages/omni/pre-login/forgot-mpin/forgot-mpin-user-authentication/forgot-mpin-user-authentication.module').then(m => m.ForgotMpinUserAuthenticationModule) },
  { path: 'setForgotTpinUserAuth', loadChildren: () => import('./pages/omni/pre-login/forgot-tpin/forgot-tpin-user-authentication/forgot-tpin-user-authentication.module').then(m => m.ForgotTpinUserAuthenticationModule) },
  { path: 'setForgotTpin', loadChildren: () => import('./pages/omni/pre-login/forgot-tpin/forgot-tpin/forgot-tpin.module').then(m => m.ForgotTpinModule) },

  { path: 'otherBanks', loadChildren: () => import('./pages/omni/fund-transfer/other-bank/other-bank.module').then(m => m.otherBankTransferModule),canActivate:[AuthenticatedGuard]},
  { path: 'sendMoney', loadChildren: () => import('./pages/omni/fund-transfer/initiate-send-money/initiate-send-money.module').then(m => m.InitiateSendMoneyModule),canActivate:[AuthenticatedGuard] },
  { path: 'transferReceipt', loadChildren: () => import('./pages/omni/fund-transfer/transfer-receipt/transfer-receipt.module').then(m => m.TransferReceiptModule),canActivate:[AuthenticatedGuard] },
  { path: 'receipt', loadChildren: () => import('./pages/omni/receipt/receipt.module').then(m => m.ReceiptModule) },
  { path: 'otpSession', loadChildren: () => import('./pages/omni/otp-session/otp-session.module').then(m => m.OTPSessionModule),canActivate:[AuthenticatedGuard] },
  { path: 'tpin', loadChildren: () => import('./pages/omni/tpin/tpin.module').then(m => m.TPINModule),canActivate:[AuthenticatedGuard] },
  { path: 'addPayee', loadChildren: () => import('./pages/omni/fund-transfer/add-payee/add-payee.module').then(m => m.AddPayeeModule),canActivate:[AuthenticatedGuard] },
  { path: 'addPayeeConfirm', loadChildren: () => import('./pages/omni/fund-transfer/add-payee-confirm/add-payee-confirm.module').then(m => m.AddPayeeModule),canActivate:[AuthenticatedGuard] },
  { path: 'managePayee', loadChildren: () => import('./pages/omni/fund-transfer/manage-payee/manage-payee.module').then(m => m.ManagePayeeModule),canActivate:[AuthenticatedGuard] },
  { path: 'payeeSuccess', loadChildren: () => import('./pages/omni/fund-transfer/payee-add-success/payee-add-success.module').then(m => m.PayeeAddSuccessModule) ,canActivate:[AuthenticatedGuard]},
  { path: 'myAccount', loadChildren: () => import('./pages/omni/my-accounts/my-accounts/my-accounts.module').then(m => m.MyAccountsModule),canActivate:[AuthenticatedGuard] },
  { path: 'myDeposits', loadChildren: () => import('./pages/omni/my-accounts/my-deposits/my-deposits.module').then(m => m.MyDepositsModule),canActivate:[AuthenticatedGuard] },
  { path: 'myBorrowings', loadChildren: () => import('./pages/omni/my-accounts/my-borrowings/my-borrowings.module').then(m => m.MyBorrowingsModule),canActivate:[AuthenticatedGuard] },
  { path: 'detailedStatement', loadChildren: () => import('./pages/omni/my-accounts/detailed-statement/detailed-statement.module').then(m => m.DetailedStatementModule),canActivate:[AuthenticatedGuard] },
  { path: 'myAccountDetails', loadChildren: () => import('./pages/omni/my-accounts/account-details/account-details.module').then(m => m.AccountDetailsModule),canActivate:[AuthenticatedGuard] },
  { path: 'myCardsDetails', loadChildren: () => import('./pages/omni/my-cards/my-cards/my-cards.module').then(m => m.MyCardsModule),canActivate:[AuthenticatedGuard] },
  { path: 'dashboard', loadChildren: () => import('./pages/omni/dashboard/dashboard.module').then(m => m.DashboardModule), canDeactivate: [NavigationGuard],canActivate:[AuthenticatedGuard] },
  { path: 'dashboardMobile', loadChildren: () => import('./pages/omni/dashboard-mobile/dashboard-mobile.module').then(m => m.DashboardMobileModule), canDeactivate: [NavigationGuard] },
  { path: 'omniAllRecentPayeeMob', loadChildren: () => import('./pages/omni/dashboard-mobile/dashboard-all-recent-payee/dashboard-all-recent-payeemodule').then(m => m.DashboardAllRecentPayeeModule), canDeactivate: [NavigationGuard] },
  { path: 'chequeBookRequest', loadChildren: () => import('./pages/omni/service-request/cheque-book-request/cheque-book-request.module').then(m => m.ChequeBookRequestModule),canActivate:[AuthenticatedGuard] },
  { path: 'stopCheques', loadChildren: () => import('./pages/omni/service-request/stop-cheque/stop-cheques/stop-cheques.module').then(m => m.StopChequesModule),canActivate:[AuthenticatedGuard] },
  { path: 'pendingRequest', loadChildren: () => import('./pages/omni/pending-request/pending-request.module').then(m => m.PendingRequestModule),canActivate:[AuthenticatedGuard] },
  // { path: 'rechargeBillPay', loadChildren: () => import('./pages/omni/bill-payment/bill-pay/bill-pay.module').then(m => m.BillPayModule),canActivate:[AuthenticatedGuard] },
  { path: 'loans', loadChildren: () => import('./pages/omni/loans/loans/loans.module').then(m => m.LoansModule),canActivate:[AuthenticatedGuard] },
  { path: 'addBiller', loadChildren: () => import('./pages/omni/bill-payment/add-biller/add-biller.module').then(m => m.AddBillerModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanDetails', loadChildren: () => import('./pages/omni/loans/loan-details/loan-details.module').then(m => m.LoanDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'profileDetails', loadChildren: () => import('./pages/omni/profile/profile-details/profile-details.module').then(m => m.ProfileDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'favoritePayee', loadChildren: () => import('./pages/omni/fund-transfer/favorite-payee/favorite-payee.module').then(m => m.FavoritePayeeModule),canActivate:[AuthenticatedGuard] },
  // {path : 'addPayeeAuthorization', loadChildren: () => import('./pages/omni/fund-transfer/add-payee-authorization/add-payee-authorization.module').then(m => m.AddPayeeAuthorizationModule) },
  {path : 'profileUpdate', loadChildren: () => import('./pages/omni/profile/profile-update/profile-update.module').then(m => m.ProfileUpdateModule),canActivate:[AuthenticatedGuard] },
  {path : 'positivePay', loadChildren: () => import('./pages/omni/service-request/positive-pay/positive-pay/positive-pay.module').then(m => m.PositivePayModule),canActivate:[AuthenticatedGuard] },
  {path : 'positivePayConfirmation', loadChildren: () => import('./pages/omni/service-request/positive-pay/positive-pay-confirmation/positive-pay-confirmation.module').then(m => m.PositivePayConfirmationModule),canActivate:[AuthenticatedGuard] },
  {path : 'positivePaySuccess', loadChildren: () => import('./pages/omni/service-request/positive-pay/positive-pay-success/positive-pay-success.module').then(m => m.PositivePaySuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'freezeAccount', loadChildren: () => import('./pages/omni/freeze-account/freeze-account/freeze-account.module').then(m => m.FreezeAccountModule),canActivate:[AuthenticatedGuard] },
  {path : 'freezeAccountReceipt', loadChildren: () => import('./pages/omni/freeze-account/freeze-account-receipt/freeze-account-receipt.module').then(m => m.FreezeAccountReceiptModule),canActivate:[AuthenticatedGuard]},
  {path : 'linkAccount', loadChildren: () => import('./pages/omni/link-delink-account/link-account/link-account.module').then(m => m.LinkAccountModule),canActivate:[AuthenticatedGuard] },
  {path : 'delinkAccount', loadChildren: () => import('./pages/omni/link-delink-account/delink-account/delink-account.module').then(m => m.DelinkAccountModule),canActivate:[AuthenticatedGuard] },
  {path : 'feedback', loadChildren: () => import('./pages/omni/feedback/feedback.module').then(m => m.FeedbackModule),canActivate:[AuthenticatedGuard] },
  {path : 'tdsCertificate', loadChildren: () => import('./pages/omni/tds-certificate/tds-certificate.module').then(m => m.TdsCertificateModule),canActivate:[AuthenticatedGuard] },
  {path : 'directTaxPayment', loadChildren: () => import('./pages/omni/direct-tax-payment/direct-tax-payment/direct-tax-payment.module').then(m => m.DirectTaxPaymentModule),canActivate:[AuthenticatedGuard] },
  {path : 'directTaxPaymentHistory', loadChildren: () => import('./pages/omni/direct-tax-payment/direct-tax-payment-history/direct-tax-payment-history.module').then(m => m.DirectTaxPaymentHistoryModule),canActivate:[AuthenticatedGuard] },
  {path : 'omniNotification', loadChildren: () => import('./pages/omni/notification/notification.module').then(m => m.NotificationModule),canActivate:[AuthenticatedGuard] },
  {path : 'myAccountsInfo', loadChildren: () => import('./pages/omni/my-accounts/my-accounts-info/my-accounts-info.module').then(m => m.MyAccountsInfoModule),canActivate:[AuthenticatedGuard] },
  {path : 'myChequeBook', loadChildren: () => import('./pages/omni/service-request/my-cheque-book/my-cheque-book.module').then(m => m.MyChequeBookModule),canActivate:[AuthenticatedGuard] },
  {path : 'myChequeBookViewDetails', loadChildren: () => import('./pages/omni/service-request/my-cheque-book-view-details/my-cheque-book-view-details.module').then(m => m.MyChequeBookViewDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'chequeStatusEnquiry', loadChildren: () => import('./pages/omni/service-request/cheque-status-inquiry/cheque-status-inquiry.module').then(m => m.ChequeStatusInquiryModule),canActivate:[AuthenticatedGuard] },
  {path : 'chequeStatusList', loadChildren: () => import('./pages/omni/service-request/cheque-status-list/cheque-status-list.module').then(m => m.ChequeStatusListModule),canActivate:[AuthenticatedGuard] },

  {path : 'stopChequeAuth', loadChildren: () => import('./pages/omni/service-request/stop-cheque/stop-cheque-authorization/stop-cheque-authorization.module').then(m => m.StopChequeAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'stopChequeReceipt', loadChildren: () => import('./pages/omni/service-request/stop-cheque/stop-cheque-receipt/stop-cheque-receipt.module').then(m => m.StopChequeReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'standingInstructionList', loadChildren: () => import('./pages/omni/loans/standing-instruction/standing-instruction-list/standing-instruction-list.module').then(m => m.StandingInstructionListModule) },
  {path : 'addStandingInstruction', loadChildren: () => import('./pages/omni/loans/standing-instruction/add-standing-instruction/standing-instruction.module').then(m => m.StandingInstructionModule),canActivate:[AuthenticatedGuard] },
  {path : 'modifyStandingInstruction', loadChildren: () => import('./pages/omni/loans/standing-instruction/modify-standing-instruction/modify-standing-instruction.module').then(m=>m.ModifyStandingInstructionModule)},
  {path : 'standingInstructionOverview', loadChildren: () => import('./pages/omni/loans/standing-instruction/standing-instruction-auth/standing-instruction-overview.module').then(m => m.StandingInstructionOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'standingInstructionSuccess', loadChildren: () => import('./pages/omni/loans/standing-instruction/standing-instruction-success/standing-instruction-success.module').then(m => m.StandingInstructionSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'standingInstructionView', loadChildren: () => import('./pages/omni/loans/standing-instruction/standing-instruction-view/standing-instruction-view.module').then(m => m.StandingInstructionViewModule),canActivate:[AuthenticatedGuard] },
  
  
  {path : 'applyForFdRD', loadChildren: () => import('./pages/omni/my-accounts/apply-for-fd-rd/apply-for-fd-rd.module').then(m => m.ApplyForFdRdModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeRD', loadChildren: () => import('./pages/omni/my-accounts/close-rd/close-rd/close-rd.module').then(m => m.CloseRdModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeRDAuthorization', loadChildren: () => import('./pages/omni/my-accounts/close-rd/close-rd-authorization/close-rd-authorization.module').then(m => m.CloseRDAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeRDSuccess', loadChildren: () => import('./pages/omni/my-accounts/close-rd/close-rd-success/close-rd-success.module').then(m => m.CloseRDSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeFD', loadChildren: () => import('./pages/omni/my-accounts/close-fd/close-fd/close-fd.module').then(m => m.CloseFdModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeFDAuthorization', loadChildren: () => import('./pages/omni/my-accounts/close-fd/close-fd-authorization/close-fd-authorization.module').then(m => m.CloseFDAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'closeFDSuccess', loadChildren: () => import('./pages/omni/my-accounts/close-fd/close-fd-success/close-fd-success.module').then(m => m.CloseFDSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'donations', loadChildren: () => import('./pages/omni/donations/donations.module').then(m => m.DonationsModule),canActivate:[AuthenticatedGuard] },
  {path : 'debitCards', loadChildren: () => import('./pages/omni/my-cards/debit-cards/debit-cards.module').then(m => m.DebitCardsModule),canActivate:[AuthenticatedGuard] },
  {path : 'hotlistCard', loadChildren: () => import('./pages/omni/my-cards/hotlist-card/hotlist-card/hotlist-card.module').then(m => m.HotlistCardModule),canActivate:[AuthenticatedGuard] },
  {path : 'hotlistCardAuthorization', loadChildren: () => import('./pages/omni/my-cards/hotlist-card/hotlist-card-authorization/hotlist-card-authorization.module').then(m => m.HotlistCardAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'hotlistSuccess', loadChildren: () => import('./pages/omni/my-cards/hotlist-card/hotlist-card-success/hotlist-card-success.module').then(m => m.HotlistCardSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'reissueCard', loadChildren: () => import('./pages/omni/my-cards/reissue-card/reissue-card/reissue-card.module').then(m => m.ReissueCardModule),canActivate:[AuthenticatedGuard] },
  {path : 'reissueCardAuthorization', loadChildren: () => import('./pages/omni/my-cards/reissue-card/reissue-card-authorization/reissue-card-authorization.module').then(m => m.ReissueCardAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'reissueCardSuccess', loadChildren: () => import('./pages/omni/my-cards/reissue-card/reissue-card-success/reissue-card-success.module').then(m => m.ReissueCardSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'getPhysicalCard', loadChildren: () => import('./pages/omni/my-cards/get-physical-card/get-physical-card/get-physical-card.module').then(m => m.GetPhysicalCardModule),canActivate:[AuthenticatedGuard] },
  {path : 'getPhysicalCardAuthorization', loadChildren: () => import('./pages/omni/my-cards/get-physical-card/get-physical-card-authorization/get-physical-card-authorization.module').then(m => m.GetPhysicalCardAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'getPhysicalCardSuccess', loadChildren: () => import('./pages/omni/my-cards/get-physical-card/get-physical-card-success/get-physical-card-success.module').then(m => m.GetPhysicalCardSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'openDeposit', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-deposit/open-deposit.module').then(m => m.OpenDepositModule),canActivate:[AuthenticatedGuard] },
  {path : 'openDepositAccountAuthorization', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-deposit-account-authorization/open-deposit-account-authorization.module').then(m => m.OpenDepositAccountAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'openDepositAccountSuccess', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-deposit-account-success-receipt/open-deposit-account-success-receipt.module').then(m => m.OpenDepositAccountSuccessReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'applyCards', loadChildren: () => import('./pages/omni/my-cards/apply-card/apply-card.module').then(m => m.ApplyCardModule),canActivate:[AuthenticatedGuard] },
  {path : 'upgradeCards', loadChildren: () => import('./pages/omni/my-cards/upgrade-card/upgrade-card.module').then(m => m.UpgradeCardModule),canActivate:[AuthenticatedGuard] },
  {path : 'cardDetails', loadChildren: () => import('./pages/omni/my-cards/card-details/card-details.module').then(m => m.CardDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'transactionStatus2', loadChildren: () => import('./pages/omni/fund-transfer/transaction-status/transaction-status/transaction-status.module').then(m => m.TransactionStatusModule),canActivate:[AuthenticatedGuard] },
  {path : 'transactionStatus', loadChildren: () => import('./pages/omni/fund-transfer/transaction-status-page/transaction-status-page.module').then(m => m.TransactionStatusPageModule),canActivate:[AuthenticatedGuard] },

  {path : 'transactionStatusReceipt', loadChildren: () => import('./pages/omni/fund-transfer/transaction-status/transaction-status-receipt/transaction-status-receipt.module').then(m => m.TransactionStatusReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'impsTransactionStatus', loadChildren: () => import('./pages/omni/fund-transfer/imps-transaction-status/imps-transaction-status.module').then(m => m.ImpsTransactionStatusModule),canActivate:[AuthenticatedGuard] },
  {path : 'instantPay', loadChildren: () => import('./pages/omni/fund-transfer/instant-pay/instant-pay.module').then(m => m.InstantPayModule),canActivate:[AuthenticatedGuard] },
  {path : 'inwardChequeInquiry', loadChildren: () => import('./pages/omni/inward-cheque-inquiry/inward-cheque-inquiry/inward-cheque-inquiry.module').then(m => m.InwardChequeInquiryModule),canActivate:[AuthenticatedGuard] },
  {path : 'inwardChequeInquiryList', loadChildren: () => import('./pages/omni/inward-cheque-inquiry/inward-cheque-inquiry-list/inward-cheque-inquiry-list.module').then(m => m.InwardChequeInquiryListModule),canActivate:[AuthenticatedGuard] },
  {path : 'inwardChequeInquiryDetails', loadChildren: () => import('./pages/omni/inward-cheque-inquiry/inward-cheque-inquiry-details/inward-cheque-inquiry-details.module').then(m => m.InwardChequeInquiryDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'socialSecurities', loadChildren: () => import('./pages/omni/social-securities/social-security-landing-page/social-security-landing-page.module').then(m => m.SocialSecurityLandingPageModule),canActivate:[AuthenticatedGuard] },
  {path : 'apyDetails', loadChildren: () => import('./pages/omni/social-securities/apy/apy-details/apy-details.module').then(m => m.ApyDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'apyOverview', loadChildren: () => import('./pages/omni/social-securities/apy/apy-overview/apy-overview.module').then(m => m.ApyOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'apyAuthorization', loadChildren: () => import('./pages/omni/social-securities/apy/apy-authorization/apy-authorization.module').then(m => m.ApyAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'apySuccess', loadChildren: () => import('./pages/omni/social-securities/apy/apy-success/apy-success.module').then(m => m.ApySuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'applyLoan', loadChildren: () => import('./pages/omni/loans/apply-loan/apply-loan.module').then(m => m.ApplyLoanModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanList', loadChildren: () => import('./pages/omni/loans/loan-list/loan-list.module').then(m => m.LoanListModule),canActivate:[AuthenticatedGuard] },
  {path : 'myAccountMobile', loadChildren: () => import('./pages/omni/my-accounts/my-account-landing-page-mob/my-account-landing-page-mob.module').then(m => m.MyAccountLandingPageMobModule),canActivate:[AuthenticatedGuard] },
  {path : 'trackCardApplication', loadChildren: () => import('./pages/omni/my-cards/track-card-application/track-card-application.module').then(m => m.TrackCardApplicationModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanCloseDetails', loadChildren: () => import('./pages/omni/loans/loan-close-details/loan-close-details.module').then(m => m.LoanCloseDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanDetailedStatement', loadChildren: () => import('./pages/omni/loans/loan-detailed-statement/loan-detailed-statement.module').then(m => m.LoanDetailedStatementModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanClosure', loadChildren: () => import('./pages/omni/loans/loan-closure/loan-closure.module').then(m => m.LoanClosureModule),canActivate:[AuthenticatedGuard] },
  {path : 'loanRepaymentSchedule', loadChildren: () => import('./pages/omni/loans/loan-repayment-schedule/loan-repayment-schedule.module').then(m => m.LoanRepaymentScheduleModule),canActivate:[AuthenticatedGuard] },
  {path : 'temporaryServiceOut', loadChildren: () => import('./pages/omni/temporarily-page/temporarily-page.module').then(m => m.TemporarilyPageModule) },
  {path : 'pmjjby', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby/pmjjby.module').then(m => m.PmjjbyModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmjjbyDetails', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby-details/pmjjby-details.module').then(m => m.PmjjbyDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmjjbyOverview', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby-overview/pmjjby-overview.module').then(m => m.PmjjbyOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmjjbyAuthorization', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby-authorization/pmjjby-authorization.module').then(m => m.PmjjbyAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmjjbySuccess', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby-success/pmjjby-success.module').then(m => m.PmjjbySuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmjjbyRecord', loadChildren: () => import('./pages/omni/social-securities/pmjjby/pmjjby-record/pmjjby-record.module').then(m => m.PmjjbyRecordModule) },
  {path : 'pmsby', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby/pmsby.module').then(m => m.PmsbyModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmsbyDetails', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby-details/pmsby-details.module').then(m => m.PmsbyDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmsbyOverview', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby-overview/pmsby-overview.module').then(m => m.PmsbyOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmsbyAuthorization', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby-authorization/pmsby-authorization.module').then(m => m.PmsbyAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmsbyReceipt', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby-receipt/pmsby-receipt.module').then(m => m.PmsbyReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'pmsbyRecord', loadChildren: () => import('./pages/omni/social-securities/pmsby/pmsby-record/pmsby-record.module').then(m => m.PmsbyRecordModule) },
  {path : 'openRdAccountAuthorization', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-rd-account/open-rd-account-authorization/open-rd-account-authorization.module').then(m => m.OpenRdAccountAuthorizationModule) },
  {path : 'openRdAccountOverview', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-rd-account/open-rd-account-overview/open-rd-account-overview.module').then(m => m.OpenRdAccountOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'openRdAccountSuccessReceipt', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/open-rd-account/open-rd-account-success-receipt/open-rd-account-success-receipt.module').then(m => m.OpenRdAccountSuccessReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'generatePin', loadChildren: () => import('./pages/omni/my-cards/generate-pin/generate-pin/generate-pin.module').then(m => m.GeneratePinModule),canActivate:[AuthenticatedGuard] },
  {path : 'generatePinAuthorization', loadChildren: () => import('./pages/omni/my-cards/generate-pin/generate-pin-authorization/generate-pin-authorization.module').then(m => m.GeneratePinAuthorizationModule),canActivate:[AuthenticatedGuard] },
  {path : 'generatePinSuccess', loadChildren: () => import('./pages/omni/my-cards/generate-pin/generate-pin-success/generate-pin-success.module').then(m => m.GeneratePinSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'directTax', loadChildren: () => import('./pages/omni/tax/direct-tax/direct-tax.module').then(m => m.DirectTaxModule),canActivate:[AuthenticatedGuard] },
  {path : 'indirectTax', loadChildren: () => import('./pages/omni/tax/indirect-tax/indirect-tax.module').then(m => m.IndirectTaxModule) ,canActivate:[AuthenticatedGuard]},
  {path : 'tracesForm', loadChildren: () => import('./pages/omni/tax/traces-form/traces-form.module').then(m => m.TracesFormModule) },
  {path : 'stateTax', loadChildren: () => import('./pages/omni/tax/state-tax/state-tax.module').then(m => m.StateTaxModule) },

  {path : 'payEmi', loadChildren: () => import('./pages/omni/loans/pay-emi/pay-emi/pay-emi.module').then(m => m.PayEmiModule) },
  {path : 'sendMoneyLoan', loadChildren: () => import('./pages/omni/loans/pay-emi/send-money-loan/send-money-loan.module').then(m => m.SendMoneyLoanModule),canActivate:[AuthenticatedGuard] },
  {path : 'sendMoneyLoanOverview', loadChildren: () => import('./pages/omni/loans/pay-emi/send-money-loan-overview/send-money-loan-overview.module').then(m => m.SendMoneyLoanOverviewModule),canActivate:[AuthenticatedGuard]},
  {path : 'sendMoneyLoanAuth', loadChildren: () => import('./pages/omni/loans/pay-emi/send-money-loan-auth/send-money-loan-auth.module').then(m => m.SendMoneyLoanAuthModule),canActivate:[AuthenticatedGuard] },
  {path : 'sendMoneyLoanReceipt', loadChildren: () => import('./pages/omni/loans/pay-emi/send-money-loan-receipt/send-money-loan-receipt.module').then(m => m.SendMoneyLoanReceiptModule),canActivate:[AuthenticatedGuard] },
  {path : 'nomineeDetails', loadChildren: () => import('./pages/omni/nominee/nominee-details/nominee-details.module').then(m => m.NomineeDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'nomineeOverview', loadChildren: () => import('./pages/omni/nominee/nominee-overview/nominee-overview.module').then(m => m.NomineeOverviewModule),canActivate:[AuthenticatedGuard] },
  {path : 'nomineeAuth', loadChildren: () => import('./pages/omni/nominee/nominee-authorization/nominee-authorization.module').then(m => m.NomineeAuthorizationModule) },
  {path : 'nomineeSuccess', loadChildren: () => import('./pages/omni/nominee/nominee-success/nominee-success.module').then(m => m.NomineeSuccessModule) },
  {path : 'addNomineeDetails', loadChildren: () => import('./pages/omni/nominee/add-nominee-details/add-nominee-details.module').then(m => m.AddNomineeDetailsModule) },

  {path : 'lienEnquiry', loadChildren: () => import('./pages/omni/my-accounts/lien-enquiry/lien-enquiry.module').then(m => m.LienEnquiryModule),canActivate:[AuthenticatedGuard] },
  {path : 'pkiEnrollment', loadChildren: () => import('./pages/omni/pki-enrollment/pki-enrollment.module').then(m => m.PkiEnrollmentModule),canActivate:[AuthenticatedGuard] },
  {path : 'recent', loadChildren: () => import('./pages/omni/recent-payee/recent-payee.module').then(m => m.RecentPayeeModule),canActivate:[AuthenticatedGuard] },
  {path : 'borrowerGuarantorDetails', loadChildren: () => import('./pages/omni/loans/borrower-guarantor-details/borrower-guarantor-details.module').then(m => m.BorrowerGuarantorDetailsModule),canActivate:[AuthenticatedGuard] },
  {path : 'jointHolderDetails', loadChildren: () => import('./pages/omni/my-accounts/joint-holder-details/joint-holder-details.module').then(m => m.JointHolderDetailsModule) },
  {path : 'sessionTimeOut', loadChildren: () => import('./pages/omni/session-timeout/session-timeout.module').then(m => m.SessionTimeoutModule) },
  {path : 'resetTpin', loadChildren: () => import('./pages/omni/reset-tpin/reset-tpin.module').then(m => m.ResetTpinModule) },
  {path : 'resetNewTpin', loadChildren: () => import('./pages/omni/reset-new-tpin/reset-new-tpin.module').then(m => m.ResetNewTpinModule) },

  {path : 'form15GH', loadChildren: () => import('./pages/omni/tax/form-15GH/form-fifteen-gh/form-fifteen-gh.module').then(m => m.FormFifteenGhModule),canActivate:[AuthenticatedGuard] },
  {path : 'form15GHAuth', loadChildren: () => import('./pages/omni/tax/form-15GH/form-fifteen-gh-auth/form-fifteen-gh-auth.module').then(m => m.FormFifteenGhAuthModule),canActivate:[AuthenticatedGuard] },
  {path : 'form15GHSuccess', loadChildren: () => import('./pages/omni/tax/form-15GH/form-fifteen-gh-success/form-fifteen-gh-success.module').then(m => m.FormFifteenGhSuccessModule),canActivate:[AuthenticatedGuard] },
  {path : 'bhimUpiPay', loadChildren: () => import('./pages/omni/bhim/bhim-upi-pay/bhim-upi-pay.module').then(m => m.BhimUpiPayModule),canActivate:[AuthenticatedGuard]  },
  {path : 'eFiling', loadChildren: () => import('./pages/omni/tax/e-filing/e-filing.module').then(m => m.EFilingModule),canActivate:[AuthenticatedGuard]  },

  // BBPS Module
  {path : 'retailRechargeBillPay', loadChildren: () => import('./pages/omni/bbps/recharge-billpay/recharge-billpay.module').then(m => m.RechargeBillpayModule) },
  {path : 'retailRegisterNewBiller', loadChildren: () => import('./pages/omni/bbps/register-biller/register-new-biller/register-new-biller.module').then(m => m.RegisterNewBillerModule) },
  {path : 'retailRegisterBillerConfirmation', loadChildren: () => import('./pages/omni/bbps/register-biller/register-biller-confirmation/register-biller-confirmation.module').then(m => m.RegisterBillerConfirmationModule) },
  {path : 'retailRegisterBillerSuccess', loadChildren: () => import('./pages/omni/bbps/register-biller/register-biller-success/register-biller-success.module').then(m => m.RegisterBillerSuccessModule) },
  {path : 'retailPaymentHistory', loadChildren: () => import('./pages/omni/bbps/payment-history/payment-history/payment-history.module').then(m => m.PaymentHistoryModule) },
  {path : 'retailPaymentSuccess', loadChildren: () => import('./pages/omni/bbps/payment-history/payment-history-success/payment-history-success.module').then(m => m.PaymentHistorySuccessModule) },
  {path : 'existingBillPayment', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-bill-payment/existing-bill-payment/existing-bill-payment.module').then(m => m.ExistingBillPaymentModule) },
  {path : 'existingBillPaymentAuth', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-bill-payment/existing-bill-payment-authentication/existing-bill-payment-authentication.module').then(m => m.ExistingBillPaymentAuthenticationModule) },
  {path : 'existingBillPaymentSuccess', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-bill-payment/existing-bill-payment-success/existing-bill-payment-success.module').then(m => m.ExistingBillPaymentSuccessModule) },
  {path : 'existingGetBill', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-get-bill/existing-get-bill.module').then(m => m.ExistingGetBillModule) },
  {path : 'existingBillerPayment', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-biller-payment/existing-biller-payment.module').then(m => m.ExistingBillerPaymentModule) },
  {path : 'existingBillerDeleteSuccess', loadChildren: () => import('./pages/omni/bbps/existing-bill/existing-biller-delete-success/existing-biller-delete-success.module').then(m => m.ExistingBillerDeleteSuccessModule) },
  {path : 'retailRaiseComplaint', loadChildren: () => import('./pages/omni/bbps/raise-complaint/raise-complaint/raise-complaint.module').then(m => m.RaiseComplaintModule) },
  {path : 'retailRaiseComplaintTransactionConfirmation', loadChildren: () => import('./pages/omni/bbps/raise-complaint/raise-complaint-transaction-confirmation/raise-complaint-transaction-confirmation.module').then(m => m.RaiseComplaintTransactionConfirmationModule) },
  {path : 'retailRaiseComplaintTransactionSuccess', loadChildren: () => import('./pages/omni/bbps/raise-complaint/raise-complaint-transaction-success/raise-complaint-transaction-success.module').then(m => m.RaiseComplaintTransactionSuccessModule) },
  {path : 'retailRaiseComplaintDuration', loadChildren: () => import('./pages/omni/bbps/raise-complaint/raise-complaint-duration/raise-complaint-duration/raise-complaint-duration.module').then(m => m.RaiseComplaintDurationModule) },
  {path : 'retailRaiseComplaintDurationSuccess', loadChildren: () => import('./pages/omni/bbps/raise-complaint/raise-complaint-duration/raise-complaint-duration-success/raise-complaint-duration-success.module').then(m => m.RaiseComplaintDurationSuccessModule) },
  {path : 'retailAddBillReminder', loadChildren: () => import('./pages/omni/bbps/add-bill-reminder/add-bill-reminder/add-bill-reminder.module').then(m => m.AddBillReminderModule) },
  {path : 'retailAddBillReminderConfirmation', loadChildren: () => import('./pages/omni/bbps/add-bill-reminder/add-bill-reminder-confirmation/add-bill-reminder-confirmation.module').then(m => m.AddBillReminderConfirmationModule) },
  {path : 'retailAddBillReminderSuccess', loadChildren: () => import('./pages/omni/bbps/add-bill-reminder/add-bill-reminder-success/add-bill-reminder-success.module').then(m => m.AddBillReminderSuccessModule) },
  {path : 'retailPendingBillReminder', loadChildren: () => import('./pages/omni/bbps/pending-bill/pending-bill-reminder/pending-bill-reminder.module').then(m => m.PendingBillReminderModule) },
  {path : 'pendingBillMoreDetails', loadChildren: () => import('./pages/omni/bbps/pending-bill/pending-bill-more-details/pending-bill-more-details.module').then(m => m.PendingBillMoreDetailsModule) },
  {path : 'pendingBillPayNow', loadChildren: () => import('./pages/omni/bbps/pending-bill/pending-bill-pay-now/pending-bill-pay-now.module').then(m => m.PendingBillPayNowModule) },
  {path : 'editBillReminder', loadChildren: () => import('./pages/omni/bbps/edit-bill-reminder/edit-bill-reminder/edit-bill-reminder.module').then(m => m.EditBillReminderModule) },
  {path : 'editBillReminderConfirmation', loadChildren: () => import('./pages/omni/bbps/edit-bill-reminder/edit-bill-reminder-confirmation/edit-bill-reminder-confirmation.module').then(m => m.EditBillReminderConfirmationModule) },
  {path : 'editBillReminderSuccess', loadChildren: () => import('./pages/omni/bbps/edit-bill-reminder/edit-bill-reminder-success/edit-bill-reminder-success.module').then(m => m.EditBillReminderSuccessModule) },
  {path : 'deleteBillReminderConfirmation', loadChildren: () => import('./pages/omni/bbps/delete-bill-reminder/delete-bill-reminder-confirmation/delete-bill-reminder-confirmation.module').then(m => m.DeleteBillReminderConfirmationModule) },
  {path : 'deleteBillReminderSuccess', loadChildren: () => import('./pages/omni/bbps/delete-bill-reminder/delete-bill-reminder-success/delete-bill-reminder-success.module').then(m => m.DeleteBillReminderSuccessModule) },
  {path : 'retailBillPayment', loadChildren: () => import('./pages/omni/bbps/bill-payment/bill-payment.module').then(m => m.BillPaymentModule) },
  {path : 'retailWaterBillPayment', loadChildren: () => import('./pages/omni/bbps/water-bill-payment/water-bill-payment.module').then(m => m.WaterBillPaymentModule) },
  {path : 'dthBill', loadChildren: () => import('./pages/omni/bbps/dth-bill/dth-bill.module').then(m => m.DthBillModule) },
  {path : 'mobilePostpaid', loadChildren: () => import('./pages/omni/bbps/mobile/mobile-postpaid/mobile-postpaid.module').then(m => m.MobilePostpaidModule) },
  {path : 'browsePlan', loadChildren: () => import('./pages/omni/bbps/mobile/mobile-prepaid/browse-plan/browse-plan.module').then(m => m.BrowsePlanModule) },
  {path : 'mobilePrepaid', loadChildren: () => import('./pages/omni/bbps/mobile/mobile-prepaid/mobile-prepaid/mobile-prepaid.module').then(m => m.MobilePrepaidModule) },
  {path : 'registerBillerView', loadChildren: () => import('./pages/omni/bbps/register-biller/register-biller-view/register-biller-view.module').then(m => m.RegisterBillerViewModule) },
  {path : 'unpaidBill', loadChildren: () => import('./pages/omni/bbps/unpaid-bill-infos/unpaid-bill-infos.module').then(m => m.UnpaidBillInfosModule) },
  {path : 'billDetails', loadChildren: () => import('./pages/omni/bbps/bill-details/bill-details.module').then(m => m.BillDetailsModule) },
   
  // BBPS Module end
 
  // Mobile Pages Start
  {path : 'mobMycardManage', loadChildren: () => import('./pages/omni/my-cards/mob-mycards-manage/mob-mycards-manage.module').then(m => m.MobMycardsManageModule) },
  {path : 'mobChequeBookLanding', loadChildren: () => import('./pages/omni/mobile-pages/mob-chequebook-landing/mob-chequebook-landing.module').then(m => m.MobChequebookLandingModule) },
  {path : 'mobQuickAccessLanding', loadChildren: () => import('./pages/omni/mobile-pages/mob-quick-access-landing/mob-quick-access-landing.module').then(m => m.MobQuickAccessLandingModule) },
  {path : 'mobServiceLanding', loadChildren: () => import('./pages/omni/mobile-pages/mob-service-landing/mob-service-landing.module').then(m => m.MobServiceLandingModule) },
  {path : 'mobSocialLanding', loadChildren: () => import('./pages/omni/mobile-pages/mob-social-landing/mob-social-landing.module').then(m => m.MobSocialLandingModule) },
  {path : 'mobTaxLanding', loadChildren: () => import('./pages/omni/mobile-pages/mob-tax-landing/mob-tax-landing.module').then(m => m.MobTaxLandingModule) },
  {path : 'mobBillerDropdown', loadChildren: () => import('./pages/omni/mobile-pages/mob-biller-dropdown/mob-biller-dropdown.module').then(m => m.MobBillerDropdownModule) },


  //Mobile Pages End
  {path : 'termsConditions', loadChildren: () => import('./pages/common-ui/terms-conditons/terms-conditons.module').then(m => m.TermsConditonsModule) },

  {path : 'nreDeposite', loadChildren: () => import('./pages/omni/my-accounts/open-deposit/nre-deposite/nre-deposite.module').then(m => m.NreDepositeModule) },

  {path : 'emas', loadChildren: () => import('./pages/omni/tax/e-mas/e-mas.module').then(m => m.EMasModule) },

 /****NLI Routes Start  ****/
 {path : 'nliLanding', loadChildren: () => import('./pages/omni/pre-login/nli-landing-page/nli-landing-page.module').then(m => m.NliLandingPageModule) },

 /****NLI Routes End  ****/

  /**** Omni Routes End  ****/

  /**** UPI Routes Starts  ****/
  { path: 'personalInfo', loadChildren: () => import('./pages/upi/user-registration/personal-info/personal-info.module').then(m => m.PersonalInfoModule ) },
  { path: 'upiRegSuccess', loadChildren: () => import('./pages/upi/user-registration/registration-success/registration-success.module').then(m => m.RegistrationSuccessModule) },
  { path: 'createUpi', loadChildren: () => import('./pages/upi/create-upi/create-upi.module').then(m => m.CreateUpiModule) },
  { path: 'upiOtherBanks', loadChildren: () => import('./pages/upi/select-other-bank/select-other-bank.module').then(m => m.SelectOtherBankModule) },
  { path: 'upiDashboard', loadChildren: () => import('./pages/upi/dashboard/upi-dashboard.module').then(m => m.UpiDashboardModule) },
  { path: 'upiLogin', loadChildren: () => import('./pages/upi/upi-login/upi-login.module').then(m => m.UpiLoginModule) },
  { path: 'searchContactList', loadChildren: () => import('./pages/upi/search-contact-list/search-contact-list.module').then(m => m.SearchContactListModule) },
  { path: 'searchFavoritePayee', loadChildren: () => import('./pages/upi/search-favorite-payee/search-favorite-payee.module').then(m => m.SearchFavoritePayeeModule) },
  { path: 'searchPayee', loadChildren: () => import('./pages/upi/search-payee/search-payee.module').then(m => m.SearchPayeeModule) },
  { path: 'collectSearchContact', loadChildren: () => import('./pages/upi/collect/collect-search-contact-list/collect-search-contact-list.module').then(m => m.CollectSearchContactListModule) },
  { path: 'collectRecentRequest', loadChildren: () => import('./pages/upi/collect/collect-recent-request/collect-recent-request.module').then(m => m.CollectRecentRequestModule)},
  { path: 'collectAmount', loadChildren: () => import('./pages/upi/collect/collect-enter-amount/collect-enter-amount.module').then(m => m.CollectEnterAmountModule) },
  { path: 'collectSetValidity', loadChildren: () => import('./pages/upi/collect/collect-set-validity/collect-set-validity.module').then(m => m.CollectSetValidityModule) },
  { path: 'collectSuccess', loadChildren: () => import('./pages/upi/collect/collect-success/collect-success.module').then(m => m.CollectSuccessModule) },
  { path: 'collectScanQR', loadChildren: () => import('./pages/upi/collect/collect-scan-qr/collect-scan-qr.module').then(m => m.CollectScanQrModule) },
  { path: 'collectUpiIdList', loadChildren: () => import('./pages/upi/collect/collect-upi-id-list/collect-upi-id-list.module').then(m => m.CollectUpiIdListModule) },
  { path: 'createUpiSuccess', loadChildren: () => import('./pages/upi/create-upi-success/create-upi-success.module').then(m => m.CreateUpiSuccessModule) },
  { path: 'migratedUserVerification', loadChildren: () => import('./pages/upi/migrated-user/migrated-user-verification/migrated-user-verification.module').then(m => m.MigratedUserVerificationModule) },
  { path: 'payUpi', loadChildren: () => import('./pages/upi/pay/pay-upi/pay-upi.module').then(m => m.PayUpiModule) },
  { path: 'payBankList', loadChildren: () => import('./pages/upi/pay/pay-bank-list/pay-bank-list.module').then(m => m.PayBankListModule) },
  { path: 'payUpiPayment', loadChildren: () => import('./pages/upi/pay/pay-upi-payment/pay-upi-payment.module').then(m => m.PayUpiPaymentModule) },
  { path: 'payUpiConfirm', loadChildren: () => import('./pages/upi/pay/pay-upi-confirmation/pay-upi-confirmation.module').then(m => m.PayUpiConfirmationModule) },
  { path: 'payUpiSuccess', loadChildren: () => import('./pages/upi/pay/pay-upi-success/pay-upi-success.module').then(m => m.PayUpiSuccessModule) },
  { path: 'payUpiIdList', loadChildren: () => import('./pages/upi/pay/pay-upi-id-list/pay-upi-id-list.module').then(m => m.PayUpiIdListModule) },
  { path: 'payIfscSearch', loadChildren: () => import('./pages/upi/pay/pay-ifsc-search/pay-ifsc-search.module').then(m => m.PayIfscSearchModule) },
  { path: 'selfTransfer', loadChildren: () => import('./pages/upi/pay/self-transfer/self-transfer.module').then(m => m.SelfTransferModule) },
  { path: 'selfTransferPayment', loadChildren: () => import('./pages/upi/pay/self-transfer-payment/self-transfer-payment.module').then(m => m.SelfTransferPaymentModule) },
  { path: 'selfTransferSuccess', loadChildren: () => import('./pages/upi/pay/self-transfer-success/self-transfer-success.module').then(m => m.SelfTransferSuccessModule) },
  { path: 'transactionSuccess', loadChildren: () => import('./pages/upi/transaction/transaction-success/transaction-success.module').then(m => m.TransactionSuccessModule) },
  { path: 'transactionList', loadChildren: () => import('./pages/upi/transaction/transaction-list/transaction-list.module').then(m => m.TransactionListModule) },
  { path: 'transactionDetails', loadChildren: () => import('./pages/upi/transaction/transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule) },
  { path: 'pendingRequestUpi', loadChildren: () => import('./pages/upi/pending/pending-request/pending-request.module').then(m => m.PendingRequestModule) },
  { path: 'pendingDetailView', loadChildren: () => import('./pages/upi/pending/pending-request-view-details/pending-request-view-details.module').then(m => m.PendingRequestViewDetailsModule) },
  { path: 'pendingPayerView', loadChildren: () => import('./pages/upi/pending/pending-request-payer-view-details/pending-request-payer-view-details.module').then(m => m.PendingRequestPayerViewDetailsModule) },
  { path: 'pendingConfirmation', loadChildren: () => import('./pages/upi/pending/pending-request-confirmation/pending-request-confirmation.module').then(m => m.PendingRequestConfirmationModule) },
  { path: 'pendingSuccess', loadChildren: () => import('./pages/upi/pending/pending-request-success/pending-request-success.module').then(m => m.PendingRequestSuccessModule) },
  { path: 'pendingRejected', loadChildren: () => import('./pages/upi/pending/pending-request-rejected/pending-request-rejected.module').then(m => m.PendingRequestRejectedModule) },
  { path: 'pendingUpIdBlockSuccess', loadChildren: () => import('./pages/upi/pending/pending-upi-id-block-success/pending-upi-id-block-success.module').then(m => m.PendingUpiIdBlockSuccessModule) },
  { path: 'scanQR', loadChildren: () => import('./pages/upi/scan-qr/scan-qr-code/scan-qr.module').then(m => m.ScanQrModule) },
  { path: 'scanQRPayment', loadChildren: () => import('./pages/upi/scan-qr/scan-qr-payment/scan-qr-payment.module').then(m => m.ScanQrPaymentModule) },
  { path: 'scanQRIdList', loadChildren: () => import('./pages/upi/scan-qr/scan-qr-id-list/scan-qr-id-list.module').then(m => m.ScanQrIdListModule) },
  { path: 'scanQrConfirm', loadChildren: () => import('./pages/upi/scan-qr/scan-qr-confirmation/scan-qr-confirmation.module').then(m => m.ScanQrConfirmationModule) },
  { path: 'scanQRSuccess', loadChildren: () => import('./pages/upi/scan-qr/scan-qr-success/scan-qr-success.module').then(m => m.ScanQrSuccessModule) },
  { path: 'manageAccounts', loadChildren: () => import('./pages/upi/manage-accounts/manage-accounts-dashboard/manage-accounts-dashboard.module').then(m => m.ManageAccountsDashboardModule) },
  { path: 'removeAccountSuccess', loadChildren: () => import('./pages/upi/manage-accounts/remove-account-success/remove-account-success.module').then(m => m.RemoveAccountSuccessModule) },
  { path: 'myProfile', loadChildren: () => import('./pages/upi/profile/my-profile/my-profile.module').then(m => m.MyProfileModule) },
  { path: 'deleteSuccess', loadChildren: () => import('./pages/upi/profile/delete-upi-id-success/delete-upi-id-success.module').then(m => m.DeleteUpiIdSuccessModule) },
  { path: 'createMandate', loadChildren: () => import('./pages/upi/mandate/create-mandate/create-mandate/create-mandate.module').then(m => m.CreateMandateModule) },
  { path: 'createMandatePayment', loadChildren: () => import('./pages/upi/mandate/create-mandate/create-mandate-payment/create-mandate-payment.module').then(m => m.CreateMandatePaymentModule) },
  { path: 'createMandateConfirmation', loadChildren: () => import('./pages/upi/mandate/create-mandate/create-mandate-confirmation/create-mandate-confirmation.module').then(m => m.CreateMandateConfirmationModule) },
  { path: 'createMandateSuccess', loadChildren: () => import('./pages/upi/mandate/create-mandate/create-mandate-success/create-mandate-success.module').then(m => m.CreateMandateSuccessModule) },
  { path: 'modifyMandate', loadChildren: () => import('./pages/upi/mandate/modify-mandate/modify-mandate/modify-mandate.module').then(m => m.ModifyMandateModule) },
	{ path: 'modifyMandateConfirmation', loadChildren: () => import('./pages/upi/mandate/modify-mandate/modify-mandate-confirmation/modify-mandate-confirmation.module').then(m => m.ModifyMandateConfirmationModule) },
	{ path: 'modifyMandateSuccess', loadChildren: () => import('./pages/upi/mandate/modify-mandate/modify-mandate-success/modify-mandate-success.module').then(m => m.ModifyMandateSuccessModule) },
  { path: 'upiMandate', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate/upi-mandate.module').then(m => m.UpiMandateModule) },
  { path: 'upiMandateActiveDetails', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate-active-view-details/upi-mandate-active-view-details.module').then(m => m.UpiMandateActiveViewDetailsModule) },
  { path: 'upiMandateRevokeViewDetails', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate-revoke-view-details/upi-mandate-revoke-view-details.module').then(m => m.UpiMandateRevokeViewDetailsModule) },
  { path: 'upiMandatePendingDetails', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate-pending-view-details/upi-mandate-pending-view-details.module').then(m => m.UpiMandatePendingViewDetailsModule) },
  { path: 'requestMandateViewDetails', loadChildren: () => import('./pages/upi/mandate/request-mandate/request-mandate-view-details/request-mandate-view-details.module').then(m => m.RequestMandateViewDetailsModule) },
	{ path: 'requestMandateSuccess', loadChildren: () => import('./pages/upi/mandate/request-mandate/request-mandate-success/request-mandate-success.module').then(m => m.RequestMandateSuccessModule) },
  { path: 'requestMandatePayment', loadChildren: () => import('./pages/upi/mandate/request-mandate/request-mandate-payment/request-mandate-payment.module').then(m => m.RequestMandatePaymentModule) },
	{ path: 'requestMandateConfirmation', loadChildren: () => import('./pages/upi/mandate/request-mandate/request-mandate-confirmation/request-mandate-confirmation.module').then(m => m.RequestMandateConfirmationModule) },
	{ path: 'requestMandate', loadChildren: () => import('./pages/upi/mandate/request-mandate/request-mandate/request-mandate.module').then(m => m.RequestMandateModule) },
  { path: 'approveMandate', loadChildren: () => import('./pages/upi/mandate/approve-mandate/approve-mandate/approve-mandate.module').then(m => m.ApproveMandateModule) },
	{ path: 'approveMandateViewDetails', loadChildren: () => import('./pages/upi/mandate/approve-mandate/approve-mandate-view-details/approve-mandate-view-details.module').then(m => m.ApproveMandateViewDetailsModule) },
	{ path: 'approveMandateConfirmation', loadChildren: () => import('./pages/upi/mandate/approve-mandate/approve-mandate-confirmation/approve-mandate-confirmation.module').then(m => m.ApproveMandateConfirmationModule) },
	{ path: 'approveMandateDecline', loadChildren: () => import('./pages/upi/mandate/approve-mandate/approve-mandate-decline/approve-mandate-decline.module').then(m => m.ApproveMandateDeclineModule) },
	{ path: 'approveMandateSuccess', loadChildren: () => import('./pages/upi/mandate/approve-mandate/approve-mandate-success/approve-mandate-success.module').then(m => m.ApproveMandateSuccessModule) },
  { path: 'mandateUpiIdList', loadChildren: () => import('./pages/upi/mandate/mandate-upi-id-list/mandate-upi-id-list.module').then(m => m.MandateUpiIdListModule) },
  { path: 'upiMandateCompletedDetails', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate-completed-details/upi-mandate-completed-details.module').then(m => m.UpiMandateCompletedDetailsModule) },
  { path: 'upiExecuteMandateSuccess', loadChildren: () => import('./pages/upi/mandate/upi-mandate/upi-mandate-execute-sucess/upi-mandate-execute-sucess.module').then(m => m.ExecuteMandateSuccessModule) },
  { path: 'linkAccountSuccess', loadChildren: () => import('./pages/upi/link-account/link-account-success/link-account-success.module').then(m => m.LinkAccountSuccessModule) },
  { path: 'referFriend', loadChildren: () => import('./pages/upi/refer/refer-friend/refer-friend.module').then(m => m.ReferFriendModule) },
  { path: 'inviteContactList', loadChildren: () => import('./pages/upi/refer/invite-contact-list/invite-contact-list.module').then(m => m.InviteContactListModule) },
  { path: 'transactionPin', loadChildren: () => import('./pages/upi/transaction/transaction-pin/transaction-pin.module').then(m => m.TransactionPinModule) },
  { path: 'manageBlockUpiId', loadChildren: () => import('./pages/upi/manage-block-upi-id/manage-block-upi-id.module').then(m => m.ManageBlockUpiIdModule) },
  { path: 'personalDetails', loadChildren: () => import('./pages/upi/personal-details/personal-details.module').then(m => m.PersonalDetailsModule) },
  { path: 'recentTransaction', loadChildren: () => import('./pages/upi/transaction/recent-transaction/recent-transaction.module').then(m => m.RecentTransactionModule) },
  { path: 'notification', loadChildren: () => import('./pages/upi/notification/notification.module').then(m => m.NotificationModule) },
  { path: 'deregister', loadChildren: () => import('./pages/upi/deregister/deregister.module').then(m => m.DeregisterModule) },
  { path: 'faq', loadChildren: () => import('./pages/upi/faq/faq.module').then(m => m.FaqModule) },
  { path: 'about', loadChildren: () => import('./pages/upi/about-upi/about-upi.module').then(m => m.AboutUpiModule) },
  { path: 'mandateHistory', loadChildren: () => import('./pages/upi/mandate/mandate-history/mandate-history-list/mandate-history.module').then(m => m.MandateHistoryModule) },
  { path: 'mandateHistoryDetails', loadChildren: () => import('./pages/upi/mandate/mandate-history/mandate-history-details/mandate-history-details.module').then(m => m.MandateHistoryDetailsModule) },

  { path: 'paymentReminder', loadChildren: () => import('./pages/upi/payment-reminder/payment-reminder/payment-reminder.module').then(m => m.PaymentReminderModule) },
  { path: 'setPaymentReminder', loadChildren: () => import('./pages/upi/payment-reminder/set-payment-reminder/set-payment-reminder/set-payment-reminder.module').then(m => m.SetPaymentReminderModule) },
  { path: 'setPaymentReminderDetails', loadChildren: () => import('./pages/upi/payment-reminder/set-payment-reminder/set-payment-reminder-details/set-payment-reminder-details.module').then(m => m.SetPaymentReminderDetailsModule) },
  { path: 'setPaymentReminderConfirmation', loadChildren: () => import('./pages/upi/payment-reminder/set-payment-reminder/set-payment-reminder-confirmation/set-payment-reminder-confirmation.module').then(m => m.SetPaymentReminderConfirmationModule) },
  { path: 'setPaymentReminderSuccess', loadChildren: () => import('./pages/upi/payment-reminder/set-payment-reminder/set-payment-reminder-success/set-payment-reminder-success.module').then(m => m.SetPaymentReminderSuccessModule) },
  { path: 'changeEmail', loadChildren: () => import('./pages/upi/change-email/change-email.module').then(m => m.ChangeEmailModule) },
  { path: 'trackStatus', loadChildren: () => import('./pages/upi/track-status/track-status.module').then(m => m.TrackStatusModule) },





  /* TODO: UNUSED Routes Start, uncomment as per usage */
  // { path: 'transactionFail', loadChildren: () => import('./pages/upi/transaction/transaction-fail/transaction-fail.module').then(m => m.TransactionFailModule) },
  // { path: 'transactionRejected', loadChildren: () => import('./pages/upi/transaction/transaction-rejected/transaction-rejected.module').then(m => m.TransactionRejectedModule) },
  // { path: 'rechargeBillpay', loadChildren: () => import('./pages/upi/biller/recharge-billpay/recharge-billpay.module').then(m => m.RechargeBillpayModule) },
  // { path: 'registerBiller', loadChildren: () => import('./pages/upi//biller/register-biller/register-biller/register-biller.module').then(m => m.RegisterBillerModule) },
  // { path: 'registerBillerConfirmation', loadChildren: () => import('./pages/upi//biller/register-biller/register-biller-confirmation/register-biller-confirmation.module').then(m => m.RegisterBillerConfirmationModule) },
  // { path: 'registerBillerSuccess', loadChildren: () => import('./pages/upi//biller/register-biller/register-biller-success/register-biller-success.module').then(m => m.RegisterBillerSuccessModule) },
  // { path: 'addNewRegisterBiller', loadChildren: () => import('./pages/upi/biller/add-new-register-biller/add-new-register-biller/add-new-register-biller.module').then(m => m.AddNewRegisterBillerModule) },
  // { path: 'addNewRegisterBillerConfirmation', loadChildren: () => import('./pages/upi/biller/add-new-register-biller/add-new-register-biller-confirmation/add-new-register-biller-confirmation.module').then(m => m.AddNewRegisterBillerConfirmationModule) },
  // { path: 'addNewRegisterBillerSuccess', loadChildren: () => import('./pages/upi/biller/add-new-register-biller/add-new-register-biller-success/add-new-register-biller-success.module').then(m => m.AddNewRegisterBillerSuccessModule) },
  // { path: 'deleteRegisterBillerSuccess', loadChildren: () => import('./pages/upi/biller/register-biller/delete-register-biller-success/delete-register-biller-success.module').then(m => m.DeleteRegisterBillerSuccessModule) },
  // { path: 'billPayComplaint', loadChildren: () => import('./pages/upi/bill-pay-complaint/bill-pay-complaint.module').then(m => m.BillPayComplaintModule) },
  // { path: 'billRaiseComplaint', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint/bill-raise-complaint.module').then(m => m.BillRaiseComplaintModule) },
  // { path: 'billRaiseComplaintServiceConfirmation', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-service/bill-raise-complaint-service-confirmation/bill-raise-complaint-service-confirmation.module').then(m => m.BillRaiseComplaintServiceConfirmationModule) },
  // { path: 'billRaiseComplaintServiceSuccess', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-service/bill-raise-complaint-service-success/bill-raise-complaint-service-success.module').then(m => m.BillRaiseComplaintServiceSuccessModule) },
  // { path: 'billRaiseComplaintTransaction', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-transaction/bill-raise-complaint-transaction/bill-raise-complaint-transaction.module').then(m => m.BillRaiseComplaintTransactionModule) },
  // { path: 'billRaiseComplaintTransactionConfirmation', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-transaction/bill-raise-complaint-transaction-confirmation/bill-raise-complaint-transaction-confirmation.module').then(m => m.BillRaiseComplaintTransactionConfirmationModule) },
  // { path: 'billRaiseComplaintTransactionSuccess', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-transaction/bill-raise-complaint-transaction-success/bill-raise-complaint-transaction-success.module').then(m => m.BillRaiseComplaintTransactionSuccessModule) },
  // { path: 'billRaiseDurationTransactionDetails', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-transaction/bill-raise-duration-transaction-details/bill-raise-duration-transaction-details.module').then(m => m.BillRaiseDurationTransactionDetailsModule) },
  // { path: 'billRaiseComplaintAssignConfirmation', loadChildren: () => import('./pages/upi/bill-raise/bill-raise-complaint-assign-confirmation/bill-raise-complaint-assign-confirmation.module').then(m => m.BillRaiseComplaintAssignConfirmationModule) },
  // { path: 'raiseComplaintTransactionDurationSuccess', loadChildren: () => import('./pages/upi/raise-complaint-transaction/raise-complaint-transaction-duration-success/raise-complaint-transaction-duration-success.module').then(m => m.RaiseComplaintTransactionDurationSuccessModule) },
  // { path: 'raiseComplaintTransactionSuccess', loadChildren: () => import('./pages/upi/raise-complaint-transaction/raise-complaint-transaction-success/raise-complaint-transaction-success.module').then(m => m.RaiseComplaintTransactionSuccessModule) },
  // { path: 'homeElectricity', loadChildren: () => import('./pages/upi/electricity/home-electricity/home-electricity/home-electricity.module').then(m => m.HomeElectricityModule) },
  // { path: 'homeElectricityBillDetails', loadChildren: () => import('./pages/upi/electricity/home-electricity/home-electricity-bill-details/home-electricity-bill-details.module').then(m => m.HomeElectricityBillDetailsModule) },
  // { path: 'homeElectricityBillPayment', loadChildren: () => import('./pages/upi/electricity/home-electricity/home-electricity-bill-payment/home-electricity-bill-payment.module').then(m => m.HomeElectricityBillPaymentModule) },
  // { path: 'homeElectricityBillPaymentSuccess', loadChildren: () => import('./pages/upi/electricity/home-electricity/home-electricity-bill-payment-success/home-electricity-bill-payment-success.module').then(m => m.HomeElectricityBillPaymentSuccessModule) },
  // { path: 'electricity', loadChildren: () => import('./pages/upi/electricity/electricity-bill/electricity/electricity.module').then(m => m.ElectricityModule) },
  // { path: 'electricityPayBill', loadChildren: () => import('./pages/upi/electricity/electricity-bill/electricity-pay-bill/electricity-pay-bill.module').then(m => m.ElectricityPayBillModule) },
  // { path: 'electricityBillPayment', loadChildren: () => import('./pages/upi/electricity/electricity-bill/electricity-bill-payment/electricity-bill-payment.module').then(m => m.ElectricityBillPaymentModule) },
  // { path: 'electricityBillPaymentSuccess', loadChildren: () => import('./pages/upi/electricity/electricity-bill/electricity-bill-payment-success/electricity-bill-payment-success.module').then(m => m.ElectricityBillPaymentSuccessModule) },
  // { path: 'paymentHistory', loadChildren: () => import('./pages/upi/payment/payment-history/payment-history.module').then(m => m.PaymentHistoryModule) },
  // { path: 'paymentHistorySuccess', loadChildren: () => import('./pages/upi/payment/payment-history-success/payment-history-success.module').then(m => m.PaymentHistorySuccessModule) },
  // { path: 'manageBillReminder', loadChildren: () => import('./pages/upi/bill-reminder/manage-bill-reminder/manage-bill-reminder.module').then(m => m.ManageBillReminderModule) },
  // { path: 'billReminderDeleteConfirmation', loadChildren: () => import('./pages/upi/bill-reminder/bill-reminder-delete/bill-reminder-delete-confirmation/bill-reminder-delete-confirmation.module').then(m => m.BillReminderDeleteConfirmationModule) },
  // { path: 'billReminderDeleteSuccess', loadChildren: () => import('./pages/upi/bill-reminder/bill-reminder-delete/bill-reminder-delete-success/bill-reminder-delete-success.module').then(m => m.BillReminderDeleteSuccessModule) },
  // { path: 'addBillReminder', loadChildren: () => import('./pages/upi/bill-reminder/add-bill-reminder/add-bill-reminder/add-bill-reminder.module').then(m => m.AddBillReminderModule) },
  // { path: 'addBillReminderConfirmation', loadChildren: () => import('./pages/upi/bill-reminder/add-bill-reminder/add-bill-reminder-confirmation/add-bill-reminder-confirmation.module').then(m => m.AddBillReminderConfirmationModule) },
  // { path: 'addBillReminderSuccess', loadChildren: () => import('./pages/upi/bill-reminder/add-bill-reminder/add-bill-reminder-success/add-bill-reminder-success.module').then(m => m.AddBillReminderSuccessModule) },
  // { path: 'pendingBills', loadChildren: () => import('./pages/upi/pending-bills/pending-bills/pending-bills.module').then(m => m.PendingBillsModule) },
  // { path: 'pendingBillsDetails', loadChildren: () => import('./pages/upi/pending-bills/pending-bills-details/pending-bills-details.module').then(m => m.PendingBillsDetailsModule) },
  // { path: 'gasBillPayment', loadChildren: () => import('./pages/upi/gas-bill/gas-bill-payment/gas-bill-payment.module').then(m => m.GasBillPaymentModule) },
  // { path: 'gasBillPaymentSuccess', loadChildren: () => import('./pages/upi/gas-bill/gas-bill-payment-success/gas-bill-payment-success.module').then(m => m.GasBillPaymentSuccessModule) },
  // { path: 'activateUpiGlobal', loadChildren: () => import('./pages/upi/upi-global/activate-upi-global/activate-upi-global/activate-upi-global.module').then(m => m.ActivateUpiGlobalModule) },
  // { path: 'activateUpiGlobalConfirmation', loadChildren: () => import('./pages/upi/upi-global/activate-upi-global/activate-upi-global-confirmation/activate-upi-global-confirmation.module').then(m => m.ActivateUpiGlobalConfirmationModule) },
  // { path: 'activateUpiGlobalSuccess', loadChildren: () => import('./pages/upi/upi-global/activate-upi-global/activate-upi-global-success/activate-upi-global-success.module').then(m => m.ActivateUpiGlobalSuccessModule) },
  // { path: 'updateUpiGlobalSettings', loadChildren: () => import('./pages/upi/upi-global/update-upi-global/update-upi-global-settings/update-upi-global-settings.module').then(m => m.UpdateUpiGlobalSettingsModule) },
  // { path: 'updateUpiGlobalConfirmation', loadChildren: () => import('./pages/upi/upi-global/update-upi-global/update-upi-global-confirmation/update-upi-global-confirmation.module').then(m => m.UpdateUpiGlobalConfirmationModule) },
  // { path: 'deactivateUpiGlobalSuccess', loadChildren: () => import('./pages/upi/upi-global/deactivate-upi-global-success/deactivate-upi-global-success.module').then(m => m.DeactivateUpiGlobalSuccessModule) },
  // { path: 'internationalPayment', loadChildren: () => import('./pages/upi/international-payment/international-payment/international-payment.module').then(m => m.InternationalPaymentModule) },
  // { path: 'internationalPaymentConfirmation', loadChildren: () => import('./pages/upi/international-payment/international-payment-confirmation/international-payment-confirmation.module').then(m => m.InternationalPaymentConfirmationModule) },
  // { path: 'internationalPaymentSuccess', loadChildren: () => import('./pages/upi/international-payment/international-payment-success/international-payment-success.module').then(m => m.InternationalPaymentSuccessModule) },
  // { path: 'gstPay', loadChildren: () => import('./pages/upi/gst-pay/gst-pay.module').then(m => m.GstPayModule) },
  // { path: 'transactionPending', loadChildren: () => import('./pages/upi/transaction/transaction-pending/transaction-pending.module').then(m => m.TransactionPendingModule) },
  /* UNUSED Routes End */

  /**** UPI Routes End  ****/

  /**** Common Routing Starts  ****/
  { path: 'LandingPage', loadChildren: () => import('./pages/common-components/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'languageChange', loadChildren: () => import('./pages/common-components/language-change/language-change.module').then(m => m.LanguageChangeModule) },
  { path: 'contactUs', loadChildren: () => import('./pages/common-components/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'locateUs', loadChildren: () => import('./pages/common-components/locate-us/locate-us.module').then(m => m.LocateUsModule) },
  { path: 'smsVerification', loadChildren: () => import('./pages/common-components/sms-verification/sms-verification.module').then(m => m.SmsVerificationModule) },
  { path: 'selectSim', loadChildren: () => import('./pages/common-components/select-sim/select-sim.module').then(m => m.SelectSimModule) },
  { path: 'setMpin', loadChildren: () => import('./pages/common-components/set-mpin/set-mpin.module').then(m => m.SetMpinModule)},
  { path: 'setNewMpin', loadChildren: () => import('./pages/common-components/set-new-mpin/set-new-mpin.module').then(m => m.SetNewMpinModule)},
  { path: 'changeMpin', loadChildren: () => import('./pages/common-components/change-mpin/change-mpin.module').then(m => m.ChangeMpinModule) },
  { path: 'splash', loadChildren: () => import('./pages/common-components/splash-ui/splash-ui.module').then(m => m.SplashUiModule)},
  { path: 'complaint', loadChildren: () => import('./pages/common-components/complaint-list/complaint/complaint.module').then(m => m.ComplaintModule)},
  { path: 'complaintDetails', loadChildren: () => import('./pages/common-components/complaint-list/complaint-view-details/complaint-view-details.module').then(m => m.ComplaintViewDetailsModule)},
  { path: 'raiseComplaint', loadChildren: () => import('./pages/common-components/raise-complaint-list/raise-complaint/raise-complaint.module').then(m => m.RaiseComplaintModule)},
  { path: 'raiseComplaintConfirmation', loadChildren: () => import('./pages/common-components/raise-complaint-list/raise-complaint-confirmation/raise-complaint-confirmation.module').then(m => m.RaiseComplaintConfirmationModule)},
  { path: 'raiseComplaintSuccess', loadChildren: () => import('./pages/common-components/raise-complaint-list/raise-complaint-success/raise-complaint-success.module').then(m => m.RaiseComplaintSuccessModule)},
  { path: 'omniFaq', loadChildren: () => import('./pages/common-components/faq-omni/faq-omni.module').then(m => m.FaqOmniModule)},
  { path: 'commonNotification', loadChildren: () => import('./pages/common-components/notification-mobile/notification-mobile.module').then(m => m.NotificationMobileModule)},
  { path: 'launch', loadChildren: () => import('./pages/common-components/launch/launch.module').then(m => m.LaunchModule)},

  //Default Route
  // { path: '**', redirectTo: '/LandingPage' },
  /**** Common Routing End  ****/

  // Default Route
  { path: '**', redirectTo: '/login' }
  /**** Common Routing End  ****/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    NavigationGuard,
    CanDeactivateGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
