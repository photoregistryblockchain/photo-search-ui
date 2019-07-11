import { InMemoryDbService } from 'angular-in-memory-web-api';

import {TokenData} from '../../../mock-data/token-data';
import {UserData} from '../../../mock-data/user-data';
import {verifydata} from '../../../mock-data/verify-data';

export class InMemoryDataService implements InMemoryDbService {
    createDb() { 

        const apitoken = TokenData;
        const userinfo = UserData;
        const verifyInfo = verifydata;
        return {
            apitoken
            , userinfo
            , verifyInfo
        };
    }
}