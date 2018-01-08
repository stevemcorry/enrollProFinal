import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';


import { ContactOrder } from './../pipes/contact-order.filter';
import { ContactFilter } from '../pipes/contact.filter';
import { ActionFilterPipe } from '../pipes/action-filter';
import { ActionOrder } from '../pipes/action-order.filter';
import { RecommendedFilter } from '../pipes/recommended.filter';
import { TimeFormatFilter } from '../pipes/time.filter';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ContactOrder,
        ContactFilter,
        ActionFilterPipe,
        ActionOrder,
        RecommendedFilter,
        TimeFormatFilter,
    ],
    providers: [
    ],
    exports: [
        ContactOrder,
        ContactFilter,
        ActionFilterPipe,
        ActionOrder,
        RecommendedFilter,
        TimeFormatFilter,
    ]
})
export class SharedModule {}