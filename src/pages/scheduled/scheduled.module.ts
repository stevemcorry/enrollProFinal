import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduledPage } from './scheduled';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ScheduledPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ScheduledPage),
  ],
})
export class ScheduledPageModule {}
