import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, FabContainer, Events } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { StorageService } from '../../services/storage.service';


@IonicPage({
  name: 'page-contacts'
})
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  providers: [
    ContactService,
    StorageService,
  ]
})
export class ContactsPage {


  contacts = [];
  contact;
  contactsLoading = "Loading..."
  subscribed;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public storageService: StorageService,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.storageService.getSubscribed().then(res=>{
     this.subscribed = res;
     console.log(res)
    })
    this.events.subscribe('contactAdded', ()=>{
      this.getContacts();
    })
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
      id = [id];
      this.contactService.deleteContact(id).subscribe(res=>{
          console.log(res,'Gone!'),
          this.getContacts();
      })
  }

  ionViewDidLoad() {
    this.getContacts();
  }

}
