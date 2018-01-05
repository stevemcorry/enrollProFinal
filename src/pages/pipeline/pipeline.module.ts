import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipelinePage } from './pipeline';
import { PipeFilter } from '../../pipes/pipe.filter';

@NgModule({
  declarations: [
    PipelinePage,
    PipeFilter,
  ],
  imports: [
    IonicPageModule.forChild(PipelinePage),
  ],
})
export class PipelinePageModule {}
