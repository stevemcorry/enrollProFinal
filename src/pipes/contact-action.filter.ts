import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactActionFilter',
})
export class ActionFilter implements PipeTransform {
  
  transform(values: any, term: any): any {
    if(term === undefined || values === undefined) return values;
    return values.filter(value => {
        return (value.complete == term)
    })
}
}
