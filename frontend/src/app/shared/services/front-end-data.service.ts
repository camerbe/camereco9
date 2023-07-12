import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class FrontEndDataService {

  constructor(private url:string,private http:HttpClient) { }
  getAll(){
    return this.http.get(this.url)
    .pipe(map((res)=>res));
  }
  getAllAndPaginate(page:number){
    return this.http.get(this.url+`/page/${page}`)
    .pipe(map((res)=>res));
  }
  getArticleBySlug(slug:string){
    return this.http.get(this.url+`/${slug}`)
    .pipe(map((res)=>res));
  }
  getSameRubrique(pays:string,categorie_id:number){
    return this.http.get(this.url+`/${pays}/${categorie_id}`)
    .pipe(map((res)=>res));
  }
  getAdvert(dimension_id:number){
    return this.http.get(this.url+`/pub/${dimension_id}`)
    .pipe(map((res)=>res));
  }
  getMostReaded(){
    return this.http.get(this.url+`/article/mostreaded/pluslus`)
    .pipe(map((res)=>res));
  }
  getRss(){
    return this.http.get(this.url+`/flux/rss`)
    .pipe(map((res)=>res));
  }
}
