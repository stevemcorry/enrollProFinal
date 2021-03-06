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

		let authHeader = new Headers();

		authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());

		return this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader})
        
	}
	getUserInfo(){
		let authHeader = new Headers();
		authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
		return this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader}).map(data =>{
			return data.json();
		})
	}
	getGmailAuth(){
		let authHeader = new Headers();
		authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
		return this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader}).map(data =>{
			return data.json().data.bandwidth_phone;
		})
	}
	getTextAuth(){
		let authHeader = new Headers();
		authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
		return this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader}).map(data =>{
			return data.json().data.bandwidth_phone;
		})
	}
    googleAuthCheck(){
        const authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        return this.http.get( this.globalVar.getApiUrl() + `google/authorized`, {headers: authHeader})
        .map(res => res.json().authorized);
    }

}