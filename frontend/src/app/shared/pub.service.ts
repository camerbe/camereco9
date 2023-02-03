import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PubService extends DataService {

  constructor(private httpclient:HttpClient) {
    super("http://127.0.0.1:8000/api/users",httpclient);
  }
}
