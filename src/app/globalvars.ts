import { Injectable }  from '@angular/core';

@Injectable()
export class GlobalVars{

    // getApiUrl(){
    //     return 'http://devapi.enroll.pro/api/'
    // }

    // getOauthUrl(){
    //     return 'http://devapi.enroll.pro/oauth/'
    // }

    // getClientSecret(){
    //     return 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2'
    // }
    getApiUrl(){
        return 'https://api.enroll.pro/api/'
    }

    getOauthUrl(){
        return 'https://api.enroll.pro/oauth/'
    }

    getClientSecret(){
        return 'CCy6ehO6n9syZlJtQIbIu4jU3PgmnExoij3SqVk5'
    }

    getClientId(){
        return 2;
    }
}