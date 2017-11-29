import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from './../services/storage.service'

@Component({
  templateUrl: 'app.html',
  providers: [StorageService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public storage: StorageService,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Actions', component: 'page-actions' },
      { title: 'Pipeline', component: 'page-pipeline'},
      { title: 'Contacts', component: 'page-contacts'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      let token = this.storage.getToken();
      console.log(token, 'token')
      if(token){
        this.checkTraining();
      } else {
        this.rootPage = 'page-landing';
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  checkTraining(){
    this.rootPage = 'page-actions';
    this.splashScreen.hide();
  }
}
