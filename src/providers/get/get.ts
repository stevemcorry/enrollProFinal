import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetProvider {

  envVar = {
    apiUrl: 'http://devapi.enroll.pro'
  }

  constructor(
    public http: Http,
    public storage: Storage,
  ) {
    console.log('Hello GetProvider Provider');
  }

  getStorage(){
    return (this.storage.get('token').then((name) => {
    return name;
    }))
  }

  //User
  getUserInfo(key){
    let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.get(this.envVar.apiUrl + '/api/user', {headers: authHeader})
        .map(data=>{
            return data.json();
        })
  }

  //Actions
  getActions(key){
    let authHeader = new Headers();
    authHeader.append('Authorization', 'Bearer '+ key);
    return this.http.get(this.envVar.apiUrl + '/api/actions', {headers: authHeader})
    .map(data=>{
        return data.json();
    })
  }
  getSpecificActions(key, id){
      let authHeader = new Headers();
          authHeader.append('Authorization', 'Bearer '+ key);
          return this.http.get(this.envVar.apiUrl + '/api/actions/' + id, {headers: authHeader})
          .map(data=>{
              return data.json();
          })
  }


  //Contacts
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

}
