import { Http, Headers, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ContactService {

    envVar = {
        apiUrl: 'http://devapi.enroll.pro',
        client_secret: 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2',
        client_id: 2,
        environmentName: 'Production Environment',
        ionicEnvName: 'prod'
      }

    constructor(
        private http: Http,
    ){
    }
    getContacts(key){
            let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.envVar.apiUrl + '/api/contacts', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificContact(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.envVar.apiUrl + '/api/contacts/' + id, {headers: authHeader})
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
        return this.http.get(this.envVar.apiUrl + '/api/contacts/image/' + id, options)
        // let authHeader = new Headers();
        // authHeader.append('Authorization', 'Bearer '+ key);
        // return this.http.get(this.envVar.apiUrl + '/api/contacts/image/' + id, {headers: authHeader})
        // .map(data =>{ 
        //     return data;
        // })
    }
    getContactPosition(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.envVar.apiUrl + '/api/pipelines', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    addContact(key, contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.envVar.apiUrl + '/api/contacts', contact, { headers: authHeader})
        .map(res => res.json());
    }
    addContactArr(key, contact){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.envVar.apiUrl + '/api/contacts/multiple', contact, { headers: authHeader});
    }
    editContact(key, id, edit){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.envVar.apiUrl + '/api/contacts/' + id, edit, { headers: authHeader}).
        map(res => {
        });
    }
    deleteContact(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.envVar.apiUrl + '/api/contacts/' + id, { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
}