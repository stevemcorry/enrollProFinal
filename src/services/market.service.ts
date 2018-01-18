import { Http, Headers, ResponseContentType } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
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
    getMarketCategories(){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'marketingcategories', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getCategoryThumbnail(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        var options = {
            headers: authHeader,
            responseType: ResponseContentType.Blob
        }
        return this.http.get( this.globalVar.getApiUrl() + 'marketingcategories/' + id + '/thumbnail', options).catch((err) => {
          return Observable.throw(err)
      })
    }
    getCategoryIcon(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        var options = {
            headers: authHeader,
            responseType: ResponseContentType.Blob
        }
        return this.http.get( this.globalVar.getApiUrl() + 'marketingcategories/' + id + '/icon', options).catch((err) => {
          return Observable.throw(err)
      })
    }
    getSpecificMarketCategory(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'marketingcategories/'+ id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getJobThumbnail(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        var options = {
            headers: authHeader,
            responseType: ResponseContentType.Blob
        }
        return this.http.get(this.globalVar.getApiUrl() + 'jobs/' + id + '/thumbnail', options)
    }
    getJobIcon(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        var options = {
            headers: authHeader,
            responseType: ResponseContentType.Blob
        }
        return this.http.get(this.globalVar.getApiUrl() + 'jobs/' + id + '/icon', options)
    }
    getJobTemplates(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'jobs/' + id , {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getSpecificTemplate(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'jobs/templates/' + id , {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    scheduleJob(job){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.post( this.globalVar.getApiUrl() + 'jobs/scheduled', job, { headers: authHeader});
    }
    updateJob(id, job) {
      const authHeader = new Headers();
      authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
      return this.http.put( this.globalVar.getApiUrl() + `jobs/templates/`+ id+`/data`, job, {headers: authHeader});
    }
    deleteScheduledJob(id){
      const authHeader = new Headers();
      authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
      return this.http.delete( this.globalVar.getApiUrl() + `jobs/scheduled/` + id, {headers: authHeader});
    }

}