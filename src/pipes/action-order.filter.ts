import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ 
  name: 'orderAction' 
})
export class ActionOrder implements PipeTransform{

  transform(array: Array<string>, args: string): Array<string> {
    if(!array){ return}
    if(args === 'pipeline'){
      array = array.sort((a:any, b:any) => {
        a = a.contact.actions_status;
        b = b.contact.actions_status;
        return b - a;
      })
      return array;
    }
    if(array){
      array = array.sort((a:any, b:any) => {
        a = new Date(a.due_date);
        b = new Date(b.due_date);
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      })
      return array;
    }
  }
}