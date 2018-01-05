import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { ActionService } from '../../services/actions.service'

@IonicPage({
  name: 'page-add-action'
})
@Component({
  selector: 'page-add-action',
  templateUrl: 'add-action.html',
  providers: [ContactService, ActionService]
})
export class AddActionPage {

  key;
  contacts;
  newAction = {
      action_type: "",
      contact: "",
      due_date:<any> new Date().toISOString(),
      notes: "",
  };
  emailOn;
  textOn;
  meetOn;
  callOn;
  newActionTime;
  recommendation;
  selectedName;
  contact

  constructor(
    public navCtrl: NavController, 
    public nav: NavParams,
    public viewCtrl: ViewController,
    public contactService: ContactService,
    public actionService: ActionService,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.recommendation = nav.get('recommendation');
    if(this.recommendation){
      console.log(this.recommendation,'recomended params')
      if(this.recommendation.action_type === 1){
          this.emailOn = true;
      } else if(this.recommendation.action_type === 2){
          this.textOn = true;
      } else if(this.recommendation.action_type === 3){
          this.callOn = true;
      } else if(this.recommendation.action_type === 4){
          this.meetOn = true;
      }
      this.newAction.action_type = this.recommendation.action_type;
      this.newAction.contact = this.recommendation.contact.id;
      this.selectedName = this.recommendation.contact.first_name + ' ' + this.recommendation.contact.last_name;
      this.newAction.notes = this.recommendation.notes;
    }
    this.contact = nav.get('contact')
    if(this.contact){
        this.newAction.contact = this.contact.id
        this.selectedName = this.contact.first_name + ' ' + this.contact.last_name
    }
    console.log(this.contact)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddActionPage');
    this.getContacts();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getContacts(){
    this.contactService.getContacts().subscribe((res)=>{
        this.contacts = res;
    })
  }

  addAction(){
      if(this.newAction.due_date && this.newAction.notes && this.newAction.action_type && this.newAction.contact){
          this.newAction.due_date = this.newAction.due_date + ' ' +this.newActionTime;
          this.actionService.addAction(this.newAction).subscribe((res) => {
              this.events.publish('actionAdded',[]);
              this.dismiss();
          });
      } else {
          if(!this.newAction.action_type){
              let alert = this.alertCtrl.create();
              alert.setTitle('Please select an task type. (Call, Text, Email, Meet)')
              alert.addButton('OK');
              alert.present();
            } else if(!this.newAction.contact){
                let alert = this.alertCtrl.create();
                alert.setTitle('Please select a contact.')
                alert.addButton('OK');
                alert.present();
            } else if(!this.newAction.notes){
                let alert = this.alertCtrl.create();
                alert.setTitle('Please add a note for the task.')
                alert.addButton('OK');
                alert.present();
            } else{
                let alert = this.alertCtrl.create();
                alert.setTitle('Please enter a date.')
                alert.addButton('OK');
                alert.present();
            }
      }
  }

}
