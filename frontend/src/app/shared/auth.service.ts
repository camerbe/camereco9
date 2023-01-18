import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
// Credentials
export class Credential{
  email!: String;
  password!: String;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  signin(credential:Credential):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login',credential);
  }
  logout(){
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
