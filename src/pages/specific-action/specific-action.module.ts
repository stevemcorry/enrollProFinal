import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificActionPage } from './specific-action';

@NgModule({
  declarations: [
    SpecificActionPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificActionPage),
  ],
})
export class SpecificActionPageModule {}
