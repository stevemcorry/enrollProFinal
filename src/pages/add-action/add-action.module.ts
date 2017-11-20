import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActionPage } from './add-action';
//filters
import { ContactFilter } from '../../pipes/contact.filter';
import { ContactOrder } from '../../pipes/contact-order.filter';
@NgModule({
  declarations: [
    AddActionPage,
    ContactFilter,
    ContactOrder,
  ],
  imports: [
    IonicPageModule.forChild(AddActionPage),
  ],
})
export class AddActionPageModule {}
