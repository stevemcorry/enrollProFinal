import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionsPage } from './actions';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ActionsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ActionsPage),
  ],
})
export class ActionsPageModule {}
