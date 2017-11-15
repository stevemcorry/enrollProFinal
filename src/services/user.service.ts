import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';

import { StorageService } from './storage.service';

@Injectable()
export class UserService {

	envVar = {
    	apiUrl: 'http://devapi.enroll.pro'
  	}

	constructor(private http: Http, private storage: Storage) {

	}

	getUser(){
    	let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + this.storage.getItem('token'));
        return this.http.get(this.envVar.apiUrl + '/api/user', {headers: authHeader})
        .map(data=>{
            return data.json();
        })
  	}

}