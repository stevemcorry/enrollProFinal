import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';
import { GlobalVars } from '../app/globalvars';

@Injectable()
export class AuthService {

	constructor(
		private http: Http,
		@Inject(GlobalVars) public globalVar,
	) {

	}

	passwordLogin(email, password) {
	    let user = {
	        "grant_type": "password",
	        "client_id": this.globalVar.getClientId(),
	        "client_secret": this.globalVar.getClientSecret(),
	        "username": email,
	        "password": password,
	        "scope": ""
	    }

	    let headers:any = new Headers(
	    	{ 
	    		'Content-Type': 'application/x-www-form-urlencoded' 
	    	}
	    );

	    return this.http.post(this.globalVar.getOauthUrl() + 'token', user, headers)
	    .map((res) => res.json());
	}

	googleLogin(google, platform) {
      let user = {
	      'grant_type': 'custom_request',
	      'client_id': this.globalVar.getClientId(),
	      'client_secret': this.globalVar.getClientSecret(),
	      'google': google,
	      'platform': platform,
	      'scope': ''
      };

      const headers:any = new Headers(
      	{ 
      		'Content-Type': 'application/x-www-form-urlencoded' 
      	}
      );

      return this.http.post( this.globalVar.getOauthUrl() + 'token', user, headers)
      .map(res => res.json());
  	}

}