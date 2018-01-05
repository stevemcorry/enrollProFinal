import {Pipe} from '@angular/core';

@Pipe({ 
  name: 'pipeFilter' 
})
export class PipeFilter{

  transform(array: any, args: any): any {
    if(array){
        if(args.pipe == 'Customer'){
            return array.filter(val =>{
                return (val.role.name == 'Customer' || args.id <= 7);
            })
        } else if (args) {
            return array.filter(val =>{
                return (val.role.name != 'Customer' || args.id <= 7 || args.id == 9);
            })
        } else {
            return array
        }
    }
  }
}