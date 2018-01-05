import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './contacts';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ContactsPage),
  ],
})
export class ContactsPageModule {}
