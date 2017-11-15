import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {

	constructor(private http: Http, private storage: Storage) {

	}

	storeToken(token) {
		this.storage.set('token', token).then(() => {});
	}

	getToken() {
		return this.storage.get('token');
	}

}