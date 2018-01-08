import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalVars } from '../app/globalvars';

import {StorageService} from '../services/storage.service'

@Injectable()
export class MarketService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
        public storage: StorageService
    ){
    }

    getScheduledJobs(){
        let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.get(this.globalVar.getApiUrl() + 'jobs/scheduled', {headers: authHeader})
        .map(data=>{
            return data.json();
        })
    }
    deleteScheduledJob(id){
      const authHeader = new Headers();
      authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
      return this.http.delete( this.globalVar.getApiUrl() + `jobs/scheduled/` + id, {headers: authHeader});
    }

}