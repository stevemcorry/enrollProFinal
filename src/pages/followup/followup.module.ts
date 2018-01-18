import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupPage } from './followup';
import { SharedMarketModule } from '../../shared/shared-market.module';

@NgModule({
  declarations: [
    FollowupPage,
  ],
  imports: [
    SharedMarketModule,
    IonicPageModule.forChild(FollowupPage),
  ],
})
export class FollowupPageModule {}
