import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { LogedUser } from '../models/loged-user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  errors:any=null;
  credential!: Credential;

  constructor(
    private fb:FormBuilder,
    private authservice:AuthService,
    private router:Router
  ){
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:[],
    })
  }
  ngOnInit(): void {
    this.authservice.logout
  }
  onSubmit() {

    this.authservice.signin(this.loginForm.value)
    this.authservice.isLoggedIn ?
      this.router.navigate(['/dashboard/user']) :this.router.navigateByUrl('login')
  }
}
