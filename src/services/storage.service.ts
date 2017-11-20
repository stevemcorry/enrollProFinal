import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {

	key

	constructor(private http: Http, private storage: Storage) {
		
	}

	setToken(token) {
		localStorage.setItem('token', token.access_token)
	}

	getToken() {
		return localStorage.getItem('token');
	}

	setSubscribed(sub) {
		this.storage.set('subscribed', sub).then(()=>{});
	}

	getSubscribed() {
		this.storage.get('subscribed')
	}

}