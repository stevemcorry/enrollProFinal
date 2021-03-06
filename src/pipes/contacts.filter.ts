import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contactsFilter'
})

export class ContactsFilter implements PipeTransform {

    transform(values: any, term: any): any {
        if(term === undefined) return values;
        term = term.toLowerCase();
        return values.filter(value => {
            let name = value.first_name + ' ' + value.last_name;
            return (name.toLowerCase().indexOf(term) != -1);
        })
    }

}