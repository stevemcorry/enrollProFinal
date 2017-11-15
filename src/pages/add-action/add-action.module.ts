import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActionPage } from './add-action';

@NgModule({
  declarations: [
    AddActionPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActionPage),
  ],
})
export class AddActionPageModule {}
