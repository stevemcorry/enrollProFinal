import { Http, Headers, ResponseContentType } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { GlobalVars } from '../app/globalvars';

@Injectable()
export class ContactService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
    ){
    }
    getContacts(key){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.globalVar.getApiUrl() + 'contacts', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificContact(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.globalVar.getApiUrl() + 'contacts/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getContactImage(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + key);
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
    getContactPosition(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.globalVar.getApiUrl() + 'pipelines', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    addContact(key, contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.globalVar.getApiUrl() + 'contacts', contact, { headers: authHeader})
        .map(res => res.json());
    }
    addContactArr(key, contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.globalVar.getApiUrl() + 'contacts/multiple', contact, { headers: authHeader});
    }
    editContact(key, id, edit){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.globalVar.getApiUrl() + 'contacts/' + id, edit, { headers: authHeader}).
        map(res => {
        });
    }
    deleteContact(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.globalVar.getApiUrl() + 'contacts/' + id, { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
}