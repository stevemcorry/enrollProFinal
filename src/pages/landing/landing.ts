import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'page-landing'
})
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
  }

  login(){
    this.navCtrl.push('page-login')
  }
  getStarted(){
      this.navCtrl.push('page-signup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
