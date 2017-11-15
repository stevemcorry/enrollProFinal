import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionsPage } from './actions';

import { ActionFilterPipe } from '../../pipes/action-filter'

@NgModule({
  declarations: [
    ActionsPage,
    ActionFilterPipe
  ],
  imports: [
    IonicPageModule.forChild(ActionsPage),
  ],
})
export class ActionsPageModule {}
