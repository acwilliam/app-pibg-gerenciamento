import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupby'
})
export class GroupbyPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    const groupedObj = array.reduce((prev, cur) => {
      const date = new Date(cur.data);
      const month = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      if (!prev[month]) {
        prev[month] = [];
      }
      prev[month].push(cur);
      return prev;
    }, {});

    return Object.keys(groupedObj).map(key => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      value: groupedObj[key]
    }));
  }
}
