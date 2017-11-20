import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ 
  name: 'contactOrder' 
})
export class ContactOrder implements PipeTransform{

  transform(array: Array<string>, args: string): Array<string> {
    if(array){
      array.sort((a:any, b:any) => {
        if(a.first_name){
          var nameA = a.first_name.toUpperCase();
          var nameB = b.first_name.toUpperCase();
        } else {
          var nameA = a.toUpperCase();
          var nameB = b.toUpperCase();
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      return array;
    }
  }
}