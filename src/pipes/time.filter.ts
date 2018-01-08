import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})

export class TimeFormatFilter implements PipeTransform {

    transform(value: any): any {
        if(value === undefined) return value;
        let time = value.slice(11,16)
        let date = value,
        today = new Date().toDateString().substring(0,10);
        date = new Date(date).toDateString().substring(0,10);
        if(date != today){
            return date;
        }
        if(time.slice(0,2) == '12'){
          let hour = time.slice(0,2);
          let mins = time.slice(2,5);
          time = hour + mins + ' PM';
        }else if(time >= '12'){
          let hour = time.slice(0,2) - 12;
          let mins = time.slice(2,5);
          time = hour + mins + ' PM';
        } else if(time < '01:00') {
          let hour = 12;
          let mins = time.slice(2,5);
          time = hour + mins + ' AM';
        } else {
          time = time + ' AM'
        }
        value = date + ' ' + time;
        return time;
    }

}