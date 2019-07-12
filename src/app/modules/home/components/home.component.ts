import { Component, OnInit, OnDestroy, ViewChild,ElementRef } from '@angular/core';
import { HashService } from '../services/hash.service';
import { Client, createAccount, argString,argUint64 } from 'orbs-client-sdk/dist/index.es';
import {SearchResult,NewsItem,Author,RightsModel} from '../../../models/searchresult';
import {ApiUrls} from '../../../constants/apiUrls';
@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
    searchResultInfo:SearchResult;
    verifiedNewsItemInfo:NewsItem;
    @ViewChild('searchBox') searchBox: ElementRef;
    constructor( private hashService:HashService) {}
    ngOnInit() {}
    ngOnDestroy() {}
    imgURL: any;
    public message: string;
    account = createAccount();
    client = new Client(ApiUrls.VERIFY_SEARCH_URL, 6666, 'TEST_NET');
    async verify(searchText) {
       this.imgURL = searchText;
       this.hashService.getHashMap(searchText).subscribe(
        async result =>  {
            console.log('Hash Map recieved ...' + result);
            if(result){
                var verifyQuery = this.client.createQuery(
                    this.account.publicKey,
                    'registry',
                    'verify',
                    [argString(result)]
                );
                var verifyResults =  await this.client.sendQuery(verifyQuery)
                console.log(verifyResults)
                if(verifyResults.outputArguments.length>0){
                var verifiedNewsItem = JSON.parse(verifyResults.outputArguments["0"].value);
                this.verifiedNewsItemInfo= this.mapVerifyResult(verifiedNewsItem);
                }
            }
        }
    );
    }

    async search(searchText) {
       this.imgURL = searchText;
       this.hashService.getHashMap(searchText).subscribe(
        async result =>  {
            console.log('Hash Map recieved ...' + JSON.stringify(result));
            if(result){
                var searchQuery = this.client.createQuery(
                    this.account.publicKey,
                    'registry',
                    'search',
                    [argString(result),argUint64(25)]
                );
                var searchResult =  await this.client.sendQuery(searchQuery);
                console.log("searchResult "+ searchResult);
                var searchResultItem = JSON.parse(searchResult.outputArguments["0"].value);
                this.searchResultInfo = new SearchResult();
                this.searchResultInfo.contentRegistryItem= this.mapNewsResult(searchResultItem);
               
            }
        }
    );
    }
mapNewsResult(newsResult): NewsItem[] {
        return newsResult.map((item, index) => {
            const newsItem = new NewsItem();
            newsItem.id = item.source.id;
            newsItem.type = item.source.type;
            newsItem.title = item.source.title;
            newsItem.url = item.source.url;
            newsItem.credit = item.source.credit;
            newsItem.credit = item.source.credit;
            newsItem.copyright = item.source.copyright;
            newsItem.createdDateTime = item.source.createdDateTime;
            newsItem.publishedDateTime = item.source.publishedDateTime;
            newsItem.description = item.source.description;
            const author = new Author();
            author.id= item.source.author.id;
            author.name= item.source.author.name;
            author.title= item.source.author.title;
            newsItem.Author= author;
            return newsItem;
        });
      }

      mapVerifyResult(item): NewsItem {
          console.log(item);
            const newsItem = new NewsItem();
            newsItem.id = item.id;
            newsItem.type = item.type;
            newsItem.title = item.title;
            newsItem.url = item.url;
            newsItem.credit = item.credit;
            newsItem.credit = item.credit;
            newsItem.copyright = item.copyright;
            newsItem.createdDateTime = item.createdDateTime;
            newsItem.publishedDateTime = item.publishedDateTime;
            newsItem.description = item.description;
            const author = new Author();
            author.id= item.author.id;
            author.name= item.author.name;
            author.title= item.author.title;
            newsItem.Author= author;
            return newsItem;
      }
}