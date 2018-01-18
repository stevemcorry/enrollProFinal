import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextTemplatePage } from './text-template';

@NgModule({
  declarations: [
    TextTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(TextTemplatePage),
  ],
})
export class TextTemplatePageModule {}
