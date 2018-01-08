import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalVars } from '../app/globalvars';
import { StorageService } from './storage.service';

@Injectable()
export class MessagingService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
        private storage: StorageService,
    ){
    }

  getMessageList(){
    const authHeader = new Headers();
    authHeader.append('Authorization', `Bearer ` + this.storage.getToken());
    return this.http.get( this.globalVar.getApiUrl() + 'bandwidth/list', {headers: authHeader})
    .map(res=> res.json());
  }
  getMessages(id){
      let authHeader = new Headers();
      authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
      return this.http.get(this.globalVar.getApiUrl() + 'bandwidth/' + id, {headers: authHeader})
      .map(data=>{ return data.json(); })
  }
  sendText(text){
      let header = new Headers();
          header.append('Authorization', 'Bearer ' + this.storage.getToken());
      return this.http.post(this.globalVar.getApiUrl() + 'bandwidth', text, { headers: header});
  }
}