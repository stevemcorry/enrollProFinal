import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNameslistPage } from './add-nameslist';

@NgModule({
  declarations: [
    AddNameslistPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNameslistPage),
  ],
})
export class AddNameslistPageModule {}
