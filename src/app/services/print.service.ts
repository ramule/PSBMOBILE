import { Injectable } from '@angular/core';
@Injectable()
export class PrintingService {

public print(printEl: HTMLElement) {
  var newWin;
  newWin= window.open("");
  newWin.document.write(printEl.outerHTML);
  newWin.print();
  newWin.close();
  }
}