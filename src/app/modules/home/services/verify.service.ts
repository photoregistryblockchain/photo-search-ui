import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ApiUrls} from '../../../constants/apiUrls';

@Injectable({providedIn: 'root'})

export class VerificationService{

    constructor(
        private http:HttpClient
    ){}

    verify(hashmap:string):Observable<any>{
        let tokenUrl = ApiUrls.VERIFY_URL;

        return this.http.get<any>(tokenUrl).pipe(
            map(result => {
                return result;
            })
            ,
            catchError(err => {
              console.log(
                'An error occured on getting the API Token. Error Info: ' +
                  JSON.stringify(err)
              );
              return of(null);
            })
        );
    }

}