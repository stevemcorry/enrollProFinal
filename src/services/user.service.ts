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

		return new Promise((resolve, reject) => {

			this.storage.getToken().then((data) => {

				let authHeader = new Headers();

				authHeader.append('Authorization', 'Bearer ' + data.access_token);

				this.http.get(this.globalVar.getApiUrl() + 'user', {headers: authHeader}).toPromise().then((data) => {
		            resolve(data.json());
		        }).catch((e) => {
		        	reject(e);
		        });

			});

		});
        
  	}

}