import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseContactsPage } from './choose-contacts';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ChooseContactsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChooseContactsPage),
  ],
})
export class ChooseContactsPageModule {}
