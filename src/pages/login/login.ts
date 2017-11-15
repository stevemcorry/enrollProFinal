import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post';
import { GetProvider } from '../../providers/get/get';

//import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage({
  name: 'page-login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [PostProvider, GetProvider]
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
    public getService: GetProvider,
    public postService: PostProvider,
    public platform: Platform, 
    public menuCtrl: MenuController
    //private googlePlus: GooglePlus
  ) {
  }

  dismiss(){
    this.navCtrl.pop();
  }

  login(x){
    if(x.email && x.password){
        let user = {
            email: x.email,
            password: x.password,
        }
        this.getKey(user)
    } else if(!x.email){
        alert('Please enter a valid email')
    } else if(!x.password){
        alert('Please enter your password')
    } else {
        alert('Please Enter all the Information')
    }
  }
  getKey(x){
  this.postService.requestOAuth(x).subscribe(res=>{
    if(res){   
    this.postService.store(res);
    this.getService.getUserInfo(res.access_token).subscribe(data => {
      console.log(data)
            if(data.data.training_flags.indexOf(1) != -1){
                this.menuCtrl.swipeEnable(true);
                if(data.subscribed){
                    //this.navCtrl.setRoot(Dashboard);
                    this.navCtrl.setRoot('page-actions');
                } else {
                    this.navCtrl.setRoot('page-actions');
                }
            } else {
                //this.navCtrl.push(OnboardModal);
                this.navCtrl.setRoot('page-actions');
            }
        })
    }
    }, error => {
        if(error){
            alert('Incorrect Login Info')
        }
    })
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
