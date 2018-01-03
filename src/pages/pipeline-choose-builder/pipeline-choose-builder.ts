import { Component, OnInit } from '@angular/core';
import { ViewController, Events, IonicPage } from 'ionic-angular';

/**
 * Generated class for the PipelineChooseBuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'pipeline-choose-builder'
})
@Component({
  selector: 'page-pipeline-choose-builder',
  templateUrl: 'pipeline-choose-builder.html',
})
export class PipelineChooseBuilderPage {

  constructor(
    public viewCtrl: ViewController, 
    public events: Events
  ) {
  }  
  dismiss(){
      this.viewCtrl.dismiss();
  }
  customerPipe(){
      this.events.publish('customerPipe');
      this.viewCtrl.dismiss();
  }
  builderPipe(){
      this.events.publish('builderPipe');
      this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
  }

}
