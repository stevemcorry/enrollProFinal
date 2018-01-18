import { Http, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalVars } from '../app/globalvars';

import {StorageService} from '../services/storage.service'

@Injectable()
export class ContactService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
        public storage: StorageService
    ){
    }
    getContacts(){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'contacts', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificContact(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'contacts/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getContactImage(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        var options = {
            headers: authHeader,
            responseType: ResponseContentType.Blob
        }
        return this.http.get(this.globalVar.getApiUrl() + 'contacts/image/' + id, options)
        // let authHeader = new Headers();
        // authHeader.append('Authorization', 'Bearer '+ key);
        // return this.http.get(this.envVar.apiUrl + 'contacts/image/' + id, {headers: authHeader})
        // .map(data =>{ 
        //     return data;
        // })
    }
    getContactPosition(){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'pipelines', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getTags(){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'contacts/tags', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    addContact(contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.post(this.globalVar.getApiUrl() + 'contacts', contact, { headers: authHeader})
        .map(res => res.json());
    }
    addContactArr(contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.post(this.globalVar.getApiUrl() + 'contacts/multiple', contact, { headers: authHeader});
    }
    editContact(id, edit){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.globalVar.getApiUrl() + 'contacts/' + id, edit, { headers: authHeader}).
        map(res => {
        });
    }
    deleteContact(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.globalVar.getApiUrl() + 'contacts', new RequestOptions({
            headers: authHeader,
            body: id
         }))
    }
}