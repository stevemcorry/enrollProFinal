import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';

import { Contacts } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  providers: [
    Contacts
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
