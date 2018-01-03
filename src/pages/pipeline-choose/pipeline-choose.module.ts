import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipelineChoose } from './pipeline-choose';

@NgModule({
  declarations: [
    PipelineChoose,
  ],
  imports: [
    IonicPageModule.forChild(PipelineChoose),
  ],
})
export class PipelineChoosePageModule {}
