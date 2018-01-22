import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ 
  name: 'orderScheduled' 
})
export class ScheduledOrder implements PipeTransform{

  transform(array: Array<string>, args: string): Array<string> {
    if(array){
      array = array.sort((a:any, b:any) => {
        a = new Date(a.scheduled_at);
        b = new Date(b.scheduled_at);
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