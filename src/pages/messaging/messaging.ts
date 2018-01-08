import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { MessagingService } from '../../services/messaging.service';

@IonicPage({
  name: 'page-messaging'
})
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
  providers: [ContactService, MessagingService]
})
export class MessagingPage {

  contacts;
  messages = [];
  messagesLoading = 'Loading...';

  timer

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public messageService: MessagingService,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.events.subscribe('messages', ()=>{
      this.getMessageList();
    })
  }

  ionViewDidLoad() {
    //this.getContacts();
    //this.getMessageList();
  }
  ionViewWillLoad(){
    this.getContacts();
    this.getMessageList();
  }
  ionViewDidLeave() {
    console.log('left')
    clearTimeout(this.timer)
  }
  getContacts(){
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
    })
  }
  getMessageList(){
    clearTimeout(this.timer);
    this.messageService.getMessageList().subscribe(res=>{
      this.messages = res;
      !this.messages[0] ? this.messagesLoading = 'No Messages!' : this.messagesLoading = 'Loading...';
      this.timer = setTimeout(()=>{
        this.getMessageList();
      },3000);
    })
  }
  openAdd(){
    let alert = this.alertCtrl.create({
      title: 'New Message for:',
      buttons: [
        {
          text: 'New Message',
          handler: data => {
            if(!data){
              return
            }
            console.log(data, 'data');
            if(data.first_name && data.last_name){
              let name = data.first_name + ' ' + data.last_name
              let modal = this.navCtrl.push('page-specific-message', {
                id: data.id, 
                name: name,
                number: data.phone
              });
            }
          }
        }
      ]
    });
    for(let contact of this.contacts){
      alert.addInput({type: 'radio', label: contact.first_name + ' ' + contact.last_name, value: contact})
    }
    alert.present();
  }

  openMessages(message){
    console.log(message,'message')
    let name = message.first_name + ' ' + message.last_name
    let modal = this.navCtrl.push('page-specific-message', {
      id: message.id, name: name, number: message.number
    });
  }

}
