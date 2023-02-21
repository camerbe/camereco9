import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LogedUser } from '../../shared/models/loged-user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private usr!: LogedUser;
  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    this.authservice.logeduser.subscribe(res=>{
      this.usr=res
      return this.usr
    })

    if(this.usr!=null && this.authservice.isLoggedIn){
      request=request.clone({

      setHeaders:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Accept':'*/*',
        'Authorization':`Bearer ${this.usr.token}`,

        },
      });

    }

    return next.handle(request);
  }

}
