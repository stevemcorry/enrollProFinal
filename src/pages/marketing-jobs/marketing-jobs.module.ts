import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketingJobsPage } from './marketing-jobs';

@NgModule({
  declarations: [
    MarketingJobsPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketingJobsPage),
  ],
})
export class MarketingJobsPageModule {}
