import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';



@IonicPage({
  name: 'page-signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthService]
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
    public authService: AuthService,
    public storageService: StorageService
  ) {
  }

  
  dismiss(){
    this.navCtrl.pop();
  }

  getKey(x){
    if(x.email && x.password){
        let user = {
            email: x.email,
            password: x.password,
        }
        this.authService.registerUser(user).subscribe(res => {
            console.log(res,'success')
            //this.getKey(user)
        }, error => {
            if(error){
                console.log(error, 'err')
                //this.getKey(user)
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
login(x){
    console.log('hrere')
    this.authService.passwordLogin(x.email, x.password).subscribe(res=>{
        if(res){   
        this.storageService.setToken(res.access_token);
        let key = res.access_token
        // this.getService.getUserInfo(key).subscribe(data => {
        //   if(data.data.training_flags.indexOf(1) != -1){
        //     //this.menuCtrl.swipeEnable(true);
        //     if(data.subscribed){
        //         //this.navCtrl.setRoot(Dashboard);
        //         this.navCtrl.setRoot('page-actions');
        //     } else {
        //         this.navCtrl.setRoot('page-actions');
        //     }
        // } else {
        //     //this.navCtrl.push(OnboardModal);
        //     this.navCtrl.setRoot('page-actions');
        // }
        // })
        }
    }, error => {
        console.log(error,'wrong')
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
