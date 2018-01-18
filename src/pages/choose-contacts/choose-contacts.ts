import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { MarketService } from '../../services/market.service';

@IonicPage({
  name: 'page-choose-contacts'
})
@Component({
  selector: 'page-choose-contacts',
  templateUrl: 'choose-contacts.html',
  providers: [
    ContactService,
    MarketService,
  ]
})
export class ChooseContactsPage {

  contacts = [];
  contactArr = [];
  customerOn = false;
  builderOn = false;
  sharerOn = false;
  content;
  scheduledDate;
  template_type;
  sendOr = 'Send';
  onFilter = 1;
  offFilter = -1;
  tags;
  followupEmail;
  followupText;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public viewCtrl: ViewController,
    public contactService: ContactService,
    public alertCtrl: AlertController,
    public marketService: MarketService
  ) {
    this.content = params.get('content');
    this.scheduledDate = params.get('scheduled_at');
    this.template_type = params.get('template_type');
    this.followupEmail = params.get('followupEmail')
    this.followupText = params.get('followupText')
    if(this.scheduledDate){
      this.sendOr = 'Schedule';
    }
  }

  ionViewDidLoad() {
    this.getContacts()
    this.getTags();
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  getContacts(){
    this.contactService.getContacts().subscribe((res)=>{
      for(let cont of res){
        if(this.template_type == 1){
          if(!cont.phone){
            cont.off = true;
          }
        } else if(this.template_type == 2) {
          if(cont.email){
            cont.off = true;
          }
        }
      }
      this.contacts = res;
    })
  }
  getTags(){
    this.contactService.getTags().subscribe(res=>{
      this.tags = res;
    })
  }
  setContacts(cont){
    setTimeout(()=>{
      this.onFilter += 1;
      this.offFilter -= 1; 
    },200)
    if(cont.off){
      this.infoAlert()
      return
    }
    cont.on = !cont.on;
    let id = cont.id,
      on = cont.on;
      if(on){
        if(this.contactArr.indexOf(id) == -1){
          this.contactArr.push(id)
        }
      } else {
        if(this.contactArr.indexOf(id) !== -1){
          this.contactArr.splice(this.contactArr.indexOf(id) ,1)
        }
      }
  }
  infoAlert(){
    let alert = this.alertCtrl.create({
      title: "Contact must have a valid email address or phone number.",
      buttons: [{
        text: 'Ok'
      }]
    })
    alert.present();
  }
  changeRole(role){
    switch(role){
      case 'customerOn': 
        this.customerOn = !this.customerOn;
        this.addRoleArray(2, this.customerOn)
        break;
      case 'builderOn': 
        this.builderOn = !this.builderOn;
        this.addRoleArray(1, this.builderOn)
        break;
      case 'sharerOn': 
        this.sharerOn = !this.sharerOn;
        this.addRoleArray(3, this.sharerOn)
        break;
    }
  }
  setContactsArray(id, on){
    setTimeout(()=>{
      this.onFilter += 1;
      this.offFilter -= 1; 
    },200)
    for(let x of id){
      if(on){
        if(this.contactArr.indexOf(x) == -1){
          for(let z of this.contacts){
            if(z.id == x){
              z.on = true;
            }
          }
          this.contactArr.push(x)
        }
      } else {
        if(this.contactArr.indexOf(x) !== -1){
          for(let z of this.contacts){
            if(z.id == x){
              z.on = false;
            }
          }
          this.contactArr.splice(this.contactArr.indexOf(x) ,1)
        }
      }
    }
  }
  addRoleArray(id, on){
    setTimeout(()=>{
      this.onFilter += 1;
      this.offFilter -= 1; 
    },200)
    for(let cust of this.contacts){
      if(cust.role == id){
        if(on){
          if(this.contactArr.indexOf(cust.id) == -1){
            if(!cust.off){
              this.contactArr.push(cust.id)
              cust.on = true;
            }
          }
        } else {
          this.contactArr.splice(this.contactArr.indexOf(cust.id))
          cust.on = false;
        }
      }
    }
  }
  send(){
    if(!this.contactArr[0]){
      let alert = this.alertCtrl.create({
        title: 'Please select a contact.'
      })
      alert.present();
      return;
    }
    let alert = this.alertCtrl.create({
        title: 'Send',
        subTitle: 'Ready to send to ' + this.contactArr.length + ' contacts?',
        buttons: [
          {
              text: 'Cancel',
          },
          {
            text: 'Save',
            handler: data => {
              let job = {
                "template_type": this.template_type,
                "to": this.contactArr,
                "subject": "hey there",
                "content": this.content,
                "scheduled_at": this.scheduledDate
              }
              this.sendFollowupEmail();
              this.sendFollowupText();
              this.marketService.scheduleJob(job).subscribe(res => {
                  console.log(res, 'job sent')
              })
              //this.viewCtrl.dismiss();
              this.navCtrl.popToRoot();
            }
          }
        ]
    })
    alert.present();
  }
  sendFollowupEmail(){
    if(!this.followupEmail.on){return}
    let date = new Date(this.scheduledDate);
    date.setHours(date.getHours() + this.followupEmail.time);
    let year = date.getFullYear(),
      month:any = (date.getMonth() + 1),
      day:any = date.getDate(),
      hours = date.getHours(),
      mins = date.getMinutes();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      let d = year + '-' + month + '-' + day + ' ' + hours + ':' + mins;
    let job = {
      "template_type": 2,
      "to": this.contactArr,
      "subject": this.followupEmail.subject,
      "content": this.followupEmail.content,
      "scheduled_at": d
    }
    this.marketService.scheduleJob(job).subscribe(res => {
        console.log(res, 'job sent')
    })
  }
  sendFollowupText(){
    if(!this.followupText.on){return}
    let date = new Date(this.scheduledDate);
    date.setHours(date.getHours() + this.followupText.time);
    let year = date.getFullYear(),
      month:any = (date.getMonth() + 1),
      day:any = date.getDate(),
      hours = date.getHours(),
      mins = date.getMinutes();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      let d = year + '-' + month + '-' + day + ' ' + hours + ':' + mins;
    let job = {
      "template_type": 1,
      "to": this.contactArr,
      "subject": "text",
      "content": this.followupText.content,
      "scheduled_at": d
    }
    this.marketService.scheduleJob(job).subscribe(res => {
        console.log(res, 'job sent')
    })
    
  }

}
