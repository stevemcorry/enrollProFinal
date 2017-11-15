import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PostProvider } from '../../providers/post/post';
import { GetProvider } from '../../providers/get/get';


@IonicPage({
  name: 'page-signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [PostProvider, GetProvider]
})
export class SignupPage {

  user = {
    email: "",
    password: "",
    name: "",
    zip: ""
}
token;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public getService: GetProvider,
    public postService: PostProvider,
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
        this.postService.registerUser(user).subscribe(res => {
            this.getKey(user)
        }, error => {
            if(error){
                console.log(error, 'err')
                this.getKey(user)
            }
        })
    } else if(!x.email){
        alert('Please enter a valid email')
    } else if(!x.password){
        alert('Please enter your password')
    } else {
        alert('Please Enter all the Information')
    }
}
getKey(x){
console.log('hrere')
this.postService.requestOAuth(x).subscribe(res=>{
        console.log(res);
        if(res){   
        this.postService.store(res);
        let key = res.access_token
        this.getService.getUserInfo(key).subscribe(data => {
          if(data.data.training_flags.indexOf(1) != -1){
            //this.menuCtrl.swipeEnable(true);
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
        console.log(error,'wrong')
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
