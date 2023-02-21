import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  constructor(private url:string,private http:HttpClient) { }
  getAll(){
    return this.http.get(this.url)
    .pipe(map((res)=>res));
  }
  create(resource:any){
    return this.http.post(this.url,JSON.stringify(resource));
  }
  update(id,resource:any){
    return this.http.put(this.url+'/'+id,JSON.stringify(resource))
    .pipe(map((res)=>res));
  }
  delete(id:any){
    return this.http.delete(this.url+'/'+id)
    .pipe(map((res)=>res));
  }
  show(id:any){
    return this.http.get(this.url+'/'+id)
    .pipe(map((res)=>res));
  }

}
