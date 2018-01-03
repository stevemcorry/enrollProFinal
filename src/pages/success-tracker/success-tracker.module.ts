import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessTrackerPage } from './success-tracker';

@NgModule({
  declarations: [
    SuccessTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessTrackerPage),
  ],
})
export class SuccessTrackerPageModule {}
