import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name: 'page-pipeline'
})
@Component({
  selector: 'page-pipeline',
  templateUrl: 'pipeline.html',
})
export class PipelinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PipelinePage');
  }

}
