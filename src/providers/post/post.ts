import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostProvider {

  envVar = {
    apiUrl: 'http://devapi.enroll.pro',
    client_secret: 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2',
    client_id: 2,
    environmentName: 'Production Environment',
    ionicEnvName: 'prod'
  }

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello PostProvider Provider');
  }
  //User login

  registerUser(user){
    let headers:any = new Headers({'Content-Type': "application/json"})
    return this.http.post(this.envVar.apiUrl + '/api/register', user, headers);
  }
  requestOAuth(x) {
    let user = {
        "grant_type": "password",
        "client_id": this.envVar.client_id,
        "client_secret": this.envVar.client_secret,
        "username": x.email,
        "password": x.password,
        "scope": ""
    }
    let headers:any = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.envVar.apiUrl + '/oauth/token', user, headers)
    .map((res) => res.json());
  }
  googleLogin(google, platform) {
      const user = {
      'grant_type': 'custom_request',
      'client_id': this.envVar.client_id,
      'client_secret': this.envVar.client_secret,
      'google': google,
      'platform': platform,
      'scope': ''
      };
      const headers:any = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      return this.http.post( this.envVar.apiUrl + '/oauth/token', user, headers)
      .map(res => res.json());
  }

store(user){
  this.storage.set('token', user.access_token).then(() => {});
}

}
