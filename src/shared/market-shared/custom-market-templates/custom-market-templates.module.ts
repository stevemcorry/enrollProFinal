import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomMarketTemplatesPage } from './custom-market-templates';

@NgModule({
  declarations: [
    CustomMarketTemplatesPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomMarketTemplatesPage),
  ],
})
export class CustomMarketTemplatesPageModule {}
