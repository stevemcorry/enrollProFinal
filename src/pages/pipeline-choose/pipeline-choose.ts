import { Component, OnInit } from '@angular/core';
import { ViewController, Events, IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'page-pipeline-choose'
})
@Component({
  selector: 'pipeline-choose',
  templateUrl: 'pipeline-choose.html'
})
export class PipelineChoose implements OnInit {
  constructor(public viewCtrl: ViewController, public events: Events) {
  }  
  dismiss(){
      this.viewCtrl.dismiss();
  }
  leadsPipe(){
      this.events.publish('leadsPipe');
      this.viewCtrl.dismiss();
  }
  enrollmentsPipe(){
      this.events.publish('enrollmentsPipe');
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

  ngOnInit() {
  }

}