import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

//import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage({
  name: 'page-login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ AuthService, UserService, StorageService ]
})
export class LoginPage {


  user = {
    email: "",
    password: "",
    name: "",
    zip: ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public storageService: StorageService,
    public platform: Platform, 
    public menuCtrl: MenuController
    //private googlePlus: GooglePlus
  ) {
  }

  dismiss(){
    this.navCtrl.pop();
  }

  login(){
    if(this.user.email && this.user.password){
        this.authorize();
    } else if(!this.user.email){
        alert('Please enter a valid email')
    } else if(!this.user.password){
        alert('Please enter your password')
    } else {
        alert('Please Enter all the Information')
    }
  }

  authorize(){

    this.authService.passwordLogin(this.user.email, this.user.password).subscribe(res=>{  
        
        console.log(res);

        this.storageService.setToken(res).then(()=>{

          this.userService.getUser().subscribe(data => {
            console.log(data)
            if(data.data.training_flags.indexOf(1) != -1){
              this.menuCtrl.swipeEnable(true);
              if(data.subscribed){
                this.storageService.setSubscribed(true);
                //this.navCtrl.setRoot(Dashboard);
                this.navCtrl.setRoot('page-actions');
              } else {
                this.storageService.setSubscribed(false)
                this.navCtrl.setRoot('page-actions');
              }
            } else {
              //this.navCtrl.push(OnboardModal);
              this.navCtrl.setRoot('page-actions');
            }
          });
        });

    }, (error) => {
        console.log(error);
        alert('Incorrect Login Info')
    });
  }

  googleSignIn() {
    let webclientid = '';
    let platform = '';

    if (this.platform.is('ios')) {
      webclientid = '289591659240-gblkqvirsl7acljutgeh650u7t1rh56o.apps.googleusercontent.com';
      platform = 'ios';
    }

    if (this.platform.is('android')) {
      webclientid = '289591659240-3a3ql46rmul0ubml891jjdcltn0sagmp.apps.googleusercontent.com';
      platform = 'desktop';
    }

  //   this.googlePlus.login({
  //         'webClientId': webclientid,
  //         'offline': true
  //   }).then((obj) => {
  //       console.log("GOOGLE SIGNIN SUCCESS")
  //       console.log("ID TOKEN: " + obj.idToken);
  //       this.postService.googleLogin(obj.idToken, platform).subscribe(res => {
  //       //   this.menuCtrl.swipeEnable(true);
  //       //     console.log(res,'res')
  //       //     this.postService.store(res);
  //       //     this.getService.getUserInfo(res.access_token).subscribe(res => {
  //       //         if(res.data.training_flags.indexOf(20) != -1){
  //       //           if(res.subscribed){
  //       //               this.navCtrl.setRoot(Dashboard);
  //       //           } else {
  //       //               this.navCtrl.setRoot(Actions)
  //       //           }
  //       //         } else {
  //       //             this.navCtrl.push(OnboardModal);
  //       //             //this.navCtrl.setRoot(Actions);
  //       //         }
  //       //     })
  //       // }, (err) => {
  //       //     console.log("GOOGLE API ERROR", JSON.stringify(err));
  //       // })
  //   },err => {
  //       console.log("GOOGLE LOGIN ERROR");
  //       console.log('LOGIN ERROR', JSON.stringify(err))
  //       console.log(err);
  //   });
  // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
