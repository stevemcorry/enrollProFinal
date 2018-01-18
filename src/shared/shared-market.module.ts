import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { TextTemplatePage } from './market-shared/text-template/text-template';
import { EmailTemplatePage } from './market-shared/email-template/email-template';
import { ActionTemplatePage } from './action-template/action-template';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TextTemplatePage,
        EmailTemplatePage,
        ActionTemplatePage,
    ],
    exports: [
        TextTemplatePage,
        EmailTemplatePage,
        ActionTemplatePage,
    ]
})
export class SharedMarketModule {}