import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { MarketService } from '../../../services/market.service';


@IonicPage({
  name: 'page-email-template'
})
@Component({
  selector: 'page-email-template',
  templateUrl: 'email-template.html',
  providers: [
    MarketService,
  ]
})
export class EmailTemplatePage implements OnInit {

  @Input()data;
  @Input()id;
  @Input()custom;
  @Input()name;
  @Input()signature;
  @Input()content;
  
  subject;
  body;
  version1 = true;
  version2;
  openOn = true;
  saveOn;
  saveAsOn;
  currentCustom

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public marketService: MarketService,
    public events: Events
  ) {
    this.events.subscribe('customOption', (data)=>{
      console.log(data,'custom')
      this.currentCustom = data;
      this.body = data.body;
      this.subject = data.header;
      this.saveOn = false;
      this.saveAsOn = false;
      this.version1 = false;
      this.version2 = false;
    })
  }
  ngOnInit(){
    console.log('EmailTemplatePage', this.data, this.custom);
    this.subject = this.data[0].header
    this.body = this.data[0].body
  }
  saveOnCheck(){
    if(this.version2 || this.version1){

    } else{
      this.saveOn = true;
    }
  }
  versionCheck(x){
    this.currentCustom = '';
    switch(x){
      case 'one':
        this.subject = this.data[0].header
        this.body = this.data[0].body
        this.version1 = true;
        this.version2 = false;
        break;
      case 'two':
        this.subject = this.data[1].header
        this.body = this.data[1].body
        this.version1 = false;
        this.version2 = true;
    }
  }
  openOptions(){
    let modal = this.modalCtrl.create('page-custom-market-templates',{
      options: this.custom,
      id: this.id,
      data: {
        header: this.subject,
        body: this.body,
        footer: this.signature
      }
    });
    modal.present();
  }
  openSaveAs(){
    if(!this.saveAsOn){return}
    let modal = this.modalCtrl.create('page-custom-market-templates',{
      id: this.id,
      save: true, 
      options: this.custom,
      data: {
        header: this.subject,
        body: this.body,
        footer: this.signature,
      }
    });
    modal.present();
  }
  saveOption(){
    let temp = [];
    for(let custom of this.custom){
      if(this.currentCustom.id == custom.id){
        custom.header = this.subject,
        custom.body = this.body,
        custom.footer = this.signature,
        custom.text = this.currentCustom.text
      }
      custom.on = false;
      temp.push(custom);
    }
    this.custom = temp;
    this.marketService.updateJob(this.id, this.custom).subscribe(res=>{
      this.saveOn = false;
      this.saveAsOn = false;
    }, err=>{
      console.log('Something Is Wrong', err)
    })
  }
  preview(){
    let modal = this.modalCtrl.create('page-email-preview', {
      content: this.content,
      subject: this.subject,
      body: this.body,
      signature: this.signature,
    })
    modal.present();
  }

}
