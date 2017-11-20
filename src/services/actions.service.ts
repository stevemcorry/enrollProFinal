import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalVars } from '../app/globalvars';
import { StorageService } from './storage.service';

@Injectable()
export class ActionService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
        private storage: StorageService
    ){

    }


    getSpecificActions(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            return this.http.get(this.globalVar.getApiUrl() + 'actions/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getActions(){
            let authHeader = new Headers();
                authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
                return this.http.get(this.globalVar.getApiUrl() + 'actions', {headers: authHeader})
                .map(data=>{
                    return data.json();
                });

    }

    addAction(action){
        action.due_date = action.due_date.slice(0,10);
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.post(this.globalVar.getApiUrl() + 'actions', action, { headers: authHeader});
    }

    completeAction(id, action){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.globalVar.getApiUrl() + 'actions/' + id, JSON.stringify(action), { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }

    deleteAction(id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.globalVar.getApiUrl() + 'actions/' + id, { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
}
