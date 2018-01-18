import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketService } from '../../services/market.service';

@IonicPage({
  name: 'page-marketing'
})
@Component({
  selector: 'page-marketing',
  templateUrl: 'marketing.html',
  providers: [MarketService]
})
export class MarketingPage {

  markets;
  safeimage = 'https://firebasestorage.googleapis.com/v0/b/crowd-control-bd4b8.appspot.com/o/Asset-136.png?alt=media&token=444e75f8-473f-4a09-9820-e25c17f3177b'
  safeIcon = 'https://firebasestorage.googleapis.com/v0/b/crowd-control-bd4b8.appspot.com/o/Asset%2038.png?alt=media&token=9b183e34-7bd5-4f37-aad9-1ee998f0c675'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public marketService: MarketService,
  ) {
  }

  ionViewDidLoad() {
    this.getMarkets();
  }
  getMarkets(){
    this.marketService.getMarketCategories().subscribe(res=>{
      this.markets = res;
      for (let job of this.markets) {
        this.getCategoryThumbnail(job)
        this.getCategoryIcon(job)
      }
    })
  }
  number(x){
    if(x > 5){
      return  10;
    } else {
      return x;
    }
  }
  getCategoryThumbnail(job){
    this.marketService.getCategoryThumbnail(job.id).subscribe((res: any) => {
          job.image = URL.createObjectURL(res["_body"])
        },
        Error => {
          job.image = this.safeimage;
        })
  }
  getCategoryIcon(job){
    this.marketService.getCategoryIcon(job.id).subscribe((res: any) => {
      console.log()
      job.icon = URL.createObjectURL(res["_body"]);
    },
    error => {
      job.icon = this.safeIcon
    })
  }
  openModal(market){
    this.navCtrl.push('page-marketing-jobs', {market: market});
  }

}
