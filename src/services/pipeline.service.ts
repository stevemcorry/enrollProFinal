import { Http, Headers, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PipelineService {

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

    getSpecificPipeline(id,key){
        let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.get(this.envVar.apiUrl + '/api/pipelines/'+id, {headers: authHeader})
        .map(data=>{
            return data.json();
        })
    } 
    getNextPipelinePage(token, url){
        const authHeader = new Headers();
        authHeader.append('Authorization', `Bearer ${token}`);
        return this.http.get( url, {headers: authHeader})
        .map(data =>  {
            return data.json()
        });
    }
}