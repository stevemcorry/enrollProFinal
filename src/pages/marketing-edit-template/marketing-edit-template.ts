import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Events } from 'ionic-angular';
import { MarketService } from '../../services/market.service';
import { TextTemplatePage } from '../../shared/market-shared/text-template/text-template';
import { UserService } from '../../services/user.service';
import { EmailTemplatePage } from '../../shared/market-shared/email-template/email-template';

@IonicPage({
  name: 'page-marketing-edit-template'
})
@Component({
  selector: 'page-marketing-edit-template',
  templateUrl: 'marketing-edit-template.html',
  providers: [
    MarketService,
    UserService,
  ]
})
export class MarketingEditTemplatePage {

  @ViewChild(TextTemplatePage)textTemplatePage;
  @ViewChild(EmailTemplatePage)emailTemplatePage;
  advanced;
  date;
  time;
  option;
  OKTOTEXT;
  OKTOEMAIL;
  textData = [];
  text = '';
  customData;
  emailData = [];
  content;
  signature;
  template_type;
  template_type_name;
  name;
  followupAction = {
    id: 0,
    time: 0,
    notes: '',
    type: 'action'
  }
  followupEmail = {
    id: 0,
    time: 0,
    type: 'email',
    data: {},
    custom: '',
    content: '',
  }
  followupText = {
    id: 0,
    time: 0,
    type: 'text',
    data: '',
    custom: '',
    text: '',
  }
  one;
  two;
  three;
  preSetText;
  preSetEmail;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public viewCtrl: ViewController,
    public marketService: MarketService,
    public modalCtrl: ModalController,
    public userService: UserService,
    public events: Events,
  ) {
    this.events.subscribe('followupSaved', (data)=>{
      this.followupSaved(data)
    })

    this.option = params.get('option');
    if(this.option){
      this.name = this.option.name;
      this.template_type_name = this.option.template_type.name;
    } else{
      this.option = {
        id: 2
      }
    }
  }

  ionViewDidLoad() {
    this.getTemplate();
    this.verify();
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  nextPage(x){
    if(x == 1){
      this.navCtrl
      .push('page-choose-contacts', {
        content: this.textTemplatePage.text, 
        scheduled_at : this.getDate(),
        template_type: 1,
        followupEmail: {
          on: this.one,
          subject: this.preSetEmail ? this.preSetEmail.subject : this.followupEmail.data[0].header,
          content: this.getFollowupContent(),
          time: this.followupEmail.time
        },
        followupText: {
          on: this.two,
          content: this.preSetText ? this.preSetText : this.followupText.text,
          time: this.followupText.time
        },
      });
    } else {
      this.navCtrl
      .push('page-choose-contacts', {
        content: this.getEmailContent(),
        scheduled_at : this.getDate(),
        template_type: 2,
        followupEmail: {
          on: this.one,
          subject: this.preSetEmail ? this.preSetEmail.subject : this.followupEmail.data[0].header,
          content: this.getFollowupContent(),
          time: this.followupEmail.time
        },
        followupText: {
          on: this.two,
          content: this.preSetText ? this.preSetText : this.followupText.text,
          time: this.followupText.time
        },
      });
    }
  }
  getDate(){
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      mins = d.getMinutes();
    if(this.date){
      if(this.time){
        return this.date + ' ' + this.time;
      } else {
        return this.date + ' ' + hour + ':' + mins;
      }
    } else {
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      const date = [year, month, day].join('-') + ' ' + hour + ':' + mins;
      return date;
    }
  }
  getEmailContent(){
    let safe = this.emailTemplatePage.content
    .replace("{{ header }}", this.emailTemplatePage.subject ? this.emailTemplatePage.subject :' ')
    .replace("{{ body }}", this.emailTemplatePage.body ? this.emailTemplatePage.body :' ')
    .replace("{{ footer }}", this.emailTemplatePage.signature ? this.emailTemplatePage.signature :' ' );
    this.content = safe;
    return safe;
    //this.safeContent= this.sanitizer.bypassSecurityTrustHtml(safe);
  }
  getFollowupContent(){
    let safe = this.followupEmail.content
    .replace("{{ header }}", this.preSetEmail ? this.preSetEmail.subject : this.followupEmail.data[0].header)
    .replace("{{ body }}", this.preSetEmail ? this.preSetEmail.body : this.followupEmail.data[0].body)
    .replace("{{ footer }}", this.preSetEmail ? this.preSetEmail.signature : this.followupEmail.data[0].footer );
    this.content = safe;
    return safe;
  }
  verify(){
    this.userService.getUserInfo().subscribe(res=>{
      console.log(res,'user;')
      this.OKTOTEXT = res.data.bandwidth_phone;
      this.signature = res.data.signature;
    })
    this.userService.googleAuthCheck().subscribe(res=>{
      this.OKTOEMAIL = res;
    })
  }
  getTemplate(){
    this.marketService.getSpecificTemplate(this.option.id).subscribe(res=>{
      this.name = res.name;
      this.template_type = res.template_type.id;
      this.followupAction = {
        time: res.action_followup_hours,
        id: res.action_followup_id,
        notes: res.action_followup_notes,
        type: 'action'
      }
      this.followupEmail.id = res.email_followup_id;
      this.followupEmail.time = res.email_followup_hours;
      this.followupEmail.type = 'email';

      this.followupText.id = res.text_followup_id;
      this.followupText.time = res.text_followup_hours;
      this.followupText.type = 'text';

      this.followupEmailSet(res.email_followup_id)
      this.followupTextSet(res.text_followup_id)
      if(res.template_type.id == 1){
        this.formatText(res)
      } else {
        this.formatEmail(res)
      }
    })
  }
  formatEmail(res){
    console.log(res,'email')
    this.emailData = res.data;
    this.customData = res.data_custom;
    this.content = res.content;
  }
  formatText(res){
    this.textData = res.data
    this.customData = res.data_custom;
    this.text = res.data[0].body;
  }
  openFollowup(x){
    let modal = this.modalCtrl.create('page-followup', {
      'followup': x,
      'preSet': x.type == 'text' ? this.preSetText : this.preSetEmail
    })
    modal.present()
  }

  followupEmailSet(id){
    this.marketService.getSpecificTemplate(id).subscribe(res=>{
      this.followupEmail.data = res.data;
      this.followupEmail.custom = res.data_custom;
      this.followupEmail.content = res.content;
    })
  }
  followupTextSet(id){
    this.marketService.getSpecificTemplate(id).subscribe(res=>{
      this.followupText.data = res.data
      this.followupText.custom = res.data_custom;
      this.followupText.text = res.data[0].body;
    })
  }
  followupSaved(data){
    if(data.followup.type == 'text'){
      this.preSetText = data.preSet;
      this.two = true;
    } else {
      console.log(data,'emil')
      this.preSetEmail = data.preSet;
      this.one = true;
    }
  }

}
