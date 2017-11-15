import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GetProvider } from '../../providers/get/get';
import { PutProvider } from '../../providers/put/put';

@IonicPage({
  name: 'page-specific-action'
})
@Component({
  selector: 'page-specific-action',
  templateUrl: 'specific-action.html',
  providers: [GetProvider, PutProvider]
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
  currentKey;
  editActionOn;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public events: Events,
    public getService: GetProvider,
    public putService: PutProvider
  ) {
    this.action = params.get('action')
    this.actionTime = this.action.due_date.substring(11,16);
    this.action.due_date = this.action.due_date.substring(0,10)
    console.log(this.action, 'first')
    this.getService.getStorage().then(key => { this.currentKey = key})
  }
  dismiss(){
    this.navCtrl.pop()
  }
  getAction(id){
      this.getService.getStorage().then(key => {
          this.getService.getSpecificActions(key, id).subscribe(res=>{
              this.action.notes = res.notes;
              this.actionSet(res.action_type.name);
          })
          this.getService.getSpecificContact(key, this.action.contact.id).subscribe(data=>{
              this.contact = data;
          })
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
      this.putService.completeAction(this.currentKey, this.action.id, action).subscribe(res => {
        this.events.publish('actionAdded');
        this.dismiss()
      })
  }

  ionViewDidLoad() {
    this.getAction(this.action.id);
    console.log('ionViewDidLoad SpecificActionPage');
  }

}
