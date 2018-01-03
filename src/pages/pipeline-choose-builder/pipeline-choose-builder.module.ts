import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipelineChooseBuilderPage } from './pipeline-choose-builder';

@NgModule({
  declarations: [
    PipelineChooseBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(PipelineChooseBuilderPage),
  ],
})
export class PipelineChooseBuilderPageModule {}
