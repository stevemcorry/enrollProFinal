import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ActionFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'actionFilter',
})
export class ActionFilterPipe implements PipeTransform {
  
  transform(values: any, term: any): any {
    if(term === undefined || values === undefined) return values;
    return values.filter(value => {
        return (value.complete == term)
    })
}
}
