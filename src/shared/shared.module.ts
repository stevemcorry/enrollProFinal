import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';


import { ContactOrder } from './../pipes/contact-order.filter';
import { ContactFilter } from '../pipes/contact.filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ContactOrder,
        ContactFilter
    ],
    providers: [
    ],
    exports: [
        ContactOrder,
        ContactFilter
    ]
})
export class SharedModule {}