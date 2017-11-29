import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsPage } from './contacts';
import { ContactOrder } from '../../pipes/contact-order.filter';
import { ContactFilter } from '../../pipes/contact.filter'

@NgModule({
  declarations: [
    ContactsPage,
    ContactFilter,
    ContactOrder
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
  ],
})
export class ContactsPageModule {}
