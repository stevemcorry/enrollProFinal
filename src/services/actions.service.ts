import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ActionService {

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


    getSpecificActions(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.envVar.apiUrl + '/api/actions/' + id, {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }
    getActions(key){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            return this.http.get(this.envVar.apiUrl + '/api/actions', {headers: authHeader})
            .map(data=>{
                return data.json();
            })
    }

    addAction(key, action){
        action.due_date = action.due_date.slice(0,10);
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
        return this.http.post(this.envVar.apiUrl + '/api/actions', action, { headers: authHeader});
    }

    completeAction(key, id, action){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.put(this.envVar.apiUrl + '/api/actions/' + id, JSON.stringify(action), { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }

    deleteAction(key, id){
        let authHeader = new Headers();
            authHeader.append('Authorization', 'Bearer '+ key);
            authHeader.append('Content-Type','application/json')
        return this.http.delete(this.envVar.apiUrl + '/api/actions/' + id, { headers: authHeader})
        .map(res => console.log(res, 'put complete'));
    }
}
