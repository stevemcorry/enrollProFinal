import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagingPage } from './messaging';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MessagingPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MessagingPage),
  ],
})
export class MessagingPageModule {}
