import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: "maskAccountNo" })
export class MaskAccountNoPipe implements PipeTransform {
  transform(accountNo): string {
      if(accountNo){
        let maskedAccountNo = accountNo.replace(/\d(?=\d{4})/g, "X");
        return maskedAccountNo;
      }else{
          return accountNo;
      }
  }
}

@Pipe({ name: "maskString" })
export class MaskStringPipe implements PipeTransform {
  transform(string): string {
      if(string){
        // return string.replace(/(?<!^.?).(?!.?$)/g, "X");
        return string;
      }else{
          return string;
      }
  }
}