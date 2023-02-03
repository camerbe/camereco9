import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  constructor(private url:string,private http:HttpClient) { }
  getAll(){
    return this.http.get(this.url);
  }
  create(resource:any){
    return this.http.post(this.url,JSON.stringify(resource));
  }
  update(resource:any){
    return this.http.put(this.url+'/'+resource.id,JSON.stringify(resource));
  }
  delete(id:any){
    return this.http.delete(this.url+'/'+id);
  }
  show(id:any){
    return this.http.get(this.url+'/'+id);
  }

}
