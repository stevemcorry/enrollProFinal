import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ActionService } from '../../services/actions.service';
import { ContactService } from '../../services/contact.service';

@IonicPage({
  name: 'page-specific-action'
})
@Component({
  selector: 'page-specific-action',
  templateUrl: 'specific-action.html',
  providers: [ActionService, ContactService]
})
export class SpecificActionPage {

  action = {
    something: 2,
    id: 2,
    due_date: '',
    action_type: {id:0, name: ''},
    notes: '',
    contact: {
        name: "",
        id: 0
    }
};
  actionTime
  actionStyles = {
      "Call": false,
      "Meet": false,
      "Text": false,
      "Email": false
  }
  actionIds = {
      "Call": 3,
      "Meet": 4,
      "Text": 2,
      "Email": 1
  }
  contact;
  key;
  editActionOn;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public events: Events,
    public actionService: ActionService,
    public contactService: ContactService
  ) {
    this.action = params.get('action')
    this.actionTime = this.action.due_date.substring(11,16);
    this.action.due_date = this.action.due_date.substring(0,10)
    console.log(this.action, 'first')
  }
  dismiss(){
    this.navCtrl.pop()
  }
  getAction(id){
    this.actionService.getSpecificActions(id).subscribe(res=>{
        this.action.notes = res.notes;
        this.actionSet(res.action_type.name);
    })
    this.contactService.getSpecificContact(this.key, this.action.contact.id).subscribe(data=>{
        this.contact = data;
    })
  }
  actionSet(action){
      for(let key in this.actionStyles){
        this.actionStyles[key] = false;
      }
        this.actionStyles[action] = true;
        this.action.action_type.id = this.actionIds[action];
  }
  openContact(){
    this.navCtrl.push('ContactPage', {contact: this.contact});
  }
  saveAction(){
      let action = {
          action_type: this.action.action_type.id,
          due_date: this.action.due_date + " " + this.actionTime,
          notes: this.action.notes
      }
      console.log(action, 'action')
      this.actionService.completeAction(this.action.id, action).subscribe(res => {
        this.events.publish('actionAdded');
        this.dismiss()
      })
  }

  ionViewDidLoad() {
    this.getAction(this.action.id);
    console.log('ionViewDidLoad SpecificActionPage');
  }

}
