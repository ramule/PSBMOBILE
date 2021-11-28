import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

declare var OSREC: any;
@Pipe({ name: "customcurrency" })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: any, type?: any , currency?: any,ISUPI?: boolean): string {
    console.log("customcurrency =====>"+value);
    console.log("type =====>"+type);
    console.log("currency =====>"+currency);
    console.log(getCurrencySymbol( currency , 'narrow'));
    if(ISUPI){
      if (value && type != undefined && type == 'decimal') {
        let updatedValue = value.replace(/[^.0-9]+/g,'');
        //let updatedValue = value.replace(/[^-?[0-9]\d*(\.\d+)?$]+/g,'');
        let formattedINR =" " + OSREC.CurrencyFormatter.format(updatedValue, { currency: 'INR', symbol: '' })
        console.log(formattedINR);
        return formattedINR;
      } 
    }
    else if(currency == undefined) currency = 'INR'
    var currencySymbol = {currency: currency, symbol: getCurrencySymbol( currency , 'narrow') , negativePattern: '(! #)', formatWithSymbol: true}

    if (value && type != undefined && type == 'symbol') {
      let formattedINR = " " + OSREC.CurrencyFormatter.format(value,currencySymbol );
      if(formattedINR.indexOf("-") >= 0) {
        formattedINR = formattedINR.trim().substring(1); 
        var firstDigit = formattedINR.match(/\d/)
        formattedINR = [formattedINR.slice(0, formattedINR.indexOf(firstDigit[0])), "-", formattedINR.slice(formattedINR.indexOf(firstDigit[0]))].join('');
      }
      return formattedINR;
    }else if (value && type != undefined && type == 'noDecimal') {
      let inr = value.replace(/[^0-9]+/g,'')
      let formattedINR =" " + OSREC.CurrencyFormatter.format(inr, currencySymbol)
      if(formattedINR.indexOf("-") >= 0) {
        formattedINR = formattedINR.trim().substring(1); 
        var firstDigit = formattedINR.match(/\d/)
        formattedINR = [formattedINR.slice(0, formattedINR.indexOf(firstDigit[0])), "-", formattedINR.slice(formattedINR.indexOf(firstDigit[0]))].join('');
      }
      return formattedINR;
    }else if (value && type != undefined && type == 'decimal') {
      let updatedValue = value.replace(/[^.0-9]+/g,'');
      //let updatedValue = value.replace(/[^-?[0-9]\d*(\.\d+)?$]+/g,'');
      let formattedINR =" " + OSREC.CurrencyFormatter.format(updatedValue, currencySymbol )
      if(formattedINR.indexOf("-") >= 0) {
        formattedINR = formattedINR.trim().substring(1); 
        var firstDigit = formattedINR.match(/\d/)
        formattedINR = [formattedINR.slice(0, formattedINR.indexOf(firstDigit[0])), "-", formattedINR.slice(formattedINR.indexOf(firstDigit[0]))].join('');
      }
      return formattedINR;
    }else if (value && type != undefined && type == 'noSymbol') {
      let updatedValue = value.replace(/[^.0-9]+/g,'');
      //let updatedValue = value.replace(/[^-?[0-9]\d*(\.\d+)?$]+/g,'');
      let formattedINR =" " + OSREC.CurrencyFormatter.format(updatedValue, { currency: 'INR',symbol: '' } )
      if(formattedINR.indexOf("-") >= 0) {
        formattedINR = formattedINR.trim().substring(1); 
        var firstDigit = formattedINR.match(/\d/)
        formattedINR = [formattedINR.slice(0, formattedINR.indexOf(firstDigit[0])), "-", formattedINR.slice(formattedINR.indexOf(firstDigit[0]))].join('');
      }
      return formattedINR;
    } else if (value) {
      let formattedINR = " " + OSREC.CurrencyFormatter.format(value,currencySymbol );
      if(formattedINR.indexOf("-") >= 0) {
        formattedINR = formattedINR.trim().substring(1); 
        var firstDigit = formattedINR.match(/\d/)
        formattedINR = [formattedINR.slice(0, formattedINR.indexOf(firstDigit[0])), "-", formattedINR.slice(formattedINR.indexOf(firstDigit[0]))].join('');
      }
      return formattedINR;
    }
    else {
      return value;
    }
  }

}


@Pipe({name: 'unique'})
  export class FilterPipe implements PipeTransform
{

  transform(value: any, id?: any): any {

    // Remove the duplicate elements (this will remove duplicates
    let uniqueArray = value.filter(function (el, index, array) {
      return el.ID != id;
    });

  return uniqueArray;   }
}


@Pipe({ name: "dynamicurrency" })
export class DynamicCurrencyPipe implements PipeTransform {
  transform(value: any , currency:any ): string {
    // console.log("Dynamiccurrency type", type)
    if (value) {
      return " " + OSREC.CurrencyFormatter.format(value, { currency: currency, symbol: '₹' });
    }

  }

}
