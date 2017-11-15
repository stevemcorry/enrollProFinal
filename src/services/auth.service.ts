import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';

@Injectable()
export class AuthService {

	envVar = {
	    apiUrl: 'http://devapi.enroll.pro',
	    client_secret: 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2',
	    client_id: 2,
	    environmentName: 'Production Environment',
	    ionicEnvName: 'prod'
	}

	constructor(private http: Http) {

	}

	passwordLogin(email, password) {
	    let user = {
	        "grant_type": "password",
	        "client_id": this.envVar.client_id,
	        "client_secret": this.envVar.client_secret,
	        "username": email,
	        "password": password,
	        "scope": ""
	    }

	    let headers:any = new Headers(
	    	{ 
	    		'Content-Type': 'application/x-www-form-urlencoded' 
	    	}
	    );

	    return this.http.post(this.envVar.apiUrl + '/oauth/token', user, headers)
	    .map((res) => res.json());
	}

	googleLogin(google, platform) {
      let user = {
	      'grant_type': 'custom_request',
	      'client_id': this.envVar.client_id,
	      'client_secret': this.envVar.client_secret,
	      'google': google,
	      'platform': platform,
	      'scope': ''
      };

      const headers:any = new Headers(
      	{ 
      		'Content-Type': 'application/x-www-form-urlencoded' 
      	}
      );

      return this.http.post( this.envVar.apiUrl + '/oauth/token', user, headers)
      .map(res => res.json());
  	}

}