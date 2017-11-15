import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {

	constructor(private http: Http, private storage: Storage) {

	}

	setToken(token) {
		return new Promise((resolve, reject)=>{
			this.storage.set('token', token).then((data)=>{
				resolve(data);		
			}).catch((e)=>{
				reject(e)
			});
		})
	}

	getToken() {
		return this.storage.get('token');
	}

	setSubscribed(sub) {
		this.storage.set('subscribed', sub).then(()=>{});
	}

	getSubscribed() {
		this.storage.get('subscribed')
	}

}