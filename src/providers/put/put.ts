import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the PutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PutProvider {


  envVar = {
    apiUrl: 'http://devapi.enroll.pro',
    client_secret: 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2',
    client_id: 2,
    environmentName: 'Production Environment',
    ionicEnvName: 'prod'
  }
  
  constructor(public http: Http) {
    console.log('Hello PutProvider Provider');
  }

  completeAction(key, id, action){
    let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ key);
        authHeader.append('Content-Type','application/json')
    return this.http.put(this.envVar.apiUrl + '/api/actions/' + id, JSON.stringify(action), { headers: authHeader})
    .map(res => console.log(res, 'put complete'));
}

}
