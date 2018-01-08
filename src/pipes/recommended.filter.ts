import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recomFilter',
})
export class RecommendedFilter implements PipeTransform {
  
  transform(values: any, term: any): any {
    if(!values[0]) return values;
    return values.filter(value => {
      console.log(value)
      return (value.delete !== true)
    })
  }
}
