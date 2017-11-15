import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';

import { GlobalVars } from '../app/globalvars';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {


	constructor(
		private http: Http, 
		private storage: StorageService,
		@Inject(GlobalVars) public globalVar
	) {

	}

	getUser(){
		console.log(this.storage.getToken(), 'from user');
    	let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        return this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader})
        .map(data=>{
            return data.json();
        })
  	}

}