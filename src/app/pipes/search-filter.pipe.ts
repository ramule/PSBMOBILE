import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {
  
  transform(items: any[], searchObject : string, searchText : string ): any[] {
    // console.log('searchObject => ', searchObject);
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    if(searchObject) {
      return items.filter( i => {
        var keys = searchObject.split(',');
        var value = '';
        keys.forEach(k => {
          value += i[k] + ' ';
        })
        // console.log('value', value);
        return value.toLowerCase().includes(searchText);
      });
    } else {
      let result = items.filter((element) => {
        return element.toLowerCase().includes(searchText);
      }); 
      // console.log('result', result);
      return result;
    }
  }
}
