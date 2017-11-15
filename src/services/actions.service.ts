import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { GlobalVars } from '../app/globalvars';

@Injectable()
export class ActionService {


    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar
    ){

    }


    getSpecificActions(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.globalVar.getApiUrl() + 'actions/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getActions(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.globalVar.getApiUrl() + 'actions', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }

    addAction(key, action){
        action.due_date = action.due_date.slice(0,10);
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.globalVar.getApiUrl() + 'actions', action, { headers: authHeader});
    }

    completeAction(key, id, action){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.globalVar.getApiUrl() + 'actions/' + id, JSON.stringify(action), { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }

    deleteAction(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.globalVar.getApiUrl() + 'actions/' + id, { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
}
