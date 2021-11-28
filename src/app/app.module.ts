import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModules} from './pages/common-ui/common.module'
import { EncryptDecryptService } from './services/encrypt-decrypt.service'
import { ServicesModule } from './services/services.module';
import { CommonMethods } from './utilities/common-methods';
import { AppConstants } from './app.constant';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExportAsModule } from 'ngx-export-as';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SetMpinRoutingModule } from './pages/common-components/set-mpin/set-mpin-routing.module';
import { PersonalInfoRoutingModule } from './pages/upi/user-registration/personal-info/personal-info-routing.module';
import {ThemeSettingsComponent} from './pages/common-ui/theme-settings/theme-settings.component';
import { DataTablesModule } from "angular-datatables";

//  import { NgxCaptchaModule } from '@binssoft/ngx-captcha';
// import { CaptchaComponent } from './pages/omni/pre-login/captcha/captcha.component';
// import { CaptchaComponent } from './pages/omni/pre-login/captcha/captcha.component';

// import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    // CaptchaComponent,
    // ThemeSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModules,
    ServicesModule,
    HttpClientModule,
    SharedModule,
    ExportAsModule,
    AutocompleteLibModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgIdleKeepaliveModule.forRoot(),
    DataTablesModule,    
    FormsModule,
    ReactiveFormsModule,
    //  NgxCaptchaModule,
    // CaptchaModule.forRoot(),
    // StoreModule.forRoot(reducers, { metaReducers }),
    // !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [EncryptDecryptService,CommonMethods,AppConstants,{provide:LocationStrategy,useClass:HashLocationStrategy}, SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}
