import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MarketService } from '../../../services/market.service';

@IonicPage({
  name: 'page-text-template'
})
@Component({
  selector: 'page-text-template',
  templateUrl: 'text-template.html',
  providers: [
    MarketService,
  ]
})
export class TextTemplatePage implements OnInit {

  version1 = true;
  version2
  @Input()textData = [];
  @Input()id;
  @Input()custom = [];
  @Input()text = '';
  @Input()name = '';
  saveOn;
  openOn = true;
  saveAsOn;
  currentCustom;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public marketService: MarketService,
    public events: Events,
  ) {
    this.events.subscribe('customOption', (data)=>{
      console.log(data,'custom')
      this.currentCustom = data;
      this.text = data.body;
      this.saveOn = false;
      this.saveAsOn = false;
      this.version1 = false;
      this.version2 = false;
    })
  }
  ngOnInit(){
  }
  saveOnCheck(){
    if(this.version2 || this.version1){

    } else{
      this.saveOn = true;
    }
  }
  versionCheck(x){
    switch(x){
      case 'one':
        this.text = this.textData[0].body
        this.version1 = true;
        this.version2 = false;
        break;
      case 'two':
        this.text = this.textData[1].body
        this.version1 = false;
        this.version2 = true;
    }
  }
  openOptions(){
    let modal = this.modalCtrl.create('page-custom-market-templates',{
      options: this.custom,
      id: this.id,
      data: {
        header: '',
        body: this.text,
        footer: ''
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
        header: '',
        body: this.text,
        footer: ''
      }
    });
    modal.present();
  }

  saveOption(){
    let temp = [];
    for(let custom of this.custom){
      if(this.currentCustom.id == custom.id){
        custom.header = '',
        custom.body = this.text,
        custom.footer = '',
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

}
