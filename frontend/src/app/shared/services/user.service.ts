import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService{

  constructor(private httpclient:HttpClient) {
    super("http://127.0.0.1:8000/api/users",httpclient);

  }

}
