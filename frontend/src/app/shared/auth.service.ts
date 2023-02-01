import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LogedUser } from '../models/loged-user.model';
// Credentials
export class Credential{
  email!: String;
  password!: String;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logeduserSubject!:BehaviorSubject<LogedUser>;
  public logeduser!:Observable<LogedUser>;
  private baseURL:String='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) {
    this.logeduserSubject=new BehaviorSubject<LogedUser>(this.getToken());
    this.logeduser=this.logeduserSubject.asObservable()
  }

  signin(credential:Credential){
       return this.http.post(this.baseURL+'/login',credential)
       .subscribe((result)=>{
        const usr:LogedUser=result as LogedUser
        localStorage.setItem('currentUser',JSON.stringify(usr))
        this.logeduserSubject.next(usr)
        return usr
       })


  }
  logout(){
    localStorage.removeItem('currentUser');
    //this.logeduserSubject.next(this.getToken())
  }
  public get currentUserValue():LogedUser{
    return this.logeduserSubject.value
  }
  getToken():LogedUser{
    return (localStorage.getItem('currentUser')) as unknown as LogedUser ;

  }
  getRealToken(){
    return this.logeduserSubject
    .subscribe(result=>result.token)
  }

}
