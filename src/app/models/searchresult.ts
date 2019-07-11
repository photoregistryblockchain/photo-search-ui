export class SearchResult{
    contentRegistryItem: NewsItem[];
}
export class NewsItem {
    id:string;
    type: string;
    title: string;
    Author: Author;
    url: string;
    credit: string;
    copyright: string;
    createdDateTime: Date;
    publishedDateTime:Date;
    description:string;
    rightsModel:RightsModel;
}
export class Author {
    name: string;
    title: string;
    id: string;
    
  }
  export class RightsModel {
    name: string;
    restrictions: string;
    id: string;
    
  }