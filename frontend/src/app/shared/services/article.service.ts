import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends DataService {
  baseURL:string='http://127.0.0.1:8000/api/articles';
  constructor(private httpclient:HttpClient ) {
    super('http://127.0.0.1:8000/api/articles',httpclient);

  }
  findArticleById(id:number){
    return this.httpclient.get(this.baseURL+'/user/'+id)
    .pipe(map((res)=>res));
  }

}
