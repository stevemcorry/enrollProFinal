import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, AlertController, Events } from 'ionic-angular';
import { MessagingService } from '../../services/messaging.service';

@IonicPage({
  name: 'page-specific-message'
})
@Component({
  selector: 'page-specific-message',
  templateUrl: 'specific-message.html',
  providers: [MessagingService]
})
export class SpecificMessagePage {

  @ViewChild(Content) content: Content;
  timeout;
  noMessages = 'Loading...';
  messageId;
  messages = [];
  name = '';
  newText = '';
  contactNumber;
  resizeOn;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public viewCtrl: ViewController,
    public messageService: MessagingService,
    public alert: AlertController,
    public events: Events,
  ) {
  }

  ionViewDidLoad() {
    this.messageId = this.params.get('id');
    this.name = this.params.get('name');
    this.contactNumber = this.params.get('number')
    console.log(this.contactNumber,this.name,this.messageId)
    this.getMessages();
  }
  ionViewDidLeave(){
    clearTimeout(this.timeout)
  }

  dismiss() {
    clearTimeout(this.timeout);
    this.events.publish('messages');
    this.viewCtrl.dismiss();
  }
  getMessages(){
    clearTimeout(this.timeout);
      this.messageService.getMessages(this.messageId).subscribe(res => {
        console.log(res)
        this.messagesTimeout();
          if(res.length === 0){
            this.noMessages = 'No Messages';
          }
          if(this.messages.length >= res.length){
            return
          }
          this.messages = res;
          setTimeout(()=>{
            this.content.scrollToBottom();
          },10)
          })
  }
  messagesTimeout(){
    this.timeout = setTimeout(()=>{this.getMessages()}, 3000)
  }
  sendMessage(){
    let text = {
      to: this.contactNumber,
      text: this.newText
    }
    let push ={
      direction :"out",
      state : "sent",
      text : this.newText,
    }
    this.messages.push(push)
    this.newText = ''
    setTimeout(()=>{
      this.content.scrollToBottom();
    },10)
    this.messageService.sendText(text).subscribe(res => {
      this.getMessages();
    },error =>{
      let alert = this.alert.create({
        title: "The message wasn't sent, please try again"
      })
      alert.present()
    })
  }

}
