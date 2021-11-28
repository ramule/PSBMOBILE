import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: "firstLastChar" })
export class FirstLastChar implements PipeTransform {
  transform(userFullName,splitBy?:string): string {
    if(splitBy){
      var string = userFullName.split('.');
      if(string[1]){
        return string[0][0] + string[1][0];
      }else{
        return string[0][0];
      }
    }
    else if (userFullName) {
        var string = userFullName.split(' ');
        if(string[1]){
          return string[0][0] + string[1][0];
        }else{
          return string[0][0];
        }
    }
    else {
    }
  }

}

@Pipe({ name: "Last4Char" })
export class Last4Char implements PipeTransform {
  transform(charString): string {
    if (charString) {
      return charString.substr(charString.length - 4);
    }
    else {
      return charString;
    }
  }

}


@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 15, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}