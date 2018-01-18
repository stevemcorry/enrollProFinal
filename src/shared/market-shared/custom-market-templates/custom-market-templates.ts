import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { MarketService } from '../../../services/market.service';

@IonicPage({
  name: 'page-custom-market-templates'
})
@Component({
  selector: 'page-custom-market-templates',
  templateUrl: 'custom-market-templates.html',
  providers: [
    MarketService,
  ]
})
export class CustomMarketTemplatesPage {

  options = [];
  saveCheck;
  customName = '';
  id;
  data;

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
    public marketService: MarketService,
  ) {
    this.options = params.get('options')
    this.saveCheck = params.get('save')
    this.id = params.get('id');
    this.data = params.get('data')
  }

  ionViewDidLoad() {
    console.log(this.id, this.data, 'CustomMarketTemplatesPage');
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  open(option){
    console.log(this.saveCheck)
    this.customName = '';
    if(this.saveCheck){
      this.optionOn(option)
      return
    }
    this.events.publish('customOption', option);
    this.dismiss();
  }
  currentCustom
  optionOn(option){
    for(let opt of this.options){
      opt.on = false;
    }
    option.on = true;
    this.currentCustom = option;
  }
  save(){
    //this.events.publish('followupSaved', this.followup)
    this.dismiss();
  }
  optionsOff(){
    for(let opt of this.options){
      opt.on = false;
    }
  }

  updateCustom(on){
    let temp = [];
    if(this.customName){
      let neww:any = {
        header: this.data.header,
        body: this.data.body,
        footer: this.data.footer,
        id: this.options.length + 1,
        text: this.customName
      }
      this.currentCustom = neww;
      this.options.push(neww);
    }
    for(let custom of this.options){
      if(custom.on){
        custom.header = this.data.header,
        custom.body = this.data.body,
        custom.footer = this.data.footer,
        custom.text = this.currentCustom.text
        this.currentCustom = custom;
      }
      custom.on = false;
      temp.push(custom);
    }
    this.options = temp;
    this.marketService.updateJob(this.id, this.options).subscribe(res=>{
      this.events.publish('customOption', this.currentCustom)
      this.dismiss()
    }, err=>{
      console.log('Something Is Wrong', err)
    })
  }

}
