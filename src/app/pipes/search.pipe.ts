import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(value, keys: string, term: string){
    
    if(!term) return value;
    return (value || []).filter(item => keys.split(',').some(a => item.hasOwnProperty(a) && new RegExp(term, 'gi').test(item[a])));
  }

}
