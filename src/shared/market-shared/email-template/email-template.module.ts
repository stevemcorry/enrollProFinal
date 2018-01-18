import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailTemplatePage } from './email-template';


@NgModule({
  declarations: [
    EmailTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(EmailTemplatePage),
  ]
})
export class EmailTemplatePageModule {}
