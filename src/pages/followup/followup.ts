import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { MarketService } from '../../services/market.service';
import { TextTemplatePage } from '../../shared/market-shared/text-template/text-template';
import { EmailTemplatePage } from '../../shared/market-shared/email-template/email-template';


@IonicPage({
  name: 'page-followup'
})
@Component({
  selector: 'page-followup',
  templateUrl: 'followup.html',
  providers: [
    MarketService,
  ]
})
export class FollowupPage {

  @ViewChild(TextTemplatePage)textTemplatePage;
  @ViewChild(EmailTemplatePage)emailTemplatePage;
  followup
  name
  textData = [];
  text;
  emailData;
  customData;
  content;
  template_type;
  preSet;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public marketService: MarketService,
    public events: Events
  ) {
    this.followup = this.navParams.get('followup');
    this.preSet = this.navParams.get('preSet');
    if(this.preSet){
      if(this.followup.type == 'text'){
        setTimeout(()=>{
          this.textTemplatePage.text = this.preSet;
        },40)
      } else {
        setTimeout(()=>{
          this.emailTemplatePage.subject = this.preSet.subject;
          this.emailTemplatePage.body = this.preSet.body;
          this.emailTemplatePage.signature = this.preSet.signature;
        },40)
      }
    }
  }
  ionViewDidLoad() {
    //this.getTemplate();

  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  save(){
    if(this.followup.type == 'text'){
      this.followup.text = this.textTemplatePage.text;
      this.followup.custom = this.textTemplatePage.custom;
      this.preSet = this.textTemplatePage.text;
    } else {
      this.followup.custom = this.emailTemplatePage.custom;
      this.preSet = {
        subject: this.emailTemplatePage.subject,
        body: this.emailTemplatePage.body,
        signature: this.emailTemplatePage.signature
      };
    }
    console.log(this.followup, 'saved')
    this.events.publish('followupSaved', {
      followup: this.followup,
      preSet: this.preSet
    })
    this.dismiss();
  }
}
