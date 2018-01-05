import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActionPage } from './add-action';
//filters
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    AddActionPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AddActionPage),
  ],
})
export class AddActionPageModule {}
