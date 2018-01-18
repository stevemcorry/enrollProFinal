import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailPreviewPage } from './email-preview';

@NgModule({
  declarations: [
    EmailPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailPreviewPage),
  ],
})
export class EmailPreviewPageModule {}
