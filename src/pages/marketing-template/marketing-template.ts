import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MarketService } from '../../services/market.service';


@IonicPage({
  name: 'page-marketing-template'
})
@Component({
  selector: 'page-marketing-template',
  templateUrl: 'marketing-template.html',
  providers: [
    MarketService,
  ]
})
export class MarketingTemplatePage {

  market
  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public marketService: MarketService,
    public viewCtrl: ViewController,
  ) {
    this.market = params.get('market');
  }

  ionViewDidLoad() {
    this.getTemplates()
  }
  getTemplates(){
    this.marketService.getJobTemplates(this.market.id).subscribe((res)=>{
      console.log(res,'res')
        this.market = res;
    })
  }
  openModal(option){
      let method = option.template_type.id
      if(method == 2){
        this.navCtrl.push('page-marketing-edit-template', {option: option});
      }else if(method == 1){
          this.navCtrl.push('page-marketing-edit-template', {option: option});
      } else if(method == 3){
          //this.navCtrl.push(MarketDrip, {option: option});
      } else {
          //this.navCtrl.push(MarketSocial, {option: option});
      }
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }

}
