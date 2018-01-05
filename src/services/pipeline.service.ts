import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalVars } from '../app/globalvars';
import { StorageService } from './storage.service';

@Injectable()
export class PipelineService {



  public allSlides = [
    {name: "Imported", contacts: [], next_page_url: '', id: 1},
    {name: "Nameslist", contacts: [], next_page_url: '', id: 2},
    {name: "Top 45", contacts: [], next_page_url: '', id: 3},
    {name: "Exposed", contacts: [], next_page_url: '', id: 4},
    {name: "Committed", contacts: [], next_page_url: '', id: 5},
    {name: "Attended", contacts: [], next_page_url: '', id: 6},
    {name: "Enrolled", contacts: [], next_page_url: '', id: 7},
    {name: "Lifestyle Overview", contacts: [], next_page_url:'', id: 8},
    {name: "Business Overview", contacts: [], next_page_url: '', id: 9},
    {name: "Empty", contacts: [], next_page_url: '', id: 10},
    {name: "Launch To Elite", contacts: [], next_page_url: '', id: 11},
    {name: "Support and Education", contacts: [], next_page_url: '', id: 12},
    {name: "Interested", contacts: [], next_page_url: '', id: 13},
  ];
    constructor(
        private http: Http,
        @Inject(GlobalVars) public globalVar,
        private storage: StorageService,
    ){
    }

    getSpecificPipeline(id){
        let authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer '+ this.storage.getToken());
        return this.http.get(this.globalVar.getApiUrl() + 'pipelines/'+id, {headers: authHeader})
        .map(data=>{
            return data.json();
        })
    } 
    getNextPipelinePage(url){
        const authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + this.storage.getToken());
        return this.http.get( url, {headers: authHeader})
        .map(data =>  {
            return data.json()
        });
    }
}