import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketingEditTemplatePage } from './marketing-edit-template';
import { SharedMarketModule } from '../../shared/shared-market.module';

@NgModule({
  declarations: [
    MarketingEditTemplatePage,
  ],
  imports: [
    SharedMarketModule,
    IonicPageModule.forChild(MarketingEditTemplatePage),
  ],
})
export class MarketingTemplatePageModule {}
