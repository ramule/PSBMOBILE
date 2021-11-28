import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { DigitOnlyDirective, NumberDirective, NumbersOnlyDirective } from '../directives/numbers-only.directive';
import { alphaNumericDirective,AlphaNumericAllowedSpecialChars } from '../directives/aplha-numeric.directive';
import { DatePatternDirective } from '../directives/date-pattern.directive';
import { userNameDirective } from '../directives/userName.directive';
import { passwordDirective } from '../directives/password.directive';
import { AlphabetsOnlyDirective,AlphabetsNSpaceOnlyDirective, AlphaNumericOnlyDirective,AlphaSpecialCharOnlyDirective,AlphabetNNumberOnlyDirective,UpidOnlyDirective, } from '../directives/alphabets-only.directive';
import { LimitDirectiveDirective } from '../directives/limit-directive.directive';
import { CommonMethods } from '../utilities/common-methods';
import { AppConstants } from '../app.constant';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {CustomCurrencyPipe,DynamicCurrencyPipe,FilterPipe } from '../pipes/custom-currency.pipe';
import {RemovewhitespacesPipe } from '../pipes/remove-whitespace-pipe';
import { TranslatePipe } from '../pipes/translate.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { FirstLastChar,Last4Char,TruncatePipe } from '../pipes/first-last-char.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { FormatDatePipe , FormatTimerPipe, DateFormatPipe,TimeFormatPipe } from '../pipes/date-formatter.pipe';
import { MaskAccountNoPipe,MaskStringPipe } from '../pipes/mask-account-no.pipe';
import { AmountOnlyDirective } from '../directives/numbers-only.directive';
import { CurrencyInputMaskDirective,TwoDigitDecimaNumberDirective } from '../directives/currency-input-mask.directive';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { DatePipe } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';
@NgModule({
  declarations: [DatePatternDirective,NumbersOnlyDirective,NumberDirective,alphaNumericDirective,AlphabetsNSpaceOnlyDirective,AlphabetsOnlyDirective,LimitDirectiveDirective,CustomCurrencyPipe,RemovewhitespacesPipe,TranslatePipe,SearchPipe,AlphaNumericOnlyDirective,FilterPipe,AlphaSpecialCharOnlyDirective,AlphabetNNumberOnlyDirective,UpidOnlyDirective,userNameDirective,passwordDirective,FirstLastChar,SearchFilterPipe,FormatDatePipe,DateFormatPipe,TimeFormatPipe,FormatTimerPipe,MaskAccountNoPipe,MaskStringPipe, AmountOnlyDirective,Last4Char,TruncatePipe,CurrencyInputMaskDirective,DigitOnlyDirective,DateAgoPipe,TwoDigitDecimaNumberDirective,AlphaNumericAllowedSpecialChars,DynamicCurrencyPipe],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    isolate: false
}),
  ],
  exports: [
    DatePatternDirective,
    NumbersOnlyDirective,
    NumberDirective,
    alphaNumericDirective,
    AlphabetsOnlyDirective,
    AlphabetsNSpaceOnlyDirective,
    LimitDirectiveDirective,
    CustomCurrencyPipe,
    RemovewhitespacesPipe,
    TranslatePipe,
    SearchPipe,
    AlphaNumericOnlyDirective,
    FilterPipe,
    AlphaSpecialCharOnlyDirective,
    AlphabetNNumberOnlyDirective,
    UpidOnlyDirective,
    userNameDirective,
    passwordDirective,
    DynamicCurrencyPipe,
    FirstLastChar,
    SearchFilterPipe,
    FormatDatePipe,
    DateFormatPipe,
    TimeFormatPipe,
    FormatTimerPipe,
    MaskAccountNoPipe,
    MaskStringPipe,
    AmountOnlyDirective,
    Last4Char,
    TruncatePipe,
    CurrencyInputMaskDirective,
    DigitOnlyDirective,
    DateAgoPipe,
    TwoDigitDecimaNumberDirective,
    AlphaNumericAllowedSpecialChars,
    DatePipe
  ],
  providers:[CommonMethods,AppConstants, TranslateModule,CustomCurrencyPipe,RemovewhitespacesPipe,TranslatePipe,SearchPipe,FilterPipe,FirstLastChar,SearchFilterPipe,FormatDatePipe,DateFormatPipe,TimeFormatPipe,FormatTimerPipe,MaskAccountNoPipe,MaskStringPipe,Last4Char,TruncatePipe,TitleCasePipe,DateAgoPipe,DatePipe,DynamicCurrencyPipe, {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB'}]
})
export class SharedModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
