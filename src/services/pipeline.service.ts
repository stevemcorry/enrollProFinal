import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { GlobalVars } from '../app/globalvars';

@Injectable()
export class PipelineService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar
    ){
    }

    getSpecificPipeline(id,key){
        let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.get(this.globalVar.getApiUrl() + 'pipelines/'+id, {headers: authHeader})
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