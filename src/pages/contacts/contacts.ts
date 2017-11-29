import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';


@IonicPage({
  name: 'page-contacts'
})
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  providers: [ContactService]
})
export class ContactsPage {


  contacts = [];
  contact;
  contactsLoading = "Loading..."
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public modalCtrl: ModalController
  ) {
  }

  getContacts(){
    this.contactService.getContacts().subscribe((res)=>{
        this.contacts = res;
        !this.contacts[0] ? this.contactsLoading = 'Please Add Contacts!':this.contactsLoading = 'Loading...';
    })
  }
  addContact(){
    let modal = this.modalCtrl.create('page-add-contact');
    modal.present();
  }
  addAction(){
    let modal = this.modalCtrl.create('page-add-action');
    modal.present();
  }
  openContact(contact){
    this.navCtrl.push('page-contact', {contact: contact})
  }
  closeFab(fab: FabContainer): void {
    if (fab !== undefined) {
      fab.close();
    }
  }
  deleteContact(id){
      console.log(id);
      this.contactService.deleteContact(id).subscribe(res=>{
          console.log(res,'Gone!'),
          this.getContacts();
      })
  }

  ionViewDidLoad() {
    this.getContacts();
  }

}
