import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request=request.clone({
     setHeaders:{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'Authorization':`Bearer ${this.authservice.getToken()}.`,

     }
    });
    return next.handle(request);
  }
}
