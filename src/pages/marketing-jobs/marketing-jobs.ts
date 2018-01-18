import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MarketService } from '../../services/market.service';

@IonicPage({
  name: 'page-marketing-jobs'
})
@Component({
  selector: 'page-marketing-jobs',
  templateUrl: 'marketing-jobs.html',
  providers: [
    MarketService
  ]
})
export class MarketingJobsPage {

  
  market = {
    name: '',
    templates: [],
    id: 0
  }
  safeimage = 'https://firebasestorage.googleapis.com/v0/b/crowd-control-bd4b8.appspot.com/o/Asset-136.png?alt=media&token=444e75f8-473f-4a09-9820-e25c17f3177b'
  safeIcon = 'https://firebasestorage.googleapis.com/v0/b/crowd-control-bd4b8.appspot.com/o/Asset%2038.png?alt=media&token=9b183e34-7bd5-4f37-aad9-1ee998f0c675'

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    public marketService: MarketService,
    public viewCtrl: ViewController,
  ) {
    this.market = params.get('market');
  }

  ionViewDidLoad() {
    this.getTemplates();
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  openModal(option){
      this.navCtrl.push('page-marketing-template', {market: option});
  }
  getTemplates(){
    if(!this.market.id){
      this.navCtrl.setRoot('page-marketing')
      return
    }
    this.marketService.getSpecificMarketCategory(this.market.id).subscribe((res)=>{
        this.market = res;
        console.log(res,'res')
        for(let x of res.jobs){
          this.getJobIcon(x)
          this.getJobThumbnail(x)
        }
    })
  }
  getJobThumbnail(job){
    this.marketService.getJobThumbnail(job.id).subscribe((res: any) => {
          job.image = URL.createObjectURL(res["_body"])
        },
        Error => {
          job.image = this.safeimage;
        })
  }
  getJobIcon(job){
    this.marketService.getJobIcon(job.id).subscribe((res: any) => {
      console.log()
      job.icon = URL.createObjectURL(res["_body"]);
    },
    error => {
      job.icon = this.safeIcon
    })
  }

}
