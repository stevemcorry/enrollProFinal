import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { ActionService } from '../../services/actions.service';

@IonicPage({
  name: 'page-recommended'
})
@Component({
  selector: 'page-recommended',
  templateUrl: 'recommended.html',
  providers: [ContactService, ActionService]
})
export class RecommendedPage {

  recommendations = [];
  contacts;
  actions = [
    {
      name: 'Email',
      id: 1
    },
    {
      name: 'Text',
      id: 2
    },
    {
      name: 'Call',
      id: 3
    },
    {
      name: 'Meet',
      id: 4
    }
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactService: ContactService,
    public actionsService: ActionService,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendedPage');
    this.getRecommendations()
  }
  getContacts(){this.contactService.getContacts().subscribe(res => {
    console.log(res,'contacts')
    this.contacts = res;
    this.getRecommendations();
    })
  }

  getRecommendations(){
    this.recommendations = [];
    for(let i = 1; i < 14; i++){
      if(i !== 10){
        this.getRecommendation(i)
      }
    }
  }
  getRecommendation(id){
    this.actionsService.getRecommendations(id).subscribe(res => {
      for(let recom of res){
          recom.action_type = this.actions[recom.action_type-1]
          this.recommendations.push(recom)
      }
  })
  }
  addRecommendedAction(action){
      let act = {
          action_type: action.action_type.id,
          contact: action.contact,
          contact_name: action.contact_name,
          notes: action.notes
      }
    this.navCtrl.push('page-add-action', {'recommendation': act});
  }
  openAlert(recom){
    console.log(recom,'ecom')
      let alert = this.alertCtrl.create({
          title: "Complete recommended task for " + recom.contact.first_name + "?",
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              },
              {
                  text: 'Save',
                  handler: () => {
                      recom.done = true;
                      this.addAction(recom);
                  }
              }
          ]
      })
      alert.present();
  }
  addAction(recom){
      var d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          const date = [year, month, day].join('-') + ' 23:59';
      let action = { 
          "action_type": recom.action_type.id,
          "contact": recom.contact.id,
          "due_date": date,
          "notes": recom.notes,
          "complete": 1,
          "recommended": 1
      }
      this.actionsService.addAction(action).subscribe(res => {
          this.finishRecommendation(recom)
      })
  }
  finishRecommendation(rec){
    let recom = {
      "contact_id": rec.contact.id,
      "recommended_actions_id": rec.recommended_actions_id      
  }
    this.actionsService.completeRecommendation(recom).subscribe(res=>{
      console.log(res)
      rec.delete = true;
    })
  }

}
