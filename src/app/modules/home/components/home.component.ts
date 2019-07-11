import { Component, OnInit, OnDestroy, ViewChild,ElementRef } from '@angular/core';
import { AuthenticationService } from '../../login/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { Client, createAccount, argString,argUint64 } from 'orbs-client-sdk/dist/index.es';
import { fileToHash } from '../../../utils/utils';
import {SearchResult,NewsItem,Author,RightsModel} from '../../../models/searchresult';

@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
    authTokenSubscription:Subscription;
    userInfo:SearchResult;
    newsItemInfo:NewsItem;
    @ViewChild('searchBox') searchBox: ElementRef;
    constructor( private authService:AuthenticationService
        , private userService:UserService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public imagePath;
    public file: any;
    imgURL: any;
    public message: string;
    account = createAccount();
    client = new Client('https://validator.orbs-test.com/vchains/6666', 6666, 'TEST_NET');

    width:number;
    height:number;
    preview(files) {
        if (files.length === 0)
            return;
        this.file = files[0];
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();

        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            var img = new Image();
            img.onload = () => {
                this.width = img.width;
                this.height = img.height;
            };
            img.src= reader.result.toString();
            this.imgURL = reader.result;
        }
    }
    async verify(searchText) {
        this.imgURL = searchText;
        var hash = fileToHash(this.file,this.width,this.height);
        console.log(this.file)
        console.log(this.width);
        console.log(this.height);
        console.log(hash);
        
       this.authTokenSubscription =  this.authService.getApiToken(searchText).subscribe(
        async result =>  {
            console.log('API token recieved ...' + JSON.stringify(result));

            if(result){
             /*   this.userService.getUserInfo().subscribe(
                    userData => {
                        console.log('user data recieved ... ' + JSON.stringify(userData));
                        this.userInfo = userData;
                    }
                );*/
                var q = this.client.createQuery(
                    this.account.publicKey,
                    'registry',
                    'verify',
                    [argString(result)]
                );
                var r =  await this.client.sendQuery(q)
                console.log(r)
                if(r.outputArguments.length>0){
                var newsItem = JSON.parse(r.outputArguments["0"].value);
                this.userInfo = new SearchResult();
                this.newsItemInfo= this.mapVerifyResult(newsItem);
                }
            }
        }
    );
    }

    async search(searchText) {
        this.imgURL = searchText;
        var hash = fileToHash(this.file,this.width,this.height);
      
        
       this.authTokenSubscription =  this.authService.getApiToken(searchText).subscribe(
        async result =>  {
            console.log('API token recieved ...' + JSON.stringify(result));

            if(result){
             /*   this.userService.getUserInfo().subscribe(
                    userData => {
                        console.log('user data recieved ... ' + JSON.stringify(userData));
                        this.userInfo = userData;
                    }
                );*/
                var q = this.client.createQuery(
                    this.account.publicKey,
                    'registry',
                    'search',
                    [argString(result),argUint64(25)]
                );
                var r =  await this.client.sendQuery(q)
                console.log(r)
                var newsItem = JSON.parse(r.outputArguments["0"].value);
                this.userInfo = new SearchResult();
                this.userInfo.contentRegistryItem= this.mapNewsResult(newsItem);
               
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