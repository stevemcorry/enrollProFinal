import { Component } from '@angular/core';
import { IonicPage, ViewController, Events } from 'ionic-angular';

import { ContactService } from '../../services/contact.service';


@IonicPage({
  name: 'add-nameslist'
})
@Component({
  selector: 'page-add-nameslist',
  templateUrl: 'add-nameslist.html',
  providers: [
    ContactService
  ]
})
export class AddNameslistPage {

  nameslistContacts = [
    {first_name: '', last_name: '', role: 1},
    {first_name: '', last_name: '', role: 1},
    {first_name: '', last_name: '', role: 1},
    {first_name: '', last_name: '', role: 1},
    {first_name: '', last_name: '', role: 1},
]
  constructor(
    public viewCtrl: ViewController, 
    public events: Events,
    public contactService: ContactService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNameslistPage');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }

  nameslistAdd(){
      let allContacts = [];
      for(let contact of this.nameslistContacts){
          if(contact.first_name && contact.last_name){
              contact.role = 1;
              allContacts.push(contact);
          }
      }
      if(allContacts[0]){
          this.contactService.addContactArr(allContacts).subscribe(res=>{
              this.dismiss();
              this.events.publish('contactAdded');
              this.nameslistContacts = [{first_name: '', last_name: '', role : 1},];
          }, err=>{
              alert(err)
          })
      }
  }

}
