import {Pipe} from '@angular/core';

@Pipe({ 
  name: 'toggleFilter' 
})
export class ToggleFilter{

  transform(array: any, args: string): any {
    if(array){
        if(!args){
            return array.filter(val =>{
                return (val.id <= 3)
            })
        } else {
            return array
        }
    }
  }
}