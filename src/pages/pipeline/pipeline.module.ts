import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipelinePage } from './pipeline';

@NgModule({
  declarations: [
    PipelinePage,
  ],
  imports: [
    IonicPageModule.forChild(PipelinePage),
  ],
})
export class PipelinePageModule {}
