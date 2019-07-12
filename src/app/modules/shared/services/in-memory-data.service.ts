import { InMemoryDbService } from 'angular-in-memory-web-api';
import {UserData} from '../../../mock-data/user-data';

export class InMemoryDataService implements InMemoryDbService {
    createDb() { 
        const userinfo = UserData;
        return {
            userinfo
        };
    }
}