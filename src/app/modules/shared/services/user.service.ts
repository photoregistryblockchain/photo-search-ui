import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {ApiUrls} from '../../../constants/apiUrls';
import {SearchResult,NewsItem,Author,RightsModel} from '../../../models/searchresult';

@Injectable({providedIn: 'root'})

export class UserService{
    constructor(
        private http: HttpClient
    ){}


    getUserInfo():Observable<any>{
        let userinfoUrl = ApiUrls.USER_INFO_URL;

        return this.http.get<any>(userinfoUrl).pipe(
            map(result => {
               //return result;
               const searchResult = new SearchResult();
               searchResult.contentRegistryItem = this.mapNewsResult(result);
               return searchResult;
            })
            ,
            catchError(err => {
              console.log(
                'An error occured on getting the User Info. Error Info: ' +
                  JSON.stringify(err)
              );
              return of(null);
            })
        );
    }
    mapNewsResult(newsResult): NewsItem[] {
        return newsResult.map((item, index) => {
            const newsItem = new NewsItem();
            newsItem.id = item.source.contentRegistryItem.id;
            newsItem.type = item.source.contentRegistryItem.type;
            newsItem.title = item.source.contentRegistryItem.title;
            newsItem.url = item.source.contentRegistryItem.url;
            newsItem.credit = item.source.contentRegistryItem.credit;
            newsItem.credit = item.source.contentRegistryItem.credit;
            newsItem.copyright = item.source.contentRegistryItem.copyright;
            newsItem.createdDateTime = item.source.contentRegistryItem.createdDateTime;
            newsItem.publishedDateTime = item.source.contentRegistryItem.publishedDateTime;
            newsItem.description = item.source.contentRegistryItem.description;
            const author = new Author();
            author.id= item.source.contentRegistryItem.author.id;
            author.name= item.source.contentRegistryItem.author.name;
            author.title= item.source.contentRegistryItem.author.title;
            newsItem.Author= author;
            const rights = new RightsModel();
            rights.id= item.source.contentRegistryItem.rightsModel.id;
            rights.name= item.source.contentRegistryItem.rightsModel.name;
            rights.restrictions= item.source.contentRegistryItem.rightsModel.restrictions;
            newsItem.rightsModel= rights;
            return newsItem;
        });
      }
    

}