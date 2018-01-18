import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-action-template',
  templateUrl: 'action-template.html',
})
export class ActionTemplatePage {

  newAction = {
    action_type: "",
    notes: "",
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionTemplatePage');
  }

}
