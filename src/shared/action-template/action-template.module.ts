import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionTemplatePage } from './action-template';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    ActionTemplatePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ActionTemplatePage),
  ],
})
export class ActionTemplatePageModule {}
