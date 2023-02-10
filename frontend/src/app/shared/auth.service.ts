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

  private isLoggedInSubject!:BehaviorSubject<boolean>
  public isLoggedIn!:Observable<boolean>



  private baseURL:String='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) {
    this.logeduserSubject=new BehaviorSubject<LogedUser>(this.getToken());
    this.logeduser=this.logeduserSubject.asObservable();

    this.isLoggedInSubject=new BehaviorSubject<boolean>(false);
    this.isLoggedIn=this.isLoggedInSubject.asObservable();
  }

  signin(credential:Credential){
       return this.http.post(this.baseURL+'/login',credential)
       .subscribe({
        next:(result)=>{
          const usr:LogedUser=result as LogedUser;
          localStorage.setItem('currentUser',JSON.stringify(usr));
          this.isLoggedInSubject.next(true);
          this.logeduserSubject.next(usr);
          return usr;
        },
        error:(e)=>{

          if(e.status===401){
            this.isLoggedInSubject.next(false);
            this.loggedIn
          }


        }
       })


  }
  logout(){
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false)

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
  loggedIn(){

    return this.isLoggedIn.subscribe({
      next:(res)=>res,
      error:(e)=>false
    })

  }
}
