import {Injectable, Inject} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {

	key

	constructor(
		private storage: Storage
	) {
		
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
		return this.storage.get('subscribed')
	}
	clearStorage(){
		this.storage.clear()
		localStorage.setItem('token','');
	}

}