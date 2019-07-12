import {Injectable} from '@angular/core'
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ApiUrls} from '../../../constants/apiUrls';

@Injectable({providedIn: 'root'})

export class HashService{

    constructor(
        private http:HttpClient
    ){}

    public getHashMap(url):Observable<any>{
        let tokenUrl = ApiUrls.HASH_MAP_URL;//"http://localhost:5678";//"http://10.240.2.76:5678"
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        let options  = {headers,responseType:'text' as 'json'};
        var requestJSON = 
        {
            "url": url
        }
    
        return this.http.post<any>(tokenUrl, requestJSON,options).pipe(                
            map(result => 
                {
                    return result;
                })
            , catchError(err => {
                console.log('An error occured on generating phash. Error Info: ' + JSON.stringify(err));
                return of(null);
            })
        );  
    }

}