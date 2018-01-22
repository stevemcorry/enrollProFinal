import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { ToggleFilter } from '../../pipes/toggle.filter';
import { ActionFilter } from '../../pipes/contact-action.filter';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    ContactPage,
    ToggleFilter,
    ActionFilter,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
