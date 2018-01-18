import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contactOnFilter'
})

export class ContactOnFilter implements PipeTransform {

    transform(values: any, term: any): any {
        if(term === undefined) return values;
        if(term > 0){
          return values.filter((value: any) => {
              return (value.on)
          })
        } else{
          return values.filter((value: any) => {
              return (!value.on) 
          })
        }
    }

}