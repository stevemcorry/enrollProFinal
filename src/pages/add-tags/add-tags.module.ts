import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTagsPage } from './add-tags';

@NgModule({
  declarations: [
    AddTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTagsPage),
  ],
})
export class AddTagsPageModule {}
