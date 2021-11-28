import { Observable, Subject } from 'rxjs';
import { PluginService } from '../services/plugin-service';
import { FontBase64 } from './app-enum';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import * as jsPDF from 'jspdf';
import { Injectable, EventEmitter, Output } from '@angular/core';
// import domtoimage from 'dom-to-image-more';
// import { saveAsPng, saveAsJpeg } from 'save-html-as-image';
//import canvasToImage from 'canvas-to-image';



declare var $: any;
declare var device: any;
declare var window: any;
declare var cordova: any;
declare var pdf: any;
declare var navigator: any;
declare var html2canvas: any;
declare var qrcode: any;
declare var showToastMessage: any;
declare var FileTransfer: any;


@Injectable({
  providedIn: 'root'
})
export class CommonMethods {
  channelKey: any /*** Remove after impementation* */
  /**
* @function validateEmpty
* @param {string} validateText - The string to be tested for blank value.
* description - This function returns true if the string is not having a value.
*/
  @Output() termAcceptedEvent = new EventEmitter<boolean>();

  constructor() { }

  disableBack;
  validateEmpty(validateText) {
    return (validateText == undefined || validateText == "undefined" || validateText == '' || validateText == null || validateText == ' ' || validateText == "null")
  }

  /**
   * @function validateNonEmpty
   * @param {string} validateText - The string to be tested for non blank value.
   * description - This function returns true if the string is having a value.
   */

  validateNonEmpty(validateText) {
    return (validateText != undefined || validateText != '' || validateText != null || validateText != ' ')
  }

  /**
   * @function validateEmptyArray
   * @param {string} arr - The array to be tested for null value.
   * description - This function returns true if the array is null.
   */

  validateEmptyArray(arr) {
    return (arr.length == 0 || arr == [])
  }

  /**
   * @function emptyFieldbyID
   * @param {string} arr - The ID of the html element to be nullified.
   * description - This function clears the value of the HTML element.
   */
  emptyFieldbyID(id) {
    document.getElementById(id).innerHTML = "";
  }

  /**
   * @function emptyValuebyID
   * @param {string} arr - The ID of the html element to be nullified.
   * description - This function clears the value of the HTML element.
   */
  emptyValuebyID(id) {
    document.getElementById(id).innerText = "";
  }

  /**
   * @function validateEmptywithZero
   * @param {string} validateText - The string to be tested for blank value.
   * description - This function returns true if the string is not having a value or has a zero value.
   */

  validateEmptywithZero(validateText) {
    return (validateText == undefined || validateText == '' || validateText == null || validateText == 0 || validateText == ' ')
  }

  /**
   * @function validateMultipleEmpty
   * @param {strings} - Any number of params can be passed to validate for empty value.
   * description - This function returns true if any of the string is not having a value or has a zero value.
   */
  validateMultipleEmpty() {
    if (arguments.length > 0) {
      for (var i = 0; i < arguments.length; i++) {
        var validateText = arguments[i];
        if (this.validateEmpty(validateText)) {
          return true;
          // break;
        }
        else {
          continue;
        }

      }
    }
  }

  /**
   * @function assignInnerHTMLByID
   * @param {string} - id of the element which is to be assigned with the value.
   * @param {string} - value which is to be assigned.
   * description - This function assigns value to the HTML element.
   */
  assignInnerHTMLByID(id, value) {
    document.getElementById(id).innerHTML = value;
  }

  /**
   * @function assignValueByID
   * @param {string} - id of the element which is to be assigned with the value.
   * @param {string} - value which is to be assigned.
   * description - This function assigns value to the HTML element.
   */
  assignValueByID(id, value) {
    document.getElementById(id).innerText = value;
  }

  /**
   * @function EmptyMultipleVariables
   * @param {strings} - Any number of params can be passed to initialized with empty value.
   * description - This function initializes all variables with blank value
    */
  EmptyMultipleVariables() {
    if (arguments.length > 0) {
      for (var i = 0; i < arguments.length; i++) {
        var validateText = arguments[i];
        validateText = '';
      }
    }
  }

  /**
   * @function validate2EmptyFieldswithAND
   * @param {string} validateText1 - The first string to be tested for blank value.
   * @param {string} validateText2 - The second string to be tested for blank value.
   * description - This function returns true if the string is not having a value.
   */

  validate2EmptyFieldswithAND(validateText1, validateText2) {
    if (this.validateEmpty(validateText1)) {
      if (this.validateEmpty(validateText2)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  /**
   * @function validate3EmptyFieldswithAND
   * @param {string} validateText1 - The first string to be tested for blank value.
   * @param {string} validateText2 - The second string to be tested for blank value.
   * @param {string} validateText3 - The second string to be tested for blank value.
   * description - This function returns true if all the strings are not having a value.
   */

  validate3EmptyFieldswithAND(validateText1, validateText2, validateText3) {
    if (this.validateEmpty(validateText1)) {
      if (this.validateEmpty(validateText2)) {
        if (this.validateEmpty(validateText3)) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }


  /**
   * @function validate2EmptyFieldswithNAND
   * @param {string} validateText1 - The first string to be tested for blank value.
   * @param {string} validateText2 - The second string to be tested for non blank value.
   * description - This function returns true if one string is empty and other has a value.
   */

  validate2EmptyFieldswithNAND(validateText1, validateText2) {
    if (this.validateEmpty(validateText1)) {
      if (this.validateEmpty(validateText2)) {
        return false;
      }
      else {
        return true;
      }
    }
  }


  /**
   * @function EmptyMultipleHTMLElementsByID
   * @param {strings} - Any number of params can be passed to initialized with empty value.
   * description - This function initializes all variables with blank value
  */
  EmptyMultipleHTMLElementsByID() {
    if (arguments.length > 0) {
      for (var i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).innerHTML = '';
      }
    }
  }

  /**
   * @function EmptyMultipleHTMLElementValuesByID
   * @param {strings} - Any number of params can be passed to initialized with empty value.
   * description - This function initializes all variables with blank value
  */
  EmptyMultipleHTMLElementValuesByID() {
    if (arguments.length > 0) {
      for (var i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).innerText = '';
      }
    }
  }

  /**
   * @function EmptyMultipleHTMLElementValuesByID
   * @param {strings} - Any number of params can be passed to initialized with empty value.
   * description - This function initializes all variables with blank value
  */
  getElementValueByID(id) {
    return (document.getElementById(id).innerText);
  }

  monthNameIDConversion() {
    /**Month Name array*/
    var monthNameArray = [];
    monthNameArray.push({
      monthId: 1,
      monthName: 'January',
      shortMonthName: 'jan'
    },
      {
        monthId: 2,
        monthName: 'February',
        shortMonthName: 'feb'
      },
      {
        monthId: 3,
        monthName: 'March',
        shortMonthName: 'mar'
      },
      {
        monthId: 4,
        monthName: 'April',
        shortMonthName: 'apr'
      },
      {
        monthId: 5,
        monthName: 'May',
        shortMonthName: 'may'
      },
      {
        monthId: 6,
        monthName: 'June',
        shortMonthName: 'jun'
      },
      {
        monthId: 7,
        monthName: 'July',
        shortMonthName: 'jul'
      },
      {
        monthId: 8,
        monthName: 'August',
        shortMonthName: 'aug'
      },
      {
        monthId: 9,
        monthName: 'September',
        shortMonthName: 'sep'
      },
      {
        monthId: 10,
        monthName: 'October',
        shortMonthName: 'oct'
      },
      {
        monthId: 11,
        monthName: 'November',
        shortMonthName: 'nov'
      },
      {
        monthId: 12,
        monthName: 'December',
        shortMonthName: 'dec'
      });
    return monthNameArray;
  }
  /**
   * @function getMonthName
   * @param {int} - month id to be passed
   * description - it will return the name of month corresponding to the month id passed in function as param.
  */
  getMonthName(id) {
    for (var i = 0; i <= 11; i++) {
      var monthNameArray = this.monthNameIDConversion();
      if (id == monthNameArray[i].monthId) {
        return monthNameArray[i].shortMonthName + " " + monthNameArray[i].monthName;
      }
    }
  }

  /**
   * @function clickOnNextPress
   * @param {int,int} - id1 of Element,id2 of Element
   * description - it will click the element having the id2.
  */
  clickOnNextPress(idBeforeKeyPress, idAfterKeyPress) {
    // $(document).ready(function () {
    //   $(idBeforeKeyPress).keypress(function (e) {
    //     var code = (e.keyCode ? e.keyCode : e.which);
    //     if ((code == 13) || (code == 10)) {
    //       //Your code goes here
    //       $(idAfterKeyPress).trigger('click');
    //     }
    //     return true;
    //   });
    // });
  }

  /**
   * @function focusOnNextPress
   * @param {int,int} - id of Element,id of Element
   * description - it will pass the focus from first param element to another.
  */
  focusOnNextPress(idBeforeKeyPress, idAfterKeyPress) {
    // $(document).ready(function () {

    //   $(idBeforeKeyPress).keypress(function (e) {
    //     var code = (e.keyCode ? e.keyCode : e.which);
    //     if ((code == 13) || (code == 10)) {
    //       $(idAfterKeyPress).trigger('focus');
    //     }
    //     return true;
    //   });
    // });
  }

  /**
   * @function clickOnCard
   * @param {int,int,int} - id of Element,id of Element,id of element
   * description - it will pass the focus from first param element to another.
  */
  clickOnCard(idToClick, idClick1, idClick2) {
    // $(document).ready(function () {

    //   $(idToClick).keydown(function (e) {

    //     var code = (e.keyCode ? e.keyCode : e.which);
    //     if (code == 9) {
    //       $(idClick1).trigger('click');
    //       $(idClick2).trigger('click');
    //     }
    //     return true;
    //   });
    //});

  }

  /**
   * @function isFloat
   * @param {value} - parameter to be checked for Float
   * description - This function checks if the paramter is a float value.
  */
  isFloat(n) {
    return Number(n) == n && n % 1 != 0;
  }

  /**
   * @function isInt
   * @param {value} - parameter to be checked for Integer
   * description - This function checks if the paramter is an Integer value.
  */
  isInt(n) {
    return Number(n) == n && n % 1 == 0;
  }

  /**
   * @function validateEmail
   * @param {value} - parameter to be checked for Email Format
   * description - This function checks if the paramter is a validated Email Format.
  */
  validateEmail(validateString) {
    var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return (reg.test(validateString));
  }

  /**
   * @function validateNumber
   * @param {value} - parameter to be checked for Number Format
   * description - This function checks if the parameter is a validated Number Format.
  */
  validateNumber(validateString) {
    var checkNumber = /^[1-9]{1}[0-9]+/;
    return (checkNumber.test(validateString));
  }

  /**
     * @function checkForAndroid
     * @param {value} - parameter to be checked for Android Platform
     * description - This function checks if the parameter is Android
  */
  checkForAndroid(platform) {
    return (platform == "android" || platform == "Android" || platform == "ANDROID")
  }

  /**
     * @function checkForioS
     * @param {value} - parameter to be checked for ioS Platform
     * description - This function checks if the parameter is ioS
  */
  checkForioS(platform) {
    return (platform == 'iOS' || platform == 'ios' || platform == 'IOS')
  }

  /**
   * @function assignClassByID
   * @param {string} - id of the element which is to be assigned with the class.
   * @param {string} - value which is to be assigned.
   * description - This function assigns Class to the HTML element.
   */
  assignClassByID(id, value) {
    document.getElementById(id).className = value;
  }

  /**
   * @function numberWithCommas
   * @param {int} -  Parameter to be converted into comma separated number
   * description - This function will return the comma separated number at interval of 3
   */

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
 * @function consoleWrite
 * @param {boolean} -  decides whether to display the console messages or not
 * @param {string} -  Message to be be displayed on console
 * description - This function will write the messaeg on console depending upon the todisplay parameter
 */

  consoleWrite(toDisplay, msg) {
    if (toDisplay) {
      console.log(msg);
    }
  }

  /**
* @function sleep
* @param {int} -  milliseconds of time
* description - This function will send the process to sleep for the specific miliseconds
*/

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  /**
  * @function genRandomDigit
  * @param {int} - length of random number to be generated.
  * description - This function returns the random number of specified length.
  */

  genRandomDigit(length) {
    var minValue = "1";
    var maxValue = "9";
    for (var i = 0; i < length - 1; i++) {
      minValue = minValue + "0";
      maxValue = maxValue + "9";
    }
    return Math.floor((Math.random() * parseInt(maxValue)) + parseInt(minValue));
  }


  /**
  * @function addZero
  * @param {int} - parameter to check for adding the zero.
  * description - This function will return the value prefixed with zero if the provided number is less than 10.
  */
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  /**
  * @function startTime
  * description - This function will return the current time in 24-hrs format.
  */

  startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var pmam = "";

    m = this.addZero(m);
    s = this.addZero(s);

    var t = h + ":" + m;
    return t;
  }

  /**
   * @function getTimeIn12
   * description - This function will return the current time in 12-hrs format.
   */

  getTimeIn12() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var pmam = "";

    m = this.addZero(m);
    s = this.addZero(s);
    var nh = h;
    if (h >= 12) {
      nh = h - 12;
      pmam = " PM";
    } else {
      pmam = " AM";
    }

    var t = nh + ":" + m + pmam;
    return t;
  }

  maskMobileNumber(mobNumber) {
    var temp = "x";
    var num = mobNumber.toString().length - 4;
    for (var i = 1; i < num; i++) {
      temp = temp + "x";
    }
    temp = mobNumber.toString().substring(0, 2) + temp + mobNumber.toString().substring((mobNumber).toString().length - 2, (mobNumber).toString().length);
    return temp;
  }

  maskAccNo(accNo) {
    var temp = "X";
    var num = accNo.toString().length - 4;
    for (var i = 1; i < num; i++) {
      temp = temp + "X";
    }
    //temp = accNo.toString().substring(0, 2) + temp + accNo.toString().substring((accNo).toString().length - 2, (accNo).toString().length);
    temp = temp + accNo.toString().substring((accNo).toString().length - 4, (accNo).toString().length);
    return temp;
  }

  maskCardNo(cardNo) {
    var temp = "x";
    var num = cardNo.toString().length - 4;
    for (var i = 1; i < num; i++) {
      temp = temp + "x";
    }
    //temp = accNo.toString().substring(0, 2) + temp + accNo.toString().substring((accNo).toString().length - 2, (accNo).toString().length);
    temp = temp + cardNo.toString().substring((cardNo).toString().length - 4, (cardNo).toString().length);
    return temp;
  }

  maskBalance(balAmount) {
    console.log("Inside balAmount");
    balAmount = Number(balAmount.trim()).toFixed(2);
    var temp = "";
    var bal = [];
    let num = balAmount.replace(",", "");
    if (num.includes(".")) {
      bal = num.split(".");
    }
    else bal[0] = num;
    bal.forEach((element, index) => {
      for (let i = 0; i < element.length; i++) {
        temp = temp + "X"
      }
      bal[index] = temp;
      temp = "";
    });

    return temp = bal.length > 1 ? " " + bal[0] + "." + bal[1] : " " + bal[0];
  }

  _maskBalance(balAmount) {
    console.log("Inside balAmount");
    balAmount = balAmount.trim()
    let num = balAmount.replace(",", "");
    var _balAmount = Number(num).toFixed(2);
    var temp = "";
    var bal = [];
    if (_balAmount.toString().includes(".")) {
      bal = num.split(".");
    }
    else bal[0] = num;
    bal.forEach((element, index) => {
      for (let i = 0; i < element.length; i++) {
        temp = temp + "X"
      }
      bal[index] = temp;
      temp = "";
    });

    return temp = bal.length > 1 ? " " + bal[0] + "." + bal[1] : " " + bal[0];
  }

  getCurrentDateTime() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }

  getMessageID(deviceID) {
    var date = new Date();
    var timestamp = date.getTime();
    var msgID;
    if (this.validateEmpty(deviceID)) {
      msgID = this.genRandomDigit(7).toString() + timestamp.toString();
    }
    else {
      msgID = this.genRandomDigit(4).toString() + deviceID.toString();
    }
    return msgID;
  }

  getMobileOperatingSystem() {

    if (typeof device == "undefined") {
      return "browser";
    }
    else {
      var userAgent = navigator.userAgent;
      if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
      }

      else if (/Android/i.test(userAgent)) {
        return "Android";
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      else if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "iOS";
      }

      else return "browser"
    }


  }

  closeAnyModal() {
    ($('.modal') as any).modal('hide');
    ($('body') as any).removeClass('modal-open');
    ($('.modal-backdrop') as any).remove();
  }

  showLoader() {
    this.disableBack = true;
    //$("#appLoader").show();
  }

  hideLoader() {
    this.disableBack = false;
    //$("#appLoader").hide();
  }

  exitApp() {
    navigator['app'].exitApp();
  }

  removeLeadingZero(value) {
    var parsedString;
    parsedString = Number(value).toString();
    return parsedString;
  }

  removeLineBreaksFromBase64(imageString) {
    var parsedBase64String;
    parsedBase64String = imageString.replace(/[\r\n]/g, '');
    return parsedBase64String;
  }

  getBackButtonEventMobile() {
    document.addEventListener("backbutton", function (e) {
      // alert("back btn called");
    }, true);
  }

  getBase64FromFile(file): Observable<any> {
    var subject = new Subject<any>();
    var fr = new FileReader();

    fr.onload = (e: any) => {
      subject.next(e.target.result);
      subject.complete();
    };

    fr.readAsDataURL(file);
    return subject.asObservable();
  }

  getMonths(monthVal) {
    var months = [
      { id: "01", name: "January" },
      { id: "02", name: "February" },
      { id: "03", name: "March" },
      { id: "04", name: "April" },
      { id: "05", name: "May" },
      { id: "06", name: "June" },
      { id: "07", name: "July" },
      { id: "08", name: "August" },
      { id: "09", name: "September" },
      { id: "10", name: "October" },
      { id: "11", name: "November" },
      { id: "12", name: "December" },
    ];

    return months.slice(0, monthVal + 1);
  }

  // add 91 before mobile no
  processPhoneNo(mobileno) {
    console.log(mobileno);
    if (mobileno.length == 10)
      return "91" + mobileno
    if (mobileno.length == 12)
      return mobileno
    if (mobileno.length == 13)
      return mobileno.replace("+", "");
    if (mobileno.length == 11 && mobileno.charAt(0) == '0') {
      mobileno = mobileno.replace("0", "")
      return "91" + mobileno
    }
  }

  getYears(backYears) {
    var years = [];
    var year = new Date();

    years.push(year.getFullYear());
    for (var i = 1; i < backYears; i++) {
      year.setFullYear(new Date().getFullYear() - i);
      years.push(year.getFullYear());
    }

    return years;
  }

  /**
   * common function to access Dailler window
   */
  openDailler(mobileNo) {
    window.open('tel:' + mobileNo);
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    amount = amount.replace('₹', '');
    amount = amount.trim();

    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var decimals = atemp[1];
    var n_length = number.length;
    var d_length = atemp.length == 2 ? decimals.length : 0;
    var words_string = "";
    var decimal_string = "";
    if (n_length <= 9) {
      var n_array: any = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + parseInt(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      var value: any = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    if (d_length <= 9 && d_length != 0) {
      var d_array: any = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_d_array = new Array();
      for (var i = 0; i < d_length; i++) {
        received_d_array[i] = decimals.substr(i, 1);
      }
      for (var i = 9 - d_length, j = 0; i < 9; i++, j++) {
        d_array[i] = received_d_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (d_array[i] == 1) {
            d_array[j] = 10 + parseInt(d_array[j]);
            d_array[i] = 0;
          }
        }
      }
      var _value: any = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          _value = d_array[i] * 10;
        } else {
          _value = d_array[i];
        }
        if (_value != 0) {
          decimal_string += words[_value] + " ";
        }
        if ((i == 1 && _value != 0) || (i == 0 && _value != 0 && d_array[i + 1] == 0)) {
          decimal_string += "Crores ";
        }
        if ((i == 3 && _value != 0) || (i == 2 && _value != 0 && d_array[i + 1] == 0)) {
          decimal_string += "Lakhs ";
        }
        if ((i == 5 && _value != 0) || (i == 4 && _value != 0 && d_array[i + 1] == 0)) {
          decimal_string += "Thousand ";
        }
        if (i == 6 && _value != 0 && (d_array[i + 1] != 0 && d_array[i + 2] != 0)) {
          decimal_string += "Hundred and ";
        } else if (i == 6 && _value != 0) {
          decimal_string += "Hundred ";
        }
      }
      decimal_string = decimal_string.split("  ").join(" ");
    }
    if (words_string.trim() == "One") {
      return words_string + "Rupee Only";
    } else {
      if (d_length != 0) {
        return words_string + "Rupees " + decimal_string + " paisa Only";
      }
      else {
        return words_string + "Rupees Only";
      }
    }
  }

  autocomplete(inp, arr, self) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("focus", function (e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      // if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            self.LoginForm.patchValue({ username: this.getElementsByTagName("input")[0].value });
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x: any = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt?) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      if (e.target['id'] != 'userNameTxt') {
        closeAllLists(e.target);
      }
    });
  }

  /**
     * common function to initiallize data table
     */
  setDataTable() {
    setTimeout(function () {
      $('table.display').DataTable({
        responsive: true,
        pageLength: "5"
      })
      //   $('table.display').DataTable({
      //     dom: 'lfrtipB',
      //     scrollY: "350px",
      //     scrollX: true,
      //     scrollCollapse: true,
      //     buttons: [
      //       {extend:'excel',className: 'buttonsToHide'},
      //       {extend:'pdf',className: 'buttonsToHide',orientation : 'landscape',pageSize : 'LEGAL'},
      //       {extend:'csv',className: 'buttonsToHide'}
      // ]
      //   });
      /// for datatable css like vertical scrolling,buttons alignment and serach overlapping icon issue
      // $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
      $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
      $('.dataTables_info').css("float", "left")
      $(".dataTables_filter input").focus(function () {
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }


  shareDownloadedPDF(doc, fileName) {
    if (window.hasOwnProperty('cordova')) {
      var out = doc.output();
      // var url = 'data:application/pdf;base64,' + Base64.encode(out);
      //console.log(" btoa(out) ", base64);
      // window.plugins.socialsharing.share(null, Date.now(), base64, null);
      // window.open("data:application/pdf;base64," + btoa(out));
      var storageLocation
      if (device.platform.toLowerCase() == "ios") {
        storageLocation = cordova.file.documentsDirectory;
      }
      else {
        storageLocation = 'file:///storage/emulated/0/';
      }

      var folderPath = storageLocation;
      var folderName = "PSB";
      var contentType = "application/pdf";
      let base64 = this.b64toBlob(btoa(out), contentType);

      window.resolveLocalFileSystemURL(folderPath, function (fileSystem) {
        fileSystem.getDirectory(folderName, { create: true, exclusive: false }, function (dir) {
          console.log("Access to the directory granted succesfully");
          dir.getFile(fileName + ".pdf", { create: true }, function (file) {
            console.log("File created succesfully.");
            file.createWriter(function (fileWriter) {
              console.log("Writing content to file");
              fileWriter.write(base64);
              fileWriter.onwriteend = function () {
                var url = file.toURL();
                console.log("url to share =======>" + url);
                window['plugins'].socialsharing.share(null, fileName, url);
              };

              fileWriter.onerror = function (err) {
                // alert("Unable to download");
                console.error(err);
              };
            }, function (err) {
              // alert('Unable to save file in path ' + folderpath);
              console.error(err);
            });
          });
        }, function (err) { console.error(err); });
      }, function (err) { console.error(err); });

    } else {
      doc.save(fileName + '.pdf');
    }
  }

  downloadPDF(doc, fileName) {
    if (window.hasOwnProperty('cordova')) {
      var out = doc.output();
      // var url = 'data:application/pdf;base64,' + Base64.encode(out);
      //console.log(" btoa(out) ", base64);
      // window.plugins.socialsharing.share(null, Date.now(), base64, null);
      // window.open("data:application/pdf;base64," + btoa(out));
      var storageLocation
      if (device.platform.toLowerCase() == "ios") {
        storageLocation = cordova.file.documentsDirectory;
      }
      else {
        storageLocation = 'file:///storage/emulated/0/';
      }

      var folderPath = storageLocation;
      var folderName = "PSB";
      var contentType = "application/pdf";
      let base64 = this.b64toBlob(btoa(out), contentType);

      window.resolveLocalFileSystemURL(folderPath, function (fileSystem) {
        fileSystem.getDirectory(folderName, { create: true, exclusive: false }, function (dir) {
          console.log("Access to the directory granted succesfully");
          dir.getFile(fileName + ".pdf", { create: true }, function (file) {
            console.log("File created succesfully.");
            file.createWriter(function (fileWriter) {
              console.log("Writing content to file");
              fileWriter.write(base64);
              fileWriter.onwriteend = function () {
                var url = file.toURL();
                cordova.plugins.fileOpener2.open(url, contentType, {
                  error: function error(err) {
                    console.error(err);
                    // alert("Unable to open");
                  },
                  success: function success() {
                    console.log("success with opening the file");
                  }
                });
              };

              fileWriter.onerror = function (err) {
                // alert("Unable to download");
                console.error(err);
              };
            }, function (err) {
              // alert('Unable to save file in path ' + folderpath);
              console.error(err);
            });
          });
        }, function (err) { console.error(err); });
      }, function (err) { console.error(err); });

    } else {
      doc.save(fileName + '.pdf');
    }
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  /**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  savePDFInDevice(section, filename) {
    var self = this;
    // navigator.screenshot.save(function (error, res) {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('ok', res.filePath);
    //     // var contentType = "application/pdf";
    //     cordova.plugins.fileOpener2.open("file://" + res.filePath, 'image/jpeg', {
    //       error: function error(err) {
    //         console.error(err);
    //         // alert("Unable to open");
    //       },
    //       success: function success() {
    //         console.log("success with opening the file");
    //       }
    //     });
    //     // self.getFileContentAsBase64("file://" + res.filePath, function (base64) {
    //     //   //window.open(base64Image);
    //     //   console.log(base64);
    //     //   var base64Image = base64.split(',')[1];
    //     //   // Then you'll be able to handle the myimage.png file as base64
    //     //   var storageLocation = "";
    //     //   switch (device.platform) {
    //     //     case "Android":
    //     //       storageLocation = cordova.file.externalDataDirectory;
    //     //       break;

    //     //     case "iOS":
    //     //       storageLocation = cordova.file.documentsDirectory;
    //     //       break;

    //     //     default:
    //     //       break;
    //     //   }

    //     //   var folderPath = storageLocation;
    //     //   // Convert the base64 string in a Blob
    //     //   var DataBlob = self.b64toBlob(base64Image, contentType);

    //     //   console.log("Starting to write the file :3");

    //     //   window.resolveLocalFileSystemURL(folderPath, function (dir) {
    //     //     console.log("Access to the directory granted succesfully");
    //     //     dir.getFile(filename, { create: true }, function (file) {
    //     //       console.log("File created succesfully.");
    //     //       file.createWriter(function (fileWriter) {
    //     //         console.log("Writing content to file");
    //     //         fileWriter.write(DataBlob);
    //     //         // showToastMessage("FILE_DOWNLOADED","success");
    //     //         fileWriter.onwriteend = function () {
    //     //           var url = file.toURL();
    //     //           cordova.plugins.fileOpener2.open(url, contentType, {
    //     //             error: function error(err) {
    //     //               console.error(err);
    //     //               // alert("Unable to open");
    //     //             },
    //     //             success: function success() {
    //     //               console.log("success with opening the file");
    //     //             }
    //     //           });
    //     //         };

    //     //         fileWriter.onerror = function (err) {
    //     //           console.log("Unable to download");
    //     //           console.error(err);
    //     //         };
    //     //       }, function (err) {
    //     //         // alert('Unable to save file in path ' + folderpath);
    //     //         console.error(err);
    //     //       });
    //     //     });
    //     //   });

    //     // });
    //   }
    // });

    if (device.platform.toLowerCase() == "android") {
      self.convertHtmlToImage(section).subscribe((base64Image) => {
        var block = base64Image.split(";");
        var dataType = block[0].split(":")[1];// In this case "image/png"
        var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
        self.savebase64AsImageFile(filename, realData, dataType);
      });
    }
    else {
      self.convertHtmlToImageIos(section).subscribe((blob) => {
        console.log("blob success");
        console.log(blob);
        self.savebase64AsImageFileIos(filename, blob, 'image/png');
      });
    }
  }



  shareImageInDevice(section, filename) {
    // navigator.screenshot.save(function (error, res) {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('ok', res.filePath);
    //     // self.getFileContentAsBase64("file://" + res.filePath, function (base64) {
    //     //window.open(base64Image);
    //     // console.log(base64);
    //     window['plugins'].socialsharing.share(null, filename, "file:///" + res.filePath);
    //     // });
    //   }
    // });

    this.convertHtmlToImage(section).subscribe((base64Image) => {
      window['plugins'].socialsharing.share(null, filename, base64Image);
    });

  }

  takeScreenshot() {
    navigator.screenshot.save(function (error, res) {
      let self = this;
      if (error) {
        console.error(error);
      } else {
        console.log('ok', res.filePath);
        cordova.plugins.fileOpener2.open("file://" + res.filePath, 'image/jpeg', {
          error: function error(err) {
            console.error(err);
            // alert("Unable to open");
          },
          success: function success() {
            console.log("success with opening the file");
          }
        });
      }
    }, 'jpg', 50);
  }

  downloadReceiptIos(filename) {
    var self = this;
    navigator.screenshot.save(function (error, res) {
      if (error) {
        console.error(error);
      } else {
        console.log('ok', res.filePath);
        var contentType = "application/pdf";
        self._getFileContentAsBase64("file://" + res.filePath).then((base64) => {
          console.log('base64', base64);
          //window.open(base64Image);
          console.log(base64);
          var base64Image = base64.split(',')[1];
          // Then you'll be able to handle the myimage.png file as base64
          var storageLocation = "";
          console.log('device.platform', device.platform);
          if (device.platform.toLowerCase() == "ios") {
            storageLocation = cordova.file.documentsDirectory;
            console.log('storageLocation', storageLocation);
          }
          // Convert the base64 string in a Blob
          var DataBlob = self.b64toBlob(base64Image, contentType);
          console.log("Starting to write the file :3");

          window.resolveLocalFileSystemURL(storageLocation, function (dir) {
            console.log("Access to the directory granted succesfully");
            dir.getFile(filename, { create: true }, function (file) {
              console.log("File created succesfully.");
              file.createWriter(function (fileWriter) {
                console.log("Writing content to file");
                fileWriter.write(DataBlob);
                // showToastMessage("FILE_DOWNLOADED","success");
                fileWriter.onwriteend = function () {
                  var url = file.toURL();
                  cordova.plugins.fileOpener2.open(url, contentType, {
                    error: function error(err) {
                      console.error(err);
                      // alert("Unable to open");
                    },
                    success: function success() {
                      console.log("success with opening the file");
                    }
                  });
                };

                fileWriter.onerror = function (err) {
                  console.log("Unable to download");
                  console.error(err);
                };
              }, function (err) {
                console.error('Unable to save file in path ' + storageLocation);
                console.error(err);
              });
            });
          });
        });
      }
    });
  }

  /**
 * This function will handle the conversion from a file to base64 format
 *
 * @path string
 * @callback function receives as first parameter the content of the image
 */
  getFileContentAsBase64(path, callback) {
    console.log("path");
    console.log(path);

    window.resolveLocalFileSystemURL(path, gotFile, fail);

    function fail(e) {
      console.error('error getting filepath ', e)
      // alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {

      fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          var content = this.result;
          callback(content);
        };
        // The most important point, use the readAsDatURL Method from the file plugin
        reader.readAsDataURL(file);
      });
    }
  }


  _getFileContentAsBase64(path): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log("path");
      console.log(path);
      window.resolveLocalFileSystemURL(path, gotFile, fail);

      function fail(e) {
        console.error('error getting filepath ', e)
        // alert('Cannot found requested file');
        reject(e);
      }

      function gotFile(fileEntry) {
        console.log("fileEntry");
        console.log(fileEntry);
        fileEntry.file(function (file) {
          console.log("file");
          console.log(file);
          var reader = new FileReader();
          reader.onloadend = function (e) {
            var content = this.result;
            console.log("content");
            console.log(content);
            resolve(content);
          };
          // The most important point, use the readAsDatURL Method from the file plugin
          reader.readAsDataURL(file);
        });
      }
    });
  }

  isToday(otherDate) {
    var today = new Date();
    return (today.toDateString() == otherDate.toDateString());
  }

  getFirstLastCharOfUser(userFullName: string) {
    var string = userFullName.split(' ');
    return string[0][0] + string[1][0];
  }

  randomString(length, appendKey?: string) {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    if (appendKey) {
      result = appendKey + result
    }
    return result;
  }

  getAscendingContactList(contacts) {
    var specialRegex = /[^A-Z a-z0-9]/;
    let contactList = contacts.filter(obj => Object.keys(obj).includes("custName") && obj.custName != null && !specialRegex.test(obj.custName));
    console.log(JSON.stringify(contactList));
    var sorted = contactList.sort((a, b) => a.custName > b.custName ? 1 : -1);
    var grouped = sorted.reduce((groups, contact) => {
      if (contact.custName != null) {
        var letter = contact.custName.charAt(0);

        groups[letter] = groups[letter] || [];
        groups[letter].push(contact);

        return groups;
      }
    }, {});
    var result = Object.keys(grouped).map(key => ({ key, contacts: grouped[key] }));
    return result;
  }

  /**
   * Close Popup name by class name
   * @param popupName
   */
  closePopup(popupName: string) {
    $(popupName).removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  }

  /**
   * Open Modal Popup By Class name
   */
  openPopup(popupName: string, checkExisting?) {
    if (checkExisting) {
      $(popupName).addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      if (!$(popupName).hasClass('popup-active')) {
        setTimeout(() => {
          $(popupName).addClass('popup-active');
          $('div.ios-nav-overlay').fadeIn(400);
        }, 100);
      } else {
        $(popupName).removeClass('popup-active');
        $('div.ios-nav-overlay').fadeOut();
      }
    }

  }

  hadClassActive(className) {
    if ($(className).hasClass('popup-active')) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * close all popup
   */
  closeAllPopup() {
    $('.popup-bottom').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  }

  closeSideNavUPI() {
    $('nav.global-nav').removeClass('nav-showing');
    $('div.nav-overlay').fadeOut(300);
    $('body').css('overflow', 'inherit');
  }

  closeSideNavOmni() {
    $('nav.global-nav').removeClass('nav-showing');
    $('div.ios-nav-overlay').fadeOut(400);
    $('body').css('overflow', 'inherit');
  }


  savebase64AsImageFileIos(filename, blob, contentType) {
    console.log("Inside savebase64AsImageFileIos...");
    // var folderPath = cordova.file.documentsDirectory;
    var folderPath = cordova.file.dataDirectory;
    console.log('folderPath', folderPath);

    window.resolveLocalFileSystemURL(folderPath, function (dir) {
      console.log('dir');
      console.log(dir);
      console.log("Access to the directory granted succesfully");
      dir.getFile(filename, { create: true }, function (file) {
        console.log("File created succesfully.");
        file.createWriter(function (fileWriter) {
          console.log("Writing content to file");
          fileWriter.write(blob);
          fileWriter.onwriteend = function () {
            var url = file.toURL();
            console.log('FILE url', url);
            cordova.plugins.fileOpener2.open(url, contentType, {
              error: function error(err) {
                console.error(err);
                // alert("Unable to open");
              },
              success: function success() {
                console.log("success with opening the file");
              }
            });
            // var fileTransfer = new FileTransfer();
            // var uri = encodeURI(url);
            // console.log('uri', uri);

            // fileTransfer.download(uri, url, function(entry) {
            //   console.log("download complete: " + entry.toURL());
            // }, function(error) {
            //   console.log("download error source " + error.source);
            //   console.log("download error target " + error.target);
            //   console.log("download error code" + error.code);
            // }, false,{});
          };

          fileWriter.onerror = function (err) {
            // alert("Unable to download");
            console.error(err);
          };
        }, function (err) {
          // alert('Unable to save file in path ' + folderpath);
          console.error(err);
        });
      });
    });
  }

  /**
  * Create a Image file according to its database64 content only.
  *
  * @param folderpath {String} The folder where the file will be created
  * @param filename {String} The name of the file that will be created
  * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
  */
  savebase64AsImageFile(filename, content, contentType, msgKey?: any, toastColor?: any) {
    var storageLocation = "";

    switch (device.platform) {
      case "Android":
        //storageLocation = cordova.file.externalRootDirectory;
        storageLocation = 'file:///storage/emulated/0/';
        // cordova.file.createDir(cordova.file.externalDataDirectory, storageLocation, true);
        break;

      case "iOS":
        storageLocation = cordova.file.documentsDirectory;
        break;
    }

    var folderPath = storageLocation;
    var folderName = "PSB"
    // Convert the base64 string in a Blob
    var DataBlob = this.b64toBlob(content, contentType);

    console.log("Starting to write the file :3");

    if (device.platform == "Android") {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            window.resolveLocalFileSystemURL(folderPath, function (fileSystem) {
              fileSystem.getDirectory(folderName, { create: true, exclusive: false }, function (dir) {
                console.log("Access to the directory granted succesfully");
                dir.getFile(filename, { create: true }, function (file) {
                  console.log("File created succesfully.");
                  file.createWriter(function (fileWriter) {
                    console.log("Writing content to file");
                    fileWriter.write(DataBlob);
                    if (msgKey) showToastMessage(msgKey, toastColor);
                    fileWriter.onwriteend = function () {
                      var url = file.toURL();
                      cordova.plugins.fileOpener2.open(url, contentType, {
                        error: function error(err) {
                          console.error(err);
                          // alert("Unable to open");
                        },
                        success: function success() {
                          console.log("success with opening the file");
                        }
                      });
                    };

                    fileWriter.onerror = function (err) {
                      // alert("Unable to download");
                      console.error(err);
                    };
                  }, function (err) {
                    // alert('Unable to save file in path ' + folderpath);
                    console.error(err);
                  });
                });
              }, function (err) { console.error(err); });
            });
            break;
          // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          //   window['imagePicker'].requestReadPermission();
          //   break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            this.plugin.gotoSetting().subscribe((status) => {
              console.log("gotoSetting=====>", status);
            }, (err) => {
              console.log("gotoSetting error", err);
            });
            break;
          default:
            break;
        }
      }, function (error) {
        console.error(error);
      });
    }
    else {
      window.resolveLocalFileSystemURL(folderPath, function (fileSystem) {
        fileSystem.getDirectory(folderName, { create: true, exclusive: false }, function (dir) {
          console.log("Access to the directory granted succesfully");
          dir.getFile(filename, { create: true }, function (file) {
            console.log("File created succesfully.");
            file.createWriter(function (fileWriter) {
              console.log("Writing content to file");
              fileWriter.write(DataBlob);
              if (msgKey) showToastMessage(msgKey, toastColor);
              fileWriter.onwriteend = function () {
                var url = file.toURL();
                cordova.plugins.fileOpener2.open(url, contentType, {
                  error: function error(err) {
                    console.error(err);
                    // alert("Unable to open");
                  },
                  success: function success() {
                    console.log("success with opening the file");
                  }
                });
              };

              fileWriter.onerror = function (err) {
                // alert("Unable to download");
                console.error(err);
              };
            }, function (err) {
              // alert('Unable to save file in path ' + folderpath);
              console.error(err);
            });
          });
        }, function (err) { console.error(err); });
      });
    }




  }

  /**
   * Html code to base64 convert
   * @param section
   */
  convertHtmlToImage(section): Observable<any> {
    var self = this;
    if (device.platform.toLowerCase() == "android") {
      //
      // We pass that section to html2Canvase
      var self = this;
      var subject = new Subject<any>();
      html2canvas(section)
        .then(canvas => {
          console.log("canvas =====>" + JSON.stringify(canvas));
          // var link = document.createElement('a');
          let base64Image = canvas.toDataURL();
          console.log("base64Image ===>" + base64Image);
          // link.download = filename;
          // document.body.appendChild(link);
          // link.click();
          subject.next(base64Image);
          subject.complete();
        });
    } else if (device.platform.toLowerCase() == "ios") {

      //TODO: checking
      console.log("htmlToImage SECTION");
      console.log(section);
      var subject = new Subject<any>();
      // window.canvas2ImagePlugin.saveImageDataToLibrary(
      //   function(msg){
      //       console.log(msg);  //msg is the filename path (for android and iOS)
      //       subject.next(msg);
      //       subject.complete();
      //   },
      //   function(err){
      //       console.log(err);
      //   },section);

      htmlToImage.toPng(section)
        .then(function (dataUrl) {
          console.log('dataUrl', dataUrl);
          var img = new Image();
          img.src = dataUrl;
          console.error(img.src);
          subject.next(img.src);
          subject.complete();
        })
        .catch(function (error) {
          console.error('oops, something went wrong!');
          console.log(error);
        });

      // issues with FileReader.readAsDataURL
      // domtoimage.toPng(section)
      // .then(function (dataUrl) {
      //   console.log(dataUrl);
      //     var img = new Image();
      //     img.src = dataUrl;
      //     subject.next("");
      //     subject.complete();
      // })
      // .catch(function (error) {
      //     console.error('oops, something went wrong!', error);
      // });

      // var self = this; // app is getting crashed
      // var subject = new Subject<any>();
      // saveAsPng(
      //   section,
      //   {  filename: 'Report', printDate: true },
      //   {
      //     backgroundColor: 'rgba(101,198,185,0.5)',
      //     style: {
      //       padding: '4px',
      //       display: 'flex',
      //       justifyContent: 'center',
      //     },
      //   }
      //   )
      //   .then((canvas) => {
      //     console.log("canvas =====>");
      //     console.log(canvas);
      //     subject.next("");
      //     subject.complete();
      //   });

      // html2canvas(section,
      //   {
      //     allowTaint: false,
      //     removeContainer: true,
      //     backgroundColor: '#ffffff',
      //     scale: window.devicePixelRatio,
      //     useCORS: false
      //   })
      //   .then(canvas => {
      //     console.log("base64Image ===>");
      //     // let base64Image = canvas.toDataURL();
      //     // console.log(base64Image);
      //     // subject.next(base64Image);
      //     // subject.complete();
      //     var imgData  = canvas.toDataURL("image/png", 1.0);
      //     subject.next(imgData);
      //     subject.complete();
      //   });

      //   let options = {
      //     documentSize: 'A4',
      //     type: 'base64'
      //   }

      // pdf.fromData(section.outerHTML, options)
      // .then((base64)=>{
      //   console.log("pdf base 64");
      //   var image = new Image();
      //   image.src = 'data:image/png;base64,'+ base64;
      //   subject.next(image.src);
      //   subject.complete();
      // })   // it will
      // .catch((err)=>{
      //   console.log("pdf base 64 error");
      //   console.log(err)
      // })


    } else {
      console.log("Unknown platform");
    }
    return subject.asObservable();
  }

  /**
   * Html code to base64 convert
   * @param section
   */
  convertHtmlToImageIos(section): Observable<any> {
    var self = this;
    if (device.platform.toLowerCase() == "ios") {
      //TODO: checking
      console.log("htmlToImage IOS SECTION");
      console.log(section);
      var subject = new Subject<any>();

      html2canvas(section,
        {
          allowTaint: false,
          removeContainer: true,
          backgroundColor: '#ffffff',
          scale: window.devicePixelRatio,
          useCORS: false
        })
        .then(canvas => {
          if (canvas.toBlob) {
            console.log("inside blob");
            console.log('canvas', canvas);
            canvas.toBlob(function (blob) {
              console.log("blob");
              console.log(blob);
              subject.next(blob);
              subject.complete();
            }, 'image/jpeg');
          }
        });
    } else {
      console.log("Unknown platform");
    }
    return subject.asObservable();
  }


  public getBase64Image(imgUrl, callback) {

    var img = new Image();

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function () {

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png"),
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

      callback(dataURL); // the base64 string

    };

    // set attributes and src
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;

  }

  filterValue(obj, key, value) {
    return obj.find(function (v) { return v[key] === value });
  }

  shareImage(fileName, base64) {
    console.log("shareImage =====>");
    window.plugins.socialsharing.share(null, fileName, base64, null);
  }

  addDecimalToFixed(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }


  /**
   * mask all number
   */
  maskNumber(number) {
    let num = number;
    return num.replace(/\d(?=\d{4})/g, "*");
  }

  // getQRDataFrmGalryImg(fileUri): Observable<any> {
  //   var self = this;
  //   var subject = new Subject<any>();
  //   decodeImageFromBase64(fileUri, function (decodedInformation) {
  //     subject.next(decodedInformation);
  //     subject.complete();
  //   });
  //   function decodeImageFromBase64(data, callback) {
  //     // set callback
  //     qrcode.callback = callback;
  //     // Start decoding
  //     qrcode.decode(data)
  //   }
  //   return subject.asObservable();
  // }

  getQRDataFrmGalryImg(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      decodeImageFromBase64(fileUri, function (decodedInformation) {
        console.log("decodedInformation");
        console.log(decodedInformation);
        resolve(decodedInformation);
      });
      function decodeImageFromBase64(data, callback) {

        // set callback
        qrcode.callback = callback;
        // Start decoding
        qrcode.decode(data)
      }
    });
  }


  convertNumToDate(numDate) {
    // var numDate = 11102020;
    var y = numDate.substr(4),
      m = numDate.substr(2, 2),
      d = numDate.substr(0, 2);
    var date = new Date(y, m - 1, d);
    return date;
  }

  termAccepted(msg) {
    this.termAcceptedEvent.emit(msg);
  }



  getCollectMandateScanQRString(QRDetals) {
    if (QRDetals.signature) {
      return encodeURI(`upi://collect?umn=${QRDetals.umn}&am=${QRDetals.amt}&tn=${QRDetals.remarks}&validitystart=${QRDetals.validityStartDate.replace(/\\|\//g, '')}&validityend=${QRDetals.validityEndDate.replace(/\\|\//g, '')}&amrule=EXACT&pa=${QRDetals.toPayee}&orgid=159023&mode=13&purpose=00,&recur=${QRDetals.recur}&sign=${QRDetals.signature}`)
    } else {
      return encodeURI(`upi://collect?umn=${QRDetals.umn}&am=${QRDetals.amt}&tn=${QRDetals.remarks}&validitystart=${QRDetals.validityStartDate.replace(/\\|\//g, '')}&validityend=${QRDetals.validityEndDate.replace(/\\|\//g, '')}&amrule=EXACT&pa=${QRDetals.toPayee}&orgid=159023&mode=13&purpose=00,&recur=${QRDetals.recur}`)
    }
  }

  getRequestMandateScanQRString(QRDetals) {
    if (QRDetals.signature) {
      return encodeURI(`upi://mandate?am=${QRDetals.amt}&tn=${QRDetals.remarks}&validitystart=${QRDetals.validityStartDate.replace(/\\|\//g, '')}&validityend=${QRDetals.validityEndDate.replace(/\\|\//g, '')}&amrule=EXACT&pa=${QRDetals.toPayer}&pn=${QRDetals.payerName}&tid=${QRDetals.mandateTxnId}&orgid=${QRDetals.orgId}&mode=13&purpose=00&recur=${QRDetals.recur}&sign=${QRDetals.signature}`)
    } else {
      return encodeURI(`upi://mandate?am=${QRDetals.amt}&tn=${QRDetals.remarks}&validitystart=${QRDetals.validityStartDate.replace(/\\|\//g, '')}&validityend=${QRDetals.validityEndDate.replace(/\\|\//g, '')}&amrule=EXACT&pa=${QRDetals.toPayer}&pn=${QRDetals.payerName}&tid=${QRDetals.mandateTxnId}&orgid=${QRDetals.orgId}&mode=13&purpose=00&recur=${QRDetals.recur}`)
    }
  }

  maskEmailId(email) {
    if (email) {
      var parts = email.split("@");
      var name = parts[0];
      var result = name.charAt(0);
      for (var i = 1; i < name.length; i++) {
        result += "*";
      }
      result += name.charAt(name.length - 1);
      result += "@";
      var domain = parts[1];
      result += domain.charAt(0);
      var dot = domain.indexOf(".");
      for (var i = 1; i < dot; i++) {
        result += "*";
      }
      result += domain.substring(dot);

      return result;
    }
    else {
      return "";
    }
  }

  _getResizeBase64(path): Promise<any> {
    console.log("resize path", path);
    return new Promise((resolve, reject) => {
      var options = {
        uri: path,
        folderName: "Protonet Messenger",
        quality: 10,
        width: 400,
        height: 400,
        base64: true,
        fit: false
      };

      window.ImageResizer.resize(options,
        function (image) {
          // success: image is the new resized image
          console.log(image);
          resolve(image);
        }, function (error) {
          reject(error);
          // failed: grumpy cat likes this function
        });
    });
  }

  /*** Generate E-Receipt PDF */

  psbNewLogo = "data:image/png;base64,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"

  successLogo = "data:image/png;base64,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"

  errorLogo = "data:image/png;base64,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"

  generatePDF(imageColor, msg, submsg, reftransJSON, receiptJSON, receiptName, branchJSON, printPDF, accountNo, todayDateTime) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line


    doc.setFontSize(7);
    var count1 = 10
    for (i = 0; i < branchJSON.length; i++) {
      var data = branchJSON[i].key + ": " + branchJSON[i].value
      doc.text(data, pageWidth - 110, count1, 'left');
      count1 = count1 + 5
    }
    // doc.text("Branch Name : ", pageWidth - 110, 10, 'left');
    // doc.text("Branch Code : ", pageWidth - 110, 15, 'left');
    // doc.text("Branch Address : ", pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : ", pageWidth - 110, 25, 'left');
    // doc.text("IFSC : " , pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth - 15, 45);

    doc.setFontSize(20);

    doc.text("E-Receipt", pageWidth / 2, 60, 'center');



    var img = new Image()
    if (imageColor == 'success')
      img.src = this.successLogo;
    else
      img.src = this.errorLogo;
    doc.addImage(img, 'png', 20, 75, 16, 16);

    doc.setFontSize(20);

    doc.text(msg, 40, 85, 'left');

    doc.setFontSize(12)
    doc.text(submsg, 40, 95, 'left');

    doc.setFontSize(9)
    doc.text(reftransJSON[0].key + ": " + reftransJSON[0].value, 40, 105, 'left');

    doc.setLineWidth(0.1);
    doc.line(17, 110, pageWidth - 17, 110);

    doc.setFontSize(11)
    var count = 120
    for (i = 0; i < receiptJSON.length; i++) {
      var data = receiptJSON[i].key + ": " + receiptJSON[i].value
      doc.text(data, 25, count, 'left');
      count = count + 10
    }

    doc.setFontSize(8)
    doc.text("This is computer generated statement and does not require any signature.", 15, 190, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 115, 'S');

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth - 15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    if (printPDF == 'Y') {
      if (!window.hasOwnProperty('cordova')) {
        doc.autoPrint();
        window.open(doc.output('bloburl'));
      }
      else {
        this.shareDownloadedPDF(doc, receiptName + '_xx' + this.maskCharacter(accountNo, 4) + '_' + todayDateTime);

        // doc.autoPrint();
        // window.open(doc.output('bloburl'));
      }
    }
    else {
      this.downloadPDF(doc, receiptName + '_xx' + this.maskCharacter(accountNo, 4) + '_' + todayDateTime);
    }
  }


  shareGeneratePDF(imageColor, msg, submsg, reftransJSON, receiptJSON, receiptName, branchJSON, printPDF, accountNo, todayDateTime) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line


    doc.setFontSize(7);
    var count1 = 10
    for (i = 0; i < branchJSON.length; i++) {
      var data = branchJSON[i].key + ": " + branchJSON[i].value
      doc.text(data, pageWidth - 110, count1, 'left');
      count1 = count1 + 5
    }
    // doc.text("Branch Name : ", pageWidth - 110, 10, 'left');
    // doc.text("Branch Code : ", pageWidth - 110, 15, 'left');
    // doc.text("Branch Address : ", pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : ", pageWidth - 110, 25, 'left');
    // doc.text("IFSC : " , pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth - 15, 45);

    doc.setFontSize(20);

    doc.text("E-Receipt", pageWidth / 2, 60, 'center');



    var img = new Image()
    if (imageColor == 'success')
      img.src = this.successLogo;
    else
      img.src = this.errorLogo;

    doc.addImage(img, 'png', 20, 75, 16, 16);

    doc.setFontSize(20);

    doc.text(msg, 40, 85, 'left');

    doc.setFontSize(12)
    doc.text(submsg, 40, 95, 'left');

    doc.setFontSize(9)
    doc.text(reftransJSON[0].key + ": " + reftransJSON[0].value, 40, 105, 'left');

    doc.setLineWidth(0.1);
    doc.line(17, 110, pageWidth - 17, 110);

    doc.setFontSize(11)
    var count = 120
    for (i = 0; i < receiptJSON.length; i++) {
      var data = receiptJSON[i].key + ": " + receiptJSON[i].value
      doc.text(data, 25, count, 'left');
      count = count + 10
    }

    doc.setFontSize(8)
    doc.text("This is computer generated statement and does not require any signature.", 15, 190, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 115, 'S');

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth - 15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    this.shareDownloadedPDF(doc, receiptName + '_xx' + this.maskCharacter(accountNo, 4) + '_' + todayDateTime);
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    // return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
    return str.slice(-n);
  }

}
