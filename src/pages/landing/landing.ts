import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'page-landing'
})
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage{

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);
  }

  login(){
    this.navCtrl.push('page-login')
  }
  getStarted(){
      this.navCtrl.push('page-signup');
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
  }

}
