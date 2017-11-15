import { Injectable }  from '@angular/core';

@Injectable()
export class GlobalVars{

    getApiUrl(){
        return 'http://devapi.enroll.pro/api/'
    }

    getOauthUrl(){
        return 'http://devapi.enroll.pro/oauth/'
    }

    getClientSecret(){
        return 'KNEYH2qOB2ZPEPWbUGzkBuaqyLUQFysvUgpgjBu2'
    }

    getClientId(){
        return 2;
    }
}