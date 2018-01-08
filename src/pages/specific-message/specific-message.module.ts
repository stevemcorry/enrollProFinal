import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificMessagePage } from './specific-message';

@NgModule({
  declarations: [
    SpecificMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificMessagePage),
  ],
})
export class SpecificMessagePageModule {}
