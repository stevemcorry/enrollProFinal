import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';


import { ContactOrder } from './../pipes/contact-order.filter';
import { ContactFilter } from '../pipes/contact.filter';
import { ActionFilterPipe } from '../pipes/action-filter';
import { ActionOrder } from '../pipes/action-order.filter';
import { RecommendedFilter } from '../pipes/recommended.filter';
import { TimeFormatFilter } from '../pipes/time.filter';
import { ContactOnFilter } from '../pipes/contact-on.filter';
import { ScheduledOrder } from '../pipes/scheduled.filter';


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
        ContactOnFilter,
        ScheduledOrder,
    ],
    providers: [
    ],
    exports: [
        ContactOrder,
        ContactFilter,
        ContactOnFilter,
        ActionFilterPipe,
        ActionOrder,
        RecommendedFilter,
        TimeFormatFilter,
        ScheduledOrder,
    ]
})
export class SharedModule {}